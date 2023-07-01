import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-automobil',
  templateUrl: './automobil.component.html',
  styleUrls: ['./automobil.component.css']
})
export class AutomobilComponent implements OnInit {

  constructor(private rasposerService:RasporedService, private router:Router,private userService:UserService) { }

  auto:any = [];
  idkategorije:number = 2;
  kategorije: any = {}
  ngOnInit(): void {
    this.rasposerService.getAllAutmobil()
    .subscribe(res => {

      this.auto = res.data
      console.log(res)
    },error => {
      console.log(error)
    })
    this.userService.getAllKategories()
    .subscribe((res:any) => {
      this.kategorije= res.data,
      console.log(this.kategorije)
    },
    error  => {
      console.log(error);
    })
  }
  forma = new FormGroup({
    regBroj :new FormControl('',Validators.required),
    model:new FormControl('',Validators.required),

  })
  get regBroj(){
    return this.forma.get('regBroj')?.value
  }
  get model(){
    return this.forma.get('model')?.value
  }
  izaberiKategoriju(){
    console.log("kategorija");
    this.idkategorije = +(document.getElementById('selectKategorija') as HTMLInputElement).value;
    console.log(this.idkategorije);
  }

  dodajauto(){
    let auto ={
    regBroj :this.forma.get('regBroj')?.value,
    model:this.forma.get('model')?.value,
    KategorijaId:this.idkategorije
  }
  this.rasposerService.createautomobil(auto)
  .subscribe(res => {

    console.log(res)
  },error => {
    console.log(error)
  });

}

brisiAuto(id:number){
  this.rasposerService.deleteAutomobil(id)
  .subscribe(res => console.log(res),error => console.log(error))
}
id:any

otvoriUnosKvara(itemId: number) {
  this.router.navigate(['/unos-kvara', itemId]);
}
}
