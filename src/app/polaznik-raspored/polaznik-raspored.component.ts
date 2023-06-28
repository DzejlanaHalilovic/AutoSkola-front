import { Component, OnInit } from '@angular/core';
import { RasporedService } from '../raspored.service';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { UserService } from '../user.service';
import { Raspored } from '../instuktor-raspored/instuktor-raspored.component';

@Component({
  selector: 'app-polaznik-raspored',
  templateUrl: './polaznik-raspored.component.html',
  styleUrls: ['./polaznik-raspored.component.css']
})
export class PolaznikRasporedComponent implements OnInit {

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
  ocene: any[] = [];

  ngOnInit(): void {
    this.rasporedService.rasporezapolaznika(this.user.painter.id).subscribe(
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

    this.rasporedService.getOceneByPolaznikId(this.user.painter.id).subscribe(
      (res: any[]) => {
        this.ocene = res;
        console.log('Ocene:', res);
      },
      (error: any) => console.log(error)
    );
  }

  getOceneByPolaznikId(rasporedId: number): number {
    const ocena = this.ocene.find((ocena) => ocena.rasporedId === rasporedId);
    return ocena ? ocena.ocena : null;
  }
}
