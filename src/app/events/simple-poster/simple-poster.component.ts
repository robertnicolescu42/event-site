import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-simple-poster',
  imports: [MatCardModule],
  templateUrl: './simple-poster.component.html',
  styleUrl: './simple-poster.component.scss',
})
export class SimplePosterComponent implements OnInit {
  photoUrl: string = '/afis-pitesti-small.png';

  @Input()
  location: string = 'Pitesti';

  ngOnInit(): void {
    if (this.location === 'Bucuresti') {
      this.photoUrl = '/afis-bucuresti-small.png';
    }
  }
}
