"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
class UserTypeScreen extends react_1.Component {
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' } },
            react_1.default.createElement(react_native_1.Button, { title: "I am a tenant", onPress: () => this.props.navigation.navigate('signUp', { userType: 'tenant' }) }),
            react_1.default.createElement(react_native_1.Button, { title: "I am a landlord", onPress: () => this.props.navigation.navigate('signUp', { userType: 'landlord' }) })));
    }
}
exports.default = UserTypeScreen;
