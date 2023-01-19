export class orden{
    idNutri:number;
    nombreNutri:string;
    apellidoNutri:string;
    nombreCliente:string;
    apellidoCliente:string;
    idClienteNutri:number;



    constructor(idNutri:number, nombreNutri:string, apellidoNutri:string, 
                nombreCliente:string, apellidoCliente:string, idClienteNutri:number){
                    this.idNutri=idNutri;
                    this.nombreNutri=nombreNutri
                    this.apellidoNutri=apellidoNutri
                    this.nombreCliente=nombreCliente
                    this.apellidoCliente=apellidoCliente
                    this.idClienteNutri=idClienteNutri
                }
}
