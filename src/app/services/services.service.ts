import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const headers: any = new HttpHeaders({
  'Content-Type':'application-json'
});

@Injectable({
  providedIn: 'root'
})



export class ServicesService {

  constructor(private http: HttpClient) { }

  getServicesList(): Observable<any>{
    let url = environment.directusItems + 'service?fields=*.*';
    return this.http.get(url, {headers});

  }


  getService(slug): Observable<any>{
    let url = environment.directusItems + 'service?filter[slug][eq]='+slug+'&fields=*.*.*.*.*.*';
    return this.http.get(url, {headers});

  }


  
}
