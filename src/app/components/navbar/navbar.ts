import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top transition-all"
         [ngClass]="{'scrolled-nav': isScrolled, 'navbar-dark': true}">
      <div class="container py-2">
        <a class="navbar-brand d-flex align-items-center" href="#hero">
          <span class="brand-badge text-gradient-primary">AP</span>
          <span class="ms-2 fw-bold font-heading logo-text text-light">Abhishek Patel</span>
        </a>
        
        <button class="navbar-toggler border-0" 
                type="button" 
                (click)="toggleMenu()"
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <i class="bi fs-3 text-light" [ngClass]="isMenuOpen ? 'bi-x' : 'bi-list'"></i>
        </button>
        
        <div class="collapse navbar-collapse" [ngClass]="{'show': isMenuOpen}">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-center gap-3">
            <li class="nav-item" *ngFor="let link of navLinks">
              <a class="nav-link px-3 font-body" 
                 [href]="link.href"
                 (click)="closeMenu()">{{ link.label }}</a>
            </li>
          </ul>
          <div class="ms-lg-3 text-center mt-3 mt-lg-0">
            <a href="#contact" class="btn btn-glow-primary py-2 px-4" (click)="closeMenu()">Contact Me</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: transparent;
      border-bottom: 1px solid transparent;
      transition: all 0.4s ease;
      z-index: 1000;
    }
    
    .scrolled-nav {
      background: rgba(7, 9, 19, 0.75) !important;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
    
    .brand-badge {
      font-family: var(--font-heading);
      font-weight: 800;
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border: 2px solid var(--color-primary);
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 1.1rem;
      letter-spacing: -0.05em;
    }

    .logo-text {
      font-size: 1.25rem;
      letter-spacing: -0.01em;
    }
    
    .nav-link {
      color: var(--color-text-muted) !important;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .nav-link:hover {
      color: #ffffff !important;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 15%;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      transition: width 0.3s ease;
      border-radius: 2px;
    }
    
    .nav-link:hover::after {
      width: 70%;
    }
    
    .transition-all {
      transition: all 0.3s ease;
    }
    
    @media (max-width: 991px) {
      .navbar-collapse {
        background: rgba(11, 15, 25, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid var(--border-glass);
        border-radius: 12px;
        padding: 20px;
        margin-top: 15px;
        box-shadow: var(--shadow-glass);
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  isMenuOpen = false;

  navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Timeline' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 50;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
