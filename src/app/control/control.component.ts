import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }
    users:any = [];
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers ()
  {
    this.userService.getUsers()
        .subscribe(res=>
          {
            this.users = res.data
          })
  }
  updateUser(id:any)
  {
    this.router.navigate([`update-user/${id}`]);
    this.getUsers();
  }

  deleteUser(id:any)
  {
    var result = confirm("Do you want to delete your account?");

    if (result) {
      this.userService.deleteUser(id)
      .subscribe((res:any)=>
        {


            alert('Your account was deleted')
            this.getUsers();

        },
        (error:any)=>
        {
            console.log(error)
        })
    } else {
      alert("You give up ");
    }

  }
}
