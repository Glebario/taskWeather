export interface userLogin {
  email: string
  password: string
}

export interface userRegister {
  email: string
  password: string
  profile: {
    city: string
    userName: string
  }
}

export interface user {
  localId: string
  profile: {
    city: string
    userName: string
  }
}

export interface authResponse {
  token: string
  userResponse: user
}

export class errorResponse {
  status: number;
  error: {
    message: string
  }
}


