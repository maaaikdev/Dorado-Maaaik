import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from 'src/app/interfaces/worker.interface';
import { WorkersService } from 'src/app/services/workers.service';
import { ProyectService } from 'src/app/services/proyect.service';
import {  Project } from 'src/app/interfaces/proyect.interface';
import { getLanguage } from 'src/app/shared/common-functions.util';
import { Observable } from 'rxjs';
import { of, combineLatest } from 'rxjs'; 
import Lity from 'lity';
import GLightbox from 'glightbox';

declare var $: any;

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  private slugService : string;
  private slugWorker : string;
  public worker : Worker;  
  public projects: Project  [] = [];
  public experience:string;
  public proyectos:any [] = [];
  public position:string;
  public chosenLang: string = "";
  myGallery :any;


  
  constructor(private activeRoute: ActivatedRoute,private workerService: WorkersService 
   ) { 
    this.worker = {} as Worker 

  //  Lity('https://www.youtube.com/watch?v=XSGBVzeBUbk');
  //   route.params.subscribe(params => {
  //     this.slugService = params.slugService;
  //     this.slugWorker = params.slugWorker
  //  });

  //  this.chosenLang  = getLanguage();
   

  //   this.getWorker(this.slugWorker);
    
    
 
   }


   showVideo(e){
    Lity(e);
   }


  ngOnInit() {
    
  this.myGallery =  GLightbox({
  touchNavigation: true,
  loop: true,
  //autoplayVideos: true,
  //selector: null,
  // plyr: {
  //   css: 'https://cdn.plyr.io/3.5.6/plyr.css', // Default not required to include
  //   js: 'https://cdn.plyr.io/3.6.2/plyr.polyfilled.js', // Default not required to include
  //   config: {
  //       ratio: '4:3', // or '4:3'
  //       muted: true,
  //       hideControls: false,
  //       youtube: {
  //           noCookie: true,
  //           rel: 0,
  //           showinfo: 0,
  //           iv_load_policy: 3
  //       },
  //       vimeo: {
  //           byline: false,
  //           portrait: true,
  //           title: true,
  //           speed: true,
  //           transparent: false,
  //           muted:true
  //       }
  //   }
//} 
    
});
  
    const joinStream = combineLatest( this.activeRoute.params
      );
     
     
	    // Subscribe to the single observable, giving us both
	    joinStream.subscribe(routeParams => {
	    	// routeParams containing both the query and route params
        this.chosenLang  = getLanguage();
        this.getWorker(routeParams[0].slugWorker);
    
	    });
  }
  // overlay(i) {
  //   const portada = $("#portada"+i);
  //   if(portada ){
  //     console.log("Dentro del id");
  //     $(".overlay-hover").addClass("hover");
  //   }
  // }
  // overlayOut(i) {
  //   const portada = $("#portada"+i);
  //   if(portada.css( 'opacity') === '1' ){
  //     console.log("Dentro del id");
  //     portada.removeClass("hover");
  //   }
  // }
  showVideo2(e){    

    this.myGallery.openAt(e);
    }    
    getWorker(slug){
  
        this.workerService.getWorkerBySlug(slug).subscribe((data=> {          
          this.worker = data.data[0];
          let translationWorker = this.worker.translations.find(t=> t.language == this.chosenLang);      
          this.worker.position = translationWorker.position;
          this.worker.about = translationWorker.about;
          this.proyectos = data.data[0].projects;
          console.log("Proyectos Videos", this.proyectos)
          this.proyectos = this.proyectos.sort((a,b)=> (a.project_id.sort_order > b.project_id.sort_order) ? 1 : -1) 
          let arr = [];
          let index = 0;
        for(let  p of this.proyectos){          
          let thumbnails = p.project_id.photo.data.thumbnails;
          let thumbnail = thumbnails.find(t=>t.key === 'directus-large-contain');
          this.proyectos[index].thumbnail = thumbnail;
          let item = {
            'href': p.project_id.vimeo,
           //'href':'https://vimeo.com/426417452',
           //'href':'https://player.vimeo.com/video/426417452',  //https://vimeo.com/426417452
            'type': 'video',
            'source': 'vimeo', //vimeo, youtube or local
            'width': 900,
            // 'title' : p.project_id.photo_text
          }
          // let item = {          
          //   content: '<p><iframe width="838" height="470" [src]="https://player.vimeo.com/video/426417452"  frameborder="0"></iframe></p>',
          //   width: '90vw'
          // }

          arr.push(item);
           
          index++;
        }
        console.log(arr);
        this.myGallery.setElements(arr);
        }),
        error => console.log(error));         
      }
}
