import { Participation } from "./Participation";


export interface Olympic {
    id: number;
    country: string;
     // Tableau des participations du pays aux  événements olympiques
    participations: Participation[];
  }
  