import { Routes } from '@angular/router';
import { activateGuard } from './guards/activate.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShopComponent } from './components/shop/shop.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'home', title: 'Home', component: HomeComponent },
    {path: 'login', title: 'Login', component: LoginComponent},
    {path: 'shop', title: 'Shop', component: ShopComponent},
    {path: 'create_account', title: 'Create_account', component: CreateAccountComponent},
    {path: 'admin', title: 'admin', component: AdminComponent},
    {path: 'book-form', title: 'book-form', component: BookFormComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', title: 'Not-found 404', component: PageNotFoundComponent}
];