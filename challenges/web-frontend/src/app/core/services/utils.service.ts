import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';

@Injectable()
export class UtilsService {
  public static formatString(formatString: string, ...replacement: string[]): string {
    const args = replacement;

    return formatString.replace(/{(\d+)}/g, (match, placeholder) => {
      return typeof args[placeholder] !== 'undefined' ? args[placeholder] : match;
    });
  }

  public static formatTime(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  public static sha512(source: string, count = 0): string {
    if (count > 0) {
      return this.sha512(sha512(source), count - 1);
    }

    return source;
  }

  public static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getVehicleImage(base: number, seed: number): string {
    // Emulates the case where no image is available
    const random = this.getRandomNumber(1, 100);
    if (random === 100) {
      return UtilsService.formatString('assets/images/no_vehicle.jpg');
    }

    return UtilsService.formatString('assets/images/vehicle_{0}.jpg', ((base + seed) % 8).toString());
  }
}
