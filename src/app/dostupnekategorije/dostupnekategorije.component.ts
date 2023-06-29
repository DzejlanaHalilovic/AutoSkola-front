import { Component, OnInit } from '@angular/core';
import { KategorijeService } from '../kategorije.service';

@Component({
  selector: 'app-dostupnekategorije',
  templateUrl: './dostupnekategorije.component.html',
  styleUrls: ['./dostupnekategorije.component.css']
})
export class DostupnekategorijeComponent implements OnInit {

  constructor(private kategorijaService:KategorijeService) { }
  currentImageIndex: number = 0;
  kategorije:any = []
  galleryImages :any = []
  currPageNumber : any = 1;
  ngOnInit(): void {
    this.filter();
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
