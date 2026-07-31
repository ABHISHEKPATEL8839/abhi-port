import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section d-flex align-items-center justify-content-center position-relative overflow-hidden">
      <!-- Cyber Grid Background Overlay -->
      <div class="grid-overlay"></div>
      
      <div class="container text-center position-relative z-2">
        <!-- Floating Profile Avatar Frame -->
        <div class="profile-container mb-4">
          <div class="pulse-ring"></div>
          <div class="pulse-ring ring-2"></div>
          <div class="profile-avatar glass-panel">
            <span class="avatar-emoji">👨‍💻</span>
          </div>
        </div>

        <div class="badge-container mb-3">
          <span class="status-badge glass-panel px-3 py-1">
            <span class="pulse-dot"></span> Open to Roles & Collaborations
          </span>
        </div>

        <h1 class="display-3 fw-extrabold text-gradient-primary font-heading mb-3">
          Hi, I'm Abhishek Patel
        </h1>
        
        <h2 class="h3 fw-medium font-body text-light opacity-90 mb-4">
          I build <span class="typing-text text-gradient-cyan">{{ currentText }}</span>
        </h2>
        
        <p class="lead text-muted mx-auto max-width-600 font-body mb-5">
          Full-Stack Developer specializing in robust web architectures, scalable server components, and responsive, interactive interfaces.
        </p>
        
        <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
          <a href="#projects" class="btn btn-glow-primary py-3 px-5 d-flex align-items-center">
            View My Work <i class="bi bi-arrow-right ms-2 fs-5"></i>
          </a>
          <a href="#contact" class="btn btn-glass py-3 px-5 d-flex align-items-center">
            Let's Talk <i class="bi bi-chat-dots ms-2 fs-5"></i>
          </a>
        </div>
      </div>
      
      <!-- Interactive Bottom Wave Transition -->
      <div class="wave-transition">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35C25.3,12.48,74.58,2,137.52,2,229.3,2,263.31,68.39,321.39,56.44Z" class="shape-fill"></path>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      padding-top: 120px;
      padding-bottom: 80px;
      background: radial-gradient(circle at center, rgba(15, 23, 42, 0.1) 0%, var(--bg-deep-space) 90%);
    }

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 1;
    }
    
    .profile-container {
      position: relative;
      width: 130px;
      height: 130px;
      margin: 0 auto;
    }
    
    .profile-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 3;
      border: 2px solid var(--border-glass);
      background: rgba(15, 23, 42, 0.6);
    }
    
    .avatar-emoji {
      font-size: 4rem;
      animation: emojiBob 4s infinite ease-in-out;
    }

    .pulse-ring {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid var(--color-primary);
      border-radius: 50%;
      opacity: 0.6;
      animation: pulseAnim 3s infinite ease-out;
      z-index: 1;
    }

    .ring-2 {
      animation-delay: 1.5s;
      border-color: var(--color-secondary);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text-muted);
      border: 1px solid var(--border-glass);
      background: rgba(15, 23, 42, 0.5);
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--color-accent);
      box-shadow: 0 0 10px var(--color-accent);
      animation: dotPulse 2s infinite ease-in-out;
    }
    
    .max-width-600 {
      max-width: 600px;
    }
    
    .typing-text {
      border-right: 2px solid var(--color-cyan);
      white-space: nowrap;
      animation: blinkCursor 0.75s step-end infinite;
      padding-right: 4px;
    }

    .wave-transition {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
      transform: rotate(180deg);
      z-index: 2;
    }

    .wave-transition svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 60px;
    }

    .wave-transition .shape-fill {
      fill: #0b0f19; /* Matches --bg-slate */
    }

    /* Keyframe Animations */
    @keyframes emojiBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes pulseAnim {
      0% { transform: scale(0.95); opacity: 0.8; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.6; }
    }

    @keyframes blinkCursor {
      from, to { border-color: transparent }
      50% { border-color: var(--color-cyan); }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  phrases = [
    'Modular Angular Apps',
    'Real-Time Firebase Systems',
    'Premium UI Animations',
    'Scalable API Backends'
  ];
  
  currentText = '';
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timer: any;

  ngOnInit() {
    this.tick();
  }

  tick() {
    const currentPhrase = this.phrases[this.phraseIndex];
    
    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentText = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delta = 100 - Math.random() * 40;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      delta = 1800; // Stay static on completed phrase
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delta = 500; // Pause before typing next phrase
    }

    this.timer = setTimeout(() => this.tick(), delta);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
