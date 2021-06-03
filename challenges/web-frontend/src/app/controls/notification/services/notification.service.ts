import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { MessageInterface, NotificationComponent } from '@controls/notification';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotification(message = '', duration?: number): MatSnackBarRef<NotificationComponent> {
    return this.snackBar.openFromComponent(NotificationComponent, {
      duration,
      data: { message } as MessageInterface,
      verticalPosition: 'top',
    } as MatSnackBarConfig);
  }

  public close(): void {
    this.snackBar.dismiss();
  }
}
