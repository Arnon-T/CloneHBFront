import { Component, OnInit } from '@angular/core';
import { GlobalAuth } from '../global-auth';

@Component({
  selector: 'app-selectpageimport',
  templateUrl: './selectpageimport.component.html',
  styleUrls: ['./selectpageimport.component.css']
})
export class SelectpageimportComponent implements OnInit {

  constructor( private authGlobal: GlobalAuth) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();
  }

}
