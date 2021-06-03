import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { NotificationService } from '@controls/notification';
import { MessageInterface } from '@controls/notification/interfaces/message.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void>;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: MessageInterface,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.notificationService.close();
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
