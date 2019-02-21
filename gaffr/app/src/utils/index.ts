import firebase from 'firebase';
import 'firebase/firestore';
import {
  QuerySnapshot,
  DocumentSnapshot,
  DocumentReference
} from '@firebase/firestore-types';
import config from '../config';
firebase.initializeApp(config);
const db = firebase.firestore();
interface Property {
  bedrooms: number;
  city: string;
  images: string[];
  price: number;
  propertyType: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
}

interface Preferences {
  bedrooms: number;
  city: string;
  petsAllowed: boolean;
  maxPrice: number;
  minPrice: number;
  propertyType: string;
  smokingAllowed: boolean;
}

interface User {
  id?: string;
  email: string;
  name: string;
  phone: string;
  property?: Property;
  preferences?: Preferences;
}
interface ChatMessage {
  speaker: string;
  message: string;
  timestamp: string | Date;
}
interface Match {
  id: string;
  landlordId: string;
  tenantId: string;
  chatHistory?: ChatMessage[];
  blocked: boolean;
}

// This interface is for both landlords and tenants
interface UpdatePreferences {
  bedrooms?: number;
  city?: string;
  petsAllowed?: boolean;
  maxPrice?: number;
  minPrice?: number;
  price?: number;
  propertyType?: string;
  smokingAllowed?: boolean;
  [key: string]: number | string | boolean | undefined;
}

const getUsers = async (table: string) => {
  const users: QuerySnapshot = await db.collection(table).get();
  return users.docs.map((user: DocumentSnapshot) => ({
    ...user.data(),
    id: user.id
  })) as User[];
};

const getUserById = async (id: string, table: string) => {
  const user: DocumentSnapshot = await db.doc(`${table}/${id}`).get();
  return user.data() as User | undefined;
};

const getMatchesByLandlord = async (landlordId: string) => {
  const matches: QuerySnapshot = await db
    .collection('matches')
    .where('landlordId', '==', landlordId)
    .get();
  return matches.docs.map((match: DocumentSnapshot) => ({
    ...match.data(),
    id: match.id
  })) as Match[];
};

const getMatchesByTenant = async (tenantId: string) => {
  const matches: QuerySnapshot = await db
    .collection('matches')
    .where('tenantId', '==', tenantId)
    .get();
  return matches.docs.map((match: DocumentSnapshot) => ({
    ...match.data(),
    id: match.id
  })) as Match[];
};

const addUser = async (id: string, user: User, table: string) => {
  const userRef: void = await db
    .collection(table)
    .doc(id)
    .set(user);
  console.log(`added user to ${table} with id: ${id}`);
  return userRef;
};

const addMatch = async (landlordId: string, tenantId: string) => {
  await db
    .collection('matches')
    .add({
      landlordId,
      tenantId,
      chatHistory: [],
      blocked: false
    })
    .then((ref: DocumentReference) => {
      console.log('match made, id: ', ref.id);
    });
};

const updateUserContact = async (id: string, user: User, table: string) => {
  const userRef: DocumentReference = await db.collection(table).doc(id);
  await userRef.update(user);
  return userRef.id;
};

const updateProperty = async (id: string, property: UpdatePreferences) => {
  const keys: string[] = Object.keys(property).map(
    (key: string) => `property.${key}`
  );
  const values: (string | number | boolean | undefined)[] = Object.values(
    property
  );
  const updatedObj: UpdatePreferences = {};
  keys.forEach((key, index) => {
    updatedObj[key] = values[index];
  });
  const landlordRef: DocumentReference = await db
    .collection('landlords')
    .doc(id);
  await landlordRef.update(updatedObj);
  return landlordRef.id;
};

const updatePreferences = async (
  id: string,
  preferences: UpdatePreferences
) => {
  const keys: string[] = Object.keys(preferences).map(
    key => `preferences.${key}`
  );
  const values: (string | number | boolean | undefined)[] = Object.values(
    preferences
  );
  const updatedObj: UpdatePreferences = {};
  keys.forEach((key, index) => {
    updatedObj[key] = values[index];
  });
  const tenantRef = await db.collection('tenants').doc(id);
  await tenantRef.update(updatedObj);
  return tenantRef.id;
};

const blockMatch = async (matchId: string) => {
  db.collection('matches')
    .doc(matchId)
    .update({ blocked: true });
};

const deleteUserById = async (id: string, table: string) => {
  await db
    .collection(table)
    .doc(id)
    .delete();
  console.log(`deleted user ${id} from ${table}}`);
};

export {
  getUsers,
  getUserById,
  getMatchesByLandlord,
  getMatchesByTenant,
  addUser,
  addMatch,
  updateUserContact,
  updateProperty,
  updatePreferences,
  blockMatch,
  deleteUserById
};
