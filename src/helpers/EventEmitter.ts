export interface IEventEmitter {
  on(event: string, listener: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): boolean;
  off(event: string): this;
}

export class EventEmitter implements IEventEmitter {
  private events: { [key: string]: Function[] } = {};

  on(event: string, listener: Function): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
    return this;
  }

  emit(event: string, ...args: unknown[]): boolean {
    if (!this.events[event]) {
      return false;
    }

    this.events[event].forEach((listener) => listener.apply(this, args));
    return true;
  }

  off(event: string): this {
    delete this.events[event];
    return this;
  }
}
