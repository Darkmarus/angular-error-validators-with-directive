import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appErrorValidator]',
})
export class ErrorValidatorDirective {
  private subscription: Subscription = new Subscription();
  private errorMainContent: any;

  constructor(
    private el: ElementRef,
    @Self() private control: NgControl,
    private renderer2: Renderer2,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.control.statusChanges?.subscribe((_value: any) => this.loadErrors())
    );
    this.errorMainContent = this.createDivErrorMain();
    this.renderer2.appendChild(
      this.el.nativeElement.parentElement,
      this.errorMainContent
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent() {
    this.loadErrors();
  }

  loadErrors() {
    this.clearNode(this.errorMainContent);
    if (this.control.errors) {
      Object.entries(this.control.errors).forEach((item) => {
        const spanError = this.createSpanError(item[0]);
        this.renderer2.appendChild(this.errorMainContent, spanError);
      });
    }
  }

  clearNode(element: any) {
    if (element.childNodes) {
      for (let child of element.childNodes) {
        this.renderer2.removeChild(element, child);
      }
    }
  }

  createSpanError(key: string): any {
    const currentError = this.translocoService.translate(`errors.${key}`);
    const span = this.renderer2.createElement('span');
    this.renderer2.addClass(span, 'text-danger');
    const text = this.renderer2.createText(currentError);
    this.renderer2.appendChild(span, text);
    return span;
  }

  createDivErrorMain() {
    const main = this.renderer2.createElement('div');
    this.renderer2.addClass(main, 'validator-errors');
    return main;
  }
}
