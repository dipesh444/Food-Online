import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailComponent } from './pages/fail/fail.component';
import { SearchComponent } from './partials/search/search.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:"full"
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  },
  {
    path:'success',
    component:SuccessComponent
  },
  {
    path:'fail',
    component:FailComponent
  },
  {
    path:'search/:key',
    component:HomeComponent
  },
  {
    path:'tag/:tag',
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
