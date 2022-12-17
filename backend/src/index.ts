import express from "express";
import moment from "moment";
import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/resource/:resourceId/available", (req, res) => {
    var resourceId = parseInt(req.params.resourceId);
    var datetime = typeof req.query.datetime === "string" ? req.query.datetime : undefined;

    if (datetime !== undefined && !moment(datetime, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    }
    if (resourceId != 1337) {
        res.status(404).json({ "error": "resource not found" });
        return;
    }

    var availabilityStart = moment().set({'hour': 10, 'minute': 0, 'second': 0});
    var availabilityEnd = moment().set({'hour': 20, 'minute': 0, 'second': 0});

    if (moment(datetime).isBetween(availabilityStart, availabilityEnd, 'second', '[)')) {
        res.json({ "available": true });
    }
    else {
        res.json({ "available": false });
    }
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});