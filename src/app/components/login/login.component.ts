import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule,RouterLink,RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
