import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DocumentoFiltro } from 'src/app/models/documento.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { Modal } from 'src/app/utils/modal';
import { TableService } from 'src/app/utils/table';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
	modalOpen = false;
	filtro: DocumentoFiltro = new DocumentoFiltro;
	erro: any[] = [];
	loading = false;
	subscription: Subscription[] = [];

	constructor(
		private router: Router,
		private toastr: ToastrService,
		private modal: Modal,
		public documentoService: DocumentosService,
    private table: TableService
	) {
		let getOpen = this.modal.getOpen().subscribe(res => {
			this.modalOpen = res;
		});
		documentoService.filtro.subscribe(res => {
			this.filtro = res ?? new DocumentoFiltro;
		});

		this.subscription.push(getOpen)
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.setOpen(true);
		}, 200);
	}

	ngOnDestroy() {
		this.subscription.forEach(subs => {
			subs.unsubscribe()
		});
	}

	voltar() {
		this.modal.setOpen(false);
		setTimeout(() => {
			this.router.navigate(['']);
		}, 200);
	}

  filtrar() {
    if (
      !this.filtro.id &&
      !this.filtro.numeroDocumento?.trim() &&
      !this.filtro.tipoDocumento?.trim() &&
      !this.filtro.orgao?.trim() &&
      !this.filtro.resumo?.trim() &&
      !this.filtro.dataDocumento?.de &&
      !this.filtro.dataDocumento?.ate &&
      !this.filtro.dataDocumento?.data &&
      !this.filtro.dataEntrada?.de &&
      !this.filtro.dataEntrada?.ate &&
      !this.filtro.dataEntrada?.data
    ) {
      this.limparFiltro();
    }
    this.documentoService.filtro.next(this.filtro)
    this.aplicarFiltro();
  }

	limparFiltro() {
		this.documentoService.filtro.next(undefined);
		this.aplicarFiltro();
	}

	aplicarFiltro() {
		this.loading = true;
    this.table.resetSelection();
		this.documentoService.getAll().toPromise().then(
			res => {
				this.loading = false;
				this.voltar()
			},
			err => {
				this.toastr.error('Não foi possível carregar a listagem');
				this.loading = false;
			}
		)
	}
}
