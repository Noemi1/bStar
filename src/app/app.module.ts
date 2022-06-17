import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentosComponent } from './modules/documentos/documentos.component';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule, TableService } from 'primeng/table';
import { FiltroComponent } from './modules/documentos/filtro/filtro.component';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RequestInterceptor } from './helpers/request.interceptor';
import { ResponseInterceptor } from './helpers/response.interceptor';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
        timeOut: 8000
      }),
    TableModule,
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    // TableService
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // {provide: LOCALE_ID, useValue: 'en-US'},
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private config: PrimeNGConfig

  ) {
    this.config.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contem',
      notContains: 'Não contem',
      endsWith: 'Termina com',
      equals: 'Igual a',
      notEquals: 'Diferente de',
      noFilter: 'Sem filtro',
      // lt: '',
      // lte: '',
      // gt: '',
      // gte: '',
      // is: '',
      // isNot: '',
      // before: '',
      // after: '',
      // dateIs: '',
      // dateIsNot: '',
      // dateBefore: '',
      // dateAfter: '',
      clear: 'Limpar filtro',
      apply: 'Filtrar',
      matchAll: 'Filtrar todos',
      matchAny: 'Filtrar qualquer um',
      addRule: 'Adicionar filtro',
      removeRule: 'Remover filtro',
      // accept: '',
      // reject: '',
      // choose: '',
      // upload: '',
      // cancel: '',
      // dayNames: [],
      // dayNamesShort: [],
      // dayNamesMin: [],
      // monthNames: [],
      // monthNamesShort: [],
      // dateFormat: '',
      // today: '',
      // weekHeader: '',
      weak: 'Fraca',
      medium: 'Média',
      strong: 'Forte',
      // passwordPrompt: '',
      emptyMessage: 'Nenhum resultado encontrado',
      emptyFilterMessage: 'Nenhum resultado encontrado',
    })
    this.config.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS
      ]
    }

  }
}
