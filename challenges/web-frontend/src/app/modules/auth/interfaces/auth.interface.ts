import { UserTypeEnum } from '@modules/auth/enums/user-type.enum';

export interface Auth {
  token: string;
  userId: string;
  type: UserTypeEnum;
  privileges: string;
}
