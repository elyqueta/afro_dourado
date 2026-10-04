import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { BeforeAfterImageComponent } from './before-after-image.component';

@Component({
  standalone: true,
  imports: [BeforeAfterImageComponent],
  template: `
    <app-before-after-image
      [beforeSrc]="beforeSrc"
      [afterSrc]="afterSrc"
      altBefore="antes"
      altAfter="depois"
      [comparisonMode]="comparisonMode"
    />
  `,
})
class TestHostComponent {
  @Input() beforeSrc = 'https://example.com/before.jpg';
  @Input() afterSrc = 'https://example.com/after.jpg';
  @Input() comparisonMode = false;
}

describe('BeforeAfterImageComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let native: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    native = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create the host', () => {
    expect(host).toBeTruthy();
  });

  it('should render two image layers', () => {
    const layers = native.querySelectorAll('.layer');
    expect(layers.length).toBe(2);
  });

  it('should show the chip element', () => {
    const chip = native.querySelector('.chip');
    expect(chip).toBeTruthy();
  });

  it('should render the segmented control with two buttons', () => {
    const buttons = native.querySelectorAll('.seg-btn');
    expect(buttons.length).toBe(2);
  });

  it('should show "Depois" by default (showBefore=false)', () => {
    const imgBefore = native.querySelector('.layer-before');
    const imgAfter = native.querySelector('.layer-after');
    expect(imgBefore!.classList.contains('visible')).toBe(false);
    expect(imgAfter!.classList.contains('visible')).toBe(true);
    expect(native.querySelector('.chip')?.textContent).toContain('Depois');
    // Depois button (index 1) should be active when showBefore=false
    const buttons = native.querySelectorAll('.seg-btn');
    expect(buttons[1].classList.contains('active')).toBe(true);
  });

  it('should toggle to "Antes" on setState(true)', () => {
    const child = (fixture.debugElement.children[0].componentInstance as any);
    child.setState(true);
    fixture.detectChanges();
    const imgBefore = native.querySelector('.layer-before');
    const imgAfter = native.querySelector('.layer-after');
    expect(imgBefore!.classList.contains('visible')).toBe(true);
    expect(imgAfter!.classList.contains('visible')).toBe(false);
    expect(native.querySelector('.chip')?.textContent).toContain('Antes');
    // Antes button (index 0) should be active when showBefore=true
    const buttons = native.querySelectorAll('.seg-btn');
    expect(buttons[0].classList.contains('active')).toBe(true);
  });

  it('should toggle back to "Depois" on setState(false)', () => {
    const child = (fixture.debugElement.children[0].componentInstance as any);
    child.setState(true);
    child.setState(false);
    fixture.detectChanges();
    const imgBefore = native.querySelector('.layer-before');
    const imgAfter = native.querySelector('.layer-after');
    expect(imgBefore!.classList.contains('visible')).toBe(false);
    expect(imgAfter!.classList.contains('visible')).toBe(true);
    // Depois button (index 1) should be active when showBefore=false
    const buttons = native.querySelectorAll('.seg-btn');
    expect(buttons[1].classList.contains('active')).toBe(true);
  });

  it('should render both segmented buttons with correct aria-pressed', () => {
    const buttons = native.querySelectorAll('.seg-btn');
    // Default showBefore=false: Antes=false, Depois=true
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('should apply alt attributes to images', () => {
    const imgs = native.querySelectorAll('img.layer');
    // DOM order: layer-after first, layer-before second
    expect(imgs[0].getAttribute('alt')).toContain('Depois');
    expect(imgs[1].getAttribute('alt')).toContain('Antes');
  });

  it('should have second button labeled "Depois" and active by default', () => {
    const buttons = native.querySelectorAll('.seg-btn');
    expect(buttons[1].classList.contains('active')).toBe(true);
    expect(buttons[1].textContent).toContain('Depois');
  });

  it('should switch active state when setState toggles', () => {
    const child = (fixture.debugElement.children[0].componentInstance as any);
    // Default: showBefore=false, Depois (index 1) is active
    let buttons = () => native.querySelectorAll('.seg-btn');
    expect(buttons()[1].classList.contains('active')).toBe(true);
    // Toggle to Antes
    child.setState(true);
    fixture.detectChanges();
    expect(buttons()[0].classList.contains('active')).toBe(true);
    expect(buttons()[1].classList.contains('active')).toBe(false);
  });

  it('should render with different src values', () => {
    host.beforeSrc = 'https://example.com/b.jpg';
    host.afterSrc = 'https://example.com/a.jpg';
    fixture.detectChanges();
    const layers = native.querySelectorAll('.layer');
    expect(layers.length).toBe(2);
  });

  it('should display both images with a keyboard-accessible comparison slider', () => {
    fixture.componentRef.setInput('comparisonMode', true);
    fixture.detectChanges();

    const images = native.querySelectorAll<HTMLImageElement>('.layer');
    const slider = native.querySelector<HTMLInputElement>('.comparison-slider');

    expect(images[0].classList.contains('visible')).toBe(true);
    expect(images[1].classList.contains('visible')).toBe(true);
    expect(slider?.getAttribute('aria-label')).toContain('antes');
    expect(slider?.value).toBe('50');
    expect(native.querySelector('.segmented-control')).toBeNull();
    expect(native.querySelector('.wrapper')?.classList.contains('comparison-mode')).toBe(true);
    expect(native.querySelector('.illustrative-label')?.textContent?.trim()).toBe('Imagens ilustrativas');
  });

  it('should update the comparison split when the slider moves', () => {
    fixture.componentRef.setInput('comparisonMode', true);
    fixture.detectChanges();

    const slider = native.querySelector<HTMLInputElement>('.comparison-slider');
    slider!.value = '70';
    slider!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(slider?.getAttribute('aria-valuetext')).toBe('70% Antes, 30% Depois');
    expect(native.querySelector('.comparison-divider')?.getAttribute('style')).toContain('left: 70%');
    expect(native.querySelector('.layer-before')?.getAttribute('style')).toContain('inset(0 30% 0 0)');
  });
});
