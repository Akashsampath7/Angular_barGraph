import { Injectable } from '@angular/core';
import { ApiConfig } from './api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly responsejsonUrl1 = ApiConfig.responseJsonUrl1;
  private readonly responsejsonUrl2 = ApiConfig.responseJsonUrl2;
  private readonly responsejsonUrl3 = ApiConfig.responseJsonUrl3;
  
  constructor(private http: HttpClient) { }

  //responseTime and EventTime data.
  getJsonData1(): Observable<any[]> {
    return this.http.get<any[]>(this.responsejsonUrl1);
  }

  getJsonData2(): Observable<any[]> {
    return this.http.get<any[]>(this.responsejsonUrl2);
  }

  getJsonData3(): Observable<any[]> {
    return this.http.get<any[]>(this.responsejsonUrl3);
  }
  
}
