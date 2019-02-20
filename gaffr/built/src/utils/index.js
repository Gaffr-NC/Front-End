"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("firebase"));
const getUsers = async (table) => {
    const users = await firebase_1.default
        .firestore()
        .collection(table)
        .get();
    return users.docs.map((user) => (Object.assign({}, user.data(), { id: user.id })));
};
exports.getUsers = getUsers;
const getUserById = async (id, table) => {
    const user = await firebase_1.default
        .firestore()
        .doc(`${table}/${id}`)
        .get();
    return user.data();
};
exports.getUserById = getUserById;
const getMatchesByLandlord = async (landlordId) => {
    const matches = await firebase_1.default
        .firestore()
        .collection('matches')
        .where('landlordId', '==', landlordId)
        .get();
    return matches.docs.map((match) => (Object.assign({}, match.data(), { id: match.id })));
};
exports.getMatchesByLandlord = getMatchesByLandlord;
const getMatchesByTenant = async (tenantId) => {
    const matches = await firebase_1.default
        .firestore()
        .collection('matches')
        .where('tenantId', '==', tenantId)
        .get();
    return matches.docs.map((match) => (Object.assign({}, match.data(), { id: match.id })));
};
exports.getMatchesByTenant = getMatchesByTenant;
const addUser = async (id, user, table) => {
    const userRef = await firebase_1.default
        .firestore()
        .collection(table)
        .doc(id)
        .set(user);
    console.log(`added user to ${table} with id: ${id}`);
    return userRef;
};
exports.addUser = addUser;
const addMatch = async (landlordId, tenantId) => {
    await firebase_1.default
        .firestore()
        .collection('matches')
        .add({
        landlordId,
        tenantId,
        chatHistory: [],
        blocked: false
    })
        .then((ref) => {
        console.log('match made, id: ', ref.id);
    });
};
exports.addMatch = addMatch;
const updateUserContact = async (id, user, table) => {
    const userRef = await firebase_1.default
        .firestore()
        .collection(table)
        .doc(id);
    await userRef.update(user);
    return userRef.id;
};
exports.updateUserContact = updateUserContact;
const updateProperty = async (id, property) => {
    const keys = Object.keys(property).map((key) => `property.${key}`);
    const values = Object.values(property);
    const updatedObj = {};
    keys.forEach((key, index) => {
        updatedObj[key] = values[index];
    });
    const landlordRef = await firebase_1.default
        .firestore()
        .collection('landlords')
        .doc(id);
    await landlordRef.update(updatedObj);
    return landlordRef.id;
};
exports.updateProperty = updateProperty;
const updatePreferences = async (id, preferences) => {
    const keys = Object.keys(preferences).map(key => `preferences.${key}`);
    const values = Object.values(preferences);
    const updatedObj = {};
    keys.forEach((key, index) => {
        updatedObj[key] = values[index];
    });
    const tenantRef = await firebase_1.default
        .firestore()
        .collection('tenants')
        .doc(id);
    await tenantRef.update(updatedObj);
    return tenantRef.id;
};
exports.updatePreferences = updatePreferences;
const blockMatch = async (matchId) => {
    firebase_1.default
        .firestore()
        .collection('matches')
        .doc(matchId)
        .update({ blocked: false });
};
exports.blockMatch = blockMatch;
const deleteUserById = async (id, table) => {
    const value = await firebase_1.default
        .firestore()
        .collection(table)
        .doc(id)
        .delete();
    console.log(value);
};
exports.deleteUserById = deleteUserById;
