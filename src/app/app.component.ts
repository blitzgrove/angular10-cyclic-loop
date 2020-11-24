import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm
} from "@angular/forms";

export const cyclicIterator = function(array) {
  let index = 0;
  let copy = array.slice(0);

  return {
    getCurrent: function() {
      return copy[index];
    },
    getNext: function() {
      index = ++index % copy.length;
      return this.getCurrent();
    },
    getPrevious: function() {
      if (--index < 0) index += copy.length;
      return this.getCurrent();
    }
  };
};

@Component({
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  sampleArr = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  cyclicArr = cyclicIterator(this.sampleArr);

  onClick() {
    this.form.patchValue({
      item: this.cyclicArr.getNext()
    });
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      item: this.cyclicArr.getCurrent()
    });
  }

  ngOnInit() {}

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}