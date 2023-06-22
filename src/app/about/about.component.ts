import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  imagePaths: string[] = [
    'assets/images/slika4.jpg',
    'assets/images/slika6.jpg',
    'assets/images/slika7.jpg',
    'assets/images/slika8.jpg',

  ];

}
