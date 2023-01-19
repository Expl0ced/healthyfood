export class ordenNutri{
    idOrden:number;
    nombreNutri:string;
    apellidoNutri:string;
    nombreCliente:string;
    apellidoCliente:string;
    idClienteNutri:Number;



    constructor(idOrden:number, nombreNutri:string, apellidoNutri:string, nombreCliente:string, apellidoCliente:string, idClienteNutri:number){
        this.idOrden=idOrden;
        this.nombreNutri=nombreNutri;
        this.apellidoNutri=apellidoNutri;
        this.nombreCliente=nombreCliente;
        this.apellidoCliente=apellidoCliente;
        this.idClienteNutri=idClienteNutri;

    }
}