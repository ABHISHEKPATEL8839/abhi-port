import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealClass = 'reveal'; // base class added to style element
  @Input() revealAnimationClass = 'active'; // class that triggers animation
  @Input() threshold = 0.15; // percentage visibility before reveal

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (typeof window === 'undefined') return;

    // Apply the initial reveal class (handles space-separated classes safely)
    if (this.revealClass) {
      const classes = this.revealClass.split(' ').filter(c => c.trim().length > 0);
      this.el.nativeElement.classList.add(...classes);
    }

    // Setup intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add(this.revealAnimationClass);
            // Once revealed, we don't need to observe it anymore
            this.unobserve();
          }
        });
      },
      {
        threshold: this.threshold
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private unobserve() {
    if (this.observer) {
      this.observer.unobserve(this.el.nativeElement);
      this.observer.disconnect();
      this.observer = null;
    }
  }

  ngOnDestroy() {
    this.unobserve();
  }
}
