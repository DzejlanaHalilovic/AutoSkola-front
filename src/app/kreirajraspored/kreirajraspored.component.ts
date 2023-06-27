import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kreirajraspored',
  templateUrl: './kreirajraspored.component.html',
  styleUrls: ['./kreirajraspored.component.css']
})
export class KreirajrasporedComponent implements OnInit {
  selectedDate: string = '';
  selectedTime: string = '';

  constructor(private rasporedService:RasporedService,private route: ActivatedRoute,private router:Router) { }
  instruktorId?: number;
  polaznikId?: number;
  odsustvaInstruktora?: any[];
odsustvaPolaznika?: any[];

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


}
