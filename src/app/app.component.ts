import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'

import { generatePassword } from 'src/functions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Angular Material Starter';
  length = 6
  upper_case = false
  lower_case = false
  numbers = false
  symbols = false
  password = '';
  passwordForm!: FormGroup;
  charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?'

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      length: [this.length, [Validators.required, Validators.min(6)]],
      upper_case: [this.upper_case],
      lower_case: [this.lower_case],
      numbers: [this.numbers],
      symbols: [this.symbols]
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.length = this.passwordForm.value.length;
      this.upper_case = this.passwordForm.value.upper_case;
      this.lower_case = this.passwordForm.value.lower_case;
      this.numbers = this.passwordForm.value.numbers;
      this.symbols = this.passwordForm.value.symbols;
    });
  }

  onSubmit() {
   this.password = generatePassword(this.length) 
  }
}
