/**
 * TypeScript Array Utils - Pipeline Processing
 * パイプライン処理の実装
 */

import { ArrayUtilsError } from './types'

/**
 * パイプライン関数の型定義
 */
export type PipelineFunction<T, U> = (input: T) => U

/**
 * 関数合成のためのパイプライン
 */
export class Pipeline<T> {
  private functions: PipelineFunction<unknown, unknown>[] = []

  constructor(private initialValue: T) {}

  /**
   * パイプラインに関数を追加
   */
  pipe<U>(fn: PipelineFunction<T, U>): Pipeline<U>
  pipe<U>(fn: PipelineFunction<unknown, U>): Pipeline<U> {
    this.functions.push(fn)
    return this as unknown as Pipeline<U>
  }

  /**
   * パイプラインを実行
   */
  execute(): T {
    return this.functions.reduce((value, fn) => fn(value), this.initialValue as unknown) as T
  }

  /**
   * 非同期パイプラインを実行
   */
  async executeAsync(): Promise<T> {
    let value: unknown = this.initialValue

    for (const fn of this.functions) {
      value = await Promise.resolve(fn(value))
    }

    return value as T
  }
}

/**
 * パイプラインを作成
 */
export function createPipeline<T>(initialValue: T): Pipeline<T> {
  return new Pipeline(initialValue)
}

/**
 * 関数を合成して新しい関数を作成
 */
export function compose<A, B>(f: (a: A) => B): (a: A) => B
export function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C
export function compose<A, B, C, D>(f: (c: C) => D, g: (b: B) => C, h: (a: A) => B): (a: A) => D
export function compose<A, B, C, D, E>(f: (d: D) => E, g: (c: C) => D, h: (b: B) => C, i: (a: A) => B): (a: A) => E
export function compose(...functions: PipelineFunction<unknown, unknown>[]): PipelineFunction<unknown, unknown> {
  if (functions.length === 0) {
    throw new ArrayUtilsError('At least one function is required', 'compose')
  }

  if (functions.length === 1) {
    return functions[0]
  }

  return functions.reduce((composed, fn) => (input: unknown) => fn(composed(input)))
}

/**
 * パイプ演算子（左から右へ実行）
 */
export function pipe<A, B>(a: A, f: (a: A) => B): B
export function pipe<A, B, C>(a: A, f: (a: A) => B, g: (b: B) => C): C
export function pipe<A, B, C, D>(a: A, f: (a: A) => B, g: (b: B) => C, h: (c: C) => D): D
export function pipe<A, B, C, D, E>(a: A, f: (a: A) => B, g: (b: B) => C, h: (c: C) => D, i: (d: D) => E): E
export function pipe(value: unknown, ...functions: PipelineFunction<unknown, unknown>[]): unknown {
  return functions.reduce((acc, fn) => fn(acc), value)
}

/**
 * カリー化された関数を作成
 */
export function curry<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R
export function curry<A, B, C, R>(fn: (a: A, b: B, c: C) => R): (a: A) => (b: B) => (c: C) => R
export function curry<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): (a: A) => (b: B) => (c: C) => (d: D) => R
export function curry(fn: (...args: unknown[]) => unknown): unknown {
  return function curried(...args: unknown[]): unknown {
    if (args.length >= fn.length) {
      return fn(...args)
    }

    return (...nextArgs: unknown[]) => curried(...args, ...nextArgs)
  }
}

/**
 * 部分適用関数を作成
 */
export function partial<A, B, R>(fn: (a: A, b: B) => R, a: A): (b: B) => R
export function partial<A, B, C, R>(fn: (a: A, b: B, c: C) => R, a: A, b: B): (c: C) => R
export function partial<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R, a: A, b: B, c: C): (d: D) => R
export function partial(
  fn: (...args: unknown[]) => unknown,
  ...partialArgs: unknown[]
): (...args: unknown[]) => unknown {
  return (...remainingArgs: unknown[]) => fn(...partialArgs, ...remainingArgs)
}

/**
 * メモ化関数を作成
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  keySelector?: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>()

  const defaultKeySelector = (...args: Parameters<T>): string => JSON.stringify(args)

  const getKey = keySelector || defaultKeySelector

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey(...args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args) as ReturnType<T>
    cache.set(key, result)

    return result
  }) as T
}

/**
 * デバウンス関数を作成
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): T {
  let timeoutId: NodeJS.Timeout | undefined

  return ((...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => fn(...args), delay)
  }) as T
}

/**
 * スロットル関数を作成
 */
export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): T {
  let inThrottle = false

  return ((...args: Parameters<T>): void => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }) as T
}

/**
 * リトライ機能付き関数を作成
 */
export function withRetry<T extends (...args: unknown[]) => unknown>(
  fn: T,
  maxAttempts = 3,
  delay = 1000,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    let lastError: Error | undefined

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await Promise.resolve(fn(...args))
        return result as ReturnType<T>
      } catch (error) {
        lastError = error as Error

        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    throw new ArrayUtilsError(`Failed after ${maxAttempts} attempts: ${lastError?.message}`, 'withRetry')
  }
}
