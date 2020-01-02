import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message, AlertType } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: 'message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() id: string;

  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.onAlert(this.id)
      .subscribe(message => {
        if (!message.message) {
          this.messages = [];
          return;
        }

        this.messages.push(message);
        setTimeout(() => this.removeAlert(message), 5000);
      });
  }

  removeAlert(message: Message) {
    this.messages = this.messages.filter(x => x !== message);
  }

  cssClass(message: Message) {
    if (!message) {
      return;
    }

    switch (message.type) {
      case AlertType.Success:
        return 'message message-success';
      case AlertType.Error:
        return 'message message-danger';
      case AlertType.Info:
        return 'message message-info';
      case AlertType.Warning:
        return 'message message-warning';
    }
  }
}
