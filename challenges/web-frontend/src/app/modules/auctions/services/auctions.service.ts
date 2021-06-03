import { Injectable, Injector } from '@angular/core';
import { BaseService } from '@core/services/base.service';
import { UtilsService } from '@core/services/utils.service';
import { api } from '@globals/api';
import { BuyerAuctions } from '@modules/auctions';
import { Observable } from 'rxjs';

@Injectable()
export class AuctionsService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  public getAuctions(): Observable<BuyerAuctions> {
    const url = UtilsService.formatString(api.data.auctions, 'false');

    return this.get<BuyerAuctions>(url);
  }
}
