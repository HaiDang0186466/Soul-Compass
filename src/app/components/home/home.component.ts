import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  toHome() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  toBlog() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById("blog-sec")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  toAbout() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  toContact() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById("contact-sec")?.scrollIntoView({ behavior: "smooth" });
    }
  }
}