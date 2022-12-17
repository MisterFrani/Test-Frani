"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get("/resource/:resourceId/available", (req, res) => {
    var resourceId = parseInt(req.params.resourceId);
    var datetime = typeof req.query.datetime === "string" ? req.query.datetime : undefined;
    if (datetime !== undefined && !moment_1.default(datetime, moment_1.default.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    }
    if (resourceId != 1337) {
        res.status(404).json({ "error": "resource not found" });
        return;
    }
    var availabilityStart = moment_1.default().set({ 'hour': 10, 'minute': 0, 'second': 0 });
    var availabilityEnd = moment_1.default().set({ 'hour': 20, 'minute': 0, 'second': 0 });
    if (moment_1.default(datetime).isBetween(availabilityStart, availabilityEnd, 'second', '[)')) {
        res.json({ "available": true });
    }
    else {
        res.json({ "available": false });
    }
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map