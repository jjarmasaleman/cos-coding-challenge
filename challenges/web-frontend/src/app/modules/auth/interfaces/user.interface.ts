import { UserRoleEnum, UserTypeEnum } from '@modules/auth';

export interface User {
  name: string;
  id: string;
  type: UserTypeEnum;
  roles: UserRoleEnum[];
}
