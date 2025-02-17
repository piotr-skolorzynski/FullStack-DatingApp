import { Gender } from '../enums';
import { IUser } from '../interfaces';

export class UserParams {
  gender: Gender;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;

  constructor(user: IUser | null) {
    this.gender = user?.gender === Gender.Female ? Gender.Male : Gender.Female;
  }
}
