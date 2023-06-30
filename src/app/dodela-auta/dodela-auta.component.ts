import { Component, OnInit } from '@angular/core';
import { AutaService } from '../auta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dodela-auta',
  templateUrl: './dodela-auta.component.html',
  styleUrls: ['./dodela-auta.component.css']
})
export class DodelaAutaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private userStorage: Store<{ user: User }>, private autaService: AutaService, private router: Router) {
    this.userStorage.select('user').subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  user: User = {} as User;
  auta: any = {};
  odabranAutomobil: boolean = false;
  odabraniAuto: any;
  izabranoAuto: boolean = false;

  ngOnInit(): void {
    this.autaService.getAutaByUserId(this.user.painter.id)
      .subscribe((res: any) => {
        this.auta = res;
        console.log(res);
      }, error => console.log(error));
    console.log(this.user.painter?.id);
  }

  idauta: any = -1;

  izaberiauto() {
    console.log("auto");
    this.idauta = +(document.getElementById('selectAuto') as HTMLInputElement).value;
    console.log(this.idauta);
  }

  dodeli() {
    let proba = {
      instruktorId: this.user.painter.id,
      automobilId: this.idauta
    };

    console.log(proba);
    this.autaService.createauto(proba)
      .subscribe(res => {
        console.log(res);
        this.odabraniAuto = this.auta.find((auto: any) => auto.id === this.idauta);
        this.odabranAutomobil = true;
        this.izabranoAuto = true;
        this.router.navigate(['/home']);
      }, error => console.log(error));
  }
}
