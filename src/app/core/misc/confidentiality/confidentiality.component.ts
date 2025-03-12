import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confidentiality',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './confidentiality.component.html',
  styleUrl: './confidentiality.component.scss',
})
export class ConfidentialityComponent {
  goHome() {
    window.location.href = '/home/';
  }
}
