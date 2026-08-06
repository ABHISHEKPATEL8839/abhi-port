import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark position-relative overflow-hidden" id="blog">
      <div class="container">
        <div class="text-center mb-5" appScrollReveal [revealClass]="'reveal reveal-fade'">
          <span class="text-uppercase text-gradient-primary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Thoughts & Insights</span>
          <h2 class="display-5 fw-extrabold text-light mb-3">Latest Articles</h2>
          <div class="divider mx-auto mb-4"></div>
          <p class="text-muted font-body mx-auto" style="max-width: 600px;">
            I occasionally write about software engineering, web development trends, and technical tutorials.
          </p>
        </div>

        <div class="row g-4">
          <div *ngFor="let post of posts; let i = index" 
               class="col-md-6 col-lg-4" 
               appScrollReveal 
               [revealClass]="'reveal reveal-scale reveal-delay-' + (i % 3 + 1)">
            <div class="glass-panel h-100 d-flex flex-column rounded-4 overflow-hidden blog-card">
              <div class="blog-img-wrapper" [style.background-image]="'url(' + post.image + ')'">
                <div class="overlay"></div>
                <span class="badge bg-primary position-absolute top-0 end-0 m-3 px-3 py-2 z-3">{{ post.category }}</span>
              </div>
              
              <div class="p-4 d-flex flex-column flex-grow-1">
                <div class="d-flex align-items-center text-muted small mb-3">
                  <i class="bi bi-calendar3 me-2 text-cyan"></i> {{ post.date }}
                  <span class="mx-2">•</span>
                  <i class="bi bi-clock me-2 text-cyan"></i> {{ post.readTime }}
                </div>
                
                <h4 class="text-light fw-bold mb-3 blog-title">
                  <a href="#" class="text-decoration-none text-light stretched-link">{{ post.title }}</a>
                </h4>
                <p class="text-muted font-body flex-grow-1">{{ post.excerpt }}</p>
                
                <div class="mt-4 pt-3 border-top border-secondary-subtle d-flex justify-content-between align-items-center">
                  <span class="text-primary fw-medium read-more">Read Article <i class="bi bi-arrow-right ms-1"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-5" appScrollReveal [revealClass]="'reveal reveal-up'">
          <a href="#" class="btn btn-outline-light py-2 px-4 rounded-pill">View All Posts</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .divider {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-cyan));
      border-radius: 2px;
    }
    
    .blog-card {
      transition: transform 0.4s ease, box-shadow 0.4s ease;
    }
    
    .blog-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(99, 102, 241, 0.15);
    }
    
    .blog-img-wrapper {
      height: 220px;
      background-size: cover;
      background-position: center;
      position: relative;
      overflow: hidden;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(7, 9, 19, 0.9) 100%);
      z-index: 1;
    }
    
    .blog-card:hover .blog-img-wrapper {
      transform: scale(1.05);
      transition: transform 0.5s ease;
    }
    
    .blog-img-wrapper {
      transition: transform 0.5s ease;
    }
    
    .blog-title a {
      transition: color 0.3s ease;
    }
    
    .blog-card:hover .blog-title a {
      color: var(--color-cyan) !important;
    }
    
    .read-more i {
      transition: transform 0.3s ease;
    }
    
    .blog-card:hover .read-more i {
      transform: translateX(5px);
    }
  `]
})
export class BlogComponent {
  posts = [
    {
      title: 'Mastering Angular Standalone Components',
      excerpt: 'Learn how to simplify your Angular architecture by moving away from NgModules and embracing standalone components.',
      date: 'May 15, 2024',
      readTime: '6 min read',
      category: 'Angular',
      image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Building Secure Firebase Apps',
      excerpt: 'A comprehensive guide to setting up Firestore security rules and protecting your users data.',
      date: 'April 28, 2024',
      readTime: '8 min read',
      category: 'Firebase',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Modern CSS: The Power of :has()',
      excerpt: 'Discover how the CSS :has() pseudo-class is revolutionizing how we write styles and manage state purely in CSS.',
      date: 'March 10, 2024',
      readTime: '5 min read',
      category: 'CSS',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];
}
