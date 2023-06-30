import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private userService : UserService) { }

  forma = new FormGroup(
    {
      email : new FormControl()
    }
  )
  sent : boolean = false;
  ngOnInit(): void {
  }

  send()
  {

    this.userService.forgotPassword(JSON.stringify(this.forma.get('email')?.value))
    .subscribe(res=>
      {
        console.log(res)
        this.sent = true;
      },
      error=>
      {
        console.log(error)
      })
  }
}
