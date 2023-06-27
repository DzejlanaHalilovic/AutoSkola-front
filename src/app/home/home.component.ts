import { Component, OnInit } from '@angular/core';
import { KategorijeService } from '../kategorije.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private kategorijaService:KategorijeService) { }
  currentImageIndex: number = 0;
  kategorije:any = []
  galleryImages :any = []
  currPageNumber : any = 1;
  ngOnInit(): void {
    this.filter();
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
  setCurrPage1(id:number)
  {
     this.currPageNumber = id;
     this.filter();
  }

  setPrevPage()
  {
   if(this.currPageNumber >= 2)
   this.currPageNumber--;
   this.filter();
  }

  setNextPage()
  {
     this.currPageNumber ++ ;
     this.filter();
  }
  filter(){
    let params = {
      currPage:this.currPageNumber,
      pageSize:3
    }
    this.kategorijaService.getFilter(params)
    .subscribe((res:any) => {
        this.galleryImages  =res.data;
    },error => {
      console.log(error)
    })
  }


}


