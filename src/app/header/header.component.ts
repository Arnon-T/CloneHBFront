import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

import { MessageService } from '../_message';
import { TokenStorage } from '../auth/token-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authGlobal: GlobalAuth) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();
  }

  logout() {
    this.authGlobal.logout();
  }
}
