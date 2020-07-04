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

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 8,
  }
  markers = []
  infoContent = ''
  listHouse = [
    {
      title: "Mái ấm hướng dương",
      lat: 10.747826,
      lng: 106.645367,
      peope: 20,
      food: "10%"
    }
  ]

  //Mái ấm Hướng Dương 10.747826, 106.645367

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    let contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';

    for (let i = 0; i < this.listHouse.length; i++) {
      this.markers.push({
        position: {
          lat: this.listHouse[i].lat,
          lng: this.listHouse[i].lng
        },
        label: {
          color: 'red',
          //text: 'Marker label ' + (this.markers.length + 1),
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

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
      label: {
        color: 'red',
        //text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
      },
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

}
