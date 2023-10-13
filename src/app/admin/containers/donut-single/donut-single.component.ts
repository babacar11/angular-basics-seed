import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router, RouterModule} from '@angular/router';

import {Donut} from '../../model/donut.model';
import {DonutService} from '../../service/donut.service';
import {DonutFormComponent} from "../../components/donut-form/donut-form.component";

@Component({
  standalone: true,
  imports: [RouterModule, DonutFormComponent],
  selector: 'donut-single',
  template: `
    <div>
      <donut-form
        [isEdit]="isEdit"
        [donut]="donut"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent implements OnInit {
  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.route.snapshot.data['isEdit'];

    this.donutService.readOne(id).subscribe({
      next: (donut) => (this.donut = donut),
      error: (error) => console.warn(error.message),
    });
  }

  onCreate(donut: Donut) {
    this.donutService.create(donut).subscribe({
      next: (donut) => this.router.navigate(['admin', 'donuts', donut.id]),
      error: (error) => console.warn(error.message),
    });
  }

  onUpdate(donut: Donut) {
    this.donutService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (error) => console.warn(error.message),
    });
  }

  onDelete(donut: Donut) {
    this.donutService.delete(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (error) => console.warn(error.message),
    });
  }
}
