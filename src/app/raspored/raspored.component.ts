import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
})
export class RasporedComponent implements OnInit {

  constructor(private userService:UserService) { }

  userpolaznik:any = [];
  ngOnInit(): void {

    this.userService.getPolaznikSaInstuktorom()
    .subscribe(res => {
      this.userpolaznik = res.data
    },error => console.log(error))
  }
  dodelikategoriju(){
    
  }
}
