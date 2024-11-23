import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, CommonModule, CardModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  isMenuOpen = false;
 
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  // Tương tác với thanh menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Open", this.isMenuOpen);
  }
  closeMenu() {
    this.isMenuOpen = false;
  }

}