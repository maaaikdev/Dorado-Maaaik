import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Shared} from 'src/app/interfaces/shared.interface';

const headers: any = new HttpHeaders({
  'Content-Type':'application-json'
});



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public sharedInfo: Shared = {}; 
  constructor(private http: HttpClient) {
    // let url = environment.directusItems + 'shared?fields=*.*';
    // this.http.get(url, {headers}).subscribe( (resp:any) => {
    //   this.sharedInfo = resp.data[0];

    // }
    // )    
   }


  getSharedInfo(): Observable<any>{
    let url = environment.directusItems + 'shared?fields=*.*';
    return this.http.get(url, {headers});

  }
}
