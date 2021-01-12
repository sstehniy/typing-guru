"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_body_1 = __importDefault(require("morgan-body"));
const connectToDb_1 = require("./utils/connectToDb");
const errorHandler_1 = require("./utils/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register_1 = __importDefault(require("./controllers/register"));
const login_1 = __importDefault(require("./controllers/login"));
const tests_1 = __importDefault(require("./controllers/tests"));
const words_1 = __importDefault(require("./controllers/words"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.static("build"));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//eslint-disable-next-line
morgan_body_1.default(app, {
    dateTimeFormat: "clf",
    logReqUserAgent: false,
    theme: "lightened",
});
// Controllers
app.use("/api/register", register_1.default);
app.use("/api/login", login_1.default);
app.use("/api/tests", tests_1.default);
app.use("/api/words", words_1.default);
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
});
app.use(errorHandler_1.errorHandler);
void connectToDb_1.connectToDb();
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map