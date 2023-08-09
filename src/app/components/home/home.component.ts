import { Component, OnInit } from '@angular/core';
import { divisionData, years, classes } from '../../shared/constant'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  division = divisionData;
  years = [];
  class = [];
  divsionSelect: any
  yearSelect: any
  classSelect: any
  isTable: boolean = false;
  filter: any
  constructor() { }

  ngOnInit(): void {
  }
  onDivisionSelect() {
    if (this.divsionSelect != null)
    this.yearSelect = null;
    this.classSelect = null;
    this.years = years[this.divsionSelect]
    this.class = classes[this.divsionSelect]
  }
  getDisable() {
    if (this.divsionSelect && this.yearSelect && this.classSelect) {
      return false
    } else {
      return true
    }
  }

  getTableOfStudents() {
    this.isTable = true;
    this.filter = {
      divisionSlect : this.divsionSelect,
      yearSelect   :this.yearSelect,
      classSelect : this.classSelect
    }
  }
}
