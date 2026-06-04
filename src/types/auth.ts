// register =====
// register payload
export interface RegisterPayload {
  email: string;
  password: string;
}

// backend success response
export interface RegisterResponse {
  token: string;
}

// backend error response
export interface RegisterError {
  message: string;
  error: string;
  statusCode: number;
}

// login =====
// login payload
export interface LoginPayload {
  email: string;
  password: string;
}

// success response
export interface LoginSuccessResponse {
  success: boolean;
  message: string;
}

// error response
export interface LoginErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

// current user info (me endpoint)
export interface CurrentUser {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
