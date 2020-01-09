import { Component, OnInit } from '@angular/core';

import { GlobalAuth } from '../global-auth';
import { AlertService } from '../_alert'
import { MessageService } from '../_message'
import { Router } from '@angular/router';
import { TokenStorage } from '../auth/token-storage';

@Component({
  selector: 'app-aprova-page',
  templateUrl: './aprova-page.component.html',
  styleUrls: ['./aprova-page.component.css'],
  host: {
    '(document:click)': 'closeDropdown($event)',
  },
})
export class AprovaPageComponent implements OnInit {

  constructor(private tokenService: TokenStorage, private alertService: AlertService, private messageService: MessageService, private authGlobal: GlobalAuth, private route: Router) { }

  tipoDefaultName = 'Veículo';
  tipo: string = this.tipoDefaultName;
  tipos = ['Carro', 'Moto', 'Patinete e Bicicleta'];


  priodadeDefaultName = 'Prioridade';
  prioridade: string = this.priodadeDefaultName;
  prioridades = ['PCD', 'Idoso', 'Reside Fora', 'Orefere carona'];

  ngOnInit() {
    this.authGlobal.ngOnInit();

    if (!this.tokenService.getToken()) {
      return this.route.navigate(['/login']).then(() => {
        this.messageService.warn("Você não está autenticado. Favor fazer o login para acessar a página.");
      });
    }
  }

  alert() {
    this.alertService.info("TESTANDO INFORMACAO");
  }

  selectTipoOnDropdown(tipo: string) {
    this.tipos = this.tipos.filter(type => type !== tipo);
    if (this.tipo !== undefined && this.tipo !== this.tipoDefaultName) {
      let tiposArray = [this.tipo, ...this.tipos];
      this.tipos = tiposArray;
    }
    this.tipo = tipo;
    this.openDropdown('dropdown-tipo-veiculo');
  }

  selectPrioridadeOnDropdown(prioridade: string) {
    this.prioridades = this.prioridades.filter(type => type !== prioridade);
    if (this.prioridade !== undefined && this.prioridade !== this.priodadeDefaultName) {
      let tiposArray = [this.prioridade, ...this.prioridades];
      this.prioridades = tiposArray;
    }
    this.prioridade = prioridade;
    this.openDropdown('dropdown-prioridade');
  }

  closeDropdown(event) {
    let dropdownsInHTMLCollection = document.getElementsByClassName('container-area-dropped') as HTMLCollection;
    let target = event.target;

    let divsDropdown = ['container-area', 'dropdown-area', 'svg-box', 'tipo-text', ''];

    for (var i = 0; i < dropdownsInHTMLCollection.length; i++) {
      let element = dropdownsInHTMLCollection[i];
      if (target.className !== element.className && (!divsDropdown.includes(target.className))) {
        if (element.classList.contains('openDropdown')) {
          element.classList.remove('openDropdown')
        }
      }
    }
  }

  openDropdown(divId: string) {
    let divDropdown = document.getElementById(divId);
    divDropdown.classList.toggle('openDropdown');
  }

  vagasSorteadas(){
    this.apr
  }

}
