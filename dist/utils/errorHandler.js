"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = (error, _req, res, _next) => {
    var _a;
    res.status(error.status).json({ message: error.message, data: (_a = error.data) !== null && _a !== void 0 ? _a : {} });
};
//# sourceMappingURL=errorHandler.js.map