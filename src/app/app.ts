import { Component, signal, inject, AfterViewInit, OnDestroy, PLATFORM_ID, DestroyRef, effect, runInInjectionContext, Injector } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '@app/layout/navbar/navbar.component';
import { FooterComponent } from '@app/layout/footer/footer.component';
import { PageTransitionComponent } from '@app/layout/page-transition/page-transition.component';
import { MobileCtaBarComponent } from '@app/layout/cta-bar-mobile/cta-bar-mobile.component';
import { AppCursorComponent } from '@app/shared/ui/cursor/app-cursor.component';
import { AfroAssistantLauncherComponent } from '@app/assistant/afro-assistant-launcher/afro-assistant-launcher.component';
import { AfroAssistantPanelComponent } from '@app/assistant/afro-assistant-panel/afro-assistant-panel.component';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { GsapService } from '@app/core/gsap.service';
import { AssistantService } from '@app/core/assistant.service';

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
export class App implements AfterViewInit, OnDestroy {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly gsap = inject(GsapService);
  private readonly router = inject(Router);
  private readonly assistant = inject(AssistantService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly title = signal('Afro Dourado');

  constructor(private readonly injector: Injector) {
    if (isPlatformBrowser(this.platformId)) {
      this.smoothScroll.init();
      this.gsap.lagSmoothing(false);

      this.smoothScroll.on('scroll', () => {
        this.gsap.scrollTrigger.update();
      });
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    runInInjectionContext(this.injector, () => {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.gsap.killAllTriggers();
          this.smoothScroll.scrollTo(0, { immediate: true });
          setTimeout(() => {
            this.gsap.refresh();
            this.smoothScroll.instance?.resize();
          }, 0);
        }
      });

      const openSubscription = effect(() => {
        this.assistant.open();
        this.scheduleRefresh(700);
      });

      const isSplitSubscription = effect(() => {
        this.assistant.isSplit();
        this.scheduleRefresh(700);
      });

      this.destroyRef.onDestroy(() => {
        openSubscription.destroy();
        isSplitSubscription.destroy();
      });
    });
  }

  ngOnDestroy(): void {
    // Effects are auto-cleaned by Angular DestroyRef
  }

  private scheduleRefresh(delay: number): void {
    setTimeout(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.gsap.refresh();
      this.smoothScroll.instance?.resize();
    }, delay);
  }
}
