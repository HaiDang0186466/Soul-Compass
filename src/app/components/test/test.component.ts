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
  showMessSection: boolean = false;
  showResultButton:boolean = false;
  showFinalResultSection: boolean = false;
  showTopSection: boolean = true;
  selectedAnswer!: string; 
  isMenuOpen = false;
  isDone: boolean = false;
  depressionLevel: string = ''; // To store the result message
  totalScore: number = 0;


  questions = [
    { text: 'Đây Là Câu Hỏi 1', answers: [{ text: 'Câu Trả Lời 1', score: 0 }, { text: 'Câu Trả Lời 2', score: 1 }, { text: 'Câu Trả Lời 3', score: 2 }, { text: 'Câu Trả Lời 4', score: 3 }] },
    { text: 'Đây Là Câu Hỏi 2', answers: [{ text: 'Câu Trả Lời 1', score: 0 }, { text: 'Câu Trả Lời 2', score: 1 }, { text: 'Câu Trả Lời 3', score: 2 }, { text: 'Câu Trả Lời 4', score: 3 }] },
  ];

  currentQuestionIndex = 0;
  selectedAnswers: (number | null)[] = Array(this.questions.length).fill(null); // Tracks selected scores


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

  // Tương tác với phần kiểm tra trạng thái hàng ngày:
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





  selectAnswer(score: number) {
    this.selectedAnswers[this.currentQuestionIndex] = score;
  }

  nextQuestion() {
    if (this.selectedAnswers[this.currentQuestionIndex] !== null) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  isAnswerSelected(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== null;
  }
  getProgress(): string {
    return `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
  }
  isQuit(){
    if (isPlatformBrowser(this.platformId)) {
      this.showTopSection = true;
      window.scrollTo({ top: 0, behavior: "smooth"})
      setTimeout(() => {
        this.showTestSection = false;
      }, 1000);
    }
  }
  
  calculateDepressionLevel() {
    if (this.totalScore <= 5) {
      this.depressionLevel = 'Không hoặc rất ít dấu hiệu trầm cảm';
    } else if (this.totalScore <= 10) {
      this.depressionLevel = 'Trầm cảm nhẹ';
    } else if (this.totalScore <= 15) {
      this.depressionLevel = 'Trầm cảm trung bình';
    } else if (this.totalScore <= 20) {
      this.depressionLevel = 'Trầm cảm nặng vừa';
    } else {
      this.depressionLevel = 'Trầm cảm nặng';
    }
    if (this.selectedAnswers.every(answer => answer !== null)) {
      this.totalScore = this.selectedAnswers.reduce(
        (acc: number, score: number | null) => acc + (score ?? 0),
        0
      );
      this.calculateDepressionLevel();
    }
  }

  toMess() {
    if (isPlatformBrowser(this.platformId)) {
      this.showMessSection = true; 
      console.log("roll", this.document);
      // Đợi Angular render xong trước khi cuộn xuống section
      setTimeout(() => {
        this.document.getElementById("Mess")?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      setTimeout(() => {
        this.showTestSection = false;
      }, 1000);
      // Bắt đầu animation thay đổi trạng thái sau 5 giây
      setTimeout(() => {
        this.isDone = true; 
      }, 5000);
      setTimeout(() => {
        this.showResultButton = true;
      }, 5000);
    }
    
  }
}