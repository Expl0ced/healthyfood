export class Item{
    encabezado:string;
    ingredientes:string;
    preparacion:string;
    detalles:string;
    etiqueta:string;
    imagen:string;
    notas:string;
    id:string




    constructor(encabezado:string, ingredientes:string, preparacion:string, detalles:string, etiqueta:string, imagen:string, id:string, notas:string){
        this.id=id;
        this.encabezado=encabezado;
        this.ingredientes=ingredientes;
        this.preparacion=preparacion;
        this.detalles=detalles;
        this.etiqueta=etiqueta;
        this.imagen=imagen;
        this.notas=notas

    }
}