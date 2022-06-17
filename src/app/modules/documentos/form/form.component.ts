import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Documento } from 'src/app/models/documento.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { Crypto } from 'src/app/utils/crypto';
import { Modal } from 'src/app/utils/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

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
    this.activatedRoute.url.subscribe(res => {
      console.log(res)

    });
    console.log(this.activatedRoute.snapshot)
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
