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
  liveUrl: string;
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
               [revealClass]="'reveal reveal-scale reveal-delay-' + (idx + 1)">
            <div class="glass-panel glass-card-hover project-card p-4 h-100 d-flex flex-column justify-content-between relative"
                 [style.border-top]="'3px solid ' + project.color">
              <div>
                <div class="project-icon-wrapper mb-3">
                  <div class="project-icon" [style.background-color]="project.color + '18'" [style.color]="project.color">
                    <i [class]="project.icon"></i>
                  </div>
                </div>
                <h3 class="h4 font-heading text-light mb-2 project-title">{{ project.title }}</h3>
                <h6 class="text-cyan font-heading mb-3 small">{{ project.subtitle }}</h6>
                <p class="text-muted font-body mb-4 small opacity-90">{{ project.summary }}</p>
              </div>

              <div>
                <div class="tags-container d-flex flex-wrap gap-2 mb-4">
                  <span class="tag-badge small" *ngFor="let tag of project.tags">{{ tag }}</span>
                </div>
                
                <div class="d-flex gap-2">
                  <button class="btn btn-glass flex-grow-1 py-2 d-flex align-items-center justify-content-center view-btn"
                          (click)="openDialog(project, detailDialog)">
                    Details <i class="bi bi-info-circle ms-1.5 small"></i>
                  </button>
                  <a [href]="project.githubUrl" target="_blank" class="btn btn-glass px-3 py-2 d-flex align-items-center justify-content-center social-btn card-link-btn" title="GitHub Repository">
                    <i class="bi bi-github"></i>
                  </a>
                  <a [href]="project.liveUrl" target="_blank" class="btn btn-glow-primary px-3 py-2 d-flex align-items-center justify-content-center social-btn card-link-btn" title="Live Demo">
                    <i class="bi bi-box-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Native HTML5 Glassmorphic Dialog with Animated Features -->
      <dialog #detailDialog class="glass-dialog"
              (click)="onDialogClick($event, detailDialog)"
              (cancel)="onDialogCancel($event, detailDialog)">
        <div class="dialog-header p-4 d-flex justify-content-between align-items-center" *ngIf="selectedProject">
          <h3 class="h4 font-heading text-light m-0 d-flex align-items-center">
            <i [class]="selectedProject.icon + ' me-2 icon-pop'" [style.color]="selectedProject.color"></i>
            {{ selectedProject.title }}
          </h3>
          <button class="close-btn" (click)="closeDialog(detailDialog)">
            <i class="bi bi-x-lg fs-5"></i>
          </button>
        </div>
        
        <div class="dialog-body p-4 overflow-y-auto" *ngIf="selectedProject">
          <p class="font-body text-light opacity-90 mb-4 lead fs-6">{{ selectedProject.description }}</p>
          
          <h4 class="h6 text-cyan font-heading text-uppercase mb-3 letter-spacing-1">Key Technical Implementations</h4>
          <ul class="features-list d-flex flex-column gap-2 mb-4 font-body small text-muted">
            <li class="d-flex align-items-start feature-item" *ngFor="let feature of selectedProject.features">
              <i class="bi bi-check-circle-fill text-cyan me-2 mt-0.5 check-icon"></i>
              <span class="text-light opacity-90">{{ feature }}</span>
            </li>
          </ul>

          <div class="d-flex flex-wrap gap-2 mb-2">
            <span class="tag-badge modal-tag" *ngFor="let tag of selectedProject.tags">{{ tag }}</span>
          </div>
        </div>

        <div class="dialog-footer p-4 d-flex gap-3 justify-content-end border-top border-secondary-subtle" *ngIf="selectedProject">
          <button class="btn btn-glass py-2 px-4" (click)="closeDialog(detailDialog)">Close</button>
          <a [href]="selectedProject.githubUrl" target="_blank" class="btn btn-glass py-2 px-4 d-flex align-items-center">
            GitHub Repo <i class="bi bi-github ms-2"></i>
          </a>
          <a [href]="selectedProject.liveUrl" target="_blank" class="btn btn-glow-primary py-2 px-4 d-flex align-items-center">
            Live Demo <i class="bi bi-box-arrow-up-right ms-2"></i>
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
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
    }

    .project-card {
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    .project-icon-wrapper {
      perspective: 500px;
    }

    .project-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      transition: transform 0.4s ease, box-shadow 0.4s ease;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .project-card:hover .project-icon {
      transform: scale(1.15) rotate(6deg);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    
    .tag-badge {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--color-text-muted);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.78rem;
      font-weight: 500;
      transition: all 0.25s ease;
    }

    .tag-badge:hover {
      background: rgba(99, 102, 241, 0.1);
      border-color: var(--color-primary);
      color: #ffffff;
      transform: translateY(-2px);
    }

    .modal-tag {
      background: rgba(6, 182, 212, 0.1);
      border-color: rgba(6, 182, 212, 0.3);
      color: var(--color-cyan);
    }
    
    .view-btn .view-icon {
      transition: transform 0.3s ease;
    }

    .view-btn:hover .view-icon {
      transform: translate(2px, -2px) scale(1.15);
      color: var(--color-cyan);
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
      transition: all 0.25s ease;
      cursor: pointer;
    }
    
    .close-btn:hover {
      color: #ffffff;
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.4);
      transform: rotate(90deg);
    }
    
    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .feature-item {
      padding: 6px 10px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .feature-item:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(4px);
    }

    .check-icon {
      font-size: 1.1rem;
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
      title: 'E-Commerce Platform',
      subtitle: 'Modern Digital Storefront',
      summary: 'A robust shopping cart and catalog dashboard with mock payment flows.',
      description: 'A fully featured shopping experience including product galleries, search filters, state-managed shopping carts, and dynamic checkout billing forms.',
      tags: ['Angular', 'TypeScript', 'RxJS', 'LocalStorage', 'Bootstrap'],
      features: [
        'Dynamic catalog filters by category, price, and rating.',
        'Stateful shopping cart manager with active item counts and summary calculations.',
        'Mock payment checkout integration with FormBuilder validations.',
        'Responsive design optimized for both mobile browsing and desktop checkout.'
      ],
      icon: 'bi-cart3',
      color: '#3b82f6',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/ecommerce',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/ecommerce'
    },
    {
      title: 'School Management System',
      subtitle: 'Institutional Portal & Dashboard',
      summary: 'An administrative workflow portal managing student records and classes.',
      description: 'A multi-role portal for tracking enrollments, grades, teacher schedules, fee payments, and class configurations.',
      tags: ['Angular', 'Forms', 'Routing', 'TypeScript', 'Data Tables'],
      features: [
        'Dynamic student database filters and record management.',
        'Interactive grade sheets and performance reports.',
        'Class scheduler with drag-and-drop course configurations.',
        'Fee tracking ledger with payment status indicators.'
      ],
      icon: 'bi-mortarboard',
      color: '#10b981',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/school-management',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/school-management'
    },
    {
      title: 'Movie Rating System',
      subtitle: 'Media Review & Query Hub',
      summary: 'A comprehensive movie rating platform pulling search requests and listings.',
      description: 'An interactive catalog allowing search queries, category sorting, stars ratings, and detailed user reviews for movies and shows.',
      tags: ['Angular', 'API Integration', 'RxJS', 'CSS Grid', 'Star Rating'],
      features: [
        'Responsive search fields filtering extensive cinema catalogs.',
        'Interactive stars ratings components reflecting immediate user choices.',
        'Detailed review boards for user comments and sentiment rating.',
        'Dynamic movie trailers and media detail overlays.'
      ],
      icon: 'bi-film',
      color: '#f59e0b',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/movie-rating-system',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/movie-rating-system'
    },
    {
      title: 'Interactive Calculator',
      subtitle: 'Mathematic Workspace',
      summary: 'A sleek, floating math engine handling rapid calculations.',
      description: 'A high-performance interactive math application with arithmetic calculations, equations history, and cyberpunk styling.',
      tags: ['HTML5', 'CSS Grid', 'JavaScript', 'Math Engine', 'Responsive'],
      features: [
        'Clean math expression compiler verifying mathematical orders (PEMDAS).',
        'Detailed calculations history ledger storing past results in LocalStorage.',
        'Keyboard inputs tracking matching physical buttons.',
        'Premium glassmorphism theme with smooth button press scaling.'
      ],
      icon: 'bi-calculator',
      color: '#ec4899',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/calculater',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/calculater'
    },
    {
      title: 'WhatsApp Clone',
      subtitle: 'Real-Time Messaging Clone',
      summary: 'A web chat client using active synchronization and channel feeds.',
      description: 'Mini-whatsapp messaging system using active database connections, custom status indicators, and photo attachment capabilities.',
      tags: ['Angular', 'Firebase Auth', 'Cloud Firestore', 'RxJS', 'WebSockets'],
      features: [
        'Real-time chat channels with immediate scroll-to-bottom sync.',
        'Offline and online status tracking using window visibility listeners.',
        'Base64 media encoder for photo attachments and document transfers.',
        'Emoji selection tray with searchable grids.'
      ],
      icon: 'bi-whatsapp',
      color: '#22c55e',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/whatsapp-abhiwhatsaap',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/whatsapp-abhiwhatsaap'
    },
    {
      title: 'Family Management App',
      subtitle: 'Organisational Hub',
      summary: 'A coordination workspace for tasks, schedules, and alerts.',
      description: 'An app designed to keep family units organized, featuring shared shopping lists, calendar events, active chore task boards, and notes.',
      tags: ['Angular', 'Shared State', 'Task Tracking', 'TypeScript', 'Gantt'],
      features: [
        'Shared chore tracker checking status and assignee progress.',
        'Shopping list checklist sync with quantity modifiers.',
        'Family event calendar with custom reminders.',
        'Notes board with grid-pinning animations.'
      ],
      icon: 'bi-people',
      color: '#8b5cf6',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/family-management-app',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/family-management-app'
    },
    {
      title: 'Tic-Tac-Toe Game',
      subtitle: 'Classic Algorithmic Game',
      summary: 'An interactive game board featuring local PvP and smart AI modes.',
      description: 'A classic Tic-Tac-Toe game incorporating responsive grid scaling, scoreboards, sound indicators, and Minimax AI opponents.',
      tags: ['Angular', 'Minimax AI', 'CSS Transitions', 'Game Loop', 'RxJS'],
      features: [
        'Smart Minimax AI opponent that plays unbeatable moves.',
        'Local 2-player pass-and-play matches with scoreboards.',
        'Win/Draw state detection highlighting winning node paths.',
        'Haptic vibration and visual sound wave cues.'
      ],
      icon: 'bi-grid-3x3',
      color: '#06b6d4',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/tik-tak-game',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/tik-tak-game'
    },
    {
      title: 'EMI Calculator',
      subtitle: 'Financial Planner',
      summary: 'An amortization engine illustrating loan installments and interest charts.',
      description: 'A clean financial assistant calculating loan EMIs, total interest, and rendering interactive payment schedules.',
      tags: ['Angular', 'Financial Engine', 'Forms', 'Data Visualisation'],
      features: [
        'Amortization scheduler detailing principal vs interest splits over time.',
        'Dynamic sliders for loan amount, tenure, and interest rates.',
        'Detailed printable payment schedule reports.',
        'Interactive pie charts highlighting principal vs interest percentages.'
      ],
      icon: 'bi-percent',
      color: '#f43f5e',
      githubUrl: 'https://github.com/ABHISHEKPATEL8839/emi-calculater',
      liveUrl: 'https://ABHISHEKPATEL8839.github.io/emi-calculater'
    }
  ];

  openDialog(project: Project, dialogEl: HTMLDialogElement) {
    this.selectedProject = project;
    dialogEl.showModal();
  }

  closeDialog(dialogEl: HTMLDialogElement) {
    dialogEl.classList.add('dialog-closing');
    setTimeout(() => {
      dialogEl.close();
      dialogEl.classList.remove('dialog-closing');
      this.selectedProject = null;
    }, 350); // Matches the 0.35s CSS transition
  }

  onDialogClick(event: MouseEvent, dialogEl: HTMLDialogElement) {
    const rect = dialogEl.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this.closeDialog(dialogEl);
    }
  }

  onDialogCancel(event: Event, dialogEl: HTMLDialogElement) {
    event.preventDefault();
    this.closeDialog(dialogEl);
  }
}

