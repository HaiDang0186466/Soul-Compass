import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bl-child',
  standalone: true,
  imports: [FieldsetModule,
    AvatarModule,
    CommonModule
  ],
  templateUrl: './bl-child.component.html',
  styleUrl: './bl-child.component.css'
})
export class BlChildComponent {
  comments = [
    { 
      avatar: 'assets/3.gif', 
      username: 'Nguyễn Văn B', 
      content: 'Rất Hay và xúc động', 
      likes: 19, 
      dislikes: 2,
      commentDate: '12/11/2024',
      liked: false, 
      disliked: false 
    },
    { 
      avatar: 'assets/3.gif', 
      username: 'Trần Thị A', 
      content: 'Tuyệt vời, cảm ơn!', 
      likes: 25, 
      dislikes: 1,
      commentDate: '13/11/2024',
      liked: false, 
      disliked: false 
    },
    { 
      avatar: 'assets/3.gif', 
      username: 'Lê Minh C', 
      content: 'Cảm động quá, mong được xem thêm!', 
      likes: 30, 
      dislikes: 3,
      commentDate: '14/11/2024',
      liked: false, 
      disliked: false
    },
    { 
      avatar: 'assets/3.gif', 
      username: 'Phạm Quang D', 
      content: 'Cảm ơn vì bài viết!', 
      likes: 15, 
      dislikes: 0,
      commentDate: '15/11/2024',
      liked: false, 
      disliked: false
    },
    { 
      avatar: 'assets/3.gif', 
      username: 'Bùi Hoàng E', 
      content: 'Rất hay, sẽ chia sẻ với bạn bè!', 
      likes: 10, 
      dislikes: 5,
      commentDate: '16/11/2024',
      liked: false, 
      disliked: false
    }
  ];

// Hàm xử lý khi nhấn nút like
toggleLike(comment: any) {
  if (comment.liked) {
    comment.likes--;
    comment.liked = false; 
  } else {
    comment.likes++;
    comment.liked = true; 
    if (comment.disliked) { 
      comment.dislikes--;
      comment.disliked = false;
    }
  }
}

// Hàm xử lý khi nhấn nút dislike
toggleDislike(comment: any) {
  if (comment.disliked) {
    comment.dislikes--;
    comment.disliked = false;
  } else {
    comment.dislikes++;
    comment.disliked = true;
    if (comment.liked) { 
      comment.likes--;
      comment.liked = false;
    }
  }
}
}
