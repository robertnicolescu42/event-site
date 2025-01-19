import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../core/event.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  city: string = '';
  event: Event | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(
        '🚀 ~ HomeComponent ~ this.route.paramMap.subscribe ~ params:',
        params
      );
      this.city = params.get('city')!;
      console.log('City:', this.city);
    });
  }
}
