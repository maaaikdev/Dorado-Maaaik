import { Component , AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HomeService } from './services/home.service';
import { getLanguage, changeLanguage } from './shared/common-functions.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
 constructor(private router:Router, private homeService: HomeService) {
  let l = getLanguage();
  if(l == null || l == undefined){
    changeLanguage('es');
  } 
  
 }
 
 public bg:string = null; 
 public bg1:string = null; 
 public bg2:string = null; 
 public home:any;
 urlCurrently: any;
 
  title = 'dorado';


  ngOnInit(){
    
    this.router.events.subscribe(event => {      
      if (event instanceof NavigationEnd ) {
        this.urlCurrently = event.url;
        if (event.url === '/') { 
          
          this.getHomeBg(true);
        } 
        else 
          { 
           
            this.getHomeBg(false);
           
          }
      }
    });
  }


  getHomeBg(isHome){
    // this.home = 
    this.homeService.getHomeInfo().subscribe((res :any[])=> {
      this.home = res;
      this.bg1 =  this.home.data[0].background.data.full_url;
      this.bg2 = this.home.data[0].background.data.full_url;

      if(isHome){
        this.bg = this.bg1;
      }else{
        this.bg = this.bg2;
      }
     
    },
    (error)=>{}
    )
  }

}
