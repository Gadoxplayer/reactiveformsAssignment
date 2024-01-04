import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectStatus = ['Stable', 'Critical', 'Finished'];
  formProject: FormGroup;

  ngOnInit(): void {
      this.formProject = new FormGroup({
        'projectData': new FormGroup({
          'projectName': new FormControl(null, Validators.required),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'projectStatus': new FormArray([])
        })
      })
  }

  onSubmit() {
    console.log(this.formProject);
  }
}
