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

  createKategorija(kategorija:any){
    return this.http.post<any>(`${this.url}/api/Kategorija`,kategorija)
  }

  deleteKategorija(id:number){
    return this.http.delete<any>(`${this.url}/api/Kategorija/${id}`);
  }

  getByIdKategorija(id:any){
    return this.http.get<any>(`${this.url}/api/Kategorija/${id}`);
  }

  getFilter(param:any){
    const params : any = {}
    params.currPage = param.currPage;
    params.pageSize = param.pageSize;
    return this.http.get(`${this.url}/api/Kategorija`, {params});

  }
}
