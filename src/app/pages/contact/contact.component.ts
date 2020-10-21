import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { getLanguage } from 'src/app/shared/common-functions.util';
import { Translation } from 'src/app/interfaces/translation.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contact:any ={};
  public chosenLang: string = "";
  public translation: Translation;
  public mapUrl:string;
  public latitude:number;
  public longitude:number;
  public emailTxt:string;


//  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
//  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

//   zoom = 12
//   center: google.maps.LatLngLiteral
//   options: google.maps.MapOptions = {
//     zoomControl: false,
//     scrollwheel: false,
//     disableDoubleClickZoom: true,
//     mapTypeId: 'hybrid',
//     maxZoom: 15,
//     minZoom: 8,
//   }
//   markers = []
//   infoContent = ''

  constructor(private contactService: ContactService) { 


  }
 

  ngOnInit(): void {

    this.chosenLang  = getLanguage();
    this.getContact();

  }


  getContact(){
  
    this.contactService.getContact().subscribe(((data:any)=> {
      
      this.contact = data.data[0];

      this.translation = this.contact.translations.find(t=> t.language == this.chosenLang);
    

      this.emailTxt = 'mailto:'+ this.contact.email;
      // this.latitude = parseFloat(this.contact.lat);
      // this.longitude = parseFloat(this.contact.lon);

      // console.log(this.latitude);
      // console.log(this.longitude);


     
      //   this.center = {
      //     lat: this.latitude,
      //     lng: this.longitude
      //   }
      
  
  
      // this.markers.push({
      //   position: {
      //     lat: this.latitude,
      //     lng: this.longitude,
      //   },
      //   label: {
      //     color: 'red',
      //     text: 'Marker label ' + (this.markers.length + 1),
      //   },
      //   title: 'Marker title ' + (this.markers.length + 1),
      //   info: 'Marker info ' + (this.markers.length + 1),
      //   options: {
      //     animation: google.maps.Animation.BOUNCE,
      //   },
      // })
    }),
    error => console.log(error));



  //  this.addMarker();
    
  }


  addMarker() {

   // let latitude = parseFloat(this.contact.lat);
   // let longitude = parseFloat(this.contact.lon);

    // console.log(this.contact.lat);
    // console.log(this.contact.lon);

    // console.log(this.latitude);
    // console.log(this.longitude);

    // this.markers.push({
    //   position: {
    //     lat: this.latitude,
    //     lng: this.longitude,
    //   },
    //   label: {
    //     color: 'red',
    //     text: 'Marker label ' + (this.markers.length + 1),
    //   },
    //   title: 'Marker title ' + (this.markers.length + 1),
    //   info: 'Marker info ' + (this.markers.length + 1),
    //   options: {
    //     animation: google.maps.Animation.BOUNCE,
    //   },
    // })
  }

  // openInfo(marker: MapMarker, content) {
  //   this.infoContent = content
  //   this.info.open(marker)
  // }


}
