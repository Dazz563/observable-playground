import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { from, fromEvent, interval, Observable, of, range, throwError } from 'rxjs';
import { tap, take, mergeMap, map, pluck, filter, catchError, takeLast, switchMap } from 'rxjs/operators';
import { OutletModel, ProductModel, ProductService } from '../services/product.service';
import { LoadingSpinner } from '../shared/utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: ProductModel[];

  constructor(
    private productService: ProductService,
    public loadingSpinner: LoadingSpinner,
  ) { }

  ngOnInit(): void {

    const prodObs = this.productService._getProducts();
    const outletObs = this.productService._getOutlets();

    this.loadingSpinner.setLoadingSpinner(prodObs);

    const combined = prodObs.pipe(
      switchMap((prods: ProductModel[]) => {
        return outletObs
          .pipe(
            tap((outlets: OutletModel[]) => {
              console.log('Here are you switchMapped products: ', prods);
              console.log('Here are you switchMapped outlets: ', outlets);

              this.products = prods;

            })
          );
      })
    )
    combined.subscribe()

    // const users$ = from([
    //   {
    //     name: 'Darren',
    //     surname: 'Nienaber',
    //     age: 35,
    //   },
    //   {
    //     name: 'Miguel',
    //     surname: 'Alves',
    //     age: 30,
    //   },
    // ]
    // );

    // users$.pipe(
    //   pluck('name'),
    // )
    //   .subscribe(val => console.log(val));



    // const clicks = fromEvent(document, 'click');
    // const tagNames = clicks.pipe(pluck('target', 'tagName'));
    // tagNames.subscribe(x => console.log(x));
  }






}
