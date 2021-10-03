import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, map, share, switchMap } from 'rxjs/operators';

export class ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  storeName: string;
  location: string;
  contact: string;
}

export class OutletModel {
  id: number;
  vatNo: number;
  email: string;
  contact: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject$ = new BehaviorSubject<ProductModel[]>([
    {
      id: 1234,
      name: 'Raobi Drill',
      description: '300 WAT hand drill',
      price: 200,
      category: '(Workshop)',
      storeName: 'Leroy Merlin',
      location: '21 Harry Street, Dunvegan',
      contact: '0785953688',
    },
    {
      id: 1324,
      name: 'Wheelbarrow',
      description: 'Wheelbarrow for building materials',
      price: 150,
      category: '(Construction)',
      storeName: 'Builders Warehouse',
      location: '32 Apline Road',
      contact: '0824450323',

    },
    {
      id: 4652,
      name: 'Sandpaper',
      description: '500 grit',
      price: 50,
      category: '(Handwork)',
      storeName: 'Mica',
      location: '89 Van Riebeek Street',
      contact: '011 4549623',

    },
  ]);
  // products$ = this.productsSubject$.asObservable();

  private outletSubject$ = new BehaviorSubject<OutletModel[]>([
    {
      id: 1111,
      vatNo: 5656898,
      email: 'test@gmail.com',
      contact: '0785953688',
      isActive: true,
    },
    {
      id: 2222,
      vatNo: 9856235,
      email: 'test1@gmail.com',
      contact: '0824450323',
      isActive: true,
    },
    {
      id: 3333,
      vatNo: 7845265,
      email: 'test2@gmail.com',
      contact: '0785953688',
      isActive: false,
    },
  ])

  constructor() { }

  _getProducts(): Observable<ProductModel[]> {
    return this.productsSubject$.asObservable().pipe(
      delay(3000),
    );
  }
  _getOutlets(): Observable<OutletModel[]> {
    return this.outletSubject$.asObservable().pipe(
    );
  }

  _searchProducts(text$: Observable<string>): Observable<string[]> {
    return text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (!searchTerm) {
          return [];
        }
        return this._getProducts()
      })
    )
  }
}
