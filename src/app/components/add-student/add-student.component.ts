import { Component, OnInit, ViewChild } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: any;
   @ViewChild(TableComponent)
   tabledata:TableComponent | undefined
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rollno: ['', Validators.required],
      dob: [''],
      standard: [''],
      totalMarks: [''],
      division: [''],
      year: [''],
      bloodGroup: [''],
      parentsContactNo: [''],
      studentsImage: [''],
      subject: ['', Validators.required],
      marksObtained: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      // Process the form data, e.g., send it to a server
      console.log(this.studentForm.value);
    } else {
      // Form is invalid, show error messages or handle accordingly
    }
  }
  // ngAfterViewInit() {
  //   this.studentForm.controls['division'].setValue(this.tabledata?.filters.divisionSlect);
  //   this.studentForm.controls['year'].setValue(this.tabledata?.filters.yearSelect);
  //   this.studentForm.controls['subject'].setValue(this.tabledata?.filters.classSelect)
  // }
}

