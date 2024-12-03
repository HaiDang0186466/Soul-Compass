import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DATN';
  isMenuOpen = false;

  // Sử dụng các Observable để phản ứng với trạng thái từ AuthService
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string | null>;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    public authService: AuthService // Inject AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

    // Liên kết trạng thái đăng nhập từ AuthService
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.username$ = this.authService.currentUser$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Open", this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout(); // Đăng xuất người dùng
    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
  }
}
