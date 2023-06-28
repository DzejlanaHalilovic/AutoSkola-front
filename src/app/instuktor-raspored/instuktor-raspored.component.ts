import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-instuktor-raspored',
  templateUrl: './instuktor-raspored.component.html',
  styleUrls: ['./instuktor-raspored.component.css']
})
export class InstuktorRasporedComponent implements OnInit {

  constructor(
    private rasporedService: RasporedService,
    private userStorage: Store<{ user: User }>,
    private userService: UserService
  ) {
    this.userStorage.select('user').subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  user: User = {} as User;
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
        }
      },
      (error: any) => console.log(error)
    );
  }
  oceniCas(rasporedId: number) {
    const ocena = prompt('Unesite ocenu:');
    if (ocena !== null) {


        const ocenaRequest = { ocena: ocena, rasporedId: rasporedId };
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

  }




export interface Raspored {
  id: number;
  datumVreme: string;
  instruktorId: number;
  polaznikId: number;
  polaznikImePrezime?: string;
  instruktorImePrezime?: string;
}
