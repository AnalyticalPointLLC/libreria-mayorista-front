import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DetailbookComponent } from './body/detailbook/detailbook.component';
import { WishlistComponent } from './body/wishlist/wishlist.component';
import { CheckoutComponent } from './body/checkout/checkout.component';
import { ListfilterComponent } from './body/listfilter/listfilter.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'detail-book/:id', component: DetailbookComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'listfilter/:ibic/:nombreCategoria/:idioma', component: ListfilterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
