import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { MessageService } from '../_message';

@Component({
  selector: 'modal-term',
  templateUrl: './modal-term.component.html',
  styleUrls: ['./modal-term.component.css']
})
export class ModalTermComponent implements OnInit {

  constructor(private modalService: ModalService, private messageService: MessageService) { }

  title: string = 'Título não carregado.';
  fileContentStringHtml: string = 'Não foi possivel pegar o conteúdo do termo no servidor...';
  status: string;

  ngOnInit() {
    this.modalService.getLastRentalTerm().subscribe(data => {
      this.title = data.title;
      this.fileContentStringHtml = data.htmlFromFile;
      this.status = data.rentalTermStatus;
    }, error => {
      switch (error.status) {
        case 0:
          this.messageService.error('Ocorreu algum erro com o servidor. Servidor deve estar indisponivel.');
          break;
        case 500:
          this.messageService.error('Erro interno do servidor.');
          break;
        default:
          this.messageService.error('Não foi possivel carregar o termo de locação.')
      }
    });
  }

  closeModalIfOutOfBounds(event) {
    let modal = document.getElementById('modal-termo');

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }

  closeModal() {
    let modal = document.getElementById('modal-termo');
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
  }

  cancelAndClose() {
    const input = document.getElementById('input-termo-locacao') as HTMLInputElement;
    input.checked = false;
    this.closeModal();
  }

  acceptAndClose() {
    const input = document.getElementById('input-termo-locacao') as HTMLInputElement;
    input.checked = true;
    this.closeModal();
  }
}
