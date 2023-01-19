export class usuario{
    idUser:number;
    Nombre:string;
    Apellido:string;    
    Rol:string;
    Fecha?:Date;
    Password:string;
    Email:string;
    Sintomas:string;
    Img:string;
    Peso:number;
    Peso_Anterior:number;
    Peso_Anterior2:number;
    Altura:number;
    Asignado:string;
    IMC:number;
    IMC_Anterior:number;
    IMC_Anterior2:number;
    Genero:string;


    constructor(idUser:number, Nombre:string, Apellido:string, Rol:string, Password:string, 
        Email:string, Sintomas:string, Img:string, Asignado:string, Peso:number, Altura:number, IMC:number, Genero:string, Peso_Anterior:number, Peso_Anterior2:number, IMC_Anterior2:number, IMC_Anterior:number){

        this.idUser=idUser;
        this.Nombre=Nombre;
        this.Apellido=Apellido;
        this.Rol=Rol;
        this.Fecha=new Date();
        this.Password=Password;
        this.Email=Email;
        this.Sintomas=Sintomas;
        this.Img=Img;
        this.Asignado=Asignado;
        this.Peso=Peso;
        this.Altura=Altura;
        this.IMC=IMC;
        this.Genero=Genero;
        this.Peso_Anterior=Peso_Anterior;
        this.Peso_Anterior2=Peso_Anterior2;
        this.IMC_Anterior=IMC_Anterior,
        this.IMC_Anterior2=IMC_Anterior2

    }
}