export interface User {
  displayName: string;
  email: string;
  emailVerified?: boolean;
  photoURL: string;
  uid: string;
  phoneNumber?: string;
}

export interface RegisterUserSchema {
  username: string;
  email: string;
  password: string;
}

export interface AuthInput {
  type: string;
  id: string;
  name: string;
  placeholder: string;
}
