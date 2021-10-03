import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteUsersComponent } from './users/delete-users/delete-users.component';
import { SearchComponent } from './search/search.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CarsComponent } from './cars/cars.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductsComponent,
    ManageUsersComponent,
    DeleteUsersComponent,
    SearchComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
