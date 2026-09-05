import { Injectable, signal } from '@angular/core';

export type ConnectionQuality = '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  readonly effectiveType = signal<ConnectionQuality>('unknown');
  readonly saveData = signal(false);

  init(): void {
    const connection = (navigator as any).connection ?? (navigator as any).mozConnection ?? (navigator as any).webkitConnection;

    if (connection) {
      this.effectiveType.set(connection.effectiveType as ConnectionQuality ?? 'unknown');
      this.saveData.set(connection.saveData ?? false);

      connection.addEventListener('change', () => {
        this.effectiveType.set(connection.effectiveType as ConnectionQuality ?? 'unknown');
        this.saveData.set(connection.saveData ?? false);
      });
    }
  }

  isSlowConnection(): boolean {
    return this.effectiveType() === '2g' || this.effectiveType() === 'slow-2g' || this.saveData();
  }
}
