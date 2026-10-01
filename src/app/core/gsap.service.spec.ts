import { TestBed } from '@angular/core/testing';
import { gsap } from 'gsap';
import { GsapService } from './gsap.service';

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  value: () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }),
});

describe('GsapService', () => {
  afterEach(() => vi.restoreAllMocks());

  it('disables ticker lag smoothing when requested', () => {
    const lagSmoothing = vi.spyOn(gsap.ticker, 'lagSmoothing');
    const service = TestBed.inject(GsapService);

    service.lagSmoothing(false);

    expect(lagSmoothing).toHaveBeenCalledWith(0);
  });
});
