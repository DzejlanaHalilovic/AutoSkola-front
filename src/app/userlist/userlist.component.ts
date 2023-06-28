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
  ngOnInit(): void {
    this.getInstuctorList()
    this.getLearnerList()

    this.autoService.getAuta()
    .subscribe(res => {
      this.auta = res.data;
      console.log(res);
    },error => console.log(error));
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

  izaberiauto(){
    console.log("auto");
    this.idauta = +(document.getElementById('selectAuto')as HTMLInputElement).value;
    console.log(this.idauta);
  }

}
