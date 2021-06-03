import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { UtilsService } from '@core/services/utils.service';
import { api } from '@globals/api';
import { UserRoleEnum } from '@modules/auth/enums/user-role.enum';
import { Auth } from '@modules/auth/interfaces/auth.interface';
import { User } from '@modules/auth/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  public login(username: string, password: string): Observable<Auth> {
    // The given password needs to be provided in hashed form (5 times iteratively hashed with SHA 512)
    const hashedPassword = UtilsService.sha512(password, 5);
    const url = UtilsService.formatString(api.auth.login, username);

    return this.put<Auth>(url, { password: hashedPassword });
  }

  public parseUser(auth: Auth): User {
    const userRoles = this.getUserRoles(auth.privileges);
    const userDisplayName = AuthService.getUserDisplayName(userRoles);

    return {
      name: userDisplayName,
      id: auth.userId,
      type: auth.type,
      roles: userRoles,
    } as User;
  }

  private getUserRoles(privileges: string): UserRoleEnum[] {
    const privilegesList: string[] = privileges.split('~');
    const userRoles: UserRoleEnum[] = [];

    privilegesList.forEach((privilege) => {
      switch (privilege) {
        case '{DEALERSHIP_USER}':
          userRoles.push(UserRoleEnum.Dealership);
          break;
        case '{SALESMAN_USER}':
          userRoles.push(UserRoleEnum.Salesman);
          break;
        case '{PUBLIC_USER}':
          userRoles.push(UserRoleEnum.Public);
          break;
      }
    });

    return userRoles;
  }

  private static getUserDisplayName(roles: UserRoleEnum[]): string {
    if (roles.includes(UserRoleEnum.Salesman)) {
      return 'Salesman';
    }

    if (roles.includes(UserRoleEnum.Buyer)) {
      return 'Buyer';
    }

    if (roles.includes(UserRoleEnum.Dealership)) {
      return 'Dealership';
    }

    return 'Unknown';
  }
}
