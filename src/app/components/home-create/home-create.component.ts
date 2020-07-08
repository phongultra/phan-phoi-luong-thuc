import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MapMarker, GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.scss']
})

export class HomeCreateComponent implements OnInit {

  submitted = false;
  homeForm: FormGroup;

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap

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

  ggMapMarker = {
    position : {}
  }

  homeInfo = {
    name: "",
    phoneNumber: "",
    address: "",
    address_location: {},
    people: ""
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.ggMapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

  }


  mainForm() {
    this.homeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required/*, Validators.pattern('^[0-9]+$')*/]]
    })
  }

  get myForm() {
    return this.homeForm.controls;
  }

  getAddressInfo() {
    this.apiService.getAddressInfo(this.homeForm.value.address).subscribe(
      (res) => {
        if (res.status == "OK" && res.results.length) {

          this.homeInfo.address_location = {
            id: res.results[0].place_id,
            position: res.results[0]["geometry"]["location"],
          }

          console.log("get by address okkkkkk", this.homeInfo, res)

          this.ggMapMarker["position"] = this.homeInfo["address_location"]["position"];
          this.ggMapMarker["label"] = "";
          this.ggMapMarker["title"] = "";
          this.ggMapMarker["options"] = {
            draggable: true
          };
          this.ggMapCenter = this.homeInfo["address_location"]["position"];
        }

      }, (error) => {
        console.log(error);
      });
  }

  positionChanged(el) {
    console.log("POSITION CHANGE", el, this.ggMapMarker, this.map)

  }

  onSubmit() {
    this.submitted = true;
    if (!this.homeForm.valid) {
      return false;
    } else {

      let _data = {
        name: this.homeForm.value.name || "errorName",
        phoneNumber: this.homeForm.value.phoneNumber || "",
        people: this.homeForm.value.people || 0,
        address: this.homeForm.value.address || "errorAddress",
        address_location: this.homeInfo["address_location"],
      }

      this.apiService.createHome(_data).subscribe(
        (res) => {
          console.log('User successfully created!')
          //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
