import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule, CommonModule, CardModule, ProgressSpinnerModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  showTestSection: boolean = false;
  showTopSection: boolean = true;
  isMenuOpen = false;
  currentQuestionIndex: number = 0;
  selectedChoices: (number | null)[] = []; 
  totalScore: number = 0;
  depressionLevel: string = '';
  isAnalyzing: boolean = false; 
  analysisText: string = 'Đang phân tích...'; 

  questions = [
    { text: 'Bạn có thường xuyên cảm thấy buồn bã?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Rất thường xuyên'] },
    { text: 'Bạn có khó ngủ hoặc mất ngủ?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Rất thường xuyên'] },
    { text: 'Bạn có cảm thấy khó chịu trong lòng?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Rất thường xuyên'] },
    { text: 'Bạn có cảm thấy buồn bực?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Rất thường xuyên'] },
 
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  
  // Tương tác với thanh menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log("Open", this.isMenuOpen);
  }
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Tương tác với phần kiểm tra trạng thái hàng ngày
  clicked: boolean = false;
  clicked1: boolean = false;
  clicked2: boolean = false;
  toggleIcon() {
    this.clicked = true;
    this.clicked1 = false;
    this.clicked2 = false;
    console.log("Emotion: Happy", this.clicked);
  }
  toggleIcon1() {
    this.clicked = false;
    this.clicked1 = true;
    this.clicked2 = false;
    console.log("Emotion: Normal", this.clicked1);
  }
  toggleIcon2() {
    this.clicked = false;
    this.clicked1 = false;
    this.clicked2 = true;
    console.log("Emotion: Sad", this.clicked2);
  }
  // Di chuyển tới phần kiểm tra
  toTest() {
    if (isPlatformBrowser(this.platformId)) {
      this.showTestSection = true; 
      console.log("roll", this.document);
      setTimeout(() => {
        this.document.getElementById("Test")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      setTimeout(() => {
        this.showTopSection = false;
      }, 1000);
    }
  }

  // Phần logic test
  ngOnInit(): void {
    this.selectedChoices = Array(this.questions.length).fill(null);
    if (isPlatformBrowser(this.platformId)) {
    } 
  }
  selectChoice(index: number): void {
    this.selectedChoices[this.currentQuestionIndex] = index;
  }  
  goNext(): void {
    if (
      this.selectedChoices[this.currentQuestionIndex] !== null &&
      this.currentQuestionIndex < this.questions.length - 1
    ) {
      this.currentQuestionIndex++;
    }
  }
  goBack(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  getDepressionLevel(): string {
    if (this.totalScore <= 4) return 'Không có dấu hiệu trầm cảm';
    if (this.totalScore <= 8) return 'Trầm cảm nhẹ';
    if (this.totalScore <= 12) return 'Trầm cảm trung bình';
    return 'Trầm cảm nặng';
  }
  isQuit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showTopSection = true;
      this.selectedChoices = Array(this.questions.length).fill(null); 
      this.currentQuestionIndex = 0; 
      this.totalScore = 0;   
      this.showTestSection = true; 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  showResults(): void {
    this.isAnalyzing = true;
    this.analysisText = 'Đang phân tích...';
    setTimeout(() => {
      this.analysisText = 'Đã phân tích xong';
      this.totalScore = this.selectedChoices.reduce((acc: number, choice) => acc + (choice ?? 0), 0);
      this.depressionLevel = this.getDepressionLevel();

      setTimeout(() => {
        this.isAnalyzing = false;
      }, 1000); 
    }, 3000); 
  }

}
