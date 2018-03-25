import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  
  private _productsUrl = "/assets/data/products.json";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._productsUrl)
                    .do(data => console.log('All: ' + JSON.stringify(data)))
                    .catch(this.handleError);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.getProducts().map((products: IProduct[]) => products.find(p => p.productId === id));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof Error) {
      errorMessage = `An error occured: ${err.error.message}`;
    }else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
