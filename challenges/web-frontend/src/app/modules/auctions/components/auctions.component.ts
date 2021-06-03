import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardInterface } from '@controls/card';
import { NotificationService } from '@controls/notification';
import { UtilsService } from '@core/services/utils.service';
import { AuthState, currentUser } from '@core/state';
import { Auction, AuctionsService, BuyerAuctions, FuelTypeEnum, TransmissionTypeEnum } from '@modules/auctions';
import { User } from '@modules/auth';
import { select, Store } from '@ngrx/store';
import { Subject, timer } from 'rxjs';
import { retry, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss'],
})
export class AuctionsComponent implements OnInit, OnDestroy {
  private static readonly REFRESH_DELAY = 20000;

  public auctionList: CardInterface[];

  private readonly randomSeed: number;
  private user: User | undefined;
  private unsubscribe: Subject<void>;

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private notificationsService: NotificationService,
    private auctionService: AuctionsService
  ) {
    this.unsubscribe = new Subject();
    this.auctionList = [];

    this.randomSeed = UtilsService.getRandomNumber(1, 10);
  }

  public ngOnInit(): void {
    this.store.pipe(select(currentUser), takeUntil(this.unsubscribe)).subscribe((user: User | undefined) => {
      this.user = user;
    });

    if (window.history.state.alreadyLoggedIn) {
      const message = UtilsService.formatString('User "{0}" already signed in', this.user?.name ?? 'Unknown');

      this.notificationsService.showNotification(message, 3000);
    }

    timer(1, AuctionsComponent.REFRESH_DELAY)
      .pipe(
        switchMap(() => this.auctionService.getAuctions()),
        retry(),
        takeUntil(this.unsubscribe)
      )
      .subscribe((data: BuyerAuctions) => {
        this.parseDataToCard(data.items);
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private static getFuelType(fuelType: number): string {
    switch (fuelType) {
      case FuelTypeEnum.Gasoline:
        return 'Gasoline';
      case FuelTypeEnum.Diesel:
        return 'Diesel';
      case FuelTypeEnum.BioDiesel:
        return 'Bio-Diesel';
      case FuelTypeEnum.Ethanol:
        return 'Ethanol';
      case FuelTypeEnum.Electric:
        return 'Electric';
      default:
        return '-';
    }
  }

  private static getTransmissionType(transmissionType: number): string {
    switch (transmissionType) {
      case TransmissionTypeEnum.Manual:
        return 'Manual';
      case TransmissionTypeEnum.Automatic:
        return 'Automatic';
      case TransmissionTypeEnum.SemiAutomatic:
        return 'Semi-automatic';
      case TransmissionTypeEnum.CVT:
        return 'CVT';
      default:
        return '-';
    }
  }

  private parseDataToCard(data: Auction[]) {
    this.auctionList = [];

    if (data) {
      data.forEach((auction) => {
        this.auctionList.push({
          label: auction.label.split(' [')[0],
          vehicleImagePath: UtilsService.getVehicleImage(auction.id, this.randomSeed),
          firstRegistration: auction.associatedVehicle.ez,
          mileage: auction.associatedVehicle.mileageInKm,
          fuelType: AuctionsComponent.getFuelType(auction.associatedVehicle.fuelType),
          transmissionType: AuctionsComponent.getTransmissionType(auction.associatedVehicle.transmission),
          remainingTime: UtilsService.formatTime(auction.remainingTimeInSeconds),
          highestBid: auction.currentHighestBidValue,
          isHighestBidder: auction.amIHighestBidder,
          highlightTime: auction.remainingTimeInSeconds < 1800,
        } as CardInterface);
      });
    }
  }
}
