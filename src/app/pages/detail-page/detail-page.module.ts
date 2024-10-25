import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './detail-page.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [DetailPageComponent],
  imports: [
    CommonModule,
    NgxEchartsModule // Ajoutez ce module ici
  ],
  exports: [DetailPageComponent] // Exporte le composant pour qu'il puisse être utilisé ailleurs
})
export class DetailPageModule { }
