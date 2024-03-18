const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const registeredUser = require("./models/user.model.js");
const EmployeeList = require("./models/employeeList.model.js");

dotenv.config({
    path: './.env'
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));


mongoose.connect(process.env.MONGODB_URL)
mongoose.connection
    .once("open", () => { console.log("Connected to DB....."); })
    .on("error", () => { console.log("problem to connect to DB ..!!!!!");
});

let storage = multer.diskStorage({
    destination: function (req, image, cb) {
        return cb(null, "./Images")
    },
    filename: function (req, image, cb) {
        return cb(null, `${image.originalname}`)
    }
});
const upload = multer({ storage });

app.get('/test', (req, res) => {
    res.json('OK')
});

app.post("/register", (req, res) => {
    registeredUser.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered..")
            }
            else {
                let dataForDB = new registeredUser(req.body)
                dataForDB.save()
                    .then((data) => {
                         res.json("input stored in DB successfully..."); 
                        })
                    .catch((error) => 
                    (res.json("data can not be saved , problem at saving time...."))
                    );
            }
        })
        .catch(() => {
            res.json("registration problem...")
    })
});

app.post("/login", (req, res) => {
    registeredUser.findOne({ email: req.body.email})
        .then((user) => {
            if (user.password == req.body.password) {
                res
                .json({ "status": "success", "id": user._id})
                .status(201)
            }
            else {
                res.json({ "status": "fail"});
            }
        })
        .catch(() => { res.json({ "status": "noUser"}) 
    })
});

app.get("/user/:ID", (req, res) => {
    const ID = req.params.ID;
    registeredUser.findOne({ _id: ID })
        .then((ev) => { res.json(ev.username) })
        .catch(() => { console.log("Problem at param get users Express.."); })
});

app.post("/employees", upload.single("image"), (req, res) => {
    console.log(req.body);
    EmployeeList.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered..")
            }
            else {
                let dataForDB = new EmployeeList({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    image: req.file.filename,
                    course: req.body.course,
                })
                dataForDB.save()
                    .then((data) => { res.json("input stored in DB successfully..."); })
                    .catch((error) => (res.json("data can not be saved , problem at saving time....")))
            }
        })
        .catch(() => {
            res.json("registration problem...")
        })
});

app.post('/logout', (req,res) => {
    res.json("Logout succesfully!!")
});

app.get("/employee-list", (req, res) => {
    EmployeeList.find()
        .then((e) => {
            res.send(e)
        })
        .catch(() => {
            res.send("No records found!!")
        })
});

app.get("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID
    EmployeeList.findOne({ _id: ID })
        .then((e) => {
            res.send(e)
        })
        .catch(() => {
            res.send("Employee not find!!")
        })
});

app.put("/employee-list/:ID",upload.single('image'), async (req, res) => {
    const ID = req.params.ID;
    await EmployeeList.updateOne({ _id: ID }, req.body)
        .then((e) => { 
            res.json("successfully updated data") 
        })
        .catch(() => {
             res.send("Error at Delete API"); })
});

app.delete("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID
    EmployeeList.deleteOne({ _id: ID }, req.body)
        .then(() => { 
            res
            .status(201)
            .send("User deleted Successfully.."); 
        })
        .catch(() => { 
            res
            .status(504)
            .send("Problem at deletion.."); 
        })
});


app.listen(process.env.PORT, (req, res) => {
    console.log(`App is listening on port ${process.env.PORT}`)
});
