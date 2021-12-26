interface StateHistoryOptions<T> {
  max?: number;
  defaultData?: T;
}

export class StateHistory<T> {
  history: T[] = [];
  index = -1;
  max = 100;
  constructor(params?: StateHistoryOptions<T>) {
    this.max = params?.max ?? 100;
    if (params?.defaultData) this.save(params?.defaultData);
  }

  private isLast(): boolean {
    return this.len() - 1 === this.index;
  }

  len(): number {
    return this.history.length;
  }

  save(snapshot: T): void {
    if (!this.isLast()) {
      this.history = this.history.slice(0, this.index);
    }
    this.history.push(snapshot);
    if (this.max < this.history.length) {
      this.history.shift();
    }
    this.index++;
  }

  undo(): T | null {
    if (this.index === 0) return null;
    this.index--;
    return this.history[this.index] ?? null;
  }

  redo(): T | null {
    if (this.index >= this.history.length - 1) return null;
    this.index++;
    return this.history[this.index] ?? null;
  }

  clear(): void {
    this.history.length = 0;
  }

  returnDefault(): T | null {
    if (this.isLast()) return null;
    this.history.length = 1;
    return this.history[0];
  }
}
