import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  currentImageIndex: number = 0;
  ngOnInit(): void {
  }
  imagePaths: string[] = [
    'assets/images/slika2jpg.jpg',
    'assets/images/slika1.jpg',
    'assets/images/slika3.jpg'
  ];
  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imagePaths.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.imagePaths.length) % this.imagePaths.length;
  }

  changeImage(index: number): void {
    this.currentImageIndex = index;
  }
}
