import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Project {
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  tags: string[];
  features: string[];
  icon: string;
  color: string;
  githubUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Header -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-primary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Portfolio</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Featured Projects</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="row g-4">
          <div class="col-lg-4 col-md-6" *ngFor="let project of projects; let idx = index"
               appScrollReveal 
               [revealClass]="'reveal reveal-scale'" 
               [revealDelayClass]="'reveal-delay-' + (idx + 1)">
            <div class="glass-panel glass-card-hover p-4 h-100 d-flex flex-column justify-content-between relative"
                 [style.border-top]="'3px solid ' + project.color">
              <div>
                <div class="project-icon mb-3" [style.background-color]="project.color + '15'" [style.color]="project.color">
                  <i [class]="project.icon"></i>
                </div>
                <h3 class="h4 font-heading text-light mb-2">{{ project.title }}</h3>
                <h6 class="text-cyan font-heading mb-3 small">{{ project.subtitle }}</h6>
                <p class="text-muted font-body mb-4 small">{{ project.summary }}</p>
              </div>

              <div>
                <div class="tags-container d-flex flex-wrap gap-2 mb-4">
                  <span class="tag-badge small" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>
                
                <button class="btn btn-glass w-100 py-2 d-flex align-items-center justify-content-center"
                        (click)="openDialog(project, detailDialog)">
                  View Architecture <i class="bi bi-info-circle ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Native HTML5 Glassmorphic Dialog -->
      <dialog #detailDialog class="glass-dialog">
        <div class="dialog-header p-4 d-flex justify-content-between align-items-center" *ngIf="selectedProject">
          <h3 class="h4 font-heading text-light m-0 d-flex align-items-center">
            <i [class]="selectedProject.icon + ' me-2'" [style.color]="selectedProject.color"></i>
            {{ selectedProject.title }}
          </h3>
          <button class="close-btn" (click)="closeDialog(detailDialog)">
            <i class="bi bi-x fs-4"></i>
          </button>
        </div>
        
        <div class="dialog-body p-4 overflow-y-auto" *ngIf="selectedProject">
          <p class="font-body text-light opacity-90 mb-4">{{ selectedProject.description }}</p>
          
          <h4 class="h6 text-cyan font-heading text-uppercase mb-3">Key Implementations</h4>
          <ul class="features-list d-flex flex-column gap-2 mb-4 font-body small text-muted">
            <li class="d-flex align-items-start" *ngFor="let feature of selectedProject.features">
              <i class="bi bi-check-circle-fill text-cyan me-2 mt-0.5"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="d-flex flex-wrap gap-2 mb-4">
            <span class="tag-badge" *ngFor="let tag of selectedProject.tags">{{ tag }}</span>
          </div>
        </div>

        <div class="dialog-footer p-4 d-flex gap-3 justify-content-end border-top border-secondary-subtle" *ngIf="selectedProject">
          <button class="btn btn-glass py-2 px-4" (click)="closeDialog(detailDialog)">Close</button>
          <a [href]="selectedProject.githubUrl" target="_blank" class="btn btn-glow-primary py-2 px-4 d-flex align-items-center">
            GitHub Repo <i class="bi bi-github ms-2"></i>
          </a>
        </div>
      </dialog>
    </section>
  `,
  styles: [`
    .divider {
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }
    
    .project-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .tag-badge {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--color-text-muted);
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      color: var(--color-text-muted);
      transition: color 0.2s ease;
      cursor: pointer;
    }
    
    .close-btn:hover {
      color: #ffffff;
    }
    
    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .text-cyan {
      color: var(--color-cyan);
    }
    
    dialog.glass-dialog {
      max-height: 85vh;
    }
  `]
})
export class ProjectsComponent {
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      title: 'Mini-whatsapp',
      subtitle: 'Real-Time Chat App Clone',
      summary: 'A sophisticated web messaging application replicating core WhatsApp features with active database synchronization.',
      description: 'Mini-whatsapp is a real-time communications dashboard built on Angular. It establishes live message synchronization using Cloud Firestore collection listeners, implements user verification using Firebase Authentication, and features interactive emoji selection grids alongside rich file attachment utilities.',
      tags: ['Angular', 'TypeScript', 'Firebase Auth', 'Cloud Firestore', 'RxJS', 'CSS Grid'],
      features: [
        'Real-time messaging with live Firestore snapshots.',
        'Active status indicator channels using window tab callbacks.',
        'Encrypted session state tracking preserved in LocalStorage.',
        'Seamless media encoding to Base64 payloads for direct document and image delivery.'
      ],
      icon: 'bi-whatsapp',
      color: '#25D366',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/Mini-whatsaap'
    },
    {
      title: 'arccms',
      subtitle: 'Modular Content Management System',
      summary: 'A flexible, template-driven CMS platform allowing automated publishing workflows and layout creation.',
      description: 'arccms is an advanced content hub structured to process custom templates and layouts. It utilizes serverless Firebase Functions for SSR/API layers, integrates with secure Firestore collections, and employs interactive control dashboards to orchestrate assets, styles, and page layouts dynamically.',
      tags: ['Node.js', 'Express', 'Firebase Functions', 'Firestore Rules', 'EJS/HTML5'],
      features: [
        'Secure API routes with custom Firestore database rules.',
        'Dynamic EJS template loading and partial compilers.',
        'Automated schema generation for custom content forms.',
        'Automated hosting builds and static deployments.'
      ],
      icon: 'bi-layers-half',
      color: '#06b6d4',
      githubUrl: 'https://github.com/quadralyst/arccms'
    },
    {
      title: 'Trainee-hitMvp',
      subtitle: 'Enterprise MVP Training Hub',
      summary: 'An employee onboarding and workflow management platform featuring onboarding routes and ritual dashboards.',
      description: 'Trainee-hitMvp is a business-facing training workspace built to organize onboarding processes. It implements deep routing structures, includes interactive onboarding steps, and offers dashboard summaries monitoring employees daily rituals, paths, and tasks.',
      tags: ['Angular CLI', 'TypeScript', 'SCSS Modules', 'Angular Forms', 'Path Routing'],
      features: [
        'Interactive 6-step onboarding form maps checking validations.',
        'Visual roadmaps with path-builder nodes.',
        'FormBuilder implementations for robust data verification.',
        'State-driven components controlling ritual trackers and user lists.'
      ],
      icon: 'bi-award-fill',
      color: '#d946ef',
      githubUrl: 'https://github.com/quadralyst-ritesh/Trainee-hitMvp'
    }
  ];

  openDialog(project: Project, dialogEl: HTMLDialogElement) {
    this.selectedProject = project;
    dialogEl.showModal();
  }

  closeDialog(dialogEl: HTMLDialogElement) {
    dialogEl.close();
    this.selectedProject = null;
  }
}
