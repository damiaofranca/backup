export interface LoggedUser {
  admin: boolean;
  email: string;
  name: string;
  perms: string[];
  token: string;
}

export interface StateUser extends LoggedUser {
  isAuthenticated: boolean;
}

export interface AuthProps extends StateUser {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userIsAdmin: () => boolean;
}
