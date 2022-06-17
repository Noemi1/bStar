import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { Documento } from 'src/app/models/documento.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { Crypto } from 'src/app/utils/crypto';
import { Modal } from 'src/app/utils/modal';
import { TableService } from 'src/app/utils/table';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  loading: boolean = false;
  erro: string = '';
  objeto: Documento = new Documento;
  modalOpen: boolean = false;

  constructor(
    private toastr: ToastrService,
    private crypto: Crypto,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private documentoService: DocumentosService,
    private modal: Modal,

  ) {
    this.modal.getOpen().subscribe(res => this.modalOpen = res);

    this.activatedRoute.params.subscribe(async (res)  =>  {
      this.loading = true;
      this.objeto.id = this.crypto.decrypt(res['id']);

      this.objeto = await lastValueFrom(this.documentoService.get(this.objeto.id))
      this.loading = false;

      setTimeout(() => {
        this.modal.setOpen(true);
      }, 200);

    });
  }

  ngOnInit(): void {
  }

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['']);
		}, 200);
	}

  send(form: NgForm) {

  }

}
