import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule,RouterLink,RouterLinkActive,ButtonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
