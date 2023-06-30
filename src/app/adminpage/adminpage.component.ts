import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private userService: UserService, private routerActive : ActivatedRoute, private userStorage:Store<{user:User}>,private router:Router) {
    this.userStorage.select('user').subscribe(res =>
      {
        this.user = res
      })
  }

  user : User = {} as User;
  odabranInstuktor: boolean = false;
  instuktori: any = {};
  idinstuktora: number = 1;
  id: any = 0;
  kategorije: any = {};
  idkategorije: number = 2;

  ngOnInit(): void {
    this.userService.getjoinpolaznik(this.user.painter?.id)
      .subscribe((res: any) => {
        this.instuktori = res;
        console.log(res);
        console.log(this.instuktori[0].idd, "to je id");
      },
      error => {
        console.log(error);
      });

    console.log(this.user.painter?.id);

    this.routerActive.paramMap.subscribe(params => this.id = +(params.get('id') ?? "0"));

    console.log(this.user);
  }

  forma = new FormGroup({
    brojCasova: new FormControl()
  });

  dodajPolaznikaInstruktora() {
    let proba = {
      instruktorId: this.idinstuktora,
      polaznikId: this.user.painter?.id,
      brojCasova: this.forma.get('brojCasova')?.value
    };

    console.log(this.user.painter?.id);

    this.userService.createinstuktorraspored(proba)
      .subscribe(
        res => {
          console.log(res);
          this.odabranInstuktor = true;
        },
        error => {

          console.log(error);
          this.errorMessage = error.error;
        }
      );
  }

  errorMessage: string = '';
  selectedInstructor: string = '';
  instructors: any[] = [];
  idpolaznika: number = 2;

  izaberiinstuktora() {
    console.log("instruktori");
    this.idinstuktora = +(document.getElementById('selectinstuktor') as HTMLInputElement).value;
    console.log(this.idinstuktora);

    // Pronađite odabranog instruktora na osnovu ID-ja i postavite selectedInstructor
    const selectedInstructor = this.instuktori.find((place: any) => place.id === this.idinstuktora);
    if (selectedInstructor) {
      this.selectedInstructor = `${selectedInstructor.ime} ${selectedInstructor.prezime}`;
    }
  }
}
