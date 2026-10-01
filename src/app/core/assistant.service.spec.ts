import { TestBed } from '@angular/core/testing';
import { AssistantService } from './assistant.service';

const mockMatchMedia = (query: string): MediaQueryList => {
  const listeners: ((ev: MediaQueryListEvent | Event) => void)[] = [];
  return {
    matches: false,
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: (ev: MediaQueryListEvent | Event) => void) => {
      listeners.push(listener);
    },
    removeEventListener: (_type: string, _listener: (ev: MediaQueryListEvent | Event) => void) => {
      // noop
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
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose isSplit signal', () => {
    expect(service.isSplit).toBeDefined();
    expect(typeof service.isSplit).toBe('function');
  });

  it('should expose sbw signal', () => {
    expect(service.sbw).toBeDefined();
    expect(typeof service.sbw).toBe('function');
  });

  it('should toggle open state', () => {
    expect(service.open()).toBe(false);
    service.openAssistant();
    expect(service.open()).toBe(true);
    service.closeAssistant();
    expect(service.open()).toBe(false);
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
