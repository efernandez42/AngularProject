import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Participation } from 'app/core/models/Participation';
import { Olympic } from 'app/core/models/Olympic';
import { OlympicService } from 'app/core/services/olympic.service';
import { Location } from '@angular/common';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  public olympic$: Observable<Olympic | undefined> = of(undefined);
  public countryId: number;

  constructor(
    private olympicService: OlympicService, 
    private route: ActivatedRoute, 
    private location: Location 
  ) {
    this.countryId = +this.route.snapshot.paramMap.get('id')!; // Récupère l'ID depuis l'URL
  }

  ngOnInit(): void {
    this.olympic$ = this.olympicService.getOlympicById(this.countryId); // Récupère les données pour le pays sélectionné
  }

  goBack(): void {
    this.location.back(); // Navigue vers la page précédente
  }
  
  getChartOptions(participations: Participation[]): EChartsOption {
    const years = participations.map(p => p.year);
    const medals = participations.map(p => p.medalsCount);
    
    return {
      xAxis: {
        type: 'category',
        data: years,
        name: 'Dates',  
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: {
          fontSize: 28,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: medals,
          type: 'line',
          smooth: false,
        },
      ],
    };
  }

  // Calcul du total des médailles
  getTotalMedals(participations: Participation[] | null = []): number {
    if (!participations || participations.length === 0) {
      return 0; // Retourner 0 si le tableau est null ou vide
    }
  
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }
  

  // Calcul du total des athlètes
  getTotalAthletes(participations: Participation[] = []): number {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }
}
