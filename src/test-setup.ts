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

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: (callback: FrameRequestCallback) => setTimeout(() => callback(Date.now()), 0),
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: (id: number) => clearTimeout(id),
});

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  readonly target: Element | null = null;
  readonly contentRect: DOMRectReadOnly = {} as DOMRectReadOnly;
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});
