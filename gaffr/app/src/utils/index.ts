import firebase from 'firebase';
interface Property {
  bedrooms: number;
  city: string;
  images: string[];
  price: number;
  petsAllowed: boolean;
  propertyType: string;
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
  landlordId: string;
  tenantId: string;
  chatHistory?: ChatMessage[];
  blocked: boolean;
}
interface UpdateProperty extends Property {
  [key: string]: any;
  values: number;
}

interface UpdatePreferences extends Preferences {
  [key: string]: any;
  values: number;
}

const getUsers = async (table: string) => {
  const users: any = await firebase
    .firestore()
    .collection(table)
    .get();
  return users.docs.map((user: any) => ({
    ...user.data(),
    id: user.id
  })) as User[];
};

const getUserById = async (id: string, table: string) => {
  const user: any = await firebase
    .firestore()
    .doc(`${table}/${id}`)
    .get();
  return user.data();
};

const getMatchesByLandlord = async (landlordId: string) => {
  const matches: any = await firebase
    .firestore()
    .collection('matches')
    .where('landlordId', '==', landlordId)
    .get();
  return matches.docs.map((match: any) => ({
    ...match.data(),
    id: match.id
  })) as Match[];
};

const getMatchesByTenant = async (tenantId: string) => {
  const matches: any = await firebase
    .firestore()
    .collection('matches')
    .where('tenantId', '==', tenantId)
    .get();
  return matches.docs.map((match: any) => ({
    ...match.data(),
    id: match.id
  })) as Match[];
};

const addUser = async (id: string, user: User, table: string) => {
  const userRef: any = await firebase
    .firestore()
    .collection(table)
    .doc(id)
    .set(user);
  console.log(`added user to ${table} with id: ${id}`);
  return userRef;
};

const addMatch = async (landlordId: string, tenantId: string) => {
  await firebase
    .firestore()
    .collection('matches')
    .add({
      landlordId,
      tenantId,
      chatHistory: [],
      blocked: false
    })
    .then((ref: any) => {
      console.log('match made, id: ', ref.id);
    });
};

const updateUserContact = async (id: string, user: string, table: string) => {
  const userRef: any = await firebase
    .firestore()
    .collection(table)
    .doc(id);
  await userRef.update(user);
  return userRef.id;
};

const updateProperty = async (id: string, property: UpdateProperty) => {
  const keys: any[] = Object.keys(property).map(
    (key: string) => `property.${key}`
  );
  const values: any[] = Object.values(property);
  const updatedObj: any = {};
  keys.forEach((key, index) => {
    updatedObj[key] = values[index];
  });
  const landlordRef = await firebase
    .firestore()
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
  const values: any[] = Object.values(preferences);
  const updatedObj: any = {};
  keys.forEach((key, index) => {
    updatedObj[key] = values[index];
  });
  const tenantRef = await firebase
    .firestore()
    .collection('tenants')
    .doc(id);
  await tenantRef.update(updatedObj);
  return tenantRef.id;
};

const blockMatch = async (matchId: string) => {
  firebase
    .firestore()
    .collection('matches')
    .doc(matchId)
    .update({ blocked: false });
};

const deleteUserById = async (id: string, table: string) => {
  const value: any = await firebase
    .firestore()
    .collection(table)
    .doc(id)
    .delete();
  console.log(value);
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
