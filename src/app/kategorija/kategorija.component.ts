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
  ngOnInit(): void {
    this.kategorijaService.getAllKategories()
    .subscribe(res => {
      this.kategorije = res.data
      console.log(res)
    },error => {
      console.log(error);
    })

  }
  forma = new FormGroup(
    {
      tip:new FormControl('',Validators.required)
    }
  )
  get tip(){
    return this.forma.get('tip');
  }
  dodajKategoriju(){
    let kategorijanova = {
      tip :this.forma.get('tip')?.value
    }
    this.kategorijaService.createKategorija(kategorijanova)
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



}
