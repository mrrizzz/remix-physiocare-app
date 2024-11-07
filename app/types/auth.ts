export interface UserData {
  id: number;
  email: string;
  role: string;
  username: string;
  iat: number;
  exp: number;
}
export type LoaderData = {
  token: string;
};
