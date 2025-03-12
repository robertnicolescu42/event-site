import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { sensibleData } from '../../../../environments/environment';

@Component({
  selector: 'app-confidentiality',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './confidentiality.component.html',
  styleUrl: './confidentiality.component.scss',
})
export class ConfidentialityComponent {
  sensibleData = sensibleData;

  goHome() {
    window.location.href = '/home/';
  }
}
