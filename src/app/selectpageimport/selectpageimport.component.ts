import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { GlobalAuth } from '../global-auth';

import { TokenStorage } from '../auth/token-storage';
import { MessageService } from '../_message';

@Component({
  selector: 'app-selectpageimport',
  templateUrl: './selectpageimport.component.html',
  styleUrls: ['./selectpageimport.component.css']
})
export class SelectpageimportComponent implements OnInit {

  constructor( private authGlobal: GlobalAuth, private tokenService: TokenStorage, private messageService: MessageService, private route: Router) { }

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }
  }

}
