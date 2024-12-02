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
import { Router } from '@angular/router';

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
    CommonModule,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  chips = [
    { label: 'Love', icon: 'pi pi-heart-fill', style: { color: 'red' } },
    { label: 'Funny', icon: 'pi pi-face-smile', style: { color: '#c2c50f' } },
    { label: 'Story', icon: 'pi pi-book' },
    { label: 'People', icon: 'pi pi-users' },
    { label: 'Art', icon: 'pi pi-palette' },
    { label: 'Pics', icon: 'pi pi-images' },
  ];

  items = [
    { title: 'Cuộc sống hàng ngày', image: 'assets/2.gif', like:'969' },
    { title: 'Nghệ thuật cuộc sống', image: 'assets/3.gif', like:'643' },
    { title: 'Câu chuyện buồn', image: 'assets/4.gif', like:'569' },
    { title: 'Những bức tranh đẹp', image: 'assets/5.gif', like:'786' },
    { title: 'Con người và cuộc sống', image: 'assets/6.gif', like:'660' },
  ];

  blogs = [
    { id: 1, title: 'Cuộc sống hàng ngày', image: 'assets/2.gif', tags: ['Love', 'Story', 'People'], author: 'Nguyễn Văn A', watch:'1000', like:'969'},
    { id: 2, title: 'Cuộc tranh cử của tôi', image: 'assets/trump.jpg', tags: ['Story', 'People'], author: 'Đỗ Nam Trung', watch:'999', like:'969' },
    { id: 3,title: 'Cách tôi thống nhất đất nước', image: 'assets/kim.jpg', tags: ['Story','Funny','People'], author: 'Kim Chính Ân', watch:'999', like:'989' },
    { id: 4,title: 'Nghệ thuật cuộc sống', image: 'assets/3.gif', tags: ['Art', 'Pics'], author: 'Nguyễn Văn B', watch:'690', like:'643' },
    { id: 5,title: 'Câu chuyện buồn', image: 'assets/4.gif', tags: ['Story', 'People'], author: 'Nguyễn Văn C', watch:'596', like:'569' },
    { id: 6,title: 'Những khoảnh khắc đẹp', image: 'assets/5.gif', tags: ['Pics'], author: 'Nguyễn Văn D', watch:'203', like:'86' },
    { id: 7,title: 'Con người và cuộc sống', image: 'assets/6.gif', tags: ['People', 'Love'], author: 'Nguyễn Văn E', watch:'698', like:'660' },
    { id: 8,title: 'Cách vực dậy tinh thần', image: 'assets/1.gif', tags: ['People', 'Love'], author: 'Nguyễn Văn E', watch:'658', like:'621' },
    { id: 9,title: 'Nghệ thuật là bất tận', image: 'assets/14.gif', tags: ['Art', 'Love'], author: 'Nguyễn Văn E', watch:'698', like:'660' },
    { id: 10,title: 'Thất bại là mẹ thành công', image: 'assets/8.gif', tags: ['Story', 'Love'], author: 'Nguyễn Văn E', watch:'698', like:'660' },
    { id: 11,title: 'Cách giao tiếp cơ bản', image: 'assets/9.gif', tags: ['Story', 'People'], author: 'Nguyễn Văn E', watch:'798', like:'760' },
    { id: 12,title: 'Nỗi buồn trong tôi', image: 'assets/hamster.jpg', tags: ['Story',], author: 'Nguyễn Văn E', watch:'569', like:'486' }, 
  ];
  selectedTags: string[] = [];
  filteredBlogs = this.blogs;
  searchTerm: string = '';

  responsiveOptions = [
    { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit(): void {
   
  }
  viewBlog(blog: any) {
    this.router.navigate(['/bl-child'], { queryParams: blog });
  }
  

  // Toggle Chip Selection
  toggleChip(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.filterBlogs();
  }

  // Clear Chips
  clearChips() {
    this.selectedTags = [];
    this.filterBlogs();
  }
  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterBlogs();
  }
  filterBlogs() {
    // Lọc theo các tiêu chí từ khóa và tags
    this.filteredBlogs = this.blogs
      .filter(blog => {
        const isTagMatch = this.selectedTags.length === 0 || this.selectedTags.some(tag => blog.tags.includes(tag));
        const isSearchMatch = blog.title.toLowerCase().includes(this.searchTerm);
        return isTagMatch && isSearchMatch;
      })
      .sort((a, b) => {
        // Tính điểm tương đồng dựa trên số lượng từ khóa xuất hiện trong tiêu đề
        const aMatchScore = this.getMatchScore(a.title.toLowerCase(), this.searchTerm);
        const bMatchScore = this.getMatchScore(b.title.toLowerCase(), this.searchTerm);
        
        // Sắp xếp theo điểm tương đồng giảm dần
        return bMatchScore - aMatchScore;
      });
  }

  // Hàm tính điểm tương đồng giữa tiêu đề và từ khóa tìm kiếm
  getMatchScore(title: string, searchTerm: string): number {
    const titleWords = title.split(' ');
    const searchWords = searchTerm.split(' ');
    let score = 0;

    // Điểm tăng nếu tiêu đề chứa các từ khóa từ searchTerm
    searchWords.forEach(searchWord => {
      titleWords.forEach(titleWord => {
        if (titleWord.includes(searchWord)) {
          score += 1;
        }
      });
    });

    return score;
  }
  toBlogs() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.getElementById("blogs")?.scrollIntoView({ behavior: "smooth" });
    }
  }
}