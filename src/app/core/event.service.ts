import { Injectable } from '@angular/core';

export interface Event {
  id: string;
  title: string;
  date: Date;
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
      date: new Date('2025-01-30T20:00:00'),
      location: 'Pitesti, Club XYZ',
      details: 'O petrecere pentru socializare și distracție!',
      cost: 50,
      availableSpots: 100,
      imageUrl: 'assets/event1.jpg',
    },
    {
      id: '2',
      title: 'Petrecerea 2',
      date: new Date('2025-01-26T13:00:00'),
      location: 'Bucuresti, Club ABC',
      details: 'O petrecere pentru socializare și distracție!',
      cost: 50,
      availableSpots: 100,
      imageUrl: 'assets/event2.jpg',
    },
  ];

  public defaultEvent: Event = {
    id: '0',
    title: 'Petrecerea 0',
    date: new Date('2025-01-25T20:00:00'),
    location: 'Pitesti, Club XYZ',
    details: 'O petrecere pentru socializare și distracție!',
    cost: 50,
    availableSpots: 100,
    imageUrl: 'assets/event1.jpg',
  };

  getUpcomingEvent(): Event {
    return this.events[0];
  }

  getPitestiEvent(): Event {
    return this.events[0];
  }

  getBucurestiEvent(): Event {
    return this.events[1];
  }
}
