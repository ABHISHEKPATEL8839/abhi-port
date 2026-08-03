import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input() endValue = 0;
  @Input() duration = 1800; // ms
  @Input() suffix = '';
  @Input() prefix = '';

  private observer: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounter();
          this.unobserve();
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.el.nativeElement);
  }

  private startCounter() {
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      // Easing function: easeOutQuad (decelerating to zero velocity)
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easedProgress * (this.endValue - startValue));

      this.el.nativeElement.textContent = `${this.prefix}${currentValue}${this.suffix}`;

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.el.nativeElement.textContent = `${this.prefix}${this.endValue}${this.suffix}`;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
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
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
