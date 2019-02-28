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
  description: string;
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
  images?: string[];
  petsAllowed?: boolean;
  maxPrice?: number;
  minPrice?: number;
  price?: number;
  propertyType?: string;
  smokingAllowed?: boolean;
  description?: string;
  [key: string]: number | string | boolean | undefined | string[];
}

const getUsers = async (table: string): Promise<User[]> => {
  const users: QuerySnapshot = await db.collection(table).get();
  return users.docs.map((user: DocumentSnapshot) => ({
    ...user.data(),
    id: user.id
  })) as User[];
};

const getUserById = async (id: string, table: string): Promise<User> => {
  const user: DocumentSnapshot = await db.doc(`${table}/${id}`).get();
  return user.data() as User;
};

const getMatchById = async (id: string): Promise<Match> => {
  const match: DocumentSnapshot = await db.doc(`matches/${id}`).get();
  return match.data() as Match;
};

const getSuitableLandlords = async (
  preferences: Preferences,
  tenantId: string
): Promise<User[]> => {
  const {
    smokingAllowed,
    petsAllowed,
    minPrice,
    maxPrice,
    city,
    bedrooms,
    propertyType
  } = preferences;
  const matches = await getMatchesByTenant(tenantId);
  let landlords: any = await db.collection('landlords');
  if (smokingAllowed) {
    landlords = landlords.where('property.smokingAllowed', '==', true);
  }
  if (petsAllowed) {
    landlords = landlords.where('property.petsAllowed', '==', true);
  }
  if (minPrice || maxPrice) {
    landlords = landlords
      .where('property.price', '>=', minPrice || 0)
      .where('property.price', '<=', maxPrice || Infinity);
  }
  if (city) {
    landlords = landlords.where('property.city', '==', city);
  }
  if (propertyType) {
    landlords = landlords.where('property.propertyType', '==', propertyType);
  }
  landlords = await landlords.get();
  landlords = landlords.docs.map((landlord: DocumentSnapshot) => ({
    ...landlord.data(),
    id: landlord.id
  }));
  if (bedrooms) {
    // filters bedrooms to avoid multiple inequality clause in firestore queries, then removes already matched landlords
    landlords = landlords.filter(
      (landlord: User) =>
        landlord.property &&
        landlord.property.bedrooms >= bedrooms &&
        !matches.find(match => match.landlordId === landlord.id)
    );
    return landlords;
  } else {
    return landlords.filter(
      (landlord: User) =>
        !matches.find(match => match.landlordId === landlord.id)
    );
  }
};

const getMatchesByLandlord = async (landlordId: string): Promise<Match[]> => {
  const matches: QuerySnapshot = await db
    .collection('matches')
    .where('landlordId', '==', landlordId)
    .where('blocked', '==', false)
    .get();
  return matches.docs.map((match: DocumentSnapshot) => ({
    ...match.data(),
    id: match.id
  })) as Match[];
};

const getMatchesByTenant = async (tenantId: string): Promise<Match[]> => {
  const matches: QuerySnapshot = await db
    .collection('matches')
    .where('tenantId', '==', tenantId)
    .where('blocked', '==', false)
    .get();
  return matches.docs.map((match: DocumentSnapshot) => ({
    ...match.data(),
    id: match.id
  })) as Match[];
};

const addUser = async (
  id: string,
  user: User,
  table: string
): Promise<string> => {
  await db
    .collection(table)
    .doc(id)
    .set(user);
  return `Successfully added user with id ${id}`;
};

const addMatch = async (
  landlordId: string,
  tenantId: string
): Promise<void> => {
  await db.collection('matches').add({
    landlordId,
    tenantId,
    chatHistory: [],
    blocked: false
  });
};

const updateUserContact = async (
  id: string,
  user: User,
  table: string
): Promise<string> => {
  const userRef: DocumentReference = await db.collection(table).doc(id);
  await userRef.update(user);
  return userRef.id;
};

const updateProperty = async (
  id: string,
  property: Property
): Promise<string> => {
  const keys: string[] = Object.keys(property).map(
    (key: string) => `property.${key}`
  );
  const values: (
    | string
    | number
    | boolean
    | undefined
    | string[])[] = Object.values(property);
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
): Promise<string> => {
  const keys: string[] = Object.keys(preferences).map(
    key => `preferences.${key}`
  );
  const values: (
    | string
    | number
    | boolean
    | undefined
    | string[])[] = Object.values(preferences);
  const updatedObj: UpdatePreferences = {};
  keys.forEach((key, index) => {
    updatedObj[key] = values[index];
  });
  const tenantRef = await db.collection('tenants').doc(id);
  await tenantRef.update(updatedObj);
  return tenantRef.id;
};

const blockMatch = async (matchId: string): Promise<void> => {
  db.collection('matches')
    .doc(matchId)
    .update({ blocked: true });
};

const deleteUserById = async (id: string, table: string): Promise<void> => {
  await db
    .collection(table)
    .doc(id)
    .delete();
};

const removeProperty = async (landlordId: string): Promise<void> => {
  await db
    .collection('landlords')
    .doc(landlordId)
    .update({
      property: firebase.firestore.FieldValue.delete()
    });
};

const liveListen = async (
  table: string,
  id: string,
  cb: Function
): Promise<void> => {
  db.collection(table)
    .doc(id)
    .onSnapshot(doc => cb(doc));
};

const liveListenMatchesTenant = async (
  uid: string,
  cb: Function
): Promise<void> => {
  db.collection('matches')
    .where('tenantId', '==', uid)
    .onSnapshot((doc: QuerySnapshot) => cb(doc));
};
const liveListenMatchesLandlord = async (
  uid: string,
  cb: Function
): Promise<void> => {
  db.collection('matches')
    .where('landlordId', '==', uid)
    .onSnapshot((doc: QuerySnapshot) => cb(doc));
};
const sendChatMessage = async (
  matchId: string,
  message: ChatMessage
): Promise<void> => {
  const matchRef = await db.collection('matches').doc(matchId);
  matchRef.update({
    chatHistory: firebase.firestore.FieldValue.arrayUnion(message)
  });
};

const capitalise = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const trimMessage = (message: string): string =>
  message.length > 40 ? `${message.slice(0, 40)}...` : message;

export {
  getUsers,
  getUserById,
  getMatchById,
  getMatchesByLandlord,
  getMatchesByTenant,
  getSuitableLandlords,
  addUser,
  addMatch,
  updateUserContact,
  updateProperty,
  updatePreferences,
  blockMatch,
  deleteUserById,
  liveListen,
  liveListenMatchesTenant,
  liveListenMatchesLandlord,
  sendChatMessage,
  trimMessage,
  capitalise
};
