import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  //Home
  // Create Home
  createHome(data): Observable<any> {
    let url = `${this.baseUri}/home/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get All Home
  getAllHome(param): Observable<any> {
    let url = `${this.baseUri}/home`;
    if (param && param.district&&param.distric != "") {
      url = `${this.baseUri}/home/district/${param.district}`;

    }

    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Get one home
  getHome(id): Observable<any> {
    let url = `${this.baseUri}/home/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Count all Home
  countHome(): Observable<any> {
    let url = `${this.baseUri}/all/count-home`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Count all People
  countPeople(): Observable<any> {
    let url = `${this.baseUri}/all/count-home-people`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Update one home
  updateHome(id, is_change_people, data): Observable<any> {
    let url = `${this.baseUri}/home/update/${id}/${is_change_people}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Get history by home
  getHomeHistory(id): Observable<any> {
    let url = `${this.baseUri}/home-history/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //Create history by home
  createHomeHistory(data): Observable<any> {
    let url = `${this.baseUri}/home-history/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  //Get district polygon
  //EX: District 1
  //http://polygons.openstreetmap.fr/get_geojson.py?id=2587287&params=0

  // getDistrictPolygon(data): Observable<any> {
  //   // let url = `${this.baseUri}/home-history/create`;
  //   let url = `http://polygons.openstreetmap.fr/get_geojson.py?id=2587287&params=0`
  //   return this.http.get(url, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // getDistrictPolygon(): Observable<any> {
  //   let url = `http://polygons.openstreetmap.fr/get_geojson.py?id=2587287&params=0`
  //   return this.http.get(url, { headers: new HttpHeaders().set('Content-Type', 'text/plain')}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }



















  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all users
  getUsers() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteUser(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  getAddressInfo(addr_string): Observable<any> {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr_string}&key=AIzaSyAvR9_B8ymX8YELstOmxx5pgP4LTY9maZw`;
    return this.http.get(url).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  //create district
  // Create Home
  createDistrict(data): Observable<any> {
    let url = `${this.baseUri}/district/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}


