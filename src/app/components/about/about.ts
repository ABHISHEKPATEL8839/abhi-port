import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative overflow-hidden">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <!-- Bio details card -->
          <div class="col-lg-6 mb-5 mb-lg-0" appScrollReveal [revealClass]="'reveal reveal-left'">
            <span class="text-uppercase text-gradient-cyan fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">About Me</span>
            <h2 class="display-5 fw-extrabold text-light mb-4">Crafting Scalable Modern Web Ecosystems</h2>
            <p class="text-muted font-body mb-4">
              I am a passionate Software Engineer focused on designing and implementing modular user interfaces and real-time backend integrations. By combining powerful frontend paradigms like Angular with serverless components like Firebase, I construct robust applications that scale effortlessly.
            </p>
            <p class="text-muted font-body mb-4">
              Whether architecting secure database index collections in Cloud Firestore, orchestrating lazy-loaded component routes, or tuning CSS layout paint loops, I strive to write elegant, clean, and maintainable code.
            </p>
            
            <div class="d-flex align-items-center gap-3 mt-4">
              <a href="#contact" class="btn btn-glow-primary py-3 px-4">Get In Touch</a>
              <a href="#projects" class="btn btn-glass py-3 px-4">Explore Projects</a>
            </div>
          </div>
          
          <!-- Statistics Dashboard grid -->
          <div class="col-lg-5" appScrollReveal [revealClass]="'reveal reveal-right'">
            <div class="row g-4">
              <div class="col-6" *ngFor="let stat of stats; let i = index">
                <div class="glass-panel glass-card-hover p-4 text-center">
                  <div class="stat-icon mb-3">
                    <i [class]="stat.icon"></i>
                  </div>
                  <h3 class="display-6 fw-extrabold text-light mb-1">{{ stat.value }}</h3>
                  <p class="text-muted font-body small mb-0">{{ stat.label }}</p>
                </div>
              </div>
            </div>
            
            <!-- Quick Quote Card -->
            <div class="glass-panel p-4 mt-4" appScrollReveal [revealClass]="'reveal reveal-scale'" [threshold]="0.1">
              <p class="fst-italic text-muted font-body mb-2">
                "Writing code is not just about making things work, it is about crafting digital solutions that feel completely intuitive and performant."
              </p>
              <span class="text-light fw-bold font-heading small">— Abhishek Patel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .letter-spacing-1 {
      letter-spacing: 0.1em;
    }
    
    .stat-icon {
      font-size: 2.2rem;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `]
})
export class AboutComponent {
  stats = [
    { value: '5+', label: 'Projects Built', icon: 'bi-rocket-takeoff' },
    { value: '3+', label: 'MVPs Launched', icon: 'bi-trophy' },
    { value: '100%', label: 'Clean Code', icon: 'bi-shield-check' },
    { value: '24/7', label: 'Tech Learner', icon: 'bi-cpu' }
  ];
}
