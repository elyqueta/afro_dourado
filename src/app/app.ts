import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@app/layout/navbar/navbar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';
import { PageTransitionComponent } from '@app/layout/page-transition/page-transition.component';
import { MobileCtaBarComponent } from '@app/layout/cta-bar-mobile/cta-bar-mobile.component';
import { AppCursorComponent } from '@app/shared/ui/cursor/app-cursor.component';
import { AfroAssistantLauncherComponent } from '@app/assistant/afro-assistant-launcher/afro-assistant-launcher.component';
import { AfroAssistantPanelComponent } from '@app/assistant/afro-assistant-panel/afro-assistant-panel.component';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { GsapService } from '@app/core/gsap.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    PageTransitionComponent,
    MobileCtaBarComponent,
    AppCursorComponent,
    AfroAssistantLauncherComponent,
    AfroAssistantPanelComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly gsap = inject(GsapService);

  readonly title = signal('AfroDourado');

  constructor() {
    if (typeof window !== 'undefined') {
      this.smoothScroll.init();
      this.gsap.ticker((time) => this.smoothScroll.raf(time));
      this.gsap.lagSmoothing(false);
    }
  }
}
