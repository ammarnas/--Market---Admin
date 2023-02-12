import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  CreateNewCart(model: any) {
    return this.http.post(environment.baseAPI + "carts" , model);
  }
}
