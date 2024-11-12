import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
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
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  protected aFormGroup!: FormGroup;
  siteKey: string = "6Le3CHwqAAAAAInPW07wgfTcrlzIQMoC6dTk2iEQ";
  captchaVerified = false;
  registrationStatus: 'idle' | 'sendingRequest' | 'requestSent' | 'creatingAccount' | 'success' = 'idle';

  constructor(private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  onCaptchaSuccess() {
    this.captchaVerified = true;
  }

  onRegister() {
    if (this.captchaVerified) {
      this.registrationStatus = 'sendingRequest';
      setTimeout(() => {
        this.registrationStatus = 'requestSent';

        setTimeout(() => {
          this.registrationStatus = 'creatingAccount';

          setTimeout(() => {
            this.registrationStatus = 'success';
          }, 3000);
        }, 2000);
      }, 3000);
    }
  }
}