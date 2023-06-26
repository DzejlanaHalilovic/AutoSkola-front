import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RasporedService } from '../raspored.service';

@Component({
  selector: 'app-unos-kvara',
  templateUrl: './unos-kvara.component.html',
  styleUrls: ['./unos-kvara.component.css']
})
export class UnosKvaraComponent implements OnInit {
  itemId: number;
  forma: FormGroup;

  constructor(private route: ActivatedRoute, private rasporedService: RasporedService,private router:Router) {
    this.itemId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.forma = new FormGroup({
      datumKvara: new FormControl('', [Validators.required]),
      opis: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  kreirajKvar() {
    const kvar = {
      id: this.itemId,
      datumKvara: this.forma.get('datumKvara')?.value,
      opis: this.forma.get('opis')?.value
    };

    this.rasporedService.createKvar(kvar)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
      this.router.navigate(['/dodajauto']);
  }
}
