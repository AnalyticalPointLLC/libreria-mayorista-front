import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  ngOnInit() {
    this.scrollToTop();
  }
  scrollToTop(): void {
    setTimeout(() => window.scroll(0, 0), 0);
  }
}
