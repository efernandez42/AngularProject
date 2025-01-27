import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  // Déclaration d'une variable pour stocker l'abonnement
  private dataSubscription: Subscription | undefined;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Chargement des données initiales avec un abonnement
    this.dataSubscription = this.olympicService.loadInitialData().subscribe();
  }

  ngOnDestroy(): void {
    // Désabonnement pour éviter les fuites de mémoire
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
