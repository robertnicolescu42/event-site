import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-contact',
  imports: [
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm: FormGroup;
  @Input() event: Event;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')],
      message: [''],
      gdpr: [false, Validators.requiredTrue],
      newsletter: [false],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.eventService.submitRegistration(this.contactForm.value);
      console.log('Form Submitted:', this.contactForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
