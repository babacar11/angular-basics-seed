import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Donut } from '../../model/donut.model';

@Component({
  selector: 'donut-form',
  template: `
    <form class="donut-form" #form="ngForm" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          minlength="5"
          [ngModel]="donut.name"
          [ngModelOptions]="{ updateOn: 'blur' }"
          required
          #name="ngModel"
        />
        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.required">
            Name is required.
          </div>
          <div class="donut-form-error" *ngIf="name.errors?.minlength">
            Minimum length of a name is
            {{ name.errors!.minlength.requiredLength }}
          </div>
        </ng-container>
      </label>
      <label>
        <span>Icon</span>
        <select
          name="icon"
          class="input"
          [ngModel]="donut.icon"
          required
          #icon="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>
        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="donut-form-error" *ngIf="icon.errors?.required">
            Please select an icon is required.
          </div>
        </ng-container>
      </label>
      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          [ngModel]="donut.price"
          required
          #price="ngModel"
        />

        <ng-container *ngIf="price.invalid && price.touched">
          <div class="donut-form-error" *ngIf="price.errors?.required">
            Price is required. {{ price.errors | json }}
          </div>
          {{ price.errors | json }}
        </ng-container>
      </label>
      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>

      <label
        ><span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="donut.description"
          #description="ngModel"
        ></textarea>

        <ng-container *ngIf="description.invalid && description.touched">
          <div class="donut-form-error" *ngIf="description.errors?.required">
            Description is required.
          </div>
        </ng-container>
      </label>

      <button
        *ngIf="!isEdit"
        type="button"
        (click)="handleCreate(form)"
        class="btn btn--green"
      >
        Create
      </button>
      <button
        type="button"
        (click)="handleUpdate(form)"
        [disabled]="form.untouched"
        class="btn btn--green"
        *ngIf="isEdit"
      >
        Update
      </button>

      <button
        *ngIf="isEdit"
        type="button"
        (click)="handleDelete()"
        class="btn btn--green"
      >
        Delete
      </button>
      <button
        type="button"
        (click)="form.resetForm({ name: '' })"
        class="btn btn--grey"
        *ngIf="form.touched || isEdit"
      >
        Reset Form
      </button>
      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>
      <!-- <pre> {{ donut | json }}</pre> -->
      <!-- <pre> {{ form.form.value | json }}</pre> -->
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;
          &-label {
            margin-right: 10px;
          }

          label {
            display: flex;
            align-items: center;

            span {
              color: #444;
              margin: 0;
            }
          }
        }

        label {
          input[type='number'] {
            -webkit-appearance: none;
            margin: 0;
            -moz-appearance: textfield;
          }
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }

        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  @Input() donut!: Donut;
  @Input() isEdit!: boolean;
  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>();

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'sour-supreme',
    'strawberry-glaze',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
      console.log('Invalid');
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
      console.log('Invalid');
    }
  }

  handleDelete() {
    if (confirm(`Really delete ${this.donut.name}`))
      this.delete.emit(this.donut);
  }
}
