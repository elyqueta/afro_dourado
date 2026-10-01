import { Component, signal, inject, AfterViewInit, OnDestroy, PLATFORM_ID, DestroyRef, effect, runInInjectionContext, Injector } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
      this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.gsap.killAllTriggers();
          this.smoothScroll.scrollTo(0, { immediate: true });
          this.refreshLayout();
        }
      });

      let initialized = false;
      let previousSplit = false;
      const layoutSubscription = effect(() => {
        const open = this.assistant.open();
        const split = this.assistant.isSplit();
        if (!initialized) {
          initialized = true;
          previousSplit = split;
          return;
        }

        const delay = split !== previousSplit ? 50 : open ? 650 : 450;
        previousSplit = split;
        this.scheduleRefresh(delay);
      });

      this.destroyRef.onDestroy(() => {
        layoutSubscription.destroy();
        if (this.refreshTimeout !== null) clearTimeout(this.refreshTimeout);
      });
    });
  }

  ngOnDestroy(): void {
    // Effects are auto-cleaned by Angular DestroyRef
  }

  private refreshTimeout: ReturnType<typeof setTimeout> | null = null;

  onSiteShellTransitionEnd(event: TransitionEvent): void {
    if (event.target !== event.currentTarget || event.propertyName !== 'margin-right') return;
    this.refreshLayout();
  }

  private scheduleRefresh(delay: number): void {
    if (this.refreshTimeout !== null) clearTimeout(this.refreshTimeout);
    this.refreshTimeout = setTimeout(() => {
      this.refreshTimeout = null;
      this.refreshLayout();
    }, delay);
  }

  private refreshLayout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.gsap.refresh();
    this.smoothScroll.instance?.resize();
  }
}
