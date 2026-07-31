import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section d-flex align-items-center justify-content-center position-relative overflow-hidden">
      <div class="grid-overlay"></div>
      
      <!-- Floating Tech Stack Badges around Hero -->
      <div class="floating-tech-container d-none d-lg-block">
        <div class="floating-pill float-slow pill-1 glass-panel">
          <i class="bi bi-hexagon text-cyan me-2"></i> Angular Dev
        </div>
        <div class="floating-pill float-medium pill-2 glass-panel">
          <i class="bi bi-fire text-warning me-2"></i> Firebase Real-Time
        </div>
        <div class="floating-pill float-reverse pill-3 glass-panel">
          <i class="bi bi-filetype-ts text-primary me-2"></i> TypeScript
        </div>
        <div class="floating-pill float-slow pill-4 glass-panel">
          <i class="bi bi-code-square text-secondary me-2"></i> Full-Stack Architecture
        </div>
      </div>

      <div class="container text-center position-relative z-2">
        <!-- Avatar with Multi-Layer Animated Rings -->
        <div class="profile-container mb-4">
          <div class="avatar-glow-ring"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring ring-2"></div>
          <div class="profile-avatar glass-panel">
            <span class="avatar-emoji">👨‍💻</span>
          </div>
        </div>

        <!-- Status Badge with Expanding Wave Pulse -->
        <div class="badge-container mb-3">
          <span class="status-badge glass-panel px-3 py-2 pulse-badge">
            <span class="pulse-dot"></span> Open to Roles & Collaborations
          </span>
        </div>

        <!-- Animated Heading -->
        <h1 class="display-3 fw-extrabold text-gradient-primary font-heading mb-3 hero-title">
          Hi, I'm Abhishek Patel
        </h1>
        
        <!-- Typewriter Subtitle -->
        <h2 class="h3 fw-medium font-body text-light opacity-90 mb-4">
          I build <span class="typing-text text-gradient-cyan">{{ currentText }}</span>
        </h2>
        
        <p class="lead text-muted mx-auto max-width-600 font-body mb-5">
          Full-Stack Developer specializing in robust web architectures, scalable server components, and responsive, interactive interfaces.
        </p>

        <!-- Interactive CTA Buttons -->
        <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
          <a href="#projects" class="btn btn-glow-primary py-3 px-5 d-flex align-items-center">
            View My Work <i class="bi bi-arrow-right ms-2 fs-5 cta-icon"></i>
          </a>
          <a href="#contact" class="btn btn-glass py-3 px-5 d-flex align-items-center">
            Let's Talk <i class="bi bi-chat-dots ms-2 fs-5 cta-icon"></i>
          </a>
        </div>

        <!-- Micro Interactive Dev Terminal Pill -->
        <div class="dev-terminal-preview glass-panel mx-auto p-3 max-width-600 text-start">
          <div class="d-flex align-items-center justify-content-between border-bottom border-secondary-subtle pb-2 mb-2">
            <div class="d-flex gap-1">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="font-heading small text-muted">developer.config.ts</span>
          </div>
          <code class="font-body small text-cyan">
            <span class="text-purple">const</span> dev = &#123; name: <span class="text-emerald">'Abhishek Patel'</span>, status: <span class="text-emerald">'Ready to Innovate 🚀'</span> &#125;;
          </code>
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
      padding-top: 130px;
      padding-bottom: 90px;
      background: radial-gradient(circle at center, rgba(15, 23, 42, 0.15) 0%, var(--bg-deep-space) 95%);
    }

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(99, 102, 241, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.04) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 1;
    }

    /* Floating Tech Stack Badges */
    .floating-tech-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
    }

    .floating-pill {
      position: absolute;
      padding: 10px 18px;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #ffffff;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), var(--shadow-glow);
      pointer-events: auto;
      transition: transform 0.3s ease;
    }

    .floating-pill:hover {
      transform: scale(1.1) translateY(-5px) !important;
      border-color: var(--color-cyan);
    }

    .pill-1 { top: 22%; left: 8%; }
    .pill-2 { top: 28%; right: 9%; }
    .pill-3 { bottom: 32%; left: 10%; }
    .pill-4 { bottom: 36%; right: 11%; }
    
    .profile-container {
      position: relative;
      width: 140px;
      height: 140px;
      margin: 0 auto;
    }

    .avatar-glow-ring {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-cyan));
      filter: blur(15px);
      opacity: 0.7;
      animation: spinGlow 8s linear infinite;
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
      border: 2px solid rgba(255, 255, 255, 0.2);
      background: rgba(15, 23, 42, 0.7);
      box-shadow: var(--shadow-glow);
    }
    
    .avatar-emoji {
      font-size: 4.2rem;
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
      background: rgba(15, 23, 42, 0.6);
      transition: all 0.3s ease;
    }

    .status-badge:hover {
      color: #ffffff;
      border-color: var(--color-accent);
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
    }

    .pulse-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: var(--color-accent);
      box-shadow: 0 0 12px var(--color-accent);
      animation: dotPulse 2s infinite ease-in-out;
    }
    
    .max-width-600 {
      max-width: 600px;
    }

    .hero-title {
      letter-spacing: -0.03em;
      text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .typing-text {
      border-right: 2px solid var(--color-cyan);
      white-space: nowrap;
      animation: blinkCursor 0.75s step-end infinite;
      padding-right: 4px;
    }

    .cta-icon {
      transition: transform 0.3s ease;
    }

    .btn-glow-primary:hover .cta-icon,
    .btn-glass:hover .cta-icon {
      transform: translateX(4px);
    }

    /* Dev Terminal Box */
    .dev-terminal-preview {
      background: rgba(11, 15, 25, 0.8) !important;
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .dev-terminal-preview:hover {
      transform: translateY(-4px);
      border-color: var(--color-primary);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    .dot.red { background: #ef4444; }
    .dot.yellow { background: #f59e0b; }
    .dot.green { background: #10b981; }

    .text-purple { color: var(--color-secondary); }
    .text-emerald { color: var(--color-accent); }
    .text-cyan { color: var(--color-cyan); }

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
      fill: #0b0f19;
    }

    /* Keyframe Animations */
    @keyframes emojiBob {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
    }

    @keyframes spinGlow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulseAnim {
      0% { transform: scale(0.95); opacity: 0.8; }
      100% { transform: scale(1.45); opacity: 0; }
    }

    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.5; }
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

