import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  homeCount = 0
  peopleCount = 0

  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {

    this.apiService.countHome().subscribe(
      (res) => {
        if (res) {
          this.homeCount = res;
        }
      }, (error) => {
        console.log(error);
      });

    this.apiService.countPeople().subscribe(
      (res) => {
        console.log(88888, res)
        if (res && res.length) {
          this.peopleCount = res[0].people;
        }
      }, (error) => {
        console.log(error);
      });

  }


}
