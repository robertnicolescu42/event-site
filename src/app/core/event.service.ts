import { Injectable } from '@angular/core';

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  details: string;
  cost: number;
  availableSpots: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events: Event[] = [
    {
      id: '1',
      title: 'Petrecerea 1',
      date: '2025-01-25T20:00:00',
      location: 'Pitesti, Club XYZ',
      details: 'O petrecere pentru socializare și distracție!',
      cost: 50,
      availableSpots: 100,
      imageUrl: 'assets/event1.jpg',
    },
  ];

  getUpcomingEvent(): Event {
    return this.events[0];
  }
}
