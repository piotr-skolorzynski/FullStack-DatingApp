import { Gender } from '../enums';

export interface IUser {
  username: string;
  knownAs: string;
  token: string;
  gender: Gender;
  photoUrl?: string;
}
