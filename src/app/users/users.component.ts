import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { UsersService, Users } from '../services/users.service';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'surname', 'age', 'email', 'contact', 'actions'];
  dataSource = new MatTableDataSource<Users>();
  usersSub: Subscription

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.usersSub = this.usersService._getUsers()
      .subscribe(

        (users: Users[]) => {
          console.log('Here are your users: ', users);
          this.dataSource.data = users
        },

        (err) => console.log(err),

        () => console.log('Observable complete!')
      );
  }

  addUser() {
    const dialogRef = this.dialog.open(ManageUsersComponent, {
      width: '500px',
      data: {
        title: `ADD NEW USER`,
        message: `Please add your new users information!`,
        btnName: `Create`,
      }
    });

    dialogRef.afterClosed().subscribe((newUser: Users) => {
      if (newUser) {
        newUser.id = Date.now();
        console.log('The dialog was closed', newUser);
        this.usersService._addUser(newUser).subscribe(
          () => { }
        )
      }
    });
  }

  viewUser(user: Users) {
    const dialogRef = this.dialog.open(ManageUsersComponent, {
      width: '500px',
      data: {
        title: `VIEW USER`,
        message: `View your users information`,
        isView: true,
        user: user,
      }
    });
  }

  editUser(user: Users) {
    const dialogRef = this.dialog.open(ManageUsersComponent, {
      width: '500px',
      data: {
        title: `UPDATE USER`,
        message: `Update your users information`,
        btnName: `Update`,
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe((editedUser: Users) => {
      if (editedUser) {
        console.log('The dialog was closed', editedUser);
        this.usersService._updateUser(editedUser).subscribe(
          () => { }
        )
      }
    });

  }

  deleteUser(user: Users) {
    const dialogRef = this.dialog.open(DeleteUsersComponent, {
      width: '400px',
      data: {
        title: `Delete User`,
        message: `Are you sure you want to delete this user?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService._deleteUser(user.id).subscribe(
          () => { }
        )

      }
    });

  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
      console.log('ngOnDestroy initialized')
    }
  }
}


