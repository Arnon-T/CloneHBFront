import { Component, OnInit } from '@angular/core';

import { GlobalAuth } from '../global-auth';
import { AlertService } from '../_alert'
import { MessageService } from '../_message'

@Component({
  selector: 'app-aprova-page',
  templateUrl: './aprova-page.component.html',
  styleUrls: ['./aprova-page.component.css']
})
export class AprovaPageComponent implements OnInit {

  constructor(private authGlobal: GlobalAuth, private messsageService: MessageService, private alertService: AlertService) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();
  }

  alert() {
    this.alertService.info("TESTANDO INFORMACAO");
  }
}
