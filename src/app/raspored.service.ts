import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {
  url= environment.apiUrl
  constructor(private http:HttpClient) { }

  postRasporedzakorisnike(raspored:any){
    return this.http.post<any>(`${this.url}/api/Raspored`,raspored);
  }

getOdsustva(){
  return this.http.get<any>(`${this.url}/api/UserRaspored`)
}
getzakorisnikeodsustvo(id:any ){
  return this.http.get<any>(`${this.url}/api/UserRaspored/odsustva/${id}`);
}
createautomobil(auto:any){
  return this.http.post<any>(`${this.url}/api/Automobil`,auto)
}
getAllAutmobil(){
  return this.http.get<any>(`${this.url}/api/Automobil`)
}

deleteAutomobil(id:number){
  return this.http.delete<any>(`${this.url}/api/Automobil/${id}`)
}
createKvar(kvar:any){
  return this.http.post<any>(`${this.url}/api/Kvar`,kvar);
}
obrisiKvar(id:number){
  return this.http.delete<any>(`${this.url}/api/Kvar`);
}
brisiodsutvo(id:any){
  return this.http.delete<any>(`${this.url}/api/UserRaspored/odsustva/${id}`)

}
rasporedzainstuktora(id:any){
  return this.http.get<any>(`${this.url}/api/Raspored/instuktor/${id}`);
}
rasporezapolaznika(id:number){
  return this.http.get<any>(`${this.url}/api/Raspored/polaznik/${id}`);
}
rasporezapolaznikatop10(id:any){
  return this.http.get<any>(`${this.url}/api/Raspored/instuktorfilter/${id}`);
}
filterpodatumu(datum:any,id:any){
  return this.http.get<any>(`${this.url}/api/Raspored/filterpodatumu/${datum}/instukor/${id}`);
}
createocena(ocena:any){
  return this.http.post<any>(`${this.url}/api/Cas/ocena`,ocena);
}
getOceneByPolaznikId(polaznikId: any) {
  return this.http.get<any>(`${this.url}/api/Cas/ocene/polaznik/${polaznikId}`);
}

}
