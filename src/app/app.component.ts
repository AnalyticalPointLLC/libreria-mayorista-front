import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { LecturaService } from './core/service/lectura.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'libreria_4_html';
  txtsearchtitulo: string = '';
  txtidioma: string = 'español';


  constructor(private router: Router, private lecturaservice: LecturaService) {}

  ngOnInit(): void {
    this.lecturaservice.currentNombreCategoria.subscribe((nombre) => {
      this.txtsearchtitulo = nombre;
    });
  }
  busquedaTitulo() {
    this.router.navigate(['/listfilter', 'A', 'A', this.txtidioma]);
  }

  navigateToNuevos() {
    // Navega a la ruta con los parámetros para cargar los nuevos títulos
    this.router.navigate([
      '/listfilter',
      'NuevosTitulos',
      'Nuevos Títulos',
      this.txtidioma,
    ]);
  }
  setNombreCategoria() {
    this.lecturaservice.changeNombreCategoria(this.txtsearchtitulo);
    this.router.navigate([
      '/listfilter',
      'General',
      'Titulos Generales',
      this.txtidioma,
    ]);
  }
  voididioma() {
    console.log(this.txtidioma);
  }
}
