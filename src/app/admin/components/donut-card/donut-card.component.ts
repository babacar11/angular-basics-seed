import {Component, Input} from '@angular/core';
import {Donut} from '../../model/donut.model';
import {RouterLink} from "@angular/router";
import {CurrencyPipe, NgClass, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  standalone: true,
  imports: [RouterLink, NgClass, NgSwitch, NgSwitchCase, CurrencyPipe, NgOptimizedImage],
  selector: 'donut-card',
  template: `
    <a
      class="donut-card"
      [routerLink]="donut.id"
      [ngClass]="{
        'donut-card-promo': donut.promo === 'new'
      }"
    >
      <img
        ngSrc="/assets/img/{{ donut.icon }}.svg"
        width="50"
        height="50"
        [alt]="donut.name"
        class="donut-card-icon"
      />
      <div>
        <p class="donut-card-name">
          {{ donut.name }}
          <ng-container [ngSwitch]="donut.promo">
            <span *ngSwitchCase="'new'" class="donut-card-label"> NEW </span>
            <span *ngSwitchCase="'limited'" class="donut-card-label">
              LIMITED
            </span>
          </ng-container>
        </p>
        <p class="donut-card-price">
          {{ donut.price | currency : 'USD' : 'symbol' }}
        </p>
      </div>
    </a>
  `,
  styles: [
    `
      .donut-card {
        display: flex;
        align-items: center;
        background: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px 15px;
        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: translateY(-3px);
        }

        &-promo {
          border: 2px solid #eee;
        }

        &-label {
          border: 1px solid #c14853;
          border-radius: 4px;
          padding: 0 4px;
          margin-left: 5px;
          font-size: 12px;
          color: #c14583;
        }

        &-name {
          font-size: 16px;
        }

        &-price {
          font-size: 14px;
          color: #c14583;
        }

        &-icon {

          margin-right: 10px;
        }
      }
    `,
  ],
})
export class DonutCardComponent {
  @Input() donut!: Donut;
}
