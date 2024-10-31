export class factura {
    factura_id : string;
    factura_fechaemision: Date;
    factura_fechavencimiento: Date;
    factura_montototal: number;
    tipo_tasa: string;
    tasa_porcentaje:  number;
    factura_capitalizacion: string;
    Empresa_empresa_id: string;
    Cliente_cliente_id: string;

    constructor(factura_id:string, factura_fechaemision: Date, factura_fechavencimiento: Date, factura_montototal: number,tipo_tasa: string,
    tasa_porcentaje: number, factura_capitalizacion: string, Empresa_empresa_id: string, Cliente_cliente_id: string){
        this.factura_id=factura_id;
        this.factura_fechaemision=factura_fechaemision;
        this.factura_fechavencimiento=factura_fechavencimiento;
        this.factura_montototal=factura_montototal;
        this.tipo_tasa=tipo_tasa;
        this.tasa_porcentaje=tasa_porcentaje;
        this.factura_capitalizacion=factura_capitalizacion;
        this.Empresa_empresa_id=Empresa_empresa_id;
        this.Cliente_cliente_id=Cliente_cliente_id
        }
  }