import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = "Product Detail";
  errorMessage: string;
  product: IProduct;

  constructor(private _productService: ProductService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get("id");
    if(param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this._productService.getProduct(id)
        .subscribe((product) => {this.product = product},
      (error) => {this.errorMessage = <any>error});
  }

  onBack(): void {
    this._router.navigate(['/productlist']);
  }
}
