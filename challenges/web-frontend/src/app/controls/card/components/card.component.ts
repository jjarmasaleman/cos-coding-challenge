import { Component, Input } from '@angular/core';
import { CardInterface } from '@controls/card/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() public data: CardInterface | undefined;

  get vehicle(): CardInterface {
    return (
      this.data ??
      ({
        label: 'Unknown',
        vehicleImagePath: 'assets/images/no_vehicle.jpg',
        firstRegistration: '-',
        mileage: 0,
        fuelType: '-',
        transmissionType: '-',
        remainingTime: '00:00:00',
        highestBid: 0,
        isHighestBidder: false,
        highlightTime: false,
      } as CardInterface)
    );
  }
}
