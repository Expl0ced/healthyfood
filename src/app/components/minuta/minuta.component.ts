import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { ListaUsersService } from 'src/app/services/lista-users.service';
import Swal from 'sweetalert2';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Subscription } from 'rxjs';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-minuta',
  templateUrl: './minuta.component.html',
  styleUrls: ['./minuta.component.css']
})
export class MinutaComponent {

  private newLabel?= 'New label';

  title = 'fileUpload';
  images = '';
  imgURL = '/assets/noimage.png';
  multipleImages = [];
  imagenes: any = [];
  nombre: any = localStorage.getItem('Nombre');
  apellido: any = localStorage.getItem('Apellido');
  userid: any = localStorage.getItem('idUser');
  rol: any = localStorage.getItem('Rol')
  formato: any = ['.doc', '.pdf', '.xlsx', '.txt', '.csv', '.rar', '.zip']
  user = {
    idUser: 0,
    Nombre: "",
    Apellido: "",
    Rol: "",
    Email: "",
    Password: "",
    Sintomas: "",
    Img: "",
    Asignado: "",
    Peso: 0,
    Peso_Anterior: 0,
    Peso_Anterior2: 0,
    Altura: 0,
    IMC: 0,
    IMC_Anterior:0,
    IMC_Anterior2:0,
    Contex_Fisica:'',
    Genero: ''
  }
  navigationSubscription?: Subscription;
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  // view: [number, number, number] = [this.user.Peso, this.user.Peso_Anterior, this.user.Peso_Anterior2];
  multi?: any[] = [this.user.Peso, this.user.Peso_Anterior, this.user.Peso_Anterior2];
  view: any[] = [700, 300];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private http: HttpClient, private activerouter: ActivatedRoute, private usuario: ListaUsersService, 
    private router: Router, public changeDetector: ChangeDetectorRef,  private storage: Storage) {
  }

  usuarioa: any = this.activerouter.snapshot.paramMap.get('id')
  nombrea: any = this.activerouter.snapshot.paramMap.get('nombre')
  apellidoa: any = this.activerouter.snapshot.paramMap.get('apellido')

  primer_registro: any = localStorage.getItem('PesoA2')
  segundo_registro: any = localStorage.getItem('PesoA')
  registro_actual: any = localStorage.getItem('Peso')

  primer_IMC: any = localStorage.getItem('IMCA2')
  segundo_IMC: any = localStorage.getItem('IMCA')
  IMC_actual: any = localStorage.getItem('IMC')

  cantidad_archivos:any

  today: Date = new Date();
  pipe = new DatePipe('en_US');
  todayWithPipe = null;

  url_ = '/' + this.usuarioa + '/' + this.nombrea + '/' + this.apellidoa
  // this.primer_registro, this.segundo_registro, this.registro_actual

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.obtenerUser()
    this.getFileCount()
  }


  obtenerUser() {
    this.usuario.getusuario(this.usuarioa).subscribe((res: any) => {
      this.user = res
      console.log(this.user)
      const imc:any=this.user.IMC
      localStorage.setItem('IMC',imc)
      
    })
  }
  getFileCount(){
    this.usuario.countFile(this.usuarioa).subscribe((res:any)=>{
      this.cantidad_archivos=res[0]
      console.log(this.cantidad_archivos)
    })
  }



  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      }
      this.images = file;
      console.log(this.images)
    }
  }

  Recibe_imgMinuta(event: any) {
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `minutas/${this.userid} ${this.nombre} ${this.apellido}/${this.usuarioa} ${this.nombrea} ${this.apellidoa}/${file.name}`)

    uploadBytes(imgRef, file).then(async x => {
      const url = await getDownloadURL(imgRef)
      this.images = url
      console.log(this.images)
      return this.images
    }).catch(error => console.log(error))
  }
  subirMinuta(){
    const files ={
      nombre: `${this.usuarioa} ${this.nombrea} ${this.apellidoa}`,
      imagen:this.images,
      fecha_creacion:this.pipe.transform(Date.now(), 'dd/MM/yyyy'),
      idUser:this.usuarioa,
      nutri_n:localStorage.getItem('Nombre'),
      nutri_ape:localStorage.getItem('Apellido')
    }
    console.log(files)
    this.usuario.subirArchivo(files).subscribe((res:any)=>{
      console.log(res)
    })
  } 


  onSubmit(idUser: any) {
    const formData = new FormData();
    formData.append('file', this.images);
    formData.append('idUser', idUser);
    formData.append('nombre', this.nombrea);
    formData.append('apellido', this.apellidoa);


    this.http.post<any>('http://localhost:3300/file', formData).subscribe(
      (res) => console.log(res, Swal.fire({
        icon: 'success',
        title: 'Imagen cargada!!',
        text: 'La imagen se subio correctamente!'
      }).then((result) => {
        if (result) {
          location.reload();
        }
      })
      ),
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no subio nada!!'
      })
    );
    this.imgURL = '/assets/noimage.png';
  }
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      '',
      '',
      'Registro Actual'
    ],
    datasets: [
      {
        data: [ this.primer_registro, this.segundo_registro,  this.registro_actual],
        label: 'Peso',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'yellow'
      }
    ]
  };
  public lineChartDataIMC: ChartConfiguration<'line'>['data'] = {
    labels: [
      '',
      '',
      'IMC Actual'
    ],
    datasets: [
      {
        data: [this.primer_IMC, this.segundo_IMC, this.IMC_actual],
        label: 'IMC',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0, 255, 0, 0.5)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  cleanPeso() {
    localStorage.removeItem('Peso')
    localStorage.removeItem('PesoA')
    localStorage.removeItem('PesoA2')

    localStorage.removeItem('IMC')
    localStorage.removeItem('IMCA')
    localStorage.removeItem('IMCA2')
  }
}
function moment() {
  throw new Error('Function not implemented.');
}

