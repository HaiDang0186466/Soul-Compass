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
  alertShown = false; 
  startTime: number= 0;
  timeoutDuration: number = 2000;


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
  { text: 'Khi ở nhà một mình, em thường làm gì?', choices: ['Chơi đồ chơi hoặc xem tivi', 'Nghĩ về việc đi chơi với bạn bè', 'Cảm thấy buồn và muốn ai đó ở cùng', 'Không biết làm gì và cảm thấy chán'] },
  { text: 'Khi không có ai chơi cùng, em cảm thấy thế nào?', choices: ['Vẫn vui vì có thể tự chơi', 'Một chút buồn nhưng không sao', 'Rất buồn và không muốn làm gì cả', 'Bực bội vì không ai ở bên'] },
  { text: 'Em làm gì khi cảm thấy buồn?', choices: ['Nói chuyện với ba/mẹ hoặc anh/chị', 'Ngồi khóc một lúc rồi cảm thấy ổn hơn', 'Đi tìm bạn để nói chuyện', 'Không biết làm gì và cảm thấy buồn cả ngày'] },
  { text: 'Khi ở trường, em cảm thấy thế nào nếu không ai nói chuyện với em?', choices: ['Bình thường, em quen như vậy rồi', 'Hơi chán nhưng không sao', 'Buồn và không muốn đi học', 'Rất buồn và không muốn nói chuyện với ai nữa'] },
  { text: 'Em cảm thấy thế nào khi không được ai chú ý trong nhóm?', choices: ['Em không quan tâm lắm', 'Hơi buồn nhưng cố gắng hòa nhập', 'Cảm thấy cô đơn và muốn rời đi', 'Rất giận và không muốn chơi nữa'] },
  { text: 'Em có lo lắng trước giờ kiểm tra không?', choices: ['Không, vì em đã học bài đầy đủ', 'Hơi lo vì sợ quên bài', 'Rất lo vì nghĩ rằng em sẽ làm không tốt', 'Lo đến mức không muốn đi học'] },
  { text: 'Em cảm thấy thế nào khi có nhiều bài tập ở trường?', choices: ['Làm từ từ và cảm thấy ổn', 'Hơi mệt nhưng vẫn cố làm xong', 'Rất mệt và muốn bỏ bài tập', 'Bực bội và không muốn làm gì cả'] },
  { text: 'Khi em nghĩ đến ngày mai có một cuộc thi lớn, em cảm thấy thế nào?', choices: ['Phấn khích vì em đã chuẩn bị tốt', 'Hơi lo lắng nhưng vẫn ổn', 'Cực kỳ lo lắng và muốn trốn tránh', 'Không muốn tham gia vì sợ thất bại'] },
  { text: 'Khi em không hiểu bài giảng, em sẽ làm gì?', choices: ['Hỏi thầy cô ngay lập tức', 'Chờ khi nào rảnh thì hỏi bạn', 'Không quan tâm và bỏ qua', 'Cảm thấy áp lực và buồn bực'] },
  { text: 'Khi em gặp một người bạn mới, em thường làm gì?', choices: ['Chào hỏi và hỏi xem bạn ấy thích gì', 'Quan sát một lúc trước khi nói chuyện', 'Cảm thấy ngại và không dám nói chuyện', 'Chỉ chơi với bạn mình quen thôi'] },
  { text: 'Khi bạn bè không chơi với em, em sẽ làm gì?', choices: ['Đi tìm nhóm bạn khác để chơi', 'Hỏi lý do tại sao bạn không chơi với em', 'Cảm thấy buồn và không nói gì cả', 'Tránh xa nhóm bạn đó và không muốn gặp lại'] },
  { text: 'Em có thường chơi hòa đồng với các bạn không?', choices: ['Luôn luôn hòa đồng với tất cả mọi người', 'Thỉnh thoảng có tranh cãi nhưng không lớn', 'Hay xảy ra cãi vã khi chơi cùng', 'Khó hòa hợp với bạn bè'] },
  { text: 'Nếu bạn của em làm điều gì đó không tốt với em, em sẽ làm gì?', choices: ['Kể với thầy cô hoặc người lớn', 'Tránh xa bạn đó một thời gian', 'Giận và không muốn chơi với bạn đó nữa', 'Em cảm thấy rất khó chịu và muốn đánh bạn'] },
  { text: 'Khi thấy bạn bè gặp khó khăn, em sẽ làm gì?', choices: ['Giúp đỡ bạn ấy ngay', 'Hỏi xem bạn ấy có cần giúp không', 'Không giúp vì em cũng đang bận', 'Lờ đi vì nghĩ đó không phải việc của em'] },
  { text: 'Khi em gặp vấn đề ở trường, em sẽ nói với ai đầu tiên?', choices: ['Ba hoặc mẹ', 'Anh/chị hoặc người thân khác', 'Một người bạn thân thiết', 'Không nói với ai cả'] },
  { text: 'Em cảm thấy thế nào khi ba/mẹ bận rộn và không nói chuyện với em nhiều?', choices: ['Thông cảm vì ba/mẹ đi làm vất vả', 'Hơi buồn nhưng cố gắng vui vẻ', 'Rất buồn', 'Cực kỳ buồn và muốn khóc rất nhiều'] },
  { text: 'Em có thường tham gia vào các hoạt động gia đình không?', choices: ['Luôn luôn tham gia và rất thích', 'Tham gia nhưng không thường xuyên', 'Ít khi tham gia vì không thích', 'Em muốn né tránh và không muốn tham gia'] },
  { text: 'Khi em làm điều gì đó tốt, ba/mẹ em thường làm gì?', choices: ['Khen ngợi và động viên em', 'Nói rằng em làm tốt nhưng cần cố hơn', 'Không để ý lắm', 'Chỉ nhắc đến những điều em chưa làm tốt'] },
  { text: 'Khi đang ăn cơm và thời sự chiếu tấm gương nghèo vượt khó, ba/mẹ em thường làm gì?', choices: ['Không để ý lắm', 'Nói rằng em cần học tập họ', 'So sánh em với họ khiến em cảm thấy buồn', 'Nói rằng em không bằng 1 phần của họ'] },
  { text: 'Em cảm thấy thế nào khi cả nhà đi chơi chung?', choices: ['Rất vui và mong muốn đi thường xuyên', 'Vui nhưng không phải lúc nào cũng thích', 'Em không quan tâm lắm', 'Không thích vì không thoải mái'] },
  { text: 'Em cảm thấy thế nào khi làm bài tập mà thầy cô giao?', choices: ['Thích vì nó giúp em học thêm', 'Làm vì đó là nhiệm vụ phải làm', 'Chỉ làm khi thầy cô kiểm tra', 'Thấy rất chán và không muốn làm'] },
  { text: 'Khi thầy cô khen em trước cả lớp, em sẽ cảm thấy sao?', choices: ['Rất vui và tự hào', 'Hơi ngại nhưng vẫn vui', 'Không thích vì cảm thấy không thoải mái', 'Em không quan tâm'] },
  { text: 'Khi thầy cô phạt em vì làm sai, em thường làm gì?', choices: ['Chấp nhận và sửa lỗi', 'Cảm thấy buồn nhưng vẫn cố sửa', 'Nghĩ rằng thầy cô không thích em', 'Giận và không muốn làm theo lời thầy cô'] },
  { text: 'Khi thầy cô hỏi bài em chưa chuẩn bị kịp, em sẽ làm gì?', choices: ['Trả lời những gì em biết', 'Xin lỗi vì chưa chuẩn bị', 'Im lặng vì sợ sai', 'Nói dối để tránh bị phạt'] },
  { text: 'Khi có buổi học nhóm, em sẽ làm gì?', choices: ['Tham gia nhiệt tình', 'Làm theo hướng dẫn của nhóm', 'Ngồi im và để nhóm tự làm', 'Không muốn tham gia'] },
  { text: 'Em thường ngủ bao nhiêu tiếng mỗi ngày?', choices: ['Hơn 8 tiếng và em cảm thấy rất khỏe', 'Khoảng 7-8 tiếng', 'Chỉ khoảng 5-6 tiếng, em thường xuyên mệt mỏi', 'Ít hơn 5 tiếng, em luôn cảm thấy buồn ngủ'] },
  { text: 'Khi ăn sáng, em thường được ăn món gì?', choices: ['Món có đầy đủ dinh dưỡng như cơm, phở', 'Bánh mì hoặc món nhẹ nhàng', 'Thỉnh thoảng em mới ăn sáng', 'Em không bao giờ ăn sáng'] },
  { text: 'Em có thường vận động như chạy nhảy hoặc tập thể dục không?', choices: ['Thường xuyên vận động mỗi ngày', 'Thỉnh thoảng vận động khi rảnh', 'Ít vận động vì không thích', 'Em không thích vận động vì rất mệt'] },
  { text: 'Em có thường xuyên ăn đồ ngọt không?', choices: ['Em không thích ăn đồ ngọt lắm', 'Thỉnh thoảng em mới ăn', 'Em thường xuyên ăn đồ ngọt', 'Lúc nào em cũng ăn và có đồ ngọt là ăn luôn'] },
  { text: 'Em có thường xuyên ăn những đồ chiên rán không', choices: ['Em không thường xuyên ăn', 'Thỉnh thoảng em mới ăn', 'Em thường xuyên ăn', 'Ngày nào em cũng ăn đồ chiên rán'] },
];
adviceMap = [
  {
    category: 'Cảm xúc và tâm trạng',
    questions: [0, 1, 2, 3, 4],
    advice: 'Nếu em cảm thấy buồn và cô đơn, điều đó là bình thường, nhưng đừng để cảm giác này kéo dài quá lâu nhé. Hãy thử nói chuyện với ba mẹ hoặc anh chị em, hoặc làm một việc em thích để vui lên như chơi thể thao, vẽ tranh hay nghe nhạc.'
  },
  {
    category: 'Lo lắng và Áp lực',
    questions: [5, 6, 7, 8, 9],
    advice: 'Khi em thấy lo lắng hay căng thẳng, em có thể thử hít thở sâu vài lần để cảm thấy dễ chịu hơn. Cũng đừng quên làm những việc giúp em thư giãn như chơi ngoài trời, đi bộ hoặc chơi với thú cưng nhé!'
  },
  {
    category: 'Quan hệ với Bạn bè',
    questions: [10, 11, 12, 13, 14],
    advice: 'Nếu em cảm thấy khó kết bạn hay không vui khi chơi cùng nhóm bạn, hãy chia sẻ cảm giác của mình với một người em tin tưởng. Đôi khi một câu chuyện nhẹ nhàng sẽ giúp em cảm thấy thoải mái hơn và mở lòng hơn với bạn bè.'
  },
  {
    category: 'Quan hệ Gia đình',
    questions: [15, 16, 17, 18, 19],
    advice: 'Nếu em cảm thấy ba mẹ quá bận rộn và ít dành thời gian cho em, hãy nói cho ba mẹ biết em đang cảm thấy như thế nào. Thỉnh thoảng, một buổi chiều cùng ba mẹ làm một hoạt động nào đó sẽ giúp em cảm thấy gắn kết và yêu thương hơn.'
  },
  {
    category: 'Học tập và Thầy cô',
    questions: [20, 21, 22, 23, 24],
    advice: 'Nếu em cảm thấy học hành có quá nhiều điều phải lo lắng, đừng ngần ngại hỏi thầy cô hoặc bạn bè khi em không hiểu. Một chút thời gian nghỉ ngơi, chơi đùa cũng sẽ giúp em cảm thấy thoải mái và học tập hiệu quả hơn.'
  },
  {
    category: 'Lối sống và Thói quen Sinh hoạt',
    questions: [25, 26, 27, 28, 29],
    advice: 'Khi em thấy mệt mỏi, có thể là do ngủ không đủ giấc hoặc ăn uống không hợp lý. Hãy thử thay đổi thói quen của mình, ăn đủ chất và ngủ đủ giấc để cảm thấy tràn đầy năng lượng mỗi ngày!'
  }
];

