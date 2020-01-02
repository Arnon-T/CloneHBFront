import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

@Component({
  selector: 'app-funcionality-page',
  templateUrl: './funcionality-page.component.html',
  styleUrls: ['./funcionality-page.component.css']
})
export class FuncionalityPageComponent implements OnInit {

  constructor(private authGlobal: GlobalAuth) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();
  }

}
