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
class SignUpScreen extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            phoneNo: ''
        };
        this.handleSignUpPress = () => {
            const { email, password, confirmPassword, name, phoneNo } = this.state;
            if (password !== confirmPassword) {
                react_native_1.Alert.alert('Passwords do not match');
            }
            else if (!name) {
                react_native_1.Alert.alert('Please enter your name');
            }
            else if (!phoneNo) {
                react_native_1.Alert.alert('Please enter your telephone number');
            }
            else {
                console.log(email, password);
                firebase_1.default
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                    this.props.navigation.navigate('userType', { email, name, phoneNo });
                    console.log(user, 'UUUUSER', 'Successful login');
                })
                    .catch((err) => {
                    console.log(err.code);
                    if (err.code === 'auth/weak-password') {
                        react_native_1.Alert.alert('Password must be at least 6 characters');
                    }
                    else if (err.code === 'auth/email-already-in-use') {
                        react_native_1.Alert.alert('Email already in use');
                    }
                    else {
                        react_native_1.Alert.alert('Invalid email/password');
                    }
                });
            }
        };
    }
    render() {
        return (react_1.default.createElement(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' } },
            react_1.default.createElement(react_native_1.Text, null, "Sign up!"),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "email...", value: this.state.email, onChangeText: (text) => this.setState({ email: text }), autoCapitalize: "none" }),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "password...", value: this.state.password, onChangeText: (text) => this.setState({ password: text }), autoCapitalize: "none", secureTextEntry: true }),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "confirm password...", value: this.state.confirmPassword, onChangeText: (text) => this.setState({ confirmPassword: text }), autoCapitalize: "none", secureTextEntry: true }),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "name...", value: this.state.name, onChangeText: (text) => this.setState({ name: text }) }),
            react_1.default.createElement(react_native_1.TextInput, { style: styles.inputs, placeholder: "telephone number...", value: this.state.phoneNo, onChangeText: (text) => this.setState({ phoneNo: text }) }),
            react_1.default.createElement(react_native_1.Text, null, this.props.navigation.getParam('userType', 'ERROR')),
            react_1.default.createElement(react_native_1.Button, { title: "SUBMIT", onPress: this.handleSignUpPress })));
    }
}
SignUpScreen.navigationOptions = {
    title: 'Sign Up'
};
exports.default = SignUpScreen;
const styles = react_native_1.StyleSheet.create({
    inputs: {
        backgroundColor: 'powderblue',
        margin: 10,
        width: '90%',
        padding: 10
    }
});
