import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';  // Importa RouterLink
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LecturaService } from './../core/service/lectura.service'; // Ajusta la ruta según sea necesario



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],  // Importa RouterLink aquí

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {


  contactForm!: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private lecturaService: LecturaService) {}


  ngOnInit() {
    // Usa window.scrollTo para moverte al principio de la página
    window.scrollTo(0, 0);

    // Configuración del formulario
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      dni_ruc: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
      this.mensajeExito = null;
      this.mensajeError = null;

    if (this.contactForm.valid) {
      this.lecturaService.postSendEmailContactMayorista(this.contactForm.value).subscribe(
        response => {
          this.mensajeExito = 'Mensaje enviado con éxito';
          console.log('Mensaje enviado con éxito', response);
        },
        error => {
          this.mensajeError = 'Error al enviar el mensaje. Intente nuevamente.';

          console.error('Error al enviar mensaje', error);
        }
      );
    }
  }


}
