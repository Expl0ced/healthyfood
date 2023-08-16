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
    Altura:number;
    Asignado:string;
    IMC:number;
    Genero:string;
    Contex_Fisica:string;


    constructor(idUser:number, Nombre:string, Apellido:string, Rol:string, Password:string, 
        Email:string, Sintomas:string, Img:string, Asignado:string, Peso:number, Altura:number, IMC:number, Genero:string, Contex_Fisica:string){

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
        this.Contex_Fisica=Contex_Fisica

    }
}