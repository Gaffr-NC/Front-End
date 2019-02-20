"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const firebase_1 = __importDefault(require("firebase"));
class Login extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            email: '',
            password: ''
        };
        this.logIn = () => {
            console.log(this.props);
            this.props.navigation.navigate('TenantApp');
        };
        this.handleLogInPress = () => {
            console.log('PRESSED LOG IN');
            const { email, password } = this.state;
            console.log(email, password);
            firebase_1.default
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                this.props.navigation.navigate('TenantApp');
                console.log(user, 'UUUUSER');
            })
                .catch((err) => {
                console.log(err);
                react_native_1.Alert.alert('Invalid email/password');
            });
        };
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' } },
            react_1.default.createElement(react_native_1.Text, null, "Log in or sign up!"),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "email...", value: this.state.email, onChangeText: (text) => this.setState({ email: text }), autoCapitalize: "none" }),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "password...", value: this.state.password, onChangeText: (text) => this.setState({ password: text }), autoCapitalize: "none", secureTextEntry: true }),
            react_1.default.createElement(react_native_1.Button, { title: "LOG IN", onPress: this.handleLogInPress }),
            react_1.default.createElement(react_native_1.Button, { title: "SIGN UP", onPress: () => this.props.navigation.navigate('userType') })));
    }
}
Login.navigationOptions = {
    title: 'Log-In'
};
exports.default = Login;
const styles = react_native_1.StyleSheet.create({
    inputs: {
        backgroundColor: 'powderblue',
        margin: 10,
        width: '90%',
        padding: 10
    }
});
