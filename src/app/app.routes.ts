import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductPurchaseComponent } from './pages/product-purchase/product-purchase.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: '', component: HomeComponent},
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'products/purchase/:id', component: ProductPurchaseComponent},
    {path: 'products', component: ProductsComponent},
    {path: '**', component: HomeComponent}
];
