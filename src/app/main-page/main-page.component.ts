import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private authGlobal: GlobalAuth) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();
  }

}
