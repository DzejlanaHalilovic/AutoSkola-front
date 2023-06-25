import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {


  constructor(private userService: UserService, private routerActive : ActivatedRoute, private userStorage:Store<{user:User}>) {
    this.userStorage.select('user').subscribe(res =>
      {
        this.user = res
      })
   }
   user : User = {} as User

  instuktori:any = {};
  polaznici:any = {};
  idinstuktora:number = 1
  id:any = 0;
  kategorije: any = {}
  idkategorije:number = 2;
  ngOnInit(): void {
    this.userService.getInstructorList()
    .subscribe((res:any) => {
      this.instuktori = res;
      console.log(this.instuktori[0].idd, "to je id")
    },
    error => {
      console.log(error
        )
    })
    console.log(this.user.painter?.id);

    this.routerActive.paramMap.subscribe
    (
      params => this.id = +(params.get('id')?? "0")
    )
    console.log(this.user)




  }

  dodajPolaznikaInstruktora(){
    let proba = {
      instruktorId :this.idinstuktora,
      polaznikId:this.user.painter?.id,

    }
    console.log(this.user.painter?.id)
    this.userService.createinstuktorraspored(proba)
    .subscribe(res => console.log(res),error => console.log(error));

  }




  selectedInstructor: any = null;
  instructors: any[] = [];
idpolaznika:number = 2;

izaberiinstuktora() {
  console.log("instuktori");
  this.idinstuktora = +(document.getElementById('selectinstuktor')as HTMLInputElement).value;
  console.log(this.idinstuktora);
}


}
