import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminComponent} from './components/dashboard/admin/admin.component';
import {AuthGuard} from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
