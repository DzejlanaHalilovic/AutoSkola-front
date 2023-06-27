import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateUser } from '../store/actions/user.actions';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  constructor(private userService:UserService,private routerActive:ActivatedRoute, private userStorage : Store<{user:User}>,private router:Router) { }

  user : any = {}
  id : number = 0;
  added : boolean = false;
  ngOnInit(): void {

    this.routerActive.paramMap.subscribe
    (
      params => this.id = +(params.get('id')?? "0")
    )
    this.userService.getById(this.id)
    .subscribe(res => {
      this.user = res
      console.log(this.user);
      this.updateForm.get('ime')?.setValue(this.user.ime);
      this.updateForm.get('prezime')?.setValue(this.user.prezime);
      this.updateForm.get('brojTelefona')?.setValue(this.user.brojTelefona);
    })
  }

  updateForm = new FormGroup({
    ime:new FormControl('',Validators.required),
    prezime:new FormControl('',Validators.required),
    brojTelefona:new FormControl('',[Validators.required])
  })


  get ime(){
    return this.updateForm.get('ime')
  }
  get prezime(){
    return this.updateForm.get('prezime')
  }
  get brojTelefona(){
    return this.updateForm.get('brojTelefona');
  }

  saveUser(){
    let user =
    {
      ime:this.updateForm.get('ime')?.value,
      prezime:this.updateForm.get('prezime')?.value,
      brojTelefona:this.updateForm.get('brojTelefona')?.value
    }
    this.userService.updateUser(this.id,user)
    .subscribe((res:any) => {
      this.added = true
      console.log("uspelo");
      this.userStorage.dispatch(updateUser({painter:res}))
        localStorage.setItem('user', JSON.stringify(this.user))
    },error => {
      console.log(error)
    })
    //this.router.navigate(['/control'])
  }
}