detailedAdvice: string[] = [];

constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    
) {}
  getRandomQuote(): void {
    const randomIndex = Math.floor(Math.random() * this.Quote.length);
    const randomQuote = this.Quote[randomIndex];
    this.content = randomQuote.content;
    this.author = randomQuote.author;
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
    this.startAnswerTime(); 
    setTimeout(() => {
      this.checkTimeAndShowAlert(); // Kiểm tra trạng thái sau 2 giây
    }, this.timeoutDuration);
  }
  // Phần logic test
  ngOnInit(): void {
    this.getRandomQuote();
    this.selectedChoices = Array(this.questions.length).fill(null);
    if (isPlatformBrowser(this.platformId)) {
    } 
  }
  // Bắt đầu tính thời gian
  startAnswerTime(): void {
    this.startTime = Date.now(); 
    this.alertShown = false; 
  }
 // Kiểm tra thời gian và hiển thị cảnh báo nếu đã quá 2 giây
 checkTimeAndShowAlert(): void {
  if (!this.alertShown) {
    console.log('Không có hành động nào trong vòng 2 giây.');
  }
}
 // Sự kiện người dùng chọn đáp án
 onAnswerSelected(): void {
  const elapsedTime = Date.now() - this.startTime; // Tính thời gian đã trôi qua
  if (elapsedTime <= this.timeoutDuration && !this.alertShown) {
    this.alertShown = true; 
    alert('Hãy suy nghĩ kỹ trước khi chọn đáp án !');
  }
}
  selectChoice(index: number): void {
    // Cập nhật lựa chọn của người dùng
    this.selectedChoices[this.currentQuestionIndex] = index;
  }
   // Kiểm tra xem câu hỏi có mâu thuẫn
   checkConsistency(): boolean {
    let contradictionCount = 0;
    let allSameChoice = true;
  
    // Duyệt qua từng category
    for (let category of this.adviceMap) {
      let choiceCount = { A: 0, B: 0, D: 0 }; // Đếm số lượng câu trả lời A, B và D cho category này
      let categoryChoices = new Set();
      // Duyệt qua các câu hỏi trong category
      for (let questionIndex of category.questions) {
        const selectedChoice = this.selectedChoices[questionIndex];
        
        if (selectedChoice !== null) {
          // Kiểm tra câu trả lời và đếm các loại đáp án
          if (selectedChoice === 0 || selectedChoice === 1) {
            choiceCount.A += 1; // Chọn A hoặc B
          } else if (selectedChoice === 3) {
            choiceCount.D += 1; // Chọn D
          }
           // Thêm lựa chọn vào Set để kiểm tra sự giống nhau
          categoryChoices.add(selectedChoice);
          if (this.selectedChoices[category.questions[0]] !== selectedChoice) {
            allSameChoice = false; // Nếu có câu trả lời khác nhau, đánh dấu là không giống nhau
          }
        }
      }
      if (categoryChoices.size === 1) {
        contradictionCount++; // Nếu tất cả các câu trả lời trong category giống nhau, coi là mâu thuẫn
      }
      // Kiểm tra mâu thuẫn: Có ít nhất 2 câu A hoặc B và có ít nhất 2 câu D
      if (choiceCount.A >= 2 && choiceCount.D >= 2) {
        contradictionCount++;
      }
      if (allSameChoice) {
        return false; // Nếu tất cả câu trả lời giống nhau, trả về false (không thể phân tích)
      }
      
    }
    // Nếu có 2 mâu thuẫn trở lên trong tổng 6 category, kết luận là không thể phân tích được
    return contradictionCount < 2; // Nếu có 2 mâu thuẫn trở lên, trả về false (không thể phân tích)
  }
  
  goNext(): void {
    if (this.selectedChoices[this.currentQuestionIndex] !== null && this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.startAnswerTime();
    }
  }

  goBack(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
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
    const messSection = document.getElementById('mess-section');
    if (messSection) {
      const offset = 100;
      const top = messSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (!this.checkConsistency()) {
      this.depressionLevel = 'Không thể phân tích được kết quả do người dùng trả lời các câu hỏi mâu thuẫn nhau';
      return;
    }
    this.isAnalyzing = true;
    this.analysisText = 'Đang phân tích...';
    setTimeout(() => {
      this.analysisText = 'Đã phân tích xong';
      let categoryScores = this.adviceMap.map(category => {
        const categoryScore = category.questions.reduce((sum, qIndex) => {
          return sum + (this.selectedChoices[qIndex] ?? 0);
        }, 0);
        return categoryScore;
      });
      let highScoreCategories = categoryScores.filter(score => score >7).length;
      if (highScoreCategories >= 3) {
        this.depressionLevel = 'Có dấu hiệu trầm cảm';
      } else {
        this.depressionLevel = 'Không có dấu hiệu trầm cảm';
      }
      this.generateAdvice();
      this.isAnalyzing = false;
    }, 3000);
  }
  generateAdvice(): void {
    this.detailedAdvice = [];
    this.adviceMap.forEach(category => {
      let categoryScore = category.questions.reduce((sum, qIndex) => {
        return sum + (this.selectedChoices[qIndex] ?? 0);
      }, 0);
      if (categoryScore >= 7) {
        this.detailedAdvice.push(category.advice);
      }
    });
  }
}