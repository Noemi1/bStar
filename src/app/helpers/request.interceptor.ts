import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableService } from '../utils/table';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private table: TableService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.table.loading.next(true);
    this.table.resetSelection();
    return next.handle(request).pipe(map(res => {
      return res;
    }));
  }
}
