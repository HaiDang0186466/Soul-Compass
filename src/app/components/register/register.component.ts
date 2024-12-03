import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    CommonModule,
    DialogModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  siteKey: string = '6Le3CHwqAAAAAInPW07wgfTcrlzIQMoC6dTk2iEQ';
  captchaVerified = false;
  emailExists = false;
  usernameExists = false;

  registrationStatus: 'idle' | 'sendingRequest' | 'success' = 'idle';

  static accounts = [
    { username: 'admin', email: 'admin', password: 'admin123' }, // Tài khoản admin
    { username: 'existinguser', email: 'existinguser@example.com', password: 'password123' } // Người dùng mặc định
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        recaptcha: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onCaptchaSuccess() {
    this.captchaVerified = true;
  }

  onRegister() {
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;

    // Kiểm tra trùng lặp email và username
    const emailExists = RegisterComponent.accounts.some((acc) => acc.email === email);
    const usernameExists = RegisterComponent.accounts.some((acc) => acc.username === username);

    if (emailExists) {
      this.emailExists = true;
    } else if (usernameExists) {
      this.usernameExists = true;
    } else if (this.registerForm.valid && this.captchaVerified) {
      this.emailExists = false;
      this.usernameExists = false;

      RegisterComponent.accounts.push({
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      });

      alert('Account created successfully!');
      this.router.navigate(['/login']);
    }
  }
}
