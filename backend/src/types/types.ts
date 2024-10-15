export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string | null;
  google_id: string | null;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
