// login and register payloads
export interface AuthPayload {
  email: string;
  password: string;
}

// login & register success response
export interface AuthSuccessResponse {
  success: boolean;
  message: string;
}

// login & register error response
export interface AuthErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

// current user info (me endpoint)
export interface CurrentUser {
  _id: string;
  email: string;
  username?: string;
  createdAt: string;
  updatedAt: string;
}
