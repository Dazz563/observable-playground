import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { UsersService, Users } from '../services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    // this.usersService._getUsers().pipe(
    //   tap(() => interval(1000).pipe(take(11)).subscribe(
    //     // tap(() => interval(1000).subscribe(

    //     (val) => console.log(val),

    //     (err) => console.log(err),

    //     () => console.log('Observable complete!')
    //   )),
    // )
    //   .subscribe(

    //     (users: Users[]) => console.log('Here are your users: ', users),

    //     (err) => console.log(err),

    //     () => console.log('Observable complete!')
    //   );
  }

}
