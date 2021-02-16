import { Component, OnInit, Inject } from '@angular/core';
import {Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { Translation } from 'src/app/interfaces/translation.interface';
import { map, catchError } from 'rxjs/operators';
import { getLanguage, changeLanguage } from '../common-functions.util';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 
  chosenLang : string ;
  public sharedInfo:any;
  constructor(private route: ActivatedRoute, private router: Router, public sharedService: SharedService, @Inject(DOCUMENT) private _document: Document) {
  }
  public contactName = "";
  public translation:Translation;
 
  ngOnInit(): void {

    let l = getLanguage();
    if(l == null || l == undefined){
      changeLanguage('es');
    } 
    this.chosenLang = l;
    this.getSharedInfo();
}



  getSharedInfo(){
  
    this.sharedService.getSharedInfo().subscribe((res :any)=> {
      this.sharedInfo = res.data[0];

      this.translation = this.sharedInfo.translations.find(t=> t.language == this.chosenLang);
      this.contactName = this.translation.contact;
     
    },
    (error)=>{}
    )
  }

changeLanguageFooter(lang){
  changeLanguage(lang);  
  this.refreshPage();
}

refreshPage() {
  this._document.defaultView.location.reload();
}

}
