import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  // This service can be used to share common functionality or data across components
  // For example, you can add methods to fetch data, handle errors, etc.
  // Currently, it is empty but can be extended as needed.
  private httpClient = inject(HttpClient);

  constructor() { }

  products(params:string) {
    // Example method to fetch products
    return this.httpClient.get<ProductResponse>(`https://dummyjson.com/products/search?q=${params}`);
  }

    // Example method to log messages
  log(message: string): void {
    console.log(`CommonService: ${message}`);
  }
  // Example method to handle errors
  handleError(error: any): void {
    console.error('An error occurred:', error);
    // You can implement more sophisticated error handling here
  }
}
