import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventService } from '../../core/event.service';
import { BehaviorSubject } from 'rxjs';

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
  @Input() eventId: string;
  hideForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      phone: [
        '',
        [
          Validators.pattern('^[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      message: ['', Validators.maxLength(200)],
      gdpr: [false, Validators.requiredTrue],
      newsletter: [false],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('🚀 ~ ContactComponent ~ eventId:', this.eventId);
      if (this.eventId) {
        // strip this.contactForm.value of the gdpr field
        // and submit the stripped object to the eventService
        const { gdpr, ...formToSend } = this.contactForm.value;

        this.eventService
          .submitRegistration(formToSend, this.eventId)
          .subscribe((response) => {
            if (response === null) {
              console.log('Registration unsuccessful');
            }

            this.hideForm$.next(true);
          });
      }
      console.log('Form Submitted:', this.contactForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  numbersOnly(event: KeyboardEvent) {
    const input = event.key;
    if (!/^[0-9]$/.test(input)) {
      event.preventDefault();
    }
  }

  validateRomanianPhoneNumber(control: AbstractControl) {
    const phoneRegex = /^(07[0-9]{8})$/;
    const valid = phoneRegex.test(control.value);
    return valid || control.value === '' ? null : { invalidPhone: true };
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) return 'Acest câmp este obligatoriu';
    if (control?.hasError('email')) return 'Email invalid';
    if (control?.hasError('minlength')) return 'Prea scurt';
    if (control?.hasError('maxlength')) return 'Prea lung';
    if (control?.hasError('pattern')) return 'Format invalid';
    if (control?.hasError('invalidPhone')) return 'Număr de telefon invalid';
    return '';
  }
}
