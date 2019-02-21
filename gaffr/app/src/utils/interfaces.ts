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
interface UserWithProperty extends User {
  property: Property;
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
export {
  UpdatePreferences,
  User,
  Match,
  Property,
  Preferences,
  ChatMessage,
  UserWithProperty
};
