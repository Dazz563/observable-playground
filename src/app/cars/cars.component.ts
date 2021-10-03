import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CarService, ColorModel, DriverModel, UberDriverModel } from '../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  constructor(
    private carService: CarService,
  ) { }

  ngOnInit(): void {

    // const driverObs$: Observable<DriverModel> = this.carService._getDrivers();
    // const colorObs$: Observable<ColorModel> = this.carService._getColors();

    // const uberDrivers$: Observable<UberDriverModel> = colorObs$.pipe(
    //   mergeMap((color) => {
    //     return driverObs$.pipe(
    //       map((driver) => {
    //         const uberDriver: UberDriverModel = {
    //           driver: driver,
    //           color: color
    //         };
    //         return uberDriver;
    //       })
    //     )
    //   })
    // )
    // uberDrivers$.subscribe(res => console.log(res));
    // driverObs$.subscribe(res => console.log(res));
    // colorObs$.subscribe(res => console.log(res));

  }

}
