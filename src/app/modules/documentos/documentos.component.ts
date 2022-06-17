import { CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { faArrowDown, faChevronLeft, faEllipsisV, faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Documento, DocumentoFiltro } from 'src/app/models/documento.model';
import { DocumentosService } from 'src/app/services/documentos.service';
import { MaskType, TableCols, TableService } from 'src/app/utils/table';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit, OnDestroy, AfterViewInit {

  faChevronLeft = faChevronLeft;
  faFilter = faFilter;
  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faPlus = faPlus;
  faArrowDown = faArrowDown;

  list: Documento[] = [];
  loading: boolean = false;
  cols: TableCols[] = [];
  selected?: Documento;
  selectedItems: Documento[] = [];
  subscription: Subscription[] = [];
  filters: string[] = [];
  filtro: DocumentoFiltro = new DocumentoFiltro;

  constructor(
    private documentoService: DocumentosService,
    private toastr: ToastrService,
    private table: TableService,
    private datePipe: DatePipe,
  ) {
    this.documentoService.list.subscribe(res => this.list = res);
    this.documentoService.getAll().subscribe();
    this.table.loading.subscribe(res => {
      this.loading = res;
    });

    var selected = this.table.selected.subscribe(res => this.selected = res);
    this.subscription.push(selected);

    var selectedItems = this.table.selectedItems.subscribe(res => this.selectedItems = res);
    this.subscription.push(selectedItems);

    this.cols = [
      { title: 'Id', field: 'id', filterType: 'text', maskType: MaskType.none },
      { title: 'Data Entrada', field: 'dataEntrada', filterType: 'date', maskType: MaskType.date },
      { title: 'Orgão Emissor', field: 'orgao', filterType: 'text', maskType: MaskType.none },
      { title: 'Tipo', field: 'tipoDocumento', filterType: 'text', maskType: MaskType.none },
      { title: 'Número', field: 'numeroDocumento', filterType: 'text', maskType: MaskType.none },
      { title: 'Data Documento', field: 'dataDocumento', filterType: 'date', maskType: MaskType.date },
      { title: 'Resumo', field: 'resumo', filterType: 'text', maskType: MaskType.none },
      { title: 'Link', field: 'link', filterType: 'text', maskType: MaskType.none },
      // { title: 'Link Teste', field: 'link', filterType: 'text', maskType: MaskType.none },
      // { title: 'Link Teste 1', field: 'link', filterType: 'text', maskType: MaskType.none },
      // { title: 'Link Teste 2', field: 'link', filterType: 'text', maskType: MaskType.none },
    ];
    this.filters = this.cols.map(x => x.field);


  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
		this.table.filter_position_on_table_scroll();
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => {
      subs.unsubscribe();
    });
    this.table.resetSelection();
  }

  onRowSelect(data: any) {
    this.table.onRowSelect(data);
  }

  onRowUnselect(row: any) {
    this.table.onRowUnselect(row)
  }

  @HostListener('window:keydown', ['$event'])
  copiarFromKeyboard($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 67) {
      if (this.selectedItems.length > 0) {
        this.copiarLinha(this.selectedItems);
      }
    }
  }

  copiar(item: Documento) {
    var cols = this.cols.map(x => x.title) as string[];
    this.table.copiarLinha(cols, item);
  }

  copiarLinha(items: Documento[]) {
    items = items.sort((x, y) => x.id - y.id);
    var cols = this.cols.map(x => x.title)
    var rows = items.map(item => ({
      id: item.id ? item.id : '-',
      dataEntrada: item.dataEntrada ? this.datePipe.transform(item.dataEntrada?.toString(), 'dd/MM/yyyy', 'UTC') : '-',
      orgao: item.orgao ? item.orgao : '-',
      tipoDocumento: item.tipoDocumento ? item.tipoDocumento : '-',
      numeroDocumento: item.numeroDocumento ? item.numeroDocumento : '-',
      dataDocumento: item.dataDocumento ? this.datePipe.transform(item.dataDocumento?.toString(), 'dd/MM/yyyy', 'UTC') : '-',
      resumo: item.resumo ? item.resumo : '-',
      link: item.link ? item.link : '-',
    }));
    this.table.copiarLinhas(cols, rows);
  }


  filtrar() {
    if (
      !this.filtro.id &&
      !this.filtro.numeroDocumento?.trim() &&
      !this.filtro.tipoDocumento?.trim() &&
      !this.filtro.orgao?.trim() &&
      !this.filtro.resumo?.trim() &&
      !this.filtro.link?.trim() &&
      !this.filtro.dataDocumento.de &&
      !this.filtro.dataDocumento.ate &&
      !this.filtro.dataDocumento.data &&
      !this.filtro.dataEntrada.de &&
      !this.filtro.dataEntrada.ate &&
      !this.filtro.dataEntrada.data
    ) {
      // this.limparFiltro();
      this.documentoService.filtro.next(undefined);
    } else {
      this.documentoService.filtro.next(this.filtro)
    }
    this.aplicarFiltro();
  }


    aplicarFiltro() {
      this.documentoService.getAll().toPromise().then(
        res => {
        this.table.close_filter();
      },
      err => {
        console.error(err);
        this.toastr.error('Não foi possível carregar a listagem')
      }
    )
  }

}
