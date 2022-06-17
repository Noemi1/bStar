import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpResponseBase, HttpHeaderResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TableService } from '../utils/table';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private table: TableService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap((data: any) => {
        this.table.loading.next(false);

        if ([200, 204, 201].includes(data.status)) {
          if (request.method == 'POST' || request.method == 'DELETE' || request.method == 'PUT') {
            if (request.method == 'POST') {
              this.toastr.success('Operação concluída com sucesso');
            }
            if (request.method == 'DELETE') {
              this.toastr.success('Registro excluído com sucesso');
            }
            if (request.method == 'PUT') {
              this.toastr.success('Registro atualizado com sucesso');
            }
            this.table.resetSelection();
          }
        }
      }),
      catchError(err => {
        this.table.loading.next(false);
        return throwError(err);
      }))
  }
}
