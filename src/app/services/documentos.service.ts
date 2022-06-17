import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Documento, DocumentoFiltro } from '../models/documento.model';
import { map } from 'rxjs/operators';
import { TableService } from '../utils/table';
import { Crypto } from '../utils/crypto';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  url: string = environment.url;
  list: BehaviorSubject<Documento[]> = new BehaviorSubject<Documento[]>([]);
  filtro: BehaviorSubject<DocumentoFiltro | undefined> = new BehaviorSubject<DocumentoFiltro | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private table: TableService,
    private crypto: Crypto,
    private datePipe: DatePipe,
  ) { }

  filtrar() {
    console.log(this.filtro.value);
    if (this.filtro.value != undefined) {
      this.table.loading.next(true);

      var filtro = this.filtro.value;
      var list = this.list.value;

      if (filtro.id) {
        var id = filtro.id.toString();
        list = list.filter(x => {
          var idX = x.id.toString();
          return idX == id || idX.includes(id) || id.includes(idX);
        });
      }

      if(filtro.dataDocumento.data) {
        var data = this.datePipe.transform(this.filtro.value.dataDocumento.data, 'dd/MM/yyyy');
        list = list.filter(x => this.datePipe.transform(x.dataDocumento, 'dd/MM/yyyy', 'UTC') == data);
      } else {
        if(filtro.dataDocumento.de != undefined) {
          list = list.filter(x => new Date(new Date(x.dataDocumento).toDateString()) >= new Date(filtro.dataDocumento.de?.toString() ?? ''));
        }
        if(filtro.dataDocumento.ate != undefined) {
          list = list.filter(x => new Date(new Date(x.dataDocumento).toDateString()) <= new Date(filtro.dataDocumento.ate?.toString() ?? ''));
        }
      }
      if(filtro.dataEntrada.data) {
        var data = this.datePipe.transform(this.filtro.value.dataEntrada.data, 'dd/MM/yyyy');
        list = list.filter(x => this.datePipe.transform(x.dataEntrada, 'dd/MM/yyyy', 'UTC') == data);
      } else {
        if(filtro.dataEntrada.de != undefined) {
          list = list.filter(x => new Date(new Date(x.dataEntrada).toDateString()) >= new Date(filtro.dataEntrada.de?.toString() ?? ''));
        }
        if(filtro.dataEntrada.ate != undefined) {
          list = list.filter(x => new Date(new Date(x.dataEntrada).toDateString()) <= new Date(filtro.dataEntrada.ate?.toString() ?? ''));
        }
      }

      if (filtro.orgao?.trim()) {
        var orgao = filtro.orgao?.trim().toLowerCase();
        list = list.filter(x => {
          var string = x.orgao.trim().toLowerCase();
          return string == orgao || string.includes(orgao) || orgao.includes(string)
        });
      }
      if (filtro.tipoDocumento?.trim()) {
        var tipoDocumento = filtro.tipoDocumento?.trim().toLowerCase();
        list = list.filter(x => {
          var string = x.tipoDocumento.trim().toLowerCase();
          return string == tipoDocumento || string.includes(tipoDocumento) || tipoDocumento.includes(string)
        });
      }
      if (filtro.numeroDocumento?.trim()) {
        var numeroDocumento = filtro.numeroDocumento?.trim().toLowerCase();
        list = list.filter(x => {
          var string = x.numeroDocumento.trim().toLowerCase();
          return string == numeroDocumento || string.includes(numeroDocumento) || numeroDocumento.includes(string);
        });
      }
      if (filtro.resumo?.trim()) {
        var resumo = filtro.resumo?.trim().toLowerCase();
        list = list.filter(x => {
          var string = x.resumo.trim().toLowerCase();
          return string == resumo || string.includes(resumo) || resumo.includes(string);
        });
      }
      this.list.next(list);
    }
    this.table.loading.next(false);
  }

  getAll(): Observable<Documento[]>{
    this.table.loading.next(true);
    return this.http.get<Documento[]>(`${this.url}/Documento`)
      .pipe(map(list => {
				list.forEach(item => {
					item.idEncrypted = this.crypto.encrypt(item.id);
					return item
				});

        if (this.filtro.value != undefined) {
          this.filtrar();
        } else {
          this.list.next(list);
          this.table.loading.next(false);
        }

        return list;
      }));
  }

  get(id: number): Observable<Documento> {
    this.table.loading.next(true);
    return this.http.get<Documento>(`${this.url}/Documento/${id}`)
      .pipe(map(res => {
        this.table.loading.next(false);
        return res;
      }));
  }

  create(model: Documento) {
    this.table.loading.next(true);
    return this.http.post(`${this.url}/Documento`, model)
      .pipe(map(res => {
        this.table.loading.next(false);
        return res;
      }));
  }

}
