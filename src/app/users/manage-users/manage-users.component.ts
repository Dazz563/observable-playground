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
  message: string;
  btnName: string;
  newUserForm: FormGroup;
  isView: boolean;

  constructor(
    public dialogRef: MatDialogRef<ManageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.btnName = this.data.btnName;
    this.isView = this.data.isView;

    this.newUserForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      surname: new FormControl(null),
      age: new FormControl(null),
      email: new FormControl(null),
      contact: new FormControl(null),
    })
    if (this.data.user) {
      this.newUserForm.patchValue(this.data.user);
    }
    if (this.isView) {
      this.newUserForm.disable()
    }
  }

  onSubmit() {

    let newUser: Users = this.newUserForm.value;
    // console.log('Here is your new user: ', newUser);

    this.dialogRef.close(newUser);

  }

}
