import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';   
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, 
    RouterLinkActive,
    CommonModule,
    SplitterModule,
    CardModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    InputGroupAddonModule,
    InputGroupModule,

  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
locations = [
  {
    image: 'assets/vsktt.jpg',
    name: 'Viện sức khỏe tâm thần Quốc gia - Bệnh viện Bạch Mai',
    address: '78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội.',
    rating: 5,
    description: `
      <h3>Thời gian làm việc:</h3>
      <p>Thứ 2 - Thứ 6 (khám trong khung giờ từ 6h45 - 16h00) và Thứ 7, Chủ nhật (khám trong khung giờ từ 7h30 - 16h00).</p>
      <h3>Thông tin:</h3>
      <p>Viện Sức khỏe Tâm thần Quốc gia cung cấp dịch vụ khám, tư vấn và điều trị chuyên sâu cho các vấn đề sức khỏe tâm lý. Đội ngũ bác sĩ và chuyên gia hàng đầu luôn sẵn sàng hỗ trợ bạn.</p>
      <h3>Lưu ý:</h3>
      <p>Viện sức khỏe tâm thần Quốc gia mỗi ngày phải tiếp đón rất nhiều lượt bệnh nhân, do vậy, ba mẹ nên đến sớm để lấy số khám để không bị chờ đợi quá lâu.</p>
      `
  },
  {
    image: 'assets/bvlktw.jpg',
    name: 'Khoa Sức khỏe Tâm thần - Bệnh viện Lão khoa Trung ương',
    address: 'Số 1A Phương Mai, Đống Đa, Hà Nội',
    rating: 4,
    description: `
      <h3>Thời gian làm việc:</h3>
      <p>Khám từ Thứ 2 - Thứ 6, có khám vào Thứ 7 nếu đặt lịch trước.</p>
      <h3>Thông tin:</h3>
      <p>Khoa Sức khỏe tâm thần, Bệnh viện Lão khoa Trung ương cũng là một trong những phòng khám tâm lý Hà Nội, chẩn đoán, điều trị rối loạn tâm thần nổi tiếng, được nhiều người lựa chọn. Bệnh viện không chỉ khám chữa bệnh cho người già mà còn có rất nhiều chuyên khoa khác nhau dành cho người bệnh từ 16 tuổi trở lên.</p>
      <h3>Lưu ý:</h3>
      <p>Nếu đi khám tại Bệnh viện Lão khoa Trung ương, ba mẹ nên tham khảo và đặt lịch khám với bác sĩ mình muốn từ trước đó để quá trình khám, chữa bệnh hiệu quả và thoải mái nhất </p>
      `
  },
  {
    image: 'assets/kazuoh.png',
    name: 'Phòng khám Tâm thần KaZuO',
    address: 'Ô 13-14 Lô 5B KĐT mới Trung Yên, Yên Hòa, Cầu Giấy, Hà Nội',
    rating: 4,
    description: `
      <h3>Thời gian làm việc:</h3>
      <p>Khám tất cả các ngày trong tuần.</p>
      <h3>Thông tin:</h3>
      <p>Phòng khám Tâm thần KaZuO là phòng khám tâm lý Hà Nội chuyên điều trị và thăm khám cho những bệnh nhân bị rối loạn tâm thần, trầm cảm uy tín hàng đầu với hiệu quả cao đã được công nhận.</p>
    `
  },
  {
    image: 'assets/dhyhn.png',
    name: 'Phòng khám số 1 - Bệnh viện Đại học Y Hà Nội',
    address: 'Nhà A5, số 1 Tôn Thất Tùng, Đống Đa, Hà Nội',
    rating: 5,
    description: `
      <h3>Thời gian làm việc:</h3>
      <p>Từ thứ 2 - thứ 6 ( 6h30 - 16h30) và Thứ 7 (7h00 - 11h30)</p>
      <h3>Thông tin:</h3>
      <p>Phòng khám số 1, Bệnh viện Đại học Y Hà Nội là một trong những phòng khám tâm lý Hà Nội hàng đầu. Khi đến đây, ba mẹ sẽ được những bác sĩ chuyên khoa đầu ngành trực tiếp kiểm tra, chẩn đoán và đưa ra phác đồ điều trị mang lại hiệu quả cao nhất.</p>
      <h3>Lưu ý:</h3>
      <p>Hiện tại phòng khám số 1 chỉ tiếp nhận bệnh nhân điều trị ngoại trú, với những trường hợp có nhu cầu điều trị nội trú sẽ được chuyển sang Bệnh viện Đại học Y hoặc những bệnh viện uy tín lân cận.</p>
      <p>Trước khi khám, ba mẹ nên tìm hiểu kỹ về lịch làm việc của phòng khám và các bác sĩ điều trị được cập nhật trên website và fanpage Bệnh viện Đại học Y hoặc gọi trực tiếp qua số hotline để lựa chọn được phương pháp điều trị phù hợp với bản thân. </p>
      `
  },
  {
    image: 'assets/yenhoa.jpg',
    name: 'Phòng khám Chuyên khoa Yên Hòa',
    address: '78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội.',
    rating: 4,
    description: `
      <h3>Thời gian làm việc:</h3>
      <p>Các ngày thứ 2, 4, 5, 7 và Sáng thứ 3, 6</p>
      <h3>Thông tin:</h3>
      <p>Phòng khám Chuyên khoa Yên Hòa là phòng khám tâm lý Hà Nội được nhiều bệnh nhân lựa chọn, với sự quản lý và điều trị trực tiếp bởi PGS.TS. Trần Hữu Bình.</p>
      <h3>Lưu ý:</h3>
      <p>Ba mẹ cần tìm hiểu lịch thăm khám, thông tin của phòng khám Chuyên khoa Yên Hòa trước khi tới để tránh trường hợp lịch bị thay đổi. Đặc biệt, việc này còn giúp cho người bệnh có thể chọn được bác sĩ như mình mong muốn giúp việc điều trị được hiệu quả hơn.</p>
      `
  },

];

// Trạng thái hiển thị mô tả cho từng card
isDescriptionVisible: boolean[] = this.locations.map(() => false);

toggleDescription(index: number) {
  this.isDescriptionVisible[index] = !this.isDescriptionVisible[index];
}
}
