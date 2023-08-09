import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit,OnChanges {

  students: any;
  selectedIndex: any;
  filteredData: any;
  displayedColumns: string[] = ['actions', 'firstName', 'lastName', 'rollNo', "marksObtained"];
  dataSource: any
  isEdit: boolean = false
  firstName: any
  lastName: any
  rollNo: any
  marksObtained: any;
   url = 'assets/students.json'
  @Input() filters: any
  visibleStudentData: any;
  subjectsMapping:any = {
    english : "English",
    mathematics : "Mathematics",
    naturalScience : "Natural Science",
    physicalScience : "Physical Science",
    social : "Social",
    playing : "Playing",
    drawing : "Drawing",
    singing : "Singing",
    science : "Science"
  }
  studentForm: any;
  constructor(private dataService: DataService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
      this.dataService.getStudentsData(this.url).subscribe((res: any) => {
        this.students = res
        console.log(this.filters)
        this.dataSource = this.filterDataBasedOnInputs(this.filters.divisionSlect, this.filters.yearSelect, this.filters.classSelect)
        console.log(this.dataSource)
      })
     }
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rollNo: ['', Validators.required],
      dob: [''],
      standard: [''],
      division: [''],
      year: [''],
      bloodGroup: [''],
      parentsContactNo: [''],
      studentsImage: [''],
      subject: ['', Validators.required],
      marksObtained: ['', Validators.required]
    });
    this.dataService.getStudentsData(this.url).subscribe((res: any) => {
      this.students = res
      console.log(this.filters)
      this.dataSource = this.filterDataBasedOnInputs(this.filters.divisionSlect, this.filters.yearSelect, this.filters.classSelect)
      console.log(this.dataSource)
    })
  }
  ngOnChanges(changes:SimpleChanges) {
    this.dataSource = this.filterDataBasedOnInputs(this.filters.divisionSlect, this.filters.yearSelect, this.filters.classSelect)
  }
  filterDataBasedOnInputs(division: any, year: any, subject: any) {
    let filteredArray: any = []
    let filteredStudentsList = this.students.filter((student: any) => student.division === division).filter((data: any) => data.year === year)
    let subjectFilter = filteredStudentsList.filter((student: any) => student.subjects.filter((_subject: any) => _subject === subject))
    filteredStudentsList.forEach((student: any) => {
      student.subjects.forEach((_subject: any) => {
        if (_subject.subject === subject) {
          student.marksObtained = _subject.marksObtained
          filteredArray.push(student)
        }
      })
    })
    console.log(filteredStudentsList, subjectFilter, filteredArray)
    // return filteredStudentsList
    this.filteredData = filteredArray
    return filteredArray
  }

  editingRow(index: any) {
    console.log(index);
    this.selectedIndex = index;
    this.isEdit = true;
    this.firstName = this.dataSource[index].firstName;
    this.lastName = this.dataSource[index].lastName;
    this.rollNo = this.dataSource[index].rollNo;
    this.marksObtained = this.dataSource[index].marksObtained;
  }
  savingRow(index: any) {
    this.dataSource[index].firstName = this.firstName;
    this.dataSource[index].lastName = this.lastName;
    this.dataSource[index].rollNo = this.rollNo;
    this.dataSource[index].marksObtained = this.marksObtained;
    this.dataSource = [...this.dataSource];
    this.isEdit = false;
  }
  deleteRow(index: any) {
    this.dataSource = this.dataSource.filter((data: any) => data.rollNo != this.dataSource[index].rollNo)
  }
  addUser(addingStudent:any) {
    this.studentForm.controls['division'].setValue(this.filters.divisionSlect)
    this.studentForm.controls['year'].setValue(this.filters.yearSelect)
    this.studentForm.controls['subject'].setValue(this.filters.classSelect)
    this.modalService.open(addingStudent,{ scrollable: true })
  }
  viewStudent(index: any,component:any) {
   this.visibleStudentData = this.dataSource[index]
    this.modalService.open(component)
  }
  subjectMap(sub:any) {
   return this.subjectsMapping[sub]
  }
  getTotalMarks() {
    let data = 0
    this.visibleStudentData.subjects.forEach((sub:any) => data = data + parseInt(sub.marksObtained))
    return data
  }
  onSubmit(): void {

    if (this.studentForm.valid) {
      // Process the form data, e.g., send it to a server
      console.log(this.studentForm.value);
      let obj = this.studentForm.value
      obj.subjects = [
        {
          subject: this.studentForm.value.subject,
          marksObtained : this.studentForm.value.marksObtained
        }
      ]
      this.dataSource =[obj,...this.dataSource]
    } else {
      // Form is invalid, show error messages or handle accordingly
    }
    this.modalService.dismissAll()
  }
  
}
