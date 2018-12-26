import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
}

getValues() {
this.values = this.http.get('http://localhost:5000/api/values').subscribe(
  data => {this.values = data; },
  error => {
    console.log(error);
  }
);
}

}
