export interface UserResponse {
  id: number | null;
  username: string;
  email: string;
  is_admin: boolean;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
