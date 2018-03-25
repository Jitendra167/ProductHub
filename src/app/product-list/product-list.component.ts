import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = "Product List";
  public products: IProduct[] = [];
  public errorMsg = '';
  imageWidth: number = 50;
  imageMargin: number = 2;
  constructor(private _productsService: ProductService) { }

  ngOnInit() {
    this._productsService.getProducts()
        .subscribe(data => this.products = data,
                   error => this.errorMsg = error);                   
  }
}
