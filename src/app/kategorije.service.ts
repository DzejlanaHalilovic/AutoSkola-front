import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KategorijeService {
  url= environment.apiUrl
  constructor(private http:HttpClient) { }
  getAllKategories(){
    return this.http.get<any>(`${this.url}/api/Kategorija`);
  }
}
