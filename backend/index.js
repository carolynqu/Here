const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const groupRouter = require("./routes/groups");
const sessionRouter = require("./routes/sessions");
const friendsRouter = require("./routes/friends");
const db = require("./db.js");
const fbApp = require("./firebase.js");
const { getAuth,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } = require("firebase/auth");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

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
                    let newData = doc.data();
                    newData.id = user.uid;
                    res.send(newData);
                }).catch(e => {
                    res.send(e.code);
                });
            }).catch(e => {
                res.send(e.code);
            });

        }).catch((error) => {
            res.send(error.code);
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
                let newData = doc.data();
                newData.id = user.uid;
                res.send(newData);
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
app.use("/sessions", sessionRouter);
app.use("/friends", friendsRouter);

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}


app.listen(3000)
