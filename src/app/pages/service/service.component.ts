import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { WorkersService } from 'src/app/services/workers.service';
import { WorkerProyects } from 'src/app/interfaces/worker-proyects.interface';
import { ProyectService } from 'src/app/services/proyect.service';
import { Service } from 'src/app/interfaces/service.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { Project } from 'src/app/interfaces/proyect.interface';
import { getLanguage } from 'src/app/shared/common-functions.util';
import { Observable } from 'rxjs';
import { of, combineLatest } from 'rxjs'; 
import Lity from 'lity';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  private slugService : string;
  public service: Service;
  public allWorkers : Worker [] = [];  
  public workerProyects: WorkerProyects  [] = [];
  public chosenLang: string = "";
  public about: string = "";

  constructor(private route: ActivatedRoute, private servicesService: ServicesService) { 
    this.service = {} as Service 
    // route.params.subscribe(params => {
    //    this.slugService = params.slugService;

    // });
    // //this.chosenLang  = getLanguage();

    // this.getService2(this.slugService);
  }

  ngOnInit(): void {

    const joinStream = combineLatest( this.route.params, this.route.queryParams
      );
     
     
	    // Subscribe to the single observable, giving us both
	    joinStream.subscribe(routeParams => {
	    // routeParams containing both the query and route params
      this.chosenLang  = getLanguage();
      this.getService(routeParams[0].slugService);
     
    
	    });

  }



    getService(slug){
  
      this.servicesService.getService(slug).subscribe((data=> {
        
        this.service = data.data[0];

        let translation = this.service.translations.find(t=> t.language == this.chosenLang);
    
        this.about = translation.about;

       this.service.workers.map(
          nested => 
          nested.worker_id.projects.sort((a,b)=> (a.sort_order > b.sort_order) ? 1 : -1));


          for(let  w of this.service.workers){
            let index = 0;
            for(let  p of w.worker_id.projects){
              let thumbnails = p.project_id.photo.data.thumbnails;
              let thumbnail = thumbnails.find(t=>t.key === 'directus-large-contain');
              w.worker_id.projects[index].thumbnail = thumbnail;

              index++;
          
            }
          }


      //  console.log(this.service);

      }),
      error => console.log(error));

      
    }
}
