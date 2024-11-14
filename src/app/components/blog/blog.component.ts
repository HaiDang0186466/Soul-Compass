import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
    CarouselModule,
    ChipModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    CommonModule
  
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isMenuOpen = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Initialize AOS only if we're in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  toHome() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  toBlogs() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
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
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Open", this.isMenuOpen);
  }
  closeMenu() {
    this.isMenuOpen = false;
  }
  items = [
    { title: 'Slide 1', image: 'assets/14.gif' },
    { title: 'Slide 2', image: 'assets/2.gif' },
    { title: 'Slide 3', image: 'assets/kuru-kuru.gif' },
    { title: 'Slide 4', image: 'assets/gura-spin.gif' },
    { title: 'Slide 5', image: 'assets/3.gif' },
    { title: 'Slide 6', image: 'assets/4.gif' },
    { title: 'Slide 7', image: 'assets/5.gif' },
    { title: 'Slide 8', image: 'assets/6.gif' },
    { title: 'Slide 9', image: 'assets/ame.gif' },
  ];

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
}