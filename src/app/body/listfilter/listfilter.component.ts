import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LecturaService } from '../../core/service/lectura.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Categoria {
  codigo_ibic: string;
  nombre_clasificacion: string;
}

@Component({
  selector: 'app-listfilter',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './listfilter.component.html',
  styleUrl: './listfilter.component.css',
})
export class ListfilterComponent implements OnInit {
  itemsPerPage = 40; // Número de elementos por página
  currentPage = 1;

  public dtltipo: string = '';
  public lstProducto: any[] = [];
  public txtcatidioma: string = '';
  public txtsearchtitulo: string = '';
  public nombreCategoria: string = '';
  public categorias: Categoria[] = [];

  constructor(
    private lecturaService: LecturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.txtsearchtitulo == '') {
      this.categorias = [
        { codigo_ibic: 'A', nombre_clasificacion: 'Las artes' },
        {
          codigo_ibic: 'B',
          nombre_clasificacion: 'Biografía e historias reales',
        },
        { codigo_ibic: 'C', nombre_clasificacion: 'Lenguaje' },
        {
          codigo_ibic: 'D',
          nombre_clasificacion: 'Literatura y estudios literarios',
        },
        {
          codigo_ibic: 'E',
          nombre_clasificacion: 'Enseñanza de la lengua inglesa',
        },
        { codigo_ibic: 'F', nombre_clasificacion: 'Ficción y temas afines' },
        {
          codigo_ibic: 'G',
          nombre_clasificacion:
            'Consulta, información y temas interdisciplinarios',
        },
        { codigo_ibic: 'H', nombre_clasificacion: 'Humanidades' },
        {
          codigo_ibic: 'J',
          nombre_clasificacion: 'Sociedad y ciencias sociales',
        },
        {
          codigo_ibic: 'K',
          nombre_clasificacion: 'Economía, finanzas, empresa y gestión',
        },
        { codigo_ibic: 'L', nombre_clasificacion: 'Derecho' },
        { codigo_ibic: 'M', nombre_clasificacion: 'Medicina' },
        { codigo_ibic: 'P', nombre_clasificacion: 'Matemáticas y ciencia' },
        {
          codigo_ibic: 'R',
          nombre_clasificacion:
            'Ciencias de la tierra, geografía, medioambiente, planificación',
        },
        {
          codigo_ibic: 'T',
          nombre_clasificacion: 'Tecnología, ingeniería, agricultura',
        },
        { codigo_ibic: 'U', nombre_clasificacion: 'Computación e informática' },
        {
          codigo_ibic: 'V',
          nombre_clasificacion: 'Salud y desarrollo personal',
        },
        {
          codigo_ibic: 'W',
          nombre_clasificacion: 'Estilo de vida, deporte y ocio',
        },
        {
          codigo_ibic: 'Y',
          nombre_clasificacion: 'Infantiles, juveniles y didácticos',
        },
      ];

      this.route.params.subscribe((params) => {
        this.dtltipo = params['ibic'];
        this.nombreCategoria = params['nombreCategoria']; // Obtener el nombre de la categoría
        this.txtcatidioma = params['idioma'];
        console.log('inicio');

        if (this.dtltipo === 'NuevosTitulos') {
          this.loadNuevosTitulos();
          console.log('primera ruta');
        } else if (this.dtltipo === 'General') {
          this.buscarAppComponent();
          console.log('segunda ruta');
        } else {
          this.VoidListadoProducto();
          console.log('tecera ruta');
        }

        //this.VoidListadoProducto();
        window.scrollTo(0, 0);
      });
    } else {
      console.log('cuarta ruta');
      this.VoidListadoProducto();
    }
  }

  loadNuevosTitulos() {
    this.lecturaService
      .getPromocionDiario(
        this.txtcatidioma,
        this.itemsPerPage,
        this.currentPage - 1
      )
      .subscribe({
        next: (lst: any) => {
          this.lstProducto = lst;
        },
        error: (error: any) => {
          console.error('Error fetching nuevos títulos', error);
        },
      });
  }
  listadocategoria(ibic: string, categoria: string) {
    this.dtltipo = ibic;
    this.txtsearchtitulo = '';
    this.lecturaService.changeNombreCategoria(this.txtsearchtitulo);
    this.router.navigate(['/listfilter', ibic, categoria, this.txtcatidioma]);
    this.lecturaService
      .getPrefixFilterClasificacionIdioma(
        this.txtcatidioma,
        this.dtltipo,
        this.itemsPerPage,
        (this.currentPage - 1) * this.itemsPerPage
      )
      .subscribe({
        next: (dtl: any) => {
          console.log('listadocategoria' + this.dtltipo);
          this.lstProducto = dtl;
        },
        error: () => {},
      });
    /*
    this.lecturaService
      .getPrefixFilterClasificacionIdioma(this.txtcatidioma, ibic)
      .subscribe({
        next: (dtl: any) => {
          this.lecturaService.changeNombreCategoria(this.txtsearchtitulo);
          this.lstProducto = dtl;
          this.router.navigate([
            '/listfilter',
            ibic,
            categoria,
            this.txtcatidioma,
          ]);
        },
        error: () => {},
      });
    */
  }
  VoidListadoProducto() {
    this.lecturaService
      .getPrefixFilterClasificacionIdioma(
        this.txtcatidioma,
        this.dtltipo,
        this.itemsPerPage,
        this.currentPage - 1
      )
      .subscribe({
        next: (dtl: any) => {
          this.lstProducto = dtl;
        },
        error: () => {},
      });
  }

  onCategoriaClick(categoria: Categoria) {
    this.dtltipo = categoria.codigo_ibic;
    this.nombreCategoria = categoria.nombre_clasificacion;
    this.txtsearchtitulo = '';
    this.VoidListadoProducto();
  }

  busquedaTitulo() {
    this.lecturaService
      .getSearchtituloidioma(
        this.txtcatidioma,
        this.txtsearchtitulo,
        this.itemsPerPage,
        this.currentPage - 1
      )
      .subscribe({
        next: (dtl: any) => {
          this.lstProducto = dtl;
        },
        error: () => {},
      });
  }

  buscarAppComponent() {
    this.lecturaService.currentNombreCategoria.subscribe((nombre) => {
      this.lecturaService
        .getSearchtituloidioma(
          this.txtcatidioma,
          nombre,
          this.itemsPerPage,
          this.currentPage - 1
        )
        .subscribe({
          next: (dtl: any) => {
            this.txtsearchtitulo = nombre;
            this.lstProducto = dtl;
          },
          error: () => {},
        });
    });
  }

  get totalPages() {
    return Math.ceil(5000 / this.itemsPerPage);
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.lstProducto.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.dtltipo === 'NuevosTitulos') {
        this.loadNuevosTitulos();
      } else if (this.dtltipo === 'General') {
        this.buscarAppComponent();
      } else {
        this.VoidListadoProducto();
      }
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.dtltipo === 'NuevosTitulos') {
        this.loadNuevosTitulos();
      } else if (this.dtltipo === 'General') {
        this.buscarAppComponent();
      } else {
        this.VoidListadoProducto();
      }
    }
  }
}
