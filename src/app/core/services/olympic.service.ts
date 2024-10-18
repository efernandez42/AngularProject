import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map, tap, filter } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'; // URL du fichier JSON
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null); // Utilisation de l'interface Olympic

  constructor(private http: HttpClient) {}

  // Chargement des données initiales depuis le fichier JSON
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe( // Indique que les données retournées sont de type Olympic[]
      tap((value) => this.olympics$.next(value)), // Stocke les données dans le BehaviorSubject
      catchError((error) => {
        console.error(error); // Affiche l'erreur dans la console
        this.olympics$.next(null); // Met à jour le sujet pour signaler une erreur
        return []; // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  // Retourne un Observable des données des JO
  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  // Retourne les données des JO après un délai de 2 secondes
  public getAsyncOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      delay(2000),
      filter((olympics): olympics is Olympic[] => olympics !== null) // Filtre les valeurs nulles
    );
  }

  // Retourne un JO spécifique par son ID
  public getOlympicById(lookupId: number): Observable<Olympic | undefined> {
    return this.getAsyncOlympics().pipe(
      map(olympics => olympics.find(olympic => olympic.id === lookupId)) // Utilise find pour retourner l'élément correspondant ou undefined
    );
  }

  // Retourne la longueur des données des JO
  getDataLength(): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => olympics?.length || 0) // Prend en compte le cas où les données sont nulles
    );
  }
}
