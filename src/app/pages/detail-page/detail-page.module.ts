import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './detail-page.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [DetailPageComponent],
  imports: [
    CommonModule,
    NgxEchartsModule 
  ],
  exports: [DetailPageComponent] 
})
export class DetailPageModule { }
