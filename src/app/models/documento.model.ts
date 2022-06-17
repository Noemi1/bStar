export class Documento {
  idEncrypted: string = '';
  id: number = 0;
  orgao: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  dataEntrada: Date = new Date;
  dataEntradaFormatted: string = '';
  dataDocumento: Date = new Date;
  dataDocumentoFormatted: string = '';
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
}


export class FiltroData {
  data?: Date;
  de?: Date;
  ate?: Date;
}
