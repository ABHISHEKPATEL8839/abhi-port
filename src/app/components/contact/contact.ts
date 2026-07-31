import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService, ContactMessage } from '../../services/firebase.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollRevealDirective],
  template: `
    <section class="section-padding bg-dark-slate position-relative">
      <div class="container">
        <!-- Title -->
        <div class="row mb-5">
          <div class="col-12 text-center" appScrollReveal [revealClass]="'reveal reveal-scale'">
            <span class="text-uppercase text-gradient-primary fw-bold letter-spacing-1 font-heading mb-2 d-inline-block">Get In Touch</span>
            <h2 class="display-5 fw-extrabold text-light mb-3">Connect With Me</h2>
            <div class="divider mx-auto"></div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-10">
            <div class="glass-panel p-0 overflow-hidden" appScrollReveal [revealClass]="'reveal reveal-scale'" [threshold]="0.08">
              <div class="row g-0">
                <!-- Info Side -->
                <div class="col-lg-5 info-panel p-5 d-flex flex-column justify-content-between">
                  <div>
                    <h3 class="h4 font-heading text-light mb-4">Contact Information</h3>
                    <p class="text-muted font-body small mb-5">
                      Have an exciting project, a role opportunity, or just want to chat about web technologies? Drop me a message!
                    </p>
                    
                    <div class="contact-methods d-flex flex-column gap-4">
                      <div class="d-flex align-items-center gap-3">
                        <div class="contact-icon">
                          <i class="bi bi-envelope-at-fill"></i>
                        </div>
                        <div>
                          <h6 class="font-heading text-light mb-0 small">Email</h6>
                          <a href="mailto:abhishekpatel71773@gmail.com" class="text-muted font-body small text-decoration-none">
                            abhishekpatel71773&#64;gmail.com
                          </a>
                        </div>
                      </div>

                      <div class="d-flex align-items-center gap-3">
                        <div class="contact-icon">
                          <i class="bi bi-geo-alt-fill"></i>
                        </div>
                        <div>
                          <h6 class="font-heading text-light mb-0 small">Location</h6>
                          <span class="text-muted font-body small">India</span>
                        </div>
                      </div>
                      
                      <div class="d-flex align-items-center gap-3">
                        <div class="contact-icon">
                          <i class="bi bi-github"></i>
                        </div>
                        <div>
                          <h6 class="font-heading text-light mb-0 small">GitHub</h6>
                          <a href="https://github.com/ABHISHEKPATEL8839" target="_blank" class="text-muted font-body small text-decoration-none">
                            github.com/ABHISHEKPATEL8839
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-5">
                    <h5 class="h6 font-heading text-light mb-3 text-uppercase small">Professional Focus</h5>
                    <div class="d-flex flex-wrap gap-2">
                      <span class="badge-focus">Angular</span>
                      <span class="badge-focus">Firebase</span>
                      <span class="badge-focus">TypeScript</span>
                      <span class="badge-focus">Full-Stack</span>
                    </div>
                  </div>
                </div>

                <!-- Form Side -->
                <div class="col-lg-7 p-5">
                  <h3 class="h4 font-heading text-light mb-4">Send Message</h3>
                  
                  <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="d-flex flex-column gap-4">
                    <!-- Name Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('name')?.value}">Full Name</label>
                      <input type="text" 
                             formControlName="name" 
                             class="form-input-custom" 
                             placeholder="e.g. Rahul Sharma"
                             [ngClass]="{'input-error': isFieldInvalid('name')}">
                      <div class="error-msg" *ngIf="isFieldInvalid('name')">Name is required.</div>
                    </div>

                    <!-- Email Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('email')?.value}">Email Address</label>
                      <input type="email" 
                             formControlName="email" 
                             class="form-input-custom" 
                             placeholder="e.g. rahul@example.com"
                             [ngClass]="{'input-error': isFieldInvalid('email')}">
                      <div class="error-msg" *ngIf="isFieldInvalid('email')">
                        {{ contactForm.get('email')?.hasError('required') ? 'Email is required.' : 'Enter a valid email address.' }}
                      </div>
                    </div>

                    <!-- Subject Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('subject')?.value}">Subject</label>
                      <input type="text" 
                             formControlName="subject" 
                             class="form-input-custom" 
                             placeholder="Project Opportunity"
                             [ngClass]="{'input-error': isFieldInvalid('subject')}">
                      <div class="error-msg" *ngIf="isFieldInvalid('subject')">Subject is required.</div>
                    </div>

                    <!-- Message Input -->
                    <div class="form-group-custom">
                      <label class="form-label-custom" [ngClass]="{'active': contactForm.get('message')?.value}">Message</label>
                      <textarea formControlName="message" 
                                class="form-input-custom textarea-custom" 
                                rows="4" 
                                placeholder="Details about your inquiry..."
                                [ngClass]="{'input-error': isFieldInvalid('message')}"></textarea>
                      <div class="error-msg" *ngIf="isFieldInvalid('message')">
                        Message must be at least 10 characters long.
                      </div>
                    </div>

                    <!-- Alert message boxes -->
                    <div class="alert-box" *ngIf="submitStatus" [ngClass]="submitStatus">
                      <div class="d-flex align-items-center gap-2">
                        <i class="bi" [ngClass]="submitStatus === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'"></i>
                        <span class="small font-body">{{ statusMessage }}</span>
                      </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" 
                            [disabled]="contactForm.invalid || isSubmitting" 
                            class="btn btn-glow-primary py-3 d-flex justify-content-center align-items-center w-100 mt-2">
                      <span *ngIf="!isSubmitting" class="d-flex align-items-center">
                        Send Message <i class="bi bi-send ms-2"></i>
                      </span>
                      <span *ngIf="isSubmitting" class="d-flex align-items-center">
                        Sending... <div class="spinner-border spinner-border-sm ms-2" role="status"></div>
                      </span>
                    </button>
                  </form>
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

    .info-panel {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(7, 9, 19, 0.9) 100%);
      border-right: 1px solid var(--border-glass);
    }

    .contact-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(99, 102, 241, 0.1);
      color: var(--color-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
    }

    .badge-focus {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-glass);
      color: var(--color-cyan);
      font-size: 0.75rem;
      font-family: var(--font-heading);
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 50px;
    }

    /* Form Custom inputs (Float style) */
    .form-group-custom {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .form-label-custom {
      position: absolute;
      left: 12px;
      top: 14px;
      font-size: 0.9rem;
      color: var(--color-text-muted);
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
      transform-origin: left top;
    }

    .form-label-custom.active,
    .form-input-custom:focus + .form-label-custom {
      transform: translateY(-24px) scale(0.85);
      color: var(--color-cyan);
    }

    /* Hide standard placeholders when input is not focused */
    .form-input-custom::placeholder {
      color: transparent;
      transition: color 0.2s ease;
    }

    .form-input-custom:focus::placeholder {
      color: rgba(148, 163, 184, 0.5); /* Show when active */
    }

    .form-input-custom {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-glass);
      color: #ffffff;
      padding: 12px 14px;
      border-radius: 8px;
      font-family: var(--font-body);
      font-size: 0.95rem;
      transition: all 0.3s ease;
      margin-top: 5px;
    }

    .form-input-custom:focus {
      outline: none;
      border-color: var(--color-primary);
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
    }

    .textarea-custom {
      resize: none;
    }

    .input-error {
      border-color: rgba(239, 68, 68, 0.5) !important;
    }

    .error-msg {
      color: #f87171;
      font-size: 0.75rem;
      margin-top: 4px;
      font-family: var(--font-body);
    }

    /* Alert Boxes CSS with animation behavior */
    .alert-box {
      border-radius: 8px;
      padding: 12px 16px;
      transition: all 0.3s ease;
    }

    .alert-box.success {
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      color: #34d399;
    }

    .alert-box.error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.25);
      color: #f87171;
    }

    @media (max-width: 991px) {
      .info-panel {
        border-right: none;
        border-bottom: 1px solid var(--border-glass);
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;
  statusMessage = '';

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to show errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = null;
    this.statusMessage = '';

    const message: ContactMessage = this.contactForm.value;

    try {
      await this.firebaseService.submitContactForm(message);
      this.submitStatus = 'success';
      this.statusMessage = 'Your message has been sent successfully! Thank you for reaching out.';
      this.contactForm.reset();
    } catch (err) {
      this.submitStatus = 'error';
      this.statusMessage = 'Something went wrong. Please check your network and try again.';
      console.error('Contact submit error:', err);
    } finally {
      this.isSubmitting = false;
    }
  }
}
