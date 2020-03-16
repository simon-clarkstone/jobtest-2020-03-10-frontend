import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBoxComponent } from './search-box/search-box.component';


const routes: Routes = [
  { path: 'search', component: SearchBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
