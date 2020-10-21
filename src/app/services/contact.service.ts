import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers: any = new HttpHeaders({
  'Content-Type':'application-json'
});


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public getContact() {
    let url = environment.directusItems + 'contact?fields=*.*';
    return this.http.get(url, {headers});
  }

}
