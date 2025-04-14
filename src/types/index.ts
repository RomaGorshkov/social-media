export interface User {
  user: null | {
    username: string;
    email: string;
    password: string;
    image?: string;
    id?: string;
    rememberMe?: boolean;
    isAuthenticated: boolean;
  };
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
