import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { DetailPageModule } from './pages/detail-page/detail-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent // Déclarez ici votre composant Home
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    DetailPageModule, // Déclaration du module pour le détail
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts') // Intégration d'ECharts
    })
  ],
  providers: [
    provideHttpClient() // Ajoutez provideHttpClient ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
