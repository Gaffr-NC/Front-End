"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class Loading extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' } },
            react_1.default.createElement(react_native_1.Text, null, "Loading..."),
            react_1.default.createElement(react_native_1.ActivityIndicator, { size: "large" })));
    }
}
exports.default = Loading;
