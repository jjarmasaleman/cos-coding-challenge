import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppState, currentUser, Logout } from '@core/state';
import { User } from '@modules/auth';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('overflowMenu') public overflowMenu: ElementRef | undefined;

  public notifications: number;
  public menuVisible: boolean;
  public username: string;

  private unsubscribe: Subject<void>;

  constructor(private store: Store<AppState>) {
    this.notifications = 5;
    this.menuVisible = false;
    this.unsubscribe = new Subject();
    this.username = 'Anonymous';
  }

  public ngOnInit(): void {
    this.store.pipe(select(currentUser), takeUntil(this.unsubscribe)).subscribe((user: User | undefined) => {
      this.username = user?.name ?? 'Anonymous';
    });
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (this.overflowMenu && !this.overflowMenu.nativeElement.contains(event.target)) {
      this.menuVisible = false;
    }
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public openMenu(event: MouseEvent): void {
    this.menuVisible = !this.menuVisible;

    event.stopPropagation();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
