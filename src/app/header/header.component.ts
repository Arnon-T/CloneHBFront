import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

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

}
