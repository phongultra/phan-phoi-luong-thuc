import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 15
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 8,
    disableDefaultUI: true
  }
  markers = []
  infoContent = '<h1>aaa</h1>'
  listHouse = [
    {
      title: "Mái ấm hướng dương",
      lat: 10.747826,
      lng: 106.645367,
      peope: 20,
      food: "10%"
    },
    {
      title: "Mái ấm tre xanh",
      lat: 10.767544,
      lng: 106.700607,
      peope: 10,
      food: "50%"
    },
    {
      title: "CEPORER",
      lat: 10.778601,
      lng: 106.698609,
      peope: 20,
      food: "100%"
    }
  ]

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    let contentString = '<div><h1>Hallo</h1></div>';

    for (let i = 0; i < this.listHouse.length; i++) {
      this.markers.push({
        position: {
          lat: this.listHouse[i].lat,
          lng: this.listHouse[i].lng
        },
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        label: {
          color: '#000000',
          text: this.listHouse[i].title,
        },
        title: this.listHouse[i].title,
        info: contentString,
        options: {
          animation: google.maps.Animation.DROP,
        },
      })

    }

  }

  zoomBase() {
    if (this.zoom < this.options.maxZoom) this.zoom = 12;
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
    console.log("event zoom ++", this.zoom)
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
    console.log("event zoom --", this.zoom)

  }

  click(event: google.maps.MouseEvent) {
    console.log("event click", event)
  }

  logCenter() {
    console.log("center info", JSON.stringify(this.map.getCenter()))
  }

  // addMarker() {
  //   this.markers.push({
  //     position: {
  //       lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //       lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //     },
  //     icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
  //     label: {
  //       color: 'red',
  //       //text: 'Marker label ' + (this.markers.length + 1),
  //     },
  //     title: 'Marker title ' + (this.markers.length + 1),
  //     info: 'Marker info ' + (this.markers.length + 1),
  //     options: {
  //       animation: google.maps.Animation.DROP,
  //     },
  //   })
  // }

  openInfo(marker: MapMarker, content) {
    console.log(1111, content)
    this.infoContent = content
    this.info.open(marker)
  }



}
