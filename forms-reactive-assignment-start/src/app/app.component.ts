import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { rejects } from 'assert';
import { Observable } from 'rxjs-compat';

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
          'email': new FormControl(null, [Validators.required, Validators.email], this.asyncInvalidValidator),
          'projectStatus': new FormControl(null)
        })
      })
  }

  onSubmit() {
    console.log(this.formProject.value);
  }

  forbbidenNames(control: FormControl): {[s: string]: boolean} {
    if (this.restrictedNames.indexOf(control.value) !== -1) {
      return {'nameIsRestricted': true}
    }
    return null;
  }

  asyncInvalidValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, rejects) => {
      setTimeout(() => {
        if(control.value === "test@test.com") {
          resolve({'emailForbbiden': true})
        }else{
          resolve(null)
        }
      }, 15000)
    });
    return promise;
  }
}
