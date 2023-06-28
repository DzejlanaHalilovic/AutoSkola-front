import { Component, OnInit } from '@angular/core';
import { AutaService } from '../auta.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-dodela-auta',
  templateUrl: './dodela-auta.component.html',
  styleUrls: ['./dodela-auta.component.css']
})
export class DodelaAutaComponent implements OnInit {

  constructor(private autoService:AutaService,private route: ActivatedRoute, private userService:UserService,private userStorage : Store<{user:User}>,private autaService:AutaService ) {
    this.userStorage.select('user').subscribe((res) =>
    {
      this.user = res
      console.log(this.user)
    })
  }
  user : User = {} as User
  auta:any = {};



  ngOnInit(): void {
    this.autaService.getAutaByUserId(this.user.painter.id)
    .subscribe((res:any) => {
      this.auta = res;
      console.log(res);

    },error => console.log(error))
    console.log(this.user.painter?.id);

  }
  dodeli(){
    
  }


}
