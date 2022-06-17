import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Documento, DocumentoFiltro } from '../models/documento.model';
import { map } from 'rxjs/operators';
import { TableService } from '../utils/table';
import { Crypto } from '../utils/crypto';

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
  ) { }

  filtrar() {
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
      if (filtro.dataEntrada) {
        if (filtro.dataEntrada.data) {

        } else {
          if (filtro.dataEntrada.de) {

          }
          if (filtro.dataEntrada.ate) {

          }
        }
      }
      if (filtro.orgao) {

      }
      if (filtro.tipoDocumento) {

      }
      if (filtro.numeroDocumento) {

      }
      if (filtro.dataDocumento) {

      }
      if (filtro.resumo) {

      }
      if (filtro.link) {

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

  get(id: number) {
    this.table.loading.next(true);
    return this.http.get(`${this.url}/Documento?id=${id}`)
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
