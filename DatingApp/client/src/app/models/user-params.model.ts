import { Gender } from '../enums';
import { IUser } from '../interfaces';

export class UserParams {
  public gender: Gender;
  public minAge = 18;
  public maxAge = 99;
  public pageNumber = 1;
  public pageSize = 5;
  public orderBy = 'lastActive';

  constructor(user: IUser | null) {
    this.gender = user?.gender === Gender.Female ? Gender.Male : Gender.Female;
  }
}
