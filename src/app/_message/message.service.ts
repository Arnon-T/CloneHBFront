import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Message, AlertType } from './message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<Message>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  onAlert(alertId?: string): Observable<Message> {
    return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }

  success(message: string, alertId?: string) {
    this.message(new Message({ message, type: AlertType.Success, alertId }));
  }

  error(message: string, alertId?: string) {
    this.message(new Message({ message, type: AlertType.Error, alertId }));
  }

  info(message: string, alertId?: string) {
    this.message(new Message({ message, type: AlertType.Info, alertId }));
  }

  warn(message: string, alertId?: string) {
    this.message(new Message({ message, type: AlertType.Warning, alertId }));
  }

  message(message: Message) {
    this.keepAfterRouteChange = message.keepAfterRouteChange;
    this.subject.next(message);
  }

  clear(alertId?: string) {
    this.subject.next(new Message({ alertId }));
  }
}
