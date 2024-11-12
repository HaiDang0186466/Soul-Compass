import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, ButtonModule,CommonModule,CardModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  showTestSection: boolean = false;
  selectedAnswer!: string; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  
  ngOnInit(): void {
    // Initialize AOS only if we're in a browser environment
    if (isPlatformBrowser(this.platformId)) {
    }
  }



  clicked: boolean = false;
  clicked1: boolean = false;
  clicked2: boolean = false;

  toggleIcon() {
    this.clicked = true;
    this.clicked1 = false;
    this.clicked2 = false;
  }

  toggleIcon1() {
    this.clicked = false;
    this.clicked1 = true;
    this.clicked2 = false;
  }

  toggleIcon2() {
    this.clicked = false;
    this.clicked1 = false;
    this.clicked2 = true;
  }

  toTest() {
    if (isPlatformBrowser(this.platformId)) {
      this.showTestSection = true; // Hiển thị section Test

      // Đợi Angular render xong trước khi cuộn xuống section
      setTimeout(() => {
        this.document.getElementById("Test")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }

 

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    console.log("Câu trả lời đã chọn:", this.selectedAnswer);
  }

  submitAnswer() {
    console.log("Câu trả lời của bạn là:", this.selectedAnswer);
    // Xử lý câu trả lời đã chọn
  }

}
