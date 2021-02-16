import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component , AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HomeService } from './services/home.service';
import { getLanguage, changeLanguage } from './shared/common-functions.util';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
	public path: any = [];
	homeUrl = './assets/img/home/bg.jpg';
	//EDICIÓN
	edicionUrl = '/assets/img/home/bg.jpg';
	edicionJulianUrl = '/assets/img/home/bg.jpg';
	edicionRodrigonUrl = '/assets/img/home/bg.jpg';
	edicionLuisanUrl = '/assets/img/home/bg.jpg';
	//CORRECIÒN COLOR
	colorUrl = '/assets/img/home/bg.jpg';
	colorGustavoUrl = '/assets/img/home/bg.jpg';
	colorMaribelUrl = '/assets/img/home/bg.jpg';
	//MUSICA
	musicUrl = '/assets/img/home/bg.jpg';
	//ANIMACIÓN
	animationUrl = '/assets/img/home/bg.jpg';
	//ONLINE
	onlineUrl = '/assets/img/home/bg.jpg';

	constructor(
		private router:Router, 
		private homeService: HomeService,
		private activate: ActivatedRoute
	) {
		let l = getLanguage();
		if(l == null || l == undefined){
			changeLanguage('es');
		}
		// this.activate.url.subscribe(data => {
		// 	this.path = data[0].path;
		// });
		this.router.events.subscribe(event => {        
			if (event instanceof NavigationEnd ) {   
			  this.urlCurrently = event.url;
			}
		});
		this.getImage();
	
	}
 
	public bg:string = null; 
	public bg1:string = null; 
	public bg2:string = null; 
	public home:any;
	urlCurrently: any;
 
	  title = 'dorado';
	  
	getImage() {
		switch (this.urlCurrently) {			
		  	case '/':
				return this.homeUrl;

			//EDICIÓN
		  	case '/servicios/edicion':
				return this.edicionUrl;
		  	case '/servicios/edicion/julian-rivera-contreras':
				return this.edicionJulianUrl;
			case '/servicios/edicion/rodrigo-narvaez-medina':
				return this.edicionRodrigonUrl;				
			case '/servicios/edicion/luisa-maria-martinez-arcaraz':
				return this.edicionLuisanUrl;

			//CORRECIÓN COLOR
			case '/servicios/correccion-de-color':
				return this.colorUrl;
			case '/servicios/correccion-de-color/gustavo-posada-malo':
				return this.colorGustavoUrl;
			case '/servicios/correccion-de-color/maribel-muro':
				return this.colorMaribelUrl;
			
			//MUSICA
			case '/servicios/musica-original/matias-andersen':
				return this.musicUrl;
			
			//ANIMACIÓN
			case '/servicios/animacion':
				return this.animationUrl;
			
			//ONLINE
			case '/servicios/online':
				return this.onlineUrl;

			default:
				return this.homeUrl;
		}		
	}

	changeBg(e) {
		this.edicionUrl = e[1].background.data.full_url;
		setTimeout(() => {
			this.edicionJulianUrl = e[1].subMenu[0].background.data.full_url;
		}, 3000);
		
	}


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
