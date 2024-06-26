import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { User } from '../interfaces/User';
import { ActivatedRoute } from '@angular/router';
import { OdsustvoService } from '../odsustvo.service';

@Component({
  selector: 'app-instuktor-raspored',
  templateUrl: './instuktor-raspored.component.html',
  styleUrls: ['./instuktor-raspored.component.css']
})
export class InstuktorRasporedComponent implements OnInit {

  constructor(
    private rasporedService: RasporedService,
    private route: ActivatedRoute,
    private odsustvoService:OdsustvoService,
    private userStorage: Store<{ user: User }>,
    private userService: UserService
  ) {
    this.userStorage.select('user').subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  user: User = {} as User;
  polaznikId:any
  rasporedi: Raspored[] = [];
  ngOnInit(): void {
    this.rasporedService.rasporedzainstuktora(this.user.painter.id).subscribe(
      async (res: Raspored[]) => {
        this.rasporedi = res;
        console.log(this.rasporedi);

        for (const raspored of this.rasporedi) {
          const polaznik = await this.userService.getById(raspored.polaznikId).toPromise();
          const instruktor = await this.userService.getById(raspored.instruktorId).toPromise();
          raspored.polaznikImePrezime = `${polaznik.ime} ${polaznik.prezime}`;
          raspored.instruktorImePrezime = `${instruktor.ime} ${instruktor.prezime}`;
          raspored.polaznikId = polaznik.id;
        }
      },
      (error: any) => console.log(error)
    );

    this.route.paramMap.subscribe(params => {
      this.polaznikId = Number(params.get('polaznikId'));
    });

  }
  oceniCas(rasporedId: number) {
    const ocena = prompt('Unesite ocenu:');
    if (ocena !== null) {


        const ocenaRequest = { ocena: ocena, rasporedId: rasporedId, InstruktorId:this.user.painter.id };
        this.rasporedService.createocena(ocenaRequest).subscribe(
          (res) => {
            console.log('Ocena uspešno dodata');
          },
          (error) => {
            console.log('Greška prilikom dodavanja ocene:', error);
          }
        );
      } else {
        console.log('Unesite ispravan broj za ocenu');
      }
    }

    obrisiRaspored(rasporedId: number) {
      const index = this.rasporedi.findIndex(raspored => raspored.id === rasporedId);
      if (index !== -1) {
        this.rasporedi.splice(index, 1);
      }
    }

    neodrzancas() {
      let neodrzan = {
        instruktorId: this.user.painter.id,
        polaznikId: this.rasporedi[0].polaznikId,
        datumVreme: new Date()
      };

      this.odsustvoService.nijeodrzancas(neodrzan).subscribe(
        (res: any) => {
          console.log(res);
        },
        error => console.log(error)
      );
    }


  }




export interface Raspored {
  id: number;
  datumVreme: string;
  instruktorId: number;
  polaznikId: number;
  polaznikImePrezime?: string;
  instruktorImePrezime?: string;
}
