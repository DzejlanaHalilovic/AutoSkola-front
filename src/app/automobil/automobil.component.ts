import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-automobil',
  templateUrl: './automobil.component.html',
  styleUrls: ['./automobil.component.css']
})
export class AutomobilComponent implements OnInit {

  constructor(private rasposerService:RasporedService, private router:Router) { }

  auto:any = [];
  ngOnInit(): void {
    this.rasposerService.getAllAutmobil()
    .subscribe(res => {

      this.auto = res.data
      console.log(res)
    },error => {
      console.log(error)
    })
  }
  forma = new FormGroup({
    regBroj :new FormControl('',Validators.required),
    model:new FormControl('',Validators.required)
  })
  get regBroj(){
    return this.forma.get('regBroj')?.value
  }
  get model(){
    return this.forma.get('model')?.value
  }

  dodajauto(){
    let auto ={
    regBroj :this.forma.get('regBroj')?.value,
    model:this.forma.get('model')?.value
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
