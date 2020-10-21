import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const headers: any = new HttpHeaders({
  'Content-Type':'application-json'
});

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient) { }


  getAllWorkers(): Observable<any>{
    let url = environment.directusItems + 'worker?fields=*.*';
    return this.http.get(url, {headers});

  }

  getWorkerBySlug(slug): Observable<any>{
    let url = environment.directusItems + 'worker?filter[slug][eq]='+slug+'&fields=*.*.*.*.*';
    return this.http.get(url, {headers});
  }

  getWorkerBySlug2(slug): Observable<any>{
    let url = environment.directusItems2 + 'worker?filter[slug][eq]='+slug+'&fields=*.*.*.*.*';
    return this.http.get(url, {headers});
  }
}
