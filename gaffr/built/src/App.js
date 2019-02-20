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
const React = __importStar(require("react"));
const firebase = __importStar(require("firebase"));
// import {}
const react_navigation_1 = require("react-navigation");
const SwipeScreen_1 = __importDefault(require("./screens/SwipeScreen"));
const LoginScreen_1 = __importDefault(require("./screens/LoginScreen"));
const Matches_1 = __importDefault(require("./screens/Matches"));
const Profile_1 = __importDefault(require("./screens/Profile"));
const SignUpScreen_1 = __importDefault(require("./screens/SignUpScreen"));
const PropertyScreen_1 = __importDefault(require("./screens/PropertyScreen"));
const Loading_1 = __importDefault(require("./screens/Loading"));
const config_1 = __importDefault(require("./config"));
const UserType_1 = __importDefault(require("./screens/UserType"));
firebase.initializeApp(config_1.default);
const TenantAppStack = react_navigation_1.createMaterialTopTabNavigator({
    Profile: Profile_1.default,
    Swiper: SwipeScreen_1.default,
    Matches: Matches_1.default
}, {
    initialRouteName: 'Swiper',
    tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        style: {
            backgroundColor: 'indianred',
            marginTop: 24
        },
        indicatorStyle: {
            backgroundColor: 'grey'
        }
    }
});
const LandAppStack = react_navigation_1.createMaterialTopTabNavigator({
    Profile: Profile_1.default,
    Properties: PropertyScreen_1.default,
    Matches: Matches_1.default
}, {
    initialRouteName: 'Properties',
    tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        style: {
            backgroundColor: 'indianred',
            marginTop: 24
        },
        indicatorStyle: {
            backgroundColor: 'grey'
        }
    }
});
const AuthStack = react_navigation_1.createStackNavigator({
    logIn: LoginScreen_1.default,
    signUp: SignUpScreen_1.default,
    userType: UserType_1.default
});
const AppContainer = react_navigation_1.createAppContainer(react_navigation_1.createSwitchNavigator({
    Loading: Loading_1.default,
    Auth: AuthStack,
    TenantApp: TenantAppStack,
    LandApp: LandAppStack
}, { initialRouteName: 'Auth' }));
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            currentUser: null
        };
    }
    render() {
        return React.createElement(AppContainer, null);
    }
}
exports.default = App;
