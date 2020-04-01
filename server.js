#!/usr/bin/env node
"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ErrorMessage = _interopRequireDefault(require("./model/ErrorMessage"));

var _FixedError = _interopRequireDefault(require("./model/FixedError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Models DB
//Express Server
var app = (0, _express["default"])();

var router = _express["default"].Router();

var path = require('path'); //Prod mode 


app.use(_express["default"]["static"](path.join(__dirname, 'public'))); //App

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json()); //DATABASE CONNECTION SETTINGS -- EDIT THIS

_mongoose["default"].connect("mongodb://localhost:27017/errortrackerdb"); //DATABASE CONNECTION SETTINGS -- EDIT THIS - END


var DBConnection = _mongoose["default"].connection;
DBConnection.once("open", function () {
  console.log("Database connection sucessfully established.");
});
/*Database Data - DAO API
*
*/
//getErrorMessages:

router.route("/errors").get(function (req, res) {
  _ErrorMessage["default"].find(function (err, errors) {
    if (err) {
      console.log("DB error - getErrorMessages: " + err);
    } else {
      res.json(errors);
    }
  }).sort({
    date: 'descending'
  });
}); //getErrorMessagesById:

router.route("/errors/:id").get(function (req, res) {
  _ErrorMessage["default"].findById(req.params.id, function (err, errors) {
    if (err) {
      console.log("DB error - getErrorMessagesById: " + err);
    } else {
      res.json(errors);
    }
  });
}); //addErrorMessage

router.route("/errors/add").post(function (req, res) {
  var errorEntry = new _ErrorMessage["default"](req.body);
  errorEntry.save().then(function (error) {
    res.status(200).json({
      "Add": "New error was added successfully"
    });
  })["catch"](function (err) {
    res.status(400).send("Failed to add new record into the database");
  });
}); //updateErrorMessage - Update existing Error

router.route("/errors/update/:id").post(function (req, res) {
  _ErrorMessage["default"].findById(req.params.id, function (err, errorentry) {
    if (!errorentry) {
      return next(new Error("Could not load error from database"));
    } else {
      errorentry.date = req.body.date;
      errorentry.application = req.body.application;
      errorentry.title = req.body.title;
      errorentry.description = req.body.description;
      errorentry.status = req.body.status;
      errorentry.save().then(function (errorentry) {
        res.json("Error was successfully updated.");
      })["catch"](function (err) {
        res.status(400).update("Update failed. ");
      });
    }
  });
}); //updateStatusErrorMessage - Update Status of an Error

router.route("/errors/updatestatus/:id").post(function (req, res) {
  _ErrorMessage["default"].findById(req.params.id, function (err, errorentry) {
    if (!errorentry) {
      return next(new Error("Could not load error from database"));
    } else {
      errorentry.status = req.body.status;
      errorentry.save().then(function (errorentry) {
        res.status(200).json("Error status was successfully updated.");
      })["catch"](function (err) {
        res.status(400).update("Update failed. ");
      });
    }
  });
}); //deleteErrorMessage - Delete an existing Error

router.route("/errors/delete/:id").get(function (req, res) {
  _ErrorMessage["default"].findByIdAndRemove({
    _id: req.params.id
  }, function (err, errorentry) {
    if (err) {
      res.json(err);
    } else {
      res.json("Error was removed successfully. ");
    }
  });
}); //fixErrorMessage - Change status of error message to fixed and move it from the table errormessage to fixederror

router.route("/errors/fixed/:id").get(function (req, res) {
  _ErrorMessage["default"].findById(req.params.id, function (err, errorentry) {
    if (!errorentry) {
      return next(new Error("Could not load error from database"));
    } else {
      var fixedError = new _FixedError["default"]();
      fixedError.errorDate = errorentry.date;
      fixedError.application = errorentry.application;
      fixedError.title = errorentry.title;
      fixedError.description = errorentry.description;
      fixedError.save().then(function (savedFixedError) {
        _ErrorMessage["default"].findByIdAndRemove({
          _id: req.params.id
        }, function (err, errorentry) {
          if (err) {
            res.json(err);
          } else {
            res.status(200).json("Error was successfully fixed.");
          }
        });
      })["catch"](function (err) {
        res.status(400).update("Update failed. ");
      });
    }
  });
}); //UnfixErrorMessage - Change status of error message to open and move it from the table fixederror to errormessage

router.route("/errors/unfix/:id").get(function (req, res) {
  _FixedError["default"].findById(req.params.id, function (err, fixederrorEntry) {
    if (!fixederrorEntry) {
      return next(new Error("Could not load error from database"));
    } else {
      var errorMessage = new _ErrorMessage["default"]();
      errorMessage.date = fixederrorEntry.errorDate;
      errorMessage.application = fixederrorEntry.application;
      errorMessage.title = fixederrorEntry.title;
      errorMessage.description = fixederrorEntry.description;
      errorMessage.status = "Open";
      errorMessage.save().then(function (savedError) {
        FixedEror.findByIdAndRemove({
          _id: req.params.id
        }, function (err, deleteEntry) {
          if (err) {
            res.json(err);
          } else {
            res.status(200).json("Error was successfully unfixed.");
          }
        });
      })["catch"](function (err) {
        res.status(400).update("Update failed. ");
      });
    }
  });
}); //getFixedErrors:

router.route("/fixederrors").get(function (req, res) {
  _FixedError["default"].find(function (err, errors) {
    if (err) {
      console.log("DB error - getFixedErrors: " + err);
    } else {
      res.json(errors);
    }
  }).sort({
    fixedDate: 'descending'
  });
}); //getFixedErrorById:

router.route("/fixederror/:id").get(function (req, res) {
  _FixedError["default"].findById(req.params.id, function (err, errors) {
    if (err) {
      console.log("DB error - getFixedErrorById: " + err);
    } else {
      res.json(errors);
    }
  });
}); //addFixedError

router.route("/fixederror/add").post(function (req, res) {
  var fixederrorEntry = new _FixedError["default"](req.body);
  fixederrorEntry.save().then(function (error) {
    res.status(200).json({
      "Add": "New Fixed Error was added successfully"
    });
  })["catch"](function (err) {
    res.status(400).send("Failed to add new record into the database");
  });
}); //Routing - to ExpressJS Server

app.use("/api", router); //Routing - View Frontend

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
}); //Debug expressjs server
//app.get("/", (req,res) => res.send("The express JS server and application is working. "));

app.listen(4000, function () {
  return console.log("Express Server is currently running on the port 4000");
});