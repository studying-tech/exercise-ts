/**
 * TypeScript Array Utils - Performance Testing
 * パフォーマンステストユーティリティ
 */

import { ArrayUtilsError, type PerformanceResult } from './types'

/**
 * 関数の実行時間を測定
 */
export function benchmark<T>(name: string, fn: () => T, iterations = 1): PerformanceResult {
  if (iterations <= 0) {
    throw new ArrayUtilsError('Iterations must be greater than 0', 'benchmark')
  }

  const startTime = performance.now()
  const startMemory = getMemoryUsage()

  for (let i = 0; i < iterations; i++) {
    fn()
  }

  const endTime = performance.now()
  const endMemory = getMemoryUsage()

  return {
    name,
    executionTime: endTime - startTime,
    memoryUsage: endMemory - startMemory,
    operations: iterations,
  }
}

/**
 * 複数の関数のパフォーマンスを比較
 */
export function compareBenchmarks<T>(
  tests: Array<{ name: string; fn: () => T }>,
  iterations = 1000,
): PerformanceResult[] {
  const results: PerformanceResult[] = []

  for (const test of tests) {
    results.push(benchmark(test.name, test.fn, iterations))
  }

  // 実行時間でソート
  results.sort((a, b) => a.executionTime - b.executionTime)

  return results
}

/**
 * 配列操作のパフォーマンステスト
 */
export function performanceTest(): {
  nativeVsCustom: PerformanceResult[]
  arraySize: number
  timestamp: string
} {
  const arraySize = 10000
  const testArray = Array.from({ length: arraySize }, (_, i) => i)
  const iterations = 100

  const tests = [
    {
      name: 'Native Array.map',
      fn: () => testArray.map((x) => x * 2),
    },
    {
      name: 'Custom map function',
      fn: () => {
        const result: number[] = []
        for (let i = 0; i < testArray.length; i++) {
          result.push(testArray[i] * 2)
        }
        return result
      },
    },
    {
      name: 'Native Array.filter',
      fn: () => testArray.filter((x) => x % 2 === 0),
    },
    {
      name: 'Custom filter function',
      fn: () => {
        const result: number[] = []
        for (let i = 0; i < testArray.length; i++) {
          if (testArray[i] % 2 === 0) {
            result.push(testArray[i])
          }
        }
        return result
      },
    },
    {
      name: 'Native Array.reduce',
      fn: () => testArray.reduce((sum, x) => sum + x, 0),
    },
    {
      name: 'Custom reduce function',
      fn: () => {
        let sum = 0
        for (let i = 0; i < testArray.length; i++) {
          sum += testArray[i]
        }
        return sum
      },
    },
  ]

  const results = compareBenchmarks(tests, iterations)

  return {
    nativeVsCustom: results,
    arraySize,
    timestamp: new Date().toISOString(),
  }
}

/**
 * メモリ使用量を取得（Node.js環境でのみ動作）
 */
function getMemoryUsage(): number {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    return process.memoryUsage().heapUsed
  }
  return 0
}

/**
 * パフォーマンステスト結果をフォーマット
 */
export function formatPerformanceResults(results: PerformanceResult[]): string {
  const lines: string[] = []
  lines.push('Performance Test Results')
  lines.push('========================')
  lines.push('')

  const maxNameLength = Math.max(...results.map((r) => r.name.length))

  for (const result of results) {
    const name = result.name.padEnd(maxNameLength)
    const time = `${result.executionTime.toFixed(2)}ms`
    const opsPerSec =
      result.operations > 0 ? `(${(result.operations / (result.executionTime / 1000)).toFixed(0)} ops/sec)` : ''

    lines.push(`${name}: ${time} ${opsPerSec}`)

    if (result.memoryUsage && result.memoryUsage !== 0) {
      const memory = formatBytes(Math.abs(result.memoryUsage))
      const memoryDirection = result.memoryUsage > 0 ? '+' : '-'
      lines.push(`${' '.repeat(maxNameLength + 2)}Memory: ${memoryDirection}${memory}`)
    }
  }

  return lines.join('\n')
}

/**
 * バイト数を人間が読みやすい形式に変換
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`
}

/**
 * 実行時間の詳細分析
 */
export class PerformanceProfiler {
  private marks: Map<string, number> = new Map()
  private measurements: PerformanceResult[] = []

  /**
   * マークを設定
   */
  mark(name: string): void {
    this.marks.set(name, performance.now())
  }

  /**
   * 測定を実行
   */
  measure(name: string, startMark: string, endMark?: string): PerformanceResult {
    const startTime = this.marks.get(startMark)
    if (startTime === undefined) {
      throw new ArrayUtilsError(`Start mark '${startMark}' not found`, 'measure')
    }

    const endTime = endMark ? this.marks.get(endMark) : performance.now()
    if (endTime === undefined) {
      throw new ArrayUtilsError(`End mark '${endMark}' not found`, 'measure')
    }

    const result: PerformanceResult = {
      name,
      executionTime: endTime - startTime,
      operations: 1,
    }

    this.measurements.push(result)
    return result
  }

  /**
   * すべての測定結果を取得
   */
  getMeasurements(): PerformanceResult[] {
    return [...this.measurements]
  }

  /**
   * プロファイラーをリセット
   */
  reset(): void {
    this.marks.clear()
    this.measurements.length = 0
  }

  /**
   * レポートを生成
   */
  generateReport(): string {
    return formatPerformanceResults(this.measurements)
  }
}

/**
 * 実行時間を測定するデコレータ
 */
export function measureTime(_target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: unknown[]) {
    const start = performance.now()
    const result = originalMethod.apply(this, args)
    const end = performance.now()

    // eslint-disable-next-line no-console
    console.log(`${propertyKey} execution time: ${(end - start).toFixed(2)}ms`)

    return result
  }
}

/**
 * 非同期関数の実行時間を測定するデコレータ
 */
export function measureAsyncTime(_target: unknown, propertyKey: string, descriptor: PropertyDescriptor): void {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: unknown[]) {
    const start = performance.now()
    const result = await originalMethod.apply(this, args)
    const end = performance.now()

    // eslint-disable-next-line no-console
    console.log(`${propertyKey} execution time: ${(end - start).toFixed(2)}ms`)

    return result
  }
}
