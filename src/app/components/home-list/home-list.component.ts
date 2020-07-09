import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';



@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})

export class HomeListComponent implements OnInit {
  /*Chart */
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Số người' },
  ];

  barChartLabels: Label[] = [];

  barChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{ ticks: { min: 0, stepValue: 1 } }],
      xAxes: [{
        display: true,
        type: 'time',
        distribution: 'series',
        gridLines: {
          display: true
        },
        time: {
          displayFormats: {
            // millisecond: 'D MMM, h:mm a',
            // second: 'D MMM, h:mm a',
            // minute: 'D MMM, h:mm a',
            // hour: 'D MMM, h:mm a',
            day: 'DD MM YYYY',
            // week: 'll',
            // month: 'll',
            // quarter: 'll',
            // year: 'll'
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 4
        }
      }]
    },
  };




  barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(181, 55, 63, 0.6)',
    },
  ];

  barChartLegend = true;
  barChartPlugins = [];
  barChartType = 'bar';
  /*Charrt - end */



  submitted = false;

  homeForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private apiService: ApiService,
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

  showListByMap = false
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
  rowSelection = 'single';


  /*GRID DATA*/
  columnDefs = [
    { headerName: 'Tên trại', field: 'name', minWidth: 220 },
    { headerName: 'Số người', field: 'people', width: 100 },
    { headerName: 'Địa chỉ', field: 'address', minWidth: 350 }
  ];

  homeListData = [];
  gridApi
  gridColumnApi
  selectedRow


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
          //Grid data
          this.homeListData = res;

          //map markers & center
          for (let i in res) {
            if (res[i].address_location) {
              this.ggMapMarkers[i] = res[i].address_location
              this.ggMapMarkers[i]["home_id"] = res[i]["_id"]

            }
          }
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
    this.currentHomeId = content["home_id"] || content["_id"];
    let _id = this.currentHomeId;
    this.apiService.getHome(_id).subscribe(
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
    this.apiService.getHomeHistory(_id).subscribe(
      (res) => {
        this.homeHistory = res;
        this.barChartData[0]["data"] = [];
        this.barChartLabels = [];
        for (let i in res) {
          this.barChartData[0]["data"].push(res[i]["people"]);
          this.barChartLabels.push(res[i]["modified_date"])
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
          console.log('User successfully updated!', res)
          this.homeInfo = res
        }, (error) => {
          console.log(error);
        });
    }
  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.selectedRow = selectedRows[0]
    console.log(78787878, selectedRows)
    this.getHome(null, this.selectedRow)
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }

  onGridReady(params) {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
