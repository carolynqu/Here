const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db.js");
const fbApp = require("./firebase.js");
const { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } = require("firebase/auth");

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

app.get('/', logger, (req, res) => {
    db.collection("groups").get().then((user) => {
        user.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    res.send("Hello");
})

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

const userRouter = require("./routes/users");
const e = require("express");
const { connect } = require("./routes/users");

app.use("/users", userRouter)

app.listen(3000)