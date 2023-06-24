import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private userService:UserService) { }

  learner : any = [];
  instuctor :any = [];


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
