import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Olympic } from 'app/core/models/Olympic';
import { OlympicService } from 'app/core/services/olympic.service';
import type { EChartsOption } from 'echarts';
import { map, Observable, Subject } from 'rxjs';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public chartOptions: EChartsOption | null = null;
  public totalJO = 0;
  public totalCountries = 0;

  private unsubscribe$ = new Subject<void>(); // Subject pour gérer le désabonnement

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.loadOlympicsData().subscribe();
  }
  
  private loadOlympicsData(): Observable<void> {
    return this.olympicService.getOlympics().pipe(
      map((olympics: Olympic[] | null) => {
        if (olympics) {
          this.totalCountries = olympics.length; // Nombre de pays
          this.totalJO = this.calculateTotalJO(olympics); // Nombre total de JO
  
          const chartData = this.prepareChartData(olympics); // Préparation des données pour le graphique
          this.configureChart(chartData); // Configuration du graphique
        } else {
          // Gérer le cas où `olympics` est null, si nécessaire
          console.error("Aucune donnée disponible pour les JO");
        }
      })
    );
  }
  
  private calculateTotalJO(olympics: Olympic[]): number {
    return olympics.reduce((sum, olympic) => sum + olympic.participations.length, 0);
  }
  
  private prepareChartData(olympics: Olympic[]): { name: string, value: number }[] {
    return olympics.map(olympic => ({
      name: olympic.country,
      value: olympic.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
    }));
  }
  
  private configureChart(chartData: { name: string, value: number }[]): void {
    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)' // Afficher le nombre total de médailles sur survol
      },
      series: [
        {
          name: 'Medals',
          type: 'pie',
          radius: '60%',
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  
  // Lorsqu'on clique sur un pays, redirection vers la page de détails
  onChartClick(event: { name: string }): void {
    const countryName = event.name;
    const countryId = this.getCountryIdByName(countryName);
    if (countryId !== undefined) {
      this.router.navigate(['/detail', countryId]);
    }
  }

  // Méthode pour récupérer l'ID d'un pays par son nom
  getCountryIdByName(countryName: string): number | undefined {
    let countryId: number | undefined;
    this.olympicService.getOlympics().subscribe(olympics => {
      if (olympics) {
        const olympic = olympics.find(o => o.country === countryName);
        if (olympic) {
          countryId = olympic.id;
        }
      }
    });
    return countryId;
  }
  ngOnDestroy(): void {
    // Émet un signal indiquant que l'observable doit être arrêté.
    this.unsubscribe$.next();
     //Ferme définitivement l'observable pour libérer la mémoire.
    this.unsubscribe$.complete(); 
  }
}
