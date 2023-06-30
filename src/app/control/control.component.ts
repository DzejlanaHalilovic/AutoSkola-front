import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { KategorijeService } from '../kategorije.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(private userService:UserService, private router:Router,private kategorijaService:KategorijeService) { }
    users:any = [];
      kategorije:any = []
  ngOnInit(): void {
    this.getUsers();
     this.kategorijaService.getAllKategories()
    .subscribe(res => {
      this.kategorije = res.data
      console.log(res)
    },error => {
      console.log(error);

    })


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
            console.log(res);

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
