import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const headers: any = new HttpHeaders({
  'Content-Type':'application-json'
});

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor(private http: HttpClient) { }


  getProyectsFromWorker(id): Observable<any>{
    let url = environment.directusItems + 'project?filter[worker.id][eq]='+id+'&fields=*.*';
    return this.http.get(url, {headers});

  }
}
