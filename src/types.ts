export interface IUser {
  email: string;
  password?: string;
  salt?: string;
  name: string;
  _id: string;
}
