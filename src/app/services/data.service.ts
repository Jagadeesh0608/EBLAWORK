import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  students:any
  constructor(private httpClient:HttpClient) { 
    
  }

 getStudentsData(url:any):Observable<any> {
  
  // this.httpClient.get('assets/students.json').subscribe(res => {
  //   this.students = res
  // })
  return this.httpClient.get(url).pipe(map(val =>  val));
  
 }
}
