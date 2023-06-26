import { Component, OnInit } from '@angular/core';
import { OdsustvoService } from '../odsustvo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-odsustvo',
  templateUrl: './odsustvo.component.html',
  styleUrls: ['./odsustvo.component.css']
})
export class OdsustvoComponent implements OnInit {

  constructor(private odsustvoService:OdsustvoService, private routerActive : ActivatedRoute, private userStorage:Store<{user:User}>) {
    this.userStorage.select('user').subscribe(res =>
      {
        this.user = res
      })
  }
  user : User = {} as User
  id:any = 0;

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe
    (
      params => this.id = +(params.get('id')?? "0")
    )
    console.log(this.user)
  }
  forma = new FormGroup({
    razlog : new FormControl('',Validators.required),
    datumOdsustava:new FormControl('',Validators.required)
  })

  get razlog(){
    return this.forma.get('razlog')?.value
  }
  get datumOdsustava(){
    return this.forma.get('datumOdsustava')?.value
  }
  createOdsustvo(){
    let odsustvo = {
      userId:this.user.painter?.id,
      razlog :this.forma.get('razlog')?.value,
      datumOdsustava:this.forma.get('datumOdsustava')?.value
    }
    this.odsustvoService.createOdsustvo(odsustvo)
    .subscribe(res => {
      console.log(res)
    },error => console.log(error))
  }

}
