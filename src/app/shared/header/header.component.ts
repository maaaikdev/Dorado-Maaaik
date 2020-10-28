import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getLanguage, changeLanguage } from '../common-functions.util';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/interfaces/service.interface';
import { SharedService } from 'src/app/services/shared.service';
import { Translation } from 'src/app/interfaces/translation.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { MenuWorker } from 'src/app/interfaces/menu-worker.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { WorkersService } from 'src/app/services/workers.service';
import { MenuService } from 'src/app/services/menu.service';
import { DOCUMENT } from '@angular/common';

import * as $ from "jquery";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  public sharedInfo:any;
  public translationShared:Translation;
  chosenLang: string = "";
  public serviceTitle = "";
  public servList : Service[] = [];
  public menuItems : Menu [] = [];
  public menu : Menu [] = [];
  public allWorkers : Worker [] = [];  
  public isHome:boolean;
  urlCurrently:any;
  public contactName = "";
  public translation:Translation;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private router:Router, 
    private servicesService :ServicesService, 
    private sharedService: SharedService,
    private workerService: WorkersService,
    private menuService:MenuService,
    @Inject(DOCUMENT) private _document: Document
    ) {       
      this.router.events.subscribe(event => {        
        if (event instanceof NavigationEnd ) {   
          this.urlCurrently = event.url;      
          if (event.url === '/') { 
           this.isHome = true;
           setTimeout(function(){ $(".logo").css({"opacity":"1","transform":"scale(1)"});  }, 500);
            $(".menu").addClass("menu-tablet");
            $(".contenedor-menu").addClass("home");
          } 
          else { 
            this.isHome = false;
          }
          if (event.url) {
            $('.hamburger').removeClass('is-active');
            $(".menu").removeClass("menu-mobile");
            $('.menu-list').removeClass('open-menu');
			      $('.p-menu').removeClass('p-menu-open');
			      $('.contenido').removeClass('p-menu-open-r');
          }
        }
      });
  
  
      let l = getLanguage();
      if(l == null || l == undefined){
        changeLanguage('es');
      } 
      this.chosenLang = l;

      this.getMenu();

    }



  ngOnInit(): void {
    let l = getLanguage();
    if(l == null || l == undefined){
      changeLanguage('es');
    } 
    this.chosenLang = l;
    this.getSharedInfo();    
  }
  hoverBtn(){
    // let menuAdd = $(".btn-nav")
    // let menuEdition = $(".ul-edicion")
    // console.log("menu ADD", menuAdd)
    // console.log("menu", menuEdition);    
    // if(menuAdd[0].classList[1] == 'active-link'){
    //   menuEdition[0].classList.add("worker-names");
    //   //menuEdition[1].classList.remove("worker-names"); 
    // } else if (menuAdd[4].classList[1] == 'active-link'){
    //   menuEdition[1].classList.add("worker-names");
    //   //menuEdition[0].classList.remove("worker-names"); 
    // }
    // $(".ul-edicion").addClass("worker-names")
  }
  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }


  

  getSharedInfo(){
    return this.sharedService.getSharedInfo().toPromise().then(res => {      
      this.sharedInfo = res.data[0];      
      this.translationShared = this.sharedInfo.translations.find(t=> t.language == this.chosenLang);
      this.serviceTitle = this.translationShared.service;
      this.contactName = this.translationShared.contact;      
    });    

  }

  getWorkers(){
  
  return  this.workerService.getAllWorkers().toPromise().then(res=>
    this.allWorkers = res.data);

  }


  getMenu(){
  
    this.menuService.getMenu().subscribe(((data:any)=> {      
      this.menuItems = data.data;      
      this.menuItems =   this.menuItems.filter(f=>f.status === 'published');
      var raiz = this.menuItems.filter(f => f.parent === 'raiz');
      var raizMenu = raiz[0];
      let translation = raizMenu.translations.find(t=> t.language == this.chosenLang);      
      this.serviceTitle = translation.translation;         

      //trae el hijo
      var subMenu =  this.menuItems.filter(f=>f.parent === raizMenu.slug);                     
      subMenu.forEach((sub:Menu) => {
        let translationSub = sub.translations.find(t=> t.language == this.chosenLang);
        sub.translation = translationSub.translation;
        let subMenu2 =  this.menuItems.filter(f=>f.parent === sub.slug);
        
        if(subMenu2.length > 0){
          subMenu2.forEach((sub2:Menu) => {
            let translationSub2 = sub2.translations.find(t=> t.language == this.chosenLang);
            sub2.translation = translationSub2.translation;
          })
        }

        sub.subMenu = subMenu2;
      })
      // console.log("subMenu", subMenu)
      // if(this.urlCurrently == '/servicios/edicion/julian-rivera-contreras'){
      //   $("#btn00").addClass("active-link");
      // }

      raizMenu.subMenu = subMenu;
      this.menu.push(raizMenu);

      // this.menuItems.forEach((mi:Menu) => {
      //     let translation = mi.translations.find(t=> t.language == this.chosenLang);
      //     if(mi.parent==='raiz'){
      //       this.serviceTitle = translation.translation;             
      //     console.log(mi.name)
      //     mi.translation = translation.translation;          
      //     //trae el hijo
      //     var subMenu =  this.menuItems.filter(f=>f.parent === mi.slug);          
      //     subMenu.forEach((sub:Menu) => {
      //       translation = sub.translations.find(t=> t.language == this.chosenLang);
      //       sub.translation = translation.translation;
      //       let subMenu2 =  this.menuItems.filter(f=>f.parent === sub.slug);           
      //       sub.subMenu = subMenu2;
      //     })
      //     mi.subMenu = subMenu;
      //     this.menu.push(mi);
      //     //console.log('push ' + menuItem)
      //   }       

      // })

      //  console.log(this.worker);
    }),
    error => console.log(error));    
  }
  changeLanguageFooter(lang){
    changeLanguage(lang);
    this.refreshPage();
  }
  refreshPage() {
    this._document.defaultView.location.reload();
  }

}
