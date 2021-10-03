import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export class UberDriverModel {
  driver: string
  color: string;
}

export class DriverModel {
  driver: string;
}

export class ColorModel {
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private driversSubject$ = new BehaviorSubject<DriverModel>(
    {
      driver: 'Darren Nienaber',
    },
    // {
    //   id: '2345',
    //   driver: 'Miguel Alves',
    //   contact: '0785456325',
    //   hasDrivers: false,
    //   carType: 'Mercedes',
    //   carModel: 'X Class',
    //   year: 2020
    // },
    // {
    //   id: '6789',
    //   driver: 'Vern Obbes',
    //   contact: '0785956899',
    //   hasDrivers: true,
    //   carType: 'Kia',
    //   carModel: 'Serato',
    //   year: 2021
    // },
  );

  private colorSubject$ = new BehaviorSubject<ColorModel>(
    {
      color: 'Red',
    },
    // {
    //   color: 'Blue',
    //   windowTint: true,

    // },
    // {
    //   color: 'Green',
    //   windowTint: true,

    // },
  );

  constructor() { }


  _getDrivers(): Observable<DriverModel> {
    return this.driversSubject$.asObservable();
  }

  _getColors(): Observable<ColorModel> {
    return this.colorSubject$.asObservable();
  }
}
