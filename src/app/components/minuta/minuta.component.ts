import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { ListaUsersService } from 'src/app/services/lista-users.service';
import Swal from 'sweetalert2';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from "chart.js";
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
    Altura: 0,
    IMC: 0,
    Contex_Fisica: '',
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
  view: any[] = [700, 300];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  chartInstance: any;
  chartCanvas: any;
  cdRef: any;

  imcScore: any = []

  constructor(private http: HttpClient, private activerouter: ActivatedRoute, private usuario: ListaUsersService,
    private router: Router, public changeDetector: ChangeDetectorRef, private storage: Storage) {
  }

  usuarioa: any = this.activerouter.snapshot.paramMap.get('id')
  nombrea: any = this.activerouter.snapshot.paramMap.get('nombre')
  apellidoa: any = this.activerouter.snapshot.paramMap.get('apellido')


  cantidad_archivos: any

  today: Date = new Date();
  pipe = new DatePipe('en_US');
  todayWithPipe = null;

  peso_hist: any = localStorage.getItem('datosPesoHistorico')
  peso_array = this.peso_hist.split(',')

  recordPeso: any = []
  imc_hist: any = localStorage.getItem('datosIMCHistorico')
  IMC_array = this.imc_hist.split(',')

  minpeso=Math.min(...this.peso_array)
  maxpeso=Math.max(...this.peso_array)
  minimc=Math.min(...this.IMC_array)
  maximc=Math.max(...this.IMC_array)

  url_ = '/' + this.usuarioa + '/' + this.nombrea + '/' + this.apellidoa
  // this.primer_registro, this.segundo_registro, this.registro_actual

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.obtenerUser()
    this.getFileCount()
    console.log(this.IMC_array, 'IMC')
    console.log(this.peso_array, 'pesos')

    this.obtenerIMC_historico()
    this.obtenerPeso_historico()
  }


  obtenerUser() {
    this.usuario.getusuario(this.usuarioa).subscribe((res: any) => {
      this.user = res
      console.log(this.user)
    })
  }
  getFileCount() {
    this.usuario.countFile(this.usuarioa).subscribe((res: any) => {
      this.cantidad_archivos = res[0]
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
  subirMinuta() {
    const files = {
      nombre: `${this.usuarioa} ${this.nombrea} ${this.apellidoa}`,
      imagen: this.images,
      fecha_creacion: this.pipe.transform(Date.now(), 'dd/MM/yyyy'),
      idUser: this.usuarioa,
      nutri_n: localStorage.getItem('Nombre'),
      nutri_ape: localStorage.getItem('Apellido')
    }
    console.log(files)
    this.usuario.subirArchivo(files).subscribe((res: any) => {
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
      '', '', '', '', '', '', '', '', '', '',
      'Registro Actual'
    ],
    datasets: [
      {
        data: [this.peso_array[0], this.peso_array[1], this.peso_array[2], this.peso_array[3], this.peso_array[4], this.peso_array[5], this.peso_array[6], this.peso_array[7], this.peso_array[8], this.peso_array[9], this.peso_array[10], this.peso_array[11], this.peso_array[12]],
        label: 'Cambios en el Peso',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'yellow'
      }
    ]
  };

  // obtenerPeso_historico() {
  //   this.usuario.getPeso_hist(this.usuarioa).subscribe((res: any) => {
  //     this.peso_hist = res;
  //     console.log(this.peso_hist, 'peso');
  //   });
  // }
  public lineChartDataIMC: ChartConfiguration<'line'>['data'] = {
    labels: [
      '',
      '', '', '', '', '', '', '', '', '', '',
      'Registro Actual'
    ],
    datasets: [
      {
        data: [this.IMC_array[0], this.IMC_array[1], this.IMC_array[2], this.IMC_array[3], this.IMC_array[4], this.IMC_array[5], this.IMC_array[6], this.IMC_array[7], this.IMC_array[8], this.IMC_array[9], this.IMC_array[10], this.IMC_array[11]],
        label: 'IMC',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(0, 255, 0, 0.5)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: this.minpeso-1,
        max: this.maxpeso+1
      }
    }

  };
  public lineChartOptionsIMC: ChartOptions<'line'> = {
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: this.minimc-0.5,
        max: this.maximc+1
      }
    }

  };
  public lineChartLegend = true;

  borrar_Paciente() {
    this.usuario.deleteAsignado(this.usuarioa).subscribe((res: any) => {
      this.usuarioa =
        console.log(res)
    })
    setTimeout(() => {
      localStorage.removeItem('datosPesoHistorico');
      localStorage.removeItem('datosIMCHistorico');
      this.router.navigate(['orden'])
  }, 1000);
  }


  obtenerPeso_historico() {
    this.usuario.getPeso_hist(this.usuarioa).subscribe((res: any) => {
      this.peso_hist = res;
      localStorage.setItem('datosPesoHistorico', JSON.stringify(this.peso_hist));

      const datosPesoHistoricoStr = localStorage.getItem('datosPesoHistorico');
      if (datosPesoHistoricoStr !== null) {
        const datosPesoHistorico = JSON.parse(datosPesoHistoricoStr);
        const datosPesoHistoricoCadena = JSON.stringify(datosPesoHistorico).split(",");
        const datosPesoLimpio = datosPesoHistoricoCadena.map((cadena:any) => cadena.replace('{', "").replace('"Peso":', "").replace('[','').replace('}','').replace(']',''));
        const datosencadena=datosPesoLimpio.toString()
        localStorage.setItem('datosPesoHistorico',datosencadena)





        // Obtener solo los valores del Peso como un array
        const valoresPeso: any = datosPesoHistorico
        // Filtrar los valores de peso nulos (si es necesario)
        const valoresPesoFiltrados: number[] = valoresPeso.filter((peso: number | null) => peso !== null);

        console.log(valoresPesoFiltrados);
      } else {
        console.log('No se encontraron datos históricos de peso en el localStorage');
      }
    });
  }
  obtenerIMC_historico() {
    this.usuario.getIMC_hist(this.usuarioa).subscribe((res: any) => {
      this.imc_hist = res
      localStorage.setItem('datosIMCHistorico', JSON.stringify(this.imc_hist));


      const datosIMCHistoricoStr = localStorage.getItem('datosIMCHistorico');
      if (datosIMCHistoricoStr !== null) {
        const datosIMCHistorico = JSON.parse(datosIMCHistoricoStr);

        // Obtener solo los valores del IMC como un array
        const valoresIMC: any = datosIMCHistorico.map((item: any) => item.IMC);
        localStorage.setItem('datosIMCHistorico', valoresIMC)
        console.log(valoresIMC);
      } else {
        console.log('No se encontraron datos históricos del IMC en el localStorage');
      }
    });
  }
}


function moment() {
  throw new Error('Function not implemented.');
}

