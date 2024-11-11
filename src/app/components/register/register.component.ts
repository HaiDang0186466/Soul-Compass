import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ButtonModule,CheckboxModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
