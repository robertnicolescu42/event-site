import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../environments/environment';
import { catchError, map, of, tap } from 'rxjs';
export interface Event {
  id?: string;
  title?: string;
  date: Date | string;
  location?: string;
  details?: string;
  cost?: number;
  availableSpots?: number;
  imageUrl?: string;
  attendees?: number;
}

export interface IncomingEvent {
  location: string;
  date: string;
  attendeeCount: number;
}

export interface EventRegistration {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  gdpr: boolean;
  newsletter?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  availableSpotsPitesti = 120;
  availableSpotsBucuresti = 200;
  basicPitestiLocation = "Pitești, Restaurant 'Casa Muntenească' (lângă Laguna)";

  private events: Event[] = [
    // {
    //   id: '1',
    //   title: 'Petrecerea 1',
    //   date: new Date('2025-01-30T20:00:00'),
    //   location: 'Pitesti, Club XYZ',
    //   details: 'O petrecere pentru socializare și distracție!',
    //   cost: 50,
    //   availableSpots: 100,
    //   imageUrl: 'assets/event1.jpg',
    // },
    // {
    //   id: '2',
    //   title: 'Petrecerea 2',
    //   date: new Date('2025-01-26T13:00:00'),
    //   location: 'Bucuresti, Club ABC',
    //   details: 'O petrecere pentru socializare și distracție!',
    //   cost: 50,
    //   availableSpots: 100,
    //   imageUrl: 'assets/event2.jpg',
    // },
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

  constructor(private http: HttpClient) {}

  getUpcomingEvent(): Event {
    return this.events[0];
  }

  getPitestiEvent() {
    const url = `${api.getLatestEventUrl}?location=pitesti`;

    return this.http.get<IncomingEvent>(url).pipe(
      map((data) => {
        return {
          ...data,
          date: new Date(data.date),
          availableSpots: this.availableSpotsPitesti - data.attendeeCount,
        };
      }),
      catchError((error) => {
        console.error('Error fetching the latest event:', error);
        return of(null);
      })
    );
  }

  getBucurestiEvent(): Event {
    return this.events[1];
  }

  submitRegistration(registration: EventRegistration, eventId: string) {
    const url = `${api.registerForEventUrl}`;

    let requestBody = {
      ...registration,
      eventId,
    };

    return this.http.post(url, requestBody).pipe(
      catchError((error) => {
        console.error('Error registering for event:', error);
        return of(null);
      })
    );
  }
}
