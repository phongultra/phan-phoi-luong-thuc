import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import * as moment from 'moment'; // add this 1 of 4



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  /*Chart */
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Số người' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  /*Charrt - end */



  submitted = false;

  homeForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private apiService: ApiService,
    private moment: Moment
  ) {
    this.mainForm();
  }

  mainForm() {
    this.homeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      people: ['']
    })
  }

  get myForm() {
    return this.homeForm.controls;
  }

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoomBaseNum = 13
  zoom = 13
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
  ggMapMarkers = []
  ggMapMarker
  homeInfo = {
    name: "",
    phoneNumber: "",
    address: "",
    address_location: {},
    people: "",
  }
  homeHistory = []
  currentHomeId = ""


  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.apiService.getAllHome().subscribe(
      (res) => {
        if (res.length) {
          console.log(45455454, res)
          for (let i in res) {
            if (res[i].address_location) {
              this.ggMapMarkers[i] = res[i].address_location
              this.ggMapMarkers[i]["home_id"] = res[i]["_id"]
            }
          }
          console.log(333333333, this.ggMapMarkers)

          this.center = {
            lat: res[0].address_location.position.lat,
            lng: res[0].address_location.position.lng,
          }
        }
      }, (error) => {
        console.log(error);
      });

  }

  zoomBase() {
    if (this.zoom < this.options.maxZoom) this.zoom = this.zoomBaseNum;
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
    console.log("event zoom ++", this.zoom)
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
    console.log("event zoom --", this.zoom)

  }

  logCenter() {
    console.log("center info", JSON.stringify(this.map.getCenter()))
  }


  openInfo(marker: MapMarker, content) {
    // this.infoContent = content
    this.info.open(marker)
  }

  getHome(marker: MapMarker, content) {
    this.currentHomeId = content["home_id"];
    console.log(this.currentHomeId, content["home_id"]);
    this.apiService.getHome(content["home_id"]).subscribe(
      (res) => {
        this.homeForm.setValue({
          name: res["name"],
          phoneNumber: res["phoneNumber"],
          address: res["address"],
          people: res["people"]
        });

        this.homeInfo = {
          name: res["name"],
          phoneNumber: res["phoneNumber"],
          address: res["address"],
          address_location: res["address_location"],
          people: res["people"]
        }

      }, (error) => {
        console.log(error);
      });

    // Get history
    this.apiService.getHomeHistory(content["home_id"]).subscribe(
      (res) => {
        this.homeHistory = res;
        this.lineChartData[0]["data"] = [];
        this.lineChartLabels = [];
        for (let i in res) {
          this.lineChartData[0]["data"].push(res[i]["people"]);
          console.log(res[i]["modified_date"])
          this.lineChartLabels.push(this.moment(res[i]["modified_date"], "DD/MM/YYYY"))
        }
      }, (error) => {
        console.log(error);
      });

  }


  // getAddressInfo() {
  //   this.apiService.getAddressInfo(this.homeForm.value.address).subscribe(
  //     (res) => {
  //       if (res.status == "OK" && res.results.length) {

  //         this.homeInfo.address_location = {
  //           id: res.results[0].place_id,
  //           position: res.results[0]["geometry"]["location"],
  //         }

  //         console.log("get by address okkkkkk", this.homeInfo, res)

  //         this.ggMapMarker["position"] = this.homeInfo["address_location"]["position"];
  //         this.ggMapMarker["label"] = "";
  //         this.ggMapMarker["title"] = "";
  //         this.ggMapMarker["options"] = {
  //           draggable: true
  //         };
  //       }

  //     }, (error) => {
  //       console.log(error);
  //     });
  // }

  onUpdate() {
    this.submitted = true;
    if (!this.homeForm.valid) {
      return false;
    } else {
      let is_change_people = this.homeInfo.people == this.homeForm.value.people ? false : true;
      let _data = {
        name: this.homeForm.value.name || "errorName",
        phoneNumber: this.homeForm.value.phoneNumber || "",
        people: this.homeForm.value.people,
        address: this.homeForm.value.address || "errorAddress",
        address_location: this.homeInfo["address_location"],
      }

      this.apiService.updateHome(this.currentHomeId, is_change_people, _data).subscribe(
        (res) => {
          console.log('User successfully updated!')
        }, (error) => {
          console.log(error);
        });
    }
  }

}
