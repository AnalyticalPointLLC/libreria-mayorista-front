import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LecturaService } from '../core/service/lectura.service';
import { Router } from '@angular/router';

interface Category {
  codigo_ibic: string;
  nombre_clasificacion: string;
  idioma: string;
  productos: any[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  txtcatidioma = 'español';
  public itemsPerPage = 20; // Número de elementos por página
  public currentPage = 0;
  categories: Category[] = [
    {
      codigo_ibic: 'A',
      nombre_clasificacion: 'Las artes',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'B',
      nombre_clasificacion: 'Biografía e historias reales',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'C',
      nombre_clasificacion: 'Lenguaje',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'D',
      nombre_clasificacion: 'Literatura y estudios literarios',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'E',
      nombre_clasificacion: 'Enseñanza de la lengua inglesa ',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'F',
      nombre_clasificacion: 'Ficción y temas afines',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'G',
      nombre_clasificacion: 'Consulta, información y temas interdisciplinarios',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'H',
      nombre_clasificacion: 'Humanidades',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'J',
      nombre_clasificacion: 'Sociedad y ciencias sociales',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'K',
      nombre_clasificacion: 'Economía, finanzas, empresa y gestión',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'L',
      nombre_clasificacion: 'Derecho',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'M',
      nombre_clasificacion: 'Medicina',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'P',
      nombre_clasificacion: 'Matemáticas y ciencia',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'R',
      nombre_clasificacion:
        'Ciencias de la tierra, geografía, medioambiente, planificación',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'T',
      nombre_clasificacion: 'Tecnología, ingeniería, agricultura',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'U',
      nombre_clasificacion: 'Computación e informática',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'V',
      nombre_clasificacion: 'Salud y desarrollo personal',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'W',
      nombre_clasificacion: 'Estilo de vida, deporte y ocio',
      idioma: this.txtcatidioma,
      productos: [],
    },
    {
      codigo_ibic: 'Y',
      nombre_clasificacion: 'Infantiles, juveniles y didácticos',
      idioma: this.txtcatidioma,
      productos: [],
    },
  ];

  products: any[] = [];
  showMore: boolean = false; // Controla si se muestran más de 4 productos

  constructor(private lecturaService: LecturaService, private router: Router) {}

  ngOnInit() {
    this.lecturaService
      .getPromocionDiario(
        this.txtcatidioma,
        this.itemsPerPage,
        this.currentPage
      )
      .subscribe({
        next: (lst: any) => {
          this.products = lst;
        },
        error: (error: any) => {
          console.error('Error fetching products', error);
        },
        complete() {
          console.log('Product fetching completed');
        },
      });

    this.loadProductsForCategories();
  }

  loadProductsForCategories() {
    this.categories.forEach((category) => {
      this.lecturaService
        .getPrefixFilterClasificacionIdioma(
          this.txtcatidioma,
          category.codigo_ibic,
          this.itemsPerPage,
          this.currentPage
        )
        .subscribe({
          next: (response: any) => {
            //console.log(`Data for ${category.nombre_clasificacion}:`, response);
            if (Array.isArray(response)) {
              category.productos = response.slice(0, 5); // Muestra los primeros 5 productos
            } else {
              console.warn(
                `Unexpected response structure for category ${category.codigo_ibic}`
              );
              category.productos = []; // Manejando el caso donde la estructura no es la esperada
            }
          },
          error: (error: any) => {
            console.error(
              `Error fetching products for category ${category.codigo_ibic}`,
              error
            );
          },
        });
    });
  }

  toggleShowMore() {
    this.showMore = !this.showMore; // Alterna el estado de showMore
  }
}
