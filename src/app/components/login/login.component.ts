import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RouterModule,
    ButtonModule,
    CheckboxModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  // Mock data
  accounts = RegisterComponent.accounts;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService // Inject AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Tìm tài khoản trong danh sách
    const account = this.accounts.find(acc => acc.email === email);

    if (!account) {
      // Lỗi: Không tìm thấy tài khoản
      this.email.setErrors({ notFound: true });
    } else if (account.password !== password) {
      // Lỗi: Sai mật khẩu
      this.password.setErrors({ invalidPassword: true });
    } else {
      // Thành công: Đăng nhập
      alert('Login successful!');
      this.authService.login(account.username); // Cập nhật trạng thái đăng nhập
      this.router.navigate(['/home']); // Điều hướng về trang chủ
    }
  }
}
