"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = __importStar(require("firebase"));
require("firebase/firestore");
const db = firebase.firestore();
const getUsers = async (table) => {
    const users = await db.collection(table).get();
    return users.docs.map((user) => (Object.assign({}, user.data(), { id: user.id })));
};
exports.getUsers = getUsers;
const getUserById = async (id, table) => {
    const user = await db.doc(`${table}/${id}`).get();
    return user.data();
};
exports.getUserById = getUserById;
const getMatchesByLandlord = async (landlordId) => {
    const matches = await db
        .collection('matches')
        .where('landlordId', '==', landlordId)
        .get();
    return matches.docs.map((match) => (Object.assign({}, match.data(), { id: match.id })));
};
exports.getMatchesByLandlord = getMatchesByLandlord;
const getMatchesByTenant = async (tenantId) => {
    const matches = await db
        .collection('matches')
        .where('tenantId', '==', tenantId)
        .get();
    return matches.docs.map((match) => (Object.assign({}, match.data(), { id: match.id })));
};
exports.getMatchesByTenant = getMatchesByTenant;
const addUser = async (id, user, table) => {
    const userRef = await db
        .collection(table)
        .doc(id)
        .set(user);
    console.log(`added user to ${table} with id: ${id}`);
    return userRef;
};
exports.addUser = addUser;
const addMatch = async (landlordId, tenantId) => {
    await db
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
    const userRef = await db.collection(table).doc(id);
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
    const landlordRef = await db.collection('landlords').doc(id);
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
    const tenantRef = await db.collection('tenants').doc(id);
    await tenantRef.update(updatedObj);
    return tenantRef.id;
};
exports.updatePreferences = updatePreferences;
const blockMatch = async (matchId) => {
    db.collection('matches')
        .doc(matchId)
        .update({ blocked: false });
};
exports.blockMatch = blockMatch;
const deleteUserById = async (id, table) => {
    const value = await db
        .collection(table)
        .doc(id)
        .delete();
    console.log(value);
};
exports.deleteUserById = deleteUserById;
