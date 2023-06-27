import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { RasporedService } from '../raspored.service';
@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
})
export class RasporedComponent implements OnInit {

  constructor(private userService:UserService,private route:Router,private rasporedService:RasporedService) { }

  userpolaznik:any = [];
  odsustva: any[] = [];

  ngOnInit(): void {

    this.userService.getPolaznikSaInstuktorom()
    .subscribe(res => {
      this.userpolaznik = res.data
    },error => console.log(error))


  }
  dodeliraspored(instruktorId: number, polaznikId: number) {
    const rasporedRequest = {
      InstruktorId: instruktorId,
      PolaznikId: polaznikId,
      DatumVreme: new Date()
    };

    this.rasporedService.postRasporedzakorisnike(rasporedRequest)
    .subscribe(
      res => {
        // Obrada uspešnog odgovora
        console.log('Raspored je kreiran:', res);
        // Redirekcija na putanju 'kreirajraspored'
        //this.route.navigate(['kreirajraspored']);
      },
      error => {
        // Obrada greške
        console.log('Greška prilikom kreiranja rasporeda:', error);
      });}

      openRasporedUnos(instruktorId: number, polaznikId: number) {
        this.route.navigate(['/kreirajraspored', instruktorId, polaznikId]);
      }

}
