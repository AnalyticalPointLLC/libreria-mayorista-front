import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';  // Importa RouterLink
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, CommonModule],  // Importa RouterLink aquí

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
