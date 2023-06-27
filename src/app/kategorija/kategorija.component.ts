import { Component, OnInit } from '@angular/core';
import { KategorijeService } from '../kategorije.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kategorija',
  templateUrl: './kategorija.component.html',
  styleUrls: ['./kategorija.component.css']
})
export class KategorijaComponent implements OnInit {

  constructor(private kategorijaService:KategorijeService) { }
  kategorije:any = []
  galleryImages :any = []
  currPageNumber : any = 1;
  ngOnInit(): void {
    this.kategorijaService.getAllKategories()
    .subscribe(res => {
      this.kategorije = res.data
      console.log(res)
    },error => {
      console.log(error);
    })

    this.filter();

  }
  forma = new FormGroup(
    {
      tip:new FormControl('',Validators.required),
      image : new FormControl()

    }
  )
  get tip(){
    return this.forma.get('tip');
  }
  get Putanja(){
    return this.forma.get('image');
  }
  dodajKategoriju(){
    let inputElement = document.getElementById('customFile') as HTMLInputElement;
    const putanja = inputElement?.files?.[0];
    var formData = new FormData();
    formData.append('tip', this.forma.get('tip')?.value);
    formData.append('putanja',  putanja || "");
    this.kategorijaService.createKategorija(formData)
    .subscribe(res => {
      console.log(res)
    },error => {
      console.log(error);
    })
  }

  brisiKategoriju(id:number){
    this.kategorijaService.deleteKategorija(id)
    .subscribe(res => {
      console.log(res)
    },error => {
      console.log(error);
    })
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
