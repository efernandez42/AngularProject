import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'app/core/services/olympic.service';
import type { EChartsOption } from 'echarts';
import { Subject } from 'rxjs';

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
    // Récupérer les données des JO via le service
    this.olympicService.getOlympics().subscribe((olympics) => {
      if (olympics) {
        this.totalCountries = olympics.length; // Nombre de pays
        this.totalJO = olympics.reduce((sum, olympic) => sum + olympic.participations.length, 0); // Nombre total de JO

        // Préparation des données pour le graphique
        const chartData: ChartData[] = olympics.map(olympic => ({
          name: olympic.country,
          value: olympic.participations.reduce((sum, participation) => sum + participation.medalsCount, 0) // Total des médailles par pays
        }));

        // Configuration du graphique en secteurs
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
    });
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); 
  }
}
