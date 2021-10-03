import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter, map, take, tap } from 'rxjs/operators';

export class Users {
  id: number;
  name: string;
  surname: string;
  age: number;
  email: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users$ = new BehaviorSubject<Users[]>([
    {
      id: 154875,
      name: 'Darren',
      surname: 'Nienaber',
      age: 35,
      email: 'test@gmail.com',
      contact: '0785953688'
    },
    {
      id: 958754,
      name: 'Miguel',
      surname: 'Alves',
      age: 30,
      email: 'test1@gmail.com',
      contact: '0824450323'
    },
    {
      id: 967425,
      name: 'Rodney',
      surname: 'Coetze',
      age: 23,
      email: 'test2@gmail.com',
      contact: '0785986523'
    },
    {
      id: 257416,
      name: 'Steven',
      surname: 'Nixon',
      age: 21,
      email: 'test3@gmail.com',
      contact: '0781234587'
    },
    {
      id: 450125,
      name: 'Jevan',
      surname: 'Van der Merwe',
      age: 19,
      email: 'test4@gmail.com',
      contact: '0785953688'
    },
  ]);
  getUsers$ = this.users$.asObservable();

  constructor() { }

  _getUsers(): Observable<Users[]> {
    // return this.users$.asObservable().pipe(take(1)); // if you take 1 here you will not see CRUD operations
    return this.users$.asObservable();
  }

  _getUser(id: number): Observable<Users> {
    return this._getUsers().pipe(
      take(1),
      map((users: Users[]) => {
        return users.find(u => u.id === id);
      })
    )
  }

  _updateUser(updatedUser: Users) {
    return this._getUsers().pipe(
      take(1),
      tap((users: Users[]) => {
        const updatedUserIndex = users.findIndex(user => user.id === updatedUser.id);
        const updatedUsers = [...users];
        updatedUsers.splice(updatedUserIndex, 1, updatedUser);
        this.users$.next(updatedUsers);
      })
    )
  }

  _addUser(newUser: Users): Observable<Users[]> {
    return this._getUsers().pipe(
      take(1),
      tap((users: Users[]) => {
        this.users$.next(users.concat(newUser))
      })
    )
  }

  _deleteUser(userId: number): Observable<Users[]> {
    return this._getUsers().pipe(
      take(1),
      tap((users: Users[]) => {
        this.users$.next(users.filter(user => user.id !== userId));
      })
    )
  }
}
