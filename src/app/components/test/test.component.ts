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
  imports: [RouterLink, RouterLinkActive, ButtonModule, CommonModule, CardModule, ProgressSpinnerModule,],
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

  content: string = '';
  author: string = '';

  Quote = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
    { content: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
    { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { content: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { content: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { content: "You define your own life. Don’t let other people write your script.", author: "Oprah Winfrey" },
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { content: "Life is what happens when you’re busy making other plans.", author: "John Lennon" },
    { content: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
    { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { content: "Life is short, and it’s up to you to make it sweet.", author: "Sarah Louise Delany" },
    { content: "The best revenge is massive success.", author: "Frank Sinatra" },
    { content: "Change the world by being yourself.", author: "Amy Poehler" },
    { content: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
    { content: "Never regret anything that made you smile.", author: "Mark Twain" },
    { content: "Die with memories, not dreams.", author: "Unknown" },
    { content: "Aspire to inspire before we expire.", author: "Unknown" },
    { content: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { content: "Whatever you are, be a good one.", author: "Abraham Lincoln" },
    { content: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
    { content: "What we think, we become.", author: "Buddha" },
    { content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { content: "Turn your face to the sun and the shadows fall behind you.", author: "Maori Proverb" },
];
  questions = [
    { text: 'Bạn có thường xuyên cảm thấy không có động lực để làm bất cứ điều gì?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy mất hứng thú với những hoạt động trước đây bạn từng yêu thích?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có thường xuyên cảm thấy bản thân vô dụng hoặc không đủ tốt?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có suy nghĩ tiêu cực hoặc tự trách móc bản thân nhiều lần trong ngày?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy khó ngủ hoặc ngủ quá nhiều so với bình thường?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy mệt mỏi, cạn kiệt năng lượng ngay cả khi không làm việc nhiều?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có gặp khó khăn trong việc đưa ra quyết định dù là những việc nhỏ?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy buồn, trống rỗng, hoặc vô vọng trong phần lớn thời gian?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy không muốn giao tiếp với mọi người hoặc tránh né xã hội?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm giác mình bị gánh nặng bởi trách nhiệm hoặc công việc?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm giác tội lỗi hoặc hối hận về những điều nhỏ nhặt?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy bản thân không xứng đáng được yêu thương hoặc quan tâm?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có suy nghĩ về việc tự làm hại bản thân hoặc tự tử?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy mất tập trung hoặc khó nhớ những điều đơn giản?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm giác mình là gánh nặng cho người khác?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm giác lo lắng hoặc bồn chồn mà không rõ nguyên nhân?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có gặp khó khăn trong việc duy trì cân bằng giữa công việc và cuộc sống cá nhân?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm thấy đau nhức hoặc khó chịu cơ thể mà không rõ lý do?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm giác sợ hãi hoặc ám ảnh không rõ nguyên nhân?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có thường xuyên khóc mà không rõ lý do?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
    { text: 'Bạn có cảm giác cuộc sống không có mục đích hoặc ý nghĩa?', choices: ['Không bao giờ', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'] },
];
adviceMap = [
  {
    category: 'Cảm xúc tiêu cực',
    questions: [0, 7, 20],
    advice: 'Bạn hãy thử chia sẻ cảm xúc của mình với người thân hoặc bạn bè. Nếu cảm giác buồn bã kéo dài, hãy cân nhắc tìm đến sự hỗ trợ từ chuyên gia tâm lý.'
  },
  {
    category: 'Mất hứng thú',
    questions: [1, 9],
    advice: 'Bạn hãy cố gắng bắt đầu với các hoạt động nhỏ mà bạn từng yêu thích. Thư giãn và đừng áp lực phải hoàn thành mọi thứ ngay lập tức.'
  },
  {
    category: 'Giấc ngủ và năng lượng',
    questions: [4, 5],
    advice: 'Hãy duy trì thói quen ngủ đều đặn và hạn chế sử dụng thiết bị điện tử trước khi ngủ.'
  },
  {
    category: 'Suy nghĩ tiêu cực',
    questions: [2, 3],
    advice: 'Nếu bạn thường tự trách móc bản thân, hãy ghi nhận những điều tích cực mà bạn đã làm.'
  },
  {
    category: 'Lo lắng và căng thẳng',
    questions: [15, 19],
    advice: 'Hãy dành cho mình thời gian tập thở sâu hoặc thiền định để giảm căng thẳng.'
  }
];
detailedAdvice: string[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  getRandomQuote(): void {
    const randomIndex = Math.floor(Math.random() * this.Quote.length);
    const randomQuote = this.Quote[randomIndex];
    this.content = randomQuote.content;
    this.author = randomQuote.author;
  }
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
    this.getRandomQuote();
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
    if (this.totalScore <= 9) return 'Không có dấu hiệu trầm cảm';
    if (this.totalScore <= 19) return 'Trầm cảm nhẹ';
    if (this.totalScore <= 29) return 'Trầm cảm vừa';
    if (this.totalScore <= 39) return 'Trầm cảm nặng';
    return 'Trầm cảm rất nặng';
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
  // phần đưa ra lời khuyên
  generateAdvice(): void {
    this.detailedAdvice = [];
    this.adviceMap.forEach(category => {
      let categoryScore = category.questions.reduce((sum, qIndex) => {
        return sum + (this.selectedChoices[qIndex] ?? 0);
      }, 0);
      if (categoryScore > 0) {
        this.detailedAdvice.push(category.advice);
      }
    });
  }

  showResults(): void {
    this.isAnalyzing = true;
    this.analysisText = 'Đang phân tích...';
    const messSection = document.getElementById('mess-section');
    if (messSection) {
      const offset = 100;
      const top = messSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    // Giả lập phân tích kết quả 
    setTimeout(() => {
      this.analysisText = 'Đã phân tích xong';
  
      // Tính tổng điểm
      this.totalScore = this.selectedChoices.reduce((acc: number, choice) => acc + (choice ?? 0), 0);
  
      // Xác định mức độ trầm cảm
      this.depressionLevel = this.getDepressionLevel();
  
      // Tạo lời khuyên
      this.generateAdvice();
      setTimeout(() => {
        this.isAnalyzing = false;
      }, 1000); 
    }, 3000); 
  }
  
  
}
