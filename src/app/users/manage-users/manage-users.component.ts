import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  title: string;
  newUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title

    this.newUserForm = new FormGroup({
      name: new FormControl(null),
      surname: new FormControl(null),
      age: new FormControl(null),
      email: new FormControl(null),
      contact: new FormControl(null),
    })
  }

  onSubmit() {

    let newUser: Users = this.newUserForm.value;
    // console.log('Here is your new user: ', newUser);

    this.dialogRef.close(newUser);
  }

}
