import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@core/services/base.service';

@Injectable()
export class AuthService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }
}
