#!/usr/bin/env node

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

//Models DB
import ErrorMessage from "./model/ErrorMessage";
import FixedError from "./model/FixedError";


//Express Server
const app = express();
const router = express.Router();
const path = require('path');

//Prod mode 
app.use(express.static(path.join(__dirname, 'public')));

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
    }).sort({ date: 'descending' })
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
            res.status(400).send("Could not load error from database");
        } else {
            errorentry.date = req.body.date;
            errorentry.application = req.body.application;
            errorentry.title = req.body.title;
            errorentry.description = req.body.description;
            errorentry.status = req.body.status;
            errorentry.save()
                .then(errorentry => {
                    res.json("Error was successfully updated.")
                })
                .catch(err => {
                    res.status(400).send("Update failed. ");
                });

        }
    });
})

//updateStatusErrorMessage - Update Status of an Error
router.route("/errors/updatestatus/:id").post((req, res) => {
    ErrorMessage.findById(req.params.id, (err, errorentry) => {
        if (!errorentry) {
            res.status(400).send("Could not load error from database");
        } else {
            errorentry.status = req.body.status;
            errorentry.save()
                .then(errorentry => {
                    res.status(200).json("Error status was successfully updated.")
                })
                .catch(err => {
                    res.status(400).send("Update failed. ");
                });

        }
    });
})


//deleteErrorMessage - Delete an existing Error
router.route("/errors/delete/:id").get((req, res) => {
    ErrorMessage.findByIdAndRemove({ _id: req.params.id }, (err, errorentry) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Error was removed successfully. ")
        }
    });
});

//fixErrorMessage - Change status of error message to fixed and move it from the table errormessage to fixederror
router.route("/errors/fixed/:id").get((req, res) => {
    ErrorMessage.findById(req.params.id, (err, errorentry) => {
        if (!errorentry) {
            res.status(400).send("Could not load error from database");
        } else {

            let fixedError = new FixedError();
            fixedError.errorDate = errorentry.date;
            fixedError.application = errorentry.application;
            fixedError.title = errorentry.title;
            fixedError.description = errorentry.description;

            fixedError.save()
                .then(savedFixedError => {
                    ErrorMessage.findByIdAndRemove({ _id: req.params.id }, (err, errorentry) => {
                        if (err) {
                            res.json(err);
                        } else {
                            res.status(200).json("Error was successfully fixed.");
                        }
                    });
                })
                .catch(err => {
                    res.status(400).send("Update failed. ");
                })
        }
    });
})

//UnfixErrorMessage - Change status of error message to open and move it from the table fixederror to errormessage
router.route("/fixederror/unfix/:id").get((req, res) => {
    FixedError.findById(req.params.id, (err, fixederrorEntry) => {
        if (!fixederrorEntry) {
            res.status(400).send(("Could not load error from database"));
        } else {

            let errorMessage = new ErrorMessage();
            errorMessage.date = fixederrorEntry.errorDate;
            errorMessage.application = fixederrorEntry.application;
            errorMessage.title = fixederrorEntry.title;
            errorMessage.description = fixederrorEntry.description;
            errorMessage.status = "Open";
            console.log("OK 1");
            errorMessage.save()
                .then(savedError => {
                    console.log("OK 2");
                    FixedError.findByIdAndRemove({ _id: req.params.id }, (err, deleteEntry) => {
                        if (err) {
                            console.log("FAIL 1");
                            res.json(err);
                        } else {
                            console.log("OK 2");
                            res.status(200).json("Error was successfully unfixed.");
                        }
                    });
                })
                .catch(err => {
                    res.status(400).send("Update failed. " + err);
                })
        }
    });
})


//getFixedErrors:
router.route("/fixederrors").get((req, res) => {
    FixedError.find((err, errors) => {
        if (err) {
            console.log("DB error - getFixedErrors: " + err);
        } else {
            res.json(errors);
        }
    }).sort({ fixedDate: 'descending' })
});
//getFixedErrorById:
router.route("/fixederror/:id").get((req, res) => {
    FixedError.findById(req.params.id, (err, errors) => {
        if (err) {
            console.log("DB error - getFixedErrorById: " + err);
        } else {
            res.json(errors);
        }
    })
});

//deleteFixedError - Delete an existing Fixed Error
router.route("/fixederror/delete/:id").get((req, res) => {
    FixedError.findByIdAndRemove({ _id: req.params.id }, (err, fixederrorentry) => {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json("Fixed Error was removed successfully. ")
        }
    });
});

//addFixedError
router.route("/fixederror/add").post((req, res) => {
    let fixederrorEntry = new FixedError(req.body);
    fixederrorEntry.save()
        .then(error => {
            res.status(200).json({ "Add": "New Fixed Error was added successfully" })
        })
        .catch(err => {
            res.status(400).send("Failed to add new record into the database");
        });
});



//Routing - to ExpressJS Server
app.use("/api", router)

//Routing - View Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Debug expressjs server
//app.get("/", (req,res) => res.send("The express JS server and application is working. "));
app.listen(4000, () => console.log("Express Server is currently running on the port 4000"));