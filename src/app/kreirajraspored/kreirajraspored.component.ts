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
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.instruktorId = Number(params.get('instruktorId'));
      this.polaznikId = Number(params.get('polaznikId'));
    });
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

}
