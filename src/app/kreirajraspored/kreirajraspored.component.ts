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
  timeRangeStart = '08:00';
timeRangeEnd = '14:00';

  constructor(private rasporedService:RasporedService,private route: ActivatedRoute,private router:Router,private userService:UserService) { }
  instruktorId?: number;
  polaznikId?: number;
  odsustvaInstruktora?:  any[];
odsustvaPolaznika?: any[];
zauzetoVremeError?:boolean = false
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


    // Sortiranje rasporeda po imenu i prezimenu instruktora
    this.rasporedi.sort((a, b) => {
      const instruktorA = a?.instruktorImePrezime?.toLowerCase();
      const instruktorB = b?.instruktorImePrezime?.toLowerCase();

      if (instruktorA && instruktorB) {
        if (instruktorA < instruktorB) {
          return -1;
        }
        if (instruktorA > instruktorB) {
          return 1;
        }
      }
      return 0;
    });


  }
  dodeliRaspored() {
    if (!this.selectedDate || !this.selectedTime) {
      console.log('Molimo unesite datum i vreme');
      return;
    }

    const rasporedDateTime = new Date(`${this.selectedDate} ${this.selectedTime}`);

    // Provera preklapanja sa rasporedima
    const zauzetoVreme = this.rasporedi.some(raspored => {
      const rasporedDateTimeStart = new Date(raspored.datumVreme);
      const rasporedDateTimeEnd = new Date(raspored.datumVreme);
      rasporedDateTimeEnd.setHours(rasporedDateTimeEnd.getHours() + 1); // Dodajte 1 sat za trajanje rasporeda (prilagodite prema potrebi)

      return rasporedDateTime >= rasporedDateTimeStart && rasporedDateTime < rasporedDateTimeEnd;
    });

    if (zauzetoVreme) {
      this.zauzetoVremeError = true;
      console.log('Zauzeto vreme');
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
        this.router.navigate(['raspored']);
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

  isVremeDostupno(datum: any, vreme: string): boolean {
    const selectedDateTime = new Date(`${datum}T${vreme}`);

    // Provera preklapanja sa rasporedima
    for (const raspored of this.rasporedi) {
      const rasporedDateTime = new Date(raspored.datumVreme);
      if (selectedDateTime.toDateString() === rasporedDateTime.toDateString()) {
        return false;
      }
    }

    return true;
  }






  }





