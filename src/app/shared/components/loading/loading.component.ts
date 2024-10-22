import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input() show: boolean = false;
}
