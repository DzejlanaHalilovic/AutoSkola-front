import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Raspored } from '../instuktor-raspored/instuktor-raspored.component';

@Component({
  selector: 'app-kreirajraspored',
  templateUrl: './kreirajraspored.component.html',
  styleUrls: ['./kreirajraspored.component.css']
})
export class KreirajrasporedComponent implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';

  constructor(private rasporedService:RasporedService,private route: ActivatedRoute,private router:Router,private userService:UserService) { }
  instruktorId?: number;
  polaznikId?: number;
  odsustvaInstruktora?: any[];
odsustvaPolaznika?: any[];
rasporedi: Raspored[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.instruktorId = Number(params.get('instruktorId'));
      this.polaznikId = Number(params.get('polaznikId'));
    });

    this.rasporedService.getzakorisnikeodsustvo(this.instruktorId).subscribe(
      res => {
        this.odsustvaInstruktora = res;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );

    this.rasporedService.getzakorisnikeodsustvo(this.polaznikId).subscribe(
      res => {
        this.odsustvaPolaznika = res;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );

    this.rasporedService.rasporezapolaznikatop10(this.instruktorId)
    .subscribe(
      async (res: Raspored[]) => {
        this.rasporedi = res;
        console.log(this.rasporedi);
        for(const raspored of this.rasporedi){
          const polaznik = await this.userService.getById(raspored.polaznikId).toPromise();
          const instruktor = await this.userService.getById(raspored.instruktorId).toPromise();
          raspored.polaznikImePrezime = `${polaznik.ime} ${polaznik.prezime}`;
          raspored.instruktorImePrezime = `${instruktor.ime} ${instruktor.prezime}`;
        }
      },
      (error: any) => console.log(error)
    );


  }
  dodeliRaspored() {
    if (!this.selectedDate || !this.selectedTime) {
      console.log('Molimo unesite datum i vreme');
      return;
    }

    const rasporedRequest = {
      InstruktorId: this.instruktorId,
      PolaznikId: this.polaznikId,
      DatumVreme: new Date(`${this.selectedDate} ${this.selectedTime}`)
    };

    this.rasporedService.postRasporedzakorisnike(rasporedRequest).subscribe(
      res => {
        console.log('Raspored je kreiran:', res);
        this.router.navigate(['raspored']); // Redirekcija na prethodnu stranicu 'raspored'
      },
      error => {
        console.log('Greška prilikom kreiranja rasporeda:', error);
      }
    );
  }

  brisiodsustnostzainstuktora(){
    this.rasporedService.brisiodsutvo(this.instruktorId)
    .subscribe(res => {
      console.log(res)
    },
    error => console.log(error))
  }

  brisiodsustnostzapolaznika(){
    this.rasporedService.brisiodsutvo(this.polaznikId)
    .subscribe(res => {
      console.log(res)
    },
    error => console.log(error))
  }

  filtriraniRasporedi: any[] = [];

  filter() {
    if (!this.selectedDate || !this.instruktorId) {
      console.log('Molimo unesite datum i ID instruktora');
      return;
    }

    this.rasporedService.filterpodatumu(this.selectedDate, this.instruktorId)
      .subscribe(
        (res: any) => {
          console.log("nista")
          console.log('Filtrirani rasporedi:', res);

          this.filtriraniRasporedi = res;
        },
        (error: any) => {
          console.log('Greška prilikom filtriranja rasporeda:', error);

        }
      );
  }

  }





