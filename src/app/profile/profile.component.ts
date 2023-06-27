import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { logout } from '../store/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService, private router:Router,private userStorage : Store<{user:User}> ) {
    this.userStorage.select('user').subscribe((res) =>
    {
      this.user = res
      console.log(this.user)
    })
   }
   user : User = {} as User

  ngOnInit(): void {
    
  }


  updateUser(id:any){
    this.router.navigate([`update-user/${this.user.painter.id}`])
  }

  deleteUser(id:any){
    var result = confirm("Do you want to delete your account?");
    if (result) {
      this.userService.deleteUser(this.user.painter.id)
      .subscribe((res:any)=>
        {

            this.userStorage.dispatch(logout())
            localStorage.removeItem('user'); //?
            this.router.navigate(['']);
            alert('Your account was deleted')

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
