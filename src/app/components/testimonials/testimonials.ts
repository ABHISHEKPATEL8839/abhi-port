import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative overflow-hidden" id="testimonials">
      <div class="container">
        <div class="text-center mb-5" appScrollReveal [revealClass]="'reveal reveal-fade'">
          <span class="text-uppercase text-gradient-cyan fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Client Feedback</span>
          <h2 class="display-5 fw-extrabold text-light mb-3">Testimonials</h2>
          <div class="divider mx-auto mb-4"></div>
          <p class="text-muted font-body mx-auto" style="max-width: 600px;">
            What people say about my work, dedication, and technical expertise.
          </p>
        </div>

        <div class="row g-4">
          <div *ngFor="let item of testimonials; let i = index" 
               class="col-md-6 col-lg-4" 
               appScrollReveal 
               [revealClass]="'reveal reveal-scale reveal-delay-' + (i % 3 + 1)">
            <div class="glass-panel p-4 h-100 position-relative hover-glow">
              <i class="bi bi-quote position-absolute text-primary opacity-25" style="font-size: 4rem; top: 10px; right: 20px;"></i>
              
              <div class="mb-4 position-relative" style="z-index: 2;">
                <p class="text-muted font-body fst-italic">"{{ item.quote }}"</p>
              </div>
              
              <div class="d-flex align-items-center mt-auto border-top border-secondary-subtle pt-3">
                <div class="avatar-placeholder bg-gradient-primary rounded-circle me-3 d-flex align-items-center justify-content-center text-white fw-bold fs-5" style="width: 50px; height: 50px;">
                  {{ item.name.charAt(0) }}
                </div>
                <div>
                  <h6 class="text-light fw-bold m-0">{{ item.name }}</h6>
                  <span class="text-cyan small">{{ item.role }} at {{ item.company }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .divider {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-cyan), var(--color-primary));
      border-radius: 2px;
    }
    
    .hover-glow {
      transition: all 0.3s ease;
    }
    
    .hover-glow:hover {
      border-color: rgba(6, 182, 212, 0.4);
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.15);
      transform: translateY(-5px);
    }
    
    .bg-gradient-primary {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    }
  `]
})
export class TestimonialsComponent {
  testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Product Manager',
      company: 'TechFlow',
      quote: 'Abhishek transformed our monolithic front-end into a blazing fast Angular application. His attention to detail and performance optimization is unmatched.'
    },
    {
      name: 'David Chen',
      role: 'CTO',
      company: 'StartupX',
      quote: 'Working with Abhishek was a breeze. He took our rough Firebase architecture and built a secure, scalable data layer that easily handles our growing user base.'
    },
    {
      name: 'Emily Taylor',
      role: 'Lead Designer',
      company: 'Creative Studio',
      quote: 'I love how Abhishek brings designs to life. His CSS skills and understanding of motion UI make the final product look and feel premium.'
    }
  ];
}
