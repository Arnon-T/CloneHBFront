import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

@Component({
  selector: 'app-functionality-button-area',
  templateUrl: './functionality-button-area.component.html',
  styleUrls: ['./functionality-button-area.component.css']
})
export class FunctionalityButtonAreaComponent implements OnInit {

  constructor(private authGlobal: GlobalAuth) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();
  }

}
