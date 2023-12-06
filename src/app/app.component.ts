import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'
import { ClipboardService } from 'ngx-clipboard';

import { 
  generatePassword,
  checkStrength
} from 'src/functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  length = 6
  upper_case = true
  lower_case = true
  numbers = true
  symbols = true
  password = '';
  passwordForm!: FormGroup;
  passwordStrenght!: string;

  constructor(
    private fb: FormBuilder,
    private clipboardService: ClipboardService
  ) {}

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
    this.checkStrength();

  }

  onSubmit() {
   this.password = generatePassword(
      this.length, 
      this.upper_case,
      this.lower_case,
      this.numbers,
      this.symbols
    ) 
  }

  copyPassword() {
    this.clipboardService.copyFromContent(this.password);
  }

  checkStrength() {
    this.passwordStrenght = checkStrength(
      this.upper_case,
      this.lower_case,
      this.numbers,
      this.symbols
    )
    
  }
}
