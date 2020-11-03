import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urlCurrently:any;
  constructor(
    private router:Router
  ) { 
    this.router.events.subscribe(event => {        
      if (event instanceof NavigationEnd ) {   
        this.urlCurrently = event.url;
        if(this.urlCurrently == '/'){
          $(".hamburger").removeClass("is-active");
          $(".p-menu").removeClass("p-menu-open");
          $(".menu-list").removeClass("open-menu");
        }
      }
    });
  }

  ngOnInit(): void {

  }

}
