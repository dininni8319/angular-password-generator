import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generatePassword, checkStrength } from 'src/functions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  length = 6;
  upper_case = true;
  lower_case = true;
  numbers = true;
  symbols = false;

  password = '';
  passwordForm!: FormGroup;
  passwordStrength!: { strength: number; str: string };

  // Events to communicate with the parent component
  @Output() passwordEvent = new EventEmitter<string>();
  @Output() passwordStrengthEvent = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.setupFormValueChanges();
    this.checkStrength();
  }

  initializeForm() {
    this.passwordForm = this.fb.group({
      length: [this.length, [Validators.required, Validators.min(6)]],
      upper_case: [this.upper_case],
      lower_case: [this.lower_case],
      numbers: [this.numbers],
      symbols: [this.symbols]
    });
  }

  setupFormValueChanges() {
    this.passwordForm.valueChanges.subscribe(() => {
      this.updateFormValues();
      this.checkStrength();
    });
  }

  updateFormValues() {
    this.length = this.passwordForm.value.length;
    this.upper_case = this.passwordForm.get('upper_case')?.value;
    this.lower_case = this.passwordForm.get('lower_case')?.value;
    this.numbers = this.passwordForm.get('numbers')?.value;
    this.symbols = this.passwordForm.get('symbols')?.value;
  }

  onSubmit() {
    this.password = generatePassword(
      this.length,
      this.upper_case,
      this.lower_case,
      this.numbers,
      this.symbols
    );
    this.passwordEvent.emit(this.password);
  }

  checkStrength() {
    this.passwordStrength = checkStrength(
      this.passwordForm.get('upper_case')?.value,
      this.passwordForm.get('lower_case')?.value,
      this.passwordForm.get('numbers')?.value,
      this.passwordForm.get('symbols')?.value
    );

    this.passwordStrengthEvent.emit(this.passwordStrength.strength);
  }

  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  
}
