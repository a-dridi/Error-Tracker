import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//Models DB
import ErrorMessage from "./model/ErrorMessage";


//Express Server
const app = express();
const router = express.Router();

//App
app.use(cors());
app.use(bodyParser.json());

//DATABASE CONNECTION SETTINGS -- EDIT THIS
mongoose.connect("mongodb://localhost:27017/errortrackerdb");
//DATABASE CONNECTION SETTINGS -- EDIT THIS - END

const DBConnection = mongoose.connection;
DBConnection.once("open", () => {
    console.log("Database connection sucessfully established.");
})

/*Database Data - DAO API
*
*/
//getErrorMessages:
router.route("/errors").get((req, res) => {
    ErrorMessage.find((err, errors) => {
        if (err) {
            console.log("DB error - getErrorMessages: " + err);
        } else {
            res.json(errors);
        }
    }).sort({date: 'descending'})
});
//getErrorMessagesById:
router.route("/errors/:id").get((req, res) => {
    ErrorMessage.findById(req.params.id, (err, errors) => {
        if (err) {
            console.log("DB error - getErrorMessagesById: " + err);
        } else {
            res.json(errors);
        }
    })
});

//addErrorMessage
router.route("/errors/add").post((req, res) => {
    let errorEntry = new ErrorMessage(req.body);
    errorEntry.save()
        .then(error => {
            res.status(200).json({ "Add": "New error was added successfully" })
        })
        .catch(err => {
            res.status(400).send("Failed to add new record into the database");
        });
});
//updateErrorMessage - Update existing Error
router.route("/errors/update/:id").post((req, res) => {
    ErrorMessage.findById(req.params.id, (err, errorentry) => {
        if (!errorentry) {
            return next(new Error("Could not load appointment from database"));
        } else {
            errorentry.date = req.body.date;
            errorentry.application = req.body.application;
            errorentry.title = req.body.title;
            errorentry.description = req.body.description;
            errorentry.save()
                .then(errorentry => {
                    res.json("Error was successfully updated.")
                })
                .catch(err => {
                    res.status(400).update("Update failed. ");
                });

        }
    });
})
//deleteAvailableAppointment - Delete an existing Available Appointment
router.route("/errors/delete/:id").get((req, res) => {
    ErrorMessage.findByIdAndRemove({ _id: req.params.id }, (err, errorentry) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Error was removed successfully. ")
        }
    });
});


//Routing - to ExpressJS Server
app.use("/", router)

//Debug expressjs server
//app.get("/", (req,res) => res.send("The express JS server and application is working. "));
app.listen(4000, () => console.log("Express Server is currently running on the port 4000"));