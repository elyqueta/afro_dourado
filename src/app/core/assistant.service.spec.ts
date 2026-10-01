import { TestBed } from '@angular/core/testing';
import { AssistantService } from './assistant.service';

let mediaMatches = false;
let mediaListeners: ((event: MediaQueryListEvent) => void)[] = [];

const mockMatchMedia = (query: string): MediaQueryList => {
  return {
    get matches() {
      return mediaMatches;
    },
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: (ev: MediaQueryListEvent | Event) => void) => {
      mediaListeners.push(listener as (event: MediaQueryListEvent) => void);
    },
    removeEventListener: (_type: string, _listener: (ev: MediaQueryListEvent | Event) => void) => {
      mediaListeners = mediaListeners.filter((listener) => listener !== _listener);
    },
    addListener: (_listener: (ev: MediaQueryListEvent | Event) => void) => {},
    removeListener: (_listener: (ev: MediaQueryListEvent | Event) => void) => {},
    dispatchEvent: () => true,
  } as unknown as MediaQueryList;
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('AssistantService', () => {
  let service: AssistantService;

  beforeEach(() => {
    mediaMatches = false;
    mediaListeners = [];
    document.documentElement.removeAttribute('data-assistant');
    document.documentElement.removeAttribute('data-assistant-mode');
    document.documentElement.style.removeProperty('--assistant-w');
    document.documentElement.style.removeProperty('--assistant-sbw-comp');
    document.documentElement.style.removeProperty('--assistant-viewport-width');
    document.documentElement.style.removeProperty('--sbw');
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reflect the desktop media query in isSplit and the document mode', () => {
    expect(service.isSplit()).toBe(false);
    mediaMatches = true;
    mediaListeners.forEach((listener) => listener({ matches: true } as MediaQueryListEvent));
    TestBed.flushEffects();

    expect(service.isSplit()).toBe(true);
    expect(document.documentElement.getAttribute('data-assistant-mode')).toBe('split');
  });

  it('should expose sbw signal', () => {
    expect(service.sbw).toBeDefined();
    expect(typeof service.sbw).toBe('function');
  });

  it('should toggle open state', () => {
    expect(service.open()).toBe(false);
    service.openAssistant();
    TestBed.flushEffects();
    expect(service.open()).toBe(true);
    expect(document.documentElement.getAttribute('data-assistant')).toBe('open');
    expect(document.documentElement.style.getPropertyValue('--assistant-w')).toBe('0px');
    expect(document.documentElement.style.getPropertyValue('--assistant-sbw-comp')).toBe('0px');
    expect(document.documentElement.style.getPropertyValue('--assistant-viewport-width')).toBe(`${window.innerWidth}px`);
    service.closeAssistant();
    TestBed.flushEffects();
    expect(service.open()).toBe(false);
    expect(document.documentElement.getAttribute('data-assistant')).toBe('closed');
  });

  it('should update canSend based on input and typing state', () => {
    expect(service.canSend()).toBe(false);
    service.input.set('olá');
    expect(service.canSend()).toBe(true);
    service.isTyping.set(true);
    expect(service.canSend()).toBe(false);
  });

  it('should send message and reset chat', () => {
    service.sendMessage('olá');
    expect(service.messages().length).toBeGreaterThan(1);
    service.resetChat();
    expect(service.messages().length).toBe(1);
  });
});
