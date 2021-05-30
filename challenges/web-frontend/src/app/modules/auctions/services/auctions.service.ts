import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@core/services/base.service';

@Injectable()
export class AuctionsService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }
}
