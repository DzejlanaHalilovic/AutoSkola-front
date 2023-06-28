import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AutaService } from '../auta.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private userService:UserService,private autoService:AutaService) { }

  learner : any = [];
  instuctor :any = [];
  auta:any = {}
idauta:any= 1;

  getLearnerList(){
    this.userService.getLearnerList()
    .subscribe((res:any) => {
      this.learner = res;
      console.log(this.learner)
    },
    error => {
      console.log(error);
    })
  }
  getInstuctorList(){
    this.userService.getInstructorList()
    .subscribe((res:any) => {
      this.instuctor = res;
      console.log(this.instuctor);
    },error => {
      console.log(error);
    })
  }
   kategorijaId :any = 5;

  ngOnInit(): void {
    this.getInstuctorList()
    this.getLearnerList()



  }


  userwithauto(userId:any){
    this.autoService.getAutaByUserId(userId)
    .subscribe((res:any) => {
      this.auta = res.data;
      console.log(this.auta);
    },error => console.log(error));
  }


  automobili = []
  autakategorija(id:any){
    this.autoService.getAutaByUserId(id)
    .subscribe(res => {
      this.auta = res;
      console.log(this.auta);
    },error =>  {
      console.log(error);
    })
  }

  acceptUser(id:number){
    this.userService.acceptUser(id)
    .subscribe(res => {
      console.log(res)
      alert("accepted")
      this.getLearnerList()
      this.getInstuctorList()
    },error => {
      console.log(error)
    })
  }

  declineUser(id:number){
    this.userService.declineUser(id)
    .subscribe(res => {
      console.log(res)
      alert("declined")
      this.getLearnerList()
      this.getInstuctorList()
    },
    error => {
      console.log(error);
    })
  }



}
