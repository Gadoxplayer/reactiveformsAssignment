import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectStatus = ['Stable', 'Critical', 'Finished'];
  formProject: FormGroup;
  restrictedNames = ['Test', 'test', 'TEST'];

  ngOnInit(): void {
      this.formProject = new FormGroup({
        'projectData': new FormGroup({
          'projectName': new FormControl(null, [Validators.required, this.forbbidenNames.bind(this)]),
          'email': new FormControl(null, [Validators.required, Validators.email]),
          'projectStatus': new FormArray([])
        })
      })
  }

  onSubmit() {
    console.log(this.formProject);
  }

  forbbidenNames(control: FormControl): {[s: string]: boolean} {
    if (this.restrictedNames.indexOf(control.value) !== -1) {
      return {'nameIsRestricted': true}
    }
    return null;
  }
}
