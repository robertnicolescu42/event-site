import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../environments/environment';
import { catchError, of, tap } from 'rxjs';
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

export interface EventRegistration {
  id: string;
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

  constructor(private http: HttpClient) {}

  getUpcomingEvent(): Event {
    return this.events[0];
  }

  getPitestiEvent() {
    // return this.events[0];
    const url = `${api.getLatestEventUrl}?location=pitesti`;

    console.log("🚀 ~ EventService ~ getPitestiEvent ~ url:", url)
    return this.http.get<Event>(url).pipe(
      tap((data) =>
        console.log('🚀 ~ EventService ~ getLatestEvent ~ data:', data)
      ),
      catchError((error) => {
        console.error('Error fetching the latest event:', error);
        return of(this.defaultEvent);
      })
    );
  }

  getBucurestiEvent(): Event {
    return this.events[1];
  }

  submitRegistration(registration: EventRegistration): void {
    console.log('Registration submitted:', registration);
  }
}
