import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Skill {
  name: string;
  level: number; // percentage
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Section Header -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-cyan fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Expertise</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Skills & Capabilities</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <!-- Skills Grid Dashboard -->
        <div class="row g-4">
          <div class="col-lg-4" *ngFor="let category of skillCategories; let i = index" 
               appScrollReveal 
               [revealClass]="'reveal reveal-scale'"
               [revealClass]="i === 0 ? 'reveal reveal-left' : (i === 2 ? 'reveal reveal-right' : 'reveal reveal-scale')">
            <div class="glass-panel p-4 h-100">
              <h3 class="h4 font-heading text-light border-bottom border-secondary-subtle pb-3 mb-4 d-flex align-items-center">
                <span class="category-indicator me-2"></span>
                {{ category.title }}
              </h3>
              
              <div class="skills-list d-flex flex-column gap-4">
                <div class="skill-item" *ngFor="let skill of category.skills" 
                     appScrollReveal 
                     [revealClass]="'reveal-item'"
                     [threshold]="0.05">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="font-body text-light d-flex align-items-center">
                      <i [class]="skill.icon + ' me-2 text-cyan'"></i>
                      {{ skill.name }}
                    </span>
                    <span class="font-heading text-cyan small fw-bold">{{ skill.level }}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" [style.--progress]="skill.level + '%'"></div>
                  </div>
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
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }
    
    .category-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-cyan);
      box-shadow: 0 0 8px var(--color-cyan);
      display: inline-block;
    }
    
    .text-cyan {
      color: var(--color-cyan);
    }
    
    .progress-track {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    
    .progress-fill {
      width: 0;
      height: 100%;
      background: linear-gradient(90deg, var(--color-primary), var(--color-cyan));
      border-radius: 4px;
      transition: width 1.6s cubic-bezier(0.1, 1, 0.1, 1);
    }
    
    /* Reveal item trigger from ScrollReveal directive context */
    :host ::ng-deep .active .progress-fill {
      width: var(--progress);
    }

    .skills-list {
      perspective: 1000px;
    }
  `]
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'Angular Framework', level: 95, icon: 'bi-hexagon' },
        { name: 'TypeScript', level: 90, icon: 'bi-filetype-ts' },
        { name: 'JavaScript / ESNext', level: 92, icon: 'bi-filetype-js' },
        { name: 'HTML5 & CSS3', level: 90, icon: 'bi-code-slash' },
        { name: 'Bootstrap & Tailwind', level: 95, icon: 'bi-grid-fill' }
      ]
    },
    {
      title: 'Backend & Firebase',
      skills: [
        { name: 'Firebase Firestore', level: 90, icon: 'bi-database-fill-gear' },
        { name: 'Firebase Auth & Hosting', level: 95, icon: 'bi-shield-lock-fill' },
        { name: 'Node.js & Express', level: 85, icon: 'bi-box-seam-fill' },
        { name: 'Laravel (PHP)', level: 75, icon: 'bi-diagram-3-fill' },
        { name: 'PostgreSQL / SQL', level: 80, icon: 'bi-database' }
      ]
    },
    {
      title: 'Languages & Workflow',
      skills: [
        { name: 'C++ Programming', level: 85, icon: 'bi-file-code-fill' },
        { name: 'Git & Version Control', level: 90, icon: 'bi-git' },
        { name: 'Firebase CLI', level: 90, icon: 'bi-terminal-fill' },
        { name: 'Linting & Formatting', level: 85, icon: 'bi-check-all' }
      ]
    }
  ];
}
