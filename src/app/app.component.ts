import { 
  Component, 
  OnInit 
} from '@angular/core';

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

export class AppComponent {
  password: string = ''
  passwordStrength!: number

  constructor(
    private clipboardService: ClipboardService
    ) {}

  copyPassword() {
    this.clipboardService.copyFromContent(
      this.password
    );
  }

  onPasswordStrength(strength: number) {
    this.passwordStrength = strength
  }

  onChangePassword(passowrd: string) {
    this.password = passowrd;
  }
}
