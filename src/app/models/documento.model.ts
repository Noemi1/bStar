export class Documento {
  idEncrypted: string = '';
  id: number = 0;
  dataEntrada: Date = new Date;
  orgao: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  dataDocumento: Date = new Date;
  resumo: string = '';
  link: string = '';
}

export class DocumentoFiltro {
  id?: number;
  dataEntrada: FiltroData = new FiltroData;
  orgao?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  dataDocumento: FiltroData = new FiltroData;
  resumo?: string;
  link?: string;
}


export class FiltroData {
  data?: Date;
  de?: Date;
  ate?: Date;
}
