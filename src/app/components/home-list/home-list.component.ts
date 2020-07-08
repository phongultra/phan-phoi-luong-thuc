import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  ggMapZoom = 18
  ggMapCenter: google.maps.LatLngLiteral
  ggMapOptions: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 10,
    disableDefaultUI: true
  }
  ggMapMarkers = []


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.ggMapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })


    this.apiService.getAllHome().subscribe(
      (res) => {
        console.log(78787878, res)
        if (res.length) {
          for (let i in res) {
            this.ggMapMarkers[i] = res[i].address_location
          }
          console.log(this.ggMapMarkers)
        }
      }, (error) => {
        console.log(error);
      });
  }
}
