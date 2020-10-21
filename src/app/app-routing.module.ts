import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ServiceComponent } from './pages/service/service.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WorkerComponent } from './pages/worker/worker.component';


const routes: Routes = [

  {
    path:'', 
    component: HomeComponent,
  },
 
  {
    path:"servicios/:slugService", 
    component: ServiceComponent,
  },

  {
        path: 'servicios/:slugService/:slugWorker',
        component: WorkerComponent,
  },
     

  {path:"contacto", component: ContactComponent},
  

   {path:'**', pathMatch:'full', redirectTo:'es/home'}
];



@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes,
    {
      onSameUrlNavigation: 'reload'
    }
    )] ,
  exports: [RouterModule]
})
export class AppRoutingModule { }
