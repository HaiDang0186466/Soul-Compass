import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<string | null>(null);

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  currentUser$: Observable<string | null> = this.currentUserSubject.asObservable();

  login(username: string) {
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(username);
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }
}
