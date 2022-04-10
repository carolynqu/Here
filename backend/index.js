const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const groupRouter = require("./routes/groups");
const db = require("./db.js");
const fbApp = require("./firebase.js");
const { getAuth,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } = require("firebase/auth");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = getAuth(fbApp);
//connectAuthEmulator(auth, "http://localhost:9099");

// Sign up the user
app.post('/sign-up', async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            const docRef = db.collection("users").doc(user.uid);
            docRef.set({
                firstName: firstName,
                lastName: lastName,
                email: user.email,
                school: "Yale University",
                studyId: null,
                following: [],
                followedBy: [],
                groups: [],
                previousLocations: [],
                availableSessions: [],

            }).then(() => {
                docRef.get().then((doc) => {
                    res.send(doc.data());
                }).catch(e => {
                    res.send(e.code);
                });
            }).catch(e => {
                res.send(e.code);
            });

        }).catch((error) => {
            send(error.code);
        });

});

app.post('/sign-in', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            const docRef = db.collection("users").doc(user.uid);

            docRef.get().then((doc) => {
                res.send(doc.data());
            }).catch(e => {
                res.send(e.code);
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            res.send(errorCode);
        });
})

app.get('/', logger, (req, res) => {
    db.collection("groups").get().then((user) => {
        user.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    res.send("Hello");
})

app.use("/users", userRouter);
app.use("/groups", groupRouter);

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}


app.listen(3000)