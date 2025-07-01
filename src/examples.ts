/**
 * TypeScript Array Utils - Usage Examples
 * 使用例とデモンストレーション
 */

/* eslint-disable no-console */

import * as ArrayUtils from './array-utils'
import { chain, range, repeat } from './chainable'
import { benchmark, formatPerformanceResults, performanceTest } from './performance'
import { createPipeline, curry, memoize, pipe } from './pipeline'
import { isAllNumbers, isArrayOf, isNonEmpty } from './type-guards'

/**
 * 基本的な配列操作の例
 */
function basicOperationsExample(): void {
  console.log('=== Basic Operations Example ===\n')

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // map example
  const doubled = ArrayUtils.map(numbers, (x) => x * 2)
  console.log('Original:', numbers)
  console.log('Doubled:', doubled)

  // filter example
  const evenNumbers = ArrayUtils.filter(numbers, (x) => x % 2 === 0)
  console.log('Even numbers:', evenNumbers)

  // reduce example
  const sum = ArrayUtils.reduce(numbers, (acc, x) => acc + x, 0)
  console.log('Sum:', sum)

  // groupBy example
  const grouped = ArrayUtils.groupBy(numbers, (x) => x % 3)
  console.log('Grouped by remainder (mod 3):', grouped)

  console.log('\n')
}

/**
 * チェーン可能APIの例
 */
function chainableExample(): void {
  console.log('=== Chainable API Example ===\n')

  const result = chain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .filter((x) => x % 2 === 0)
    .map((x) => x * x)
    .take(3)
    .value()

  console.log('Chain result (even squares, first 3):', result)

  // Range example
  const rangeResult = range(1, 11)
    .filter((x) => x % 2 === 1)
    .map((x) => `Item ${x}`)
    .value()

  console.log('Range result (odd numbers as strings):', rangeResult)

  // Repeat example
  const repeatedResult = repeat('Hello', 3)
    .map((str, index) => `${str} ${index + 1}`)
    .value()

  console.log('Repeated result:', repeatedResult)

  console.log('\n')
}

/**
 * 高度な配列操作の例
 */
function advancedOperationsExample(): void {
  console.log('=== Advanced Operations Example ===\n')

  const data = [
    { name: 'Alice', age: 25, department: 'Engineering' },
    { name: 'Bob', age: 30, department: 'Sales' },
    { name: 'Charlie', age: 35, department: 'Engineering' },
    { name: 'Diana', age: 28, department: 'Marketing' },
    { name: 'Eve', age: 32, department: 'Sales' },
  ]

  // Group by department
  const byDepartment = ArrayUtils.groupBy(data, (person) => person.department)
  console.log('Grouped by department:', byDepartment)

  // Partition by age
  const [adults, seniors] = ArrayUtils.partition(data, (person) => person.age < 30)
  console.log(
    'Adults (< 30):',
    adults.map((p) => p.name),
  )
  console.log(
    'Seniors (>= 30):',
    seniors.map((p) => p.name),
  )

  // Unique by department
  const uniqueDepartments = ArrayUtils.uniqueBy(data, (person) => person.department)
  console.log(
    'Unique departments:',
    uniqueDepartments.map((p) => p.department),
  )

  // Complex chain operation
  const engineeringStats = chain(data)
    .filter((person) => person.department === 'Engineering')
    .map((person) => person.age)
    .tap((ages) => console.log('Engineering ages:', ages))
    .stats()

  console.log('Engineering department stats:', engineeringStats)

  console.log('\n')
}

/**
 * パイプライン処理の例
 */
function pipelineExample(): void {
  console.log('=== Pipeline Example ===\n')

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // Simple pipe
  const result1 = pipe(
    data,
    (arr) => ArrayUtils.filter(arr, (x) => x % 2 === 0),
    (arr) => ArrayUtils.map(arr, (x) => x * x),
    (arr) => ArrayUtils.reduce(arr, (sum, x) => sum + x, 0),
  )

  console.log('Pipe result (sum of even squares):', result1)

  // Pipeline class
  const pipeline = createPipeline(data)
    .pipe((arr) => ArrayUtils.filter(arr, (x) => x > 5))
    .pipe((arr) => ArrayUtils.map(arr, (x) => `Number: ${x}`))

  const result2 = pipeline.execute()
  console.log('Pipeline result:', result2)

  // Curried function
  const curriedMap = curry(ArrayUtils.map)
  const doubleMap = curriedMap(data)
  const doubled = doubleMap((x) => x * 2)
  console.log('Curried map result:', doubled)

  console.log('\n')
}

/**
 * 型ガードの例
 */
function typeGuardsExample(): void {
  console.log('=== Type Guards Example ===\n')

  const mixedArray: unknown[] = [1, 'hello', 2, null, 3, undefined, 4]

  if (isArrayOf(mixedArray, (x): x is number => typeof x === 'number')) {
    // この分岐では mixedArray は number[] として扱われる
    console.log('All numbers:', mixedArray)
  } else {
    console.log('Mixed array contains non-numbers')
  }

  // Filter with type guard
  const numbers = ArrayUtils.filterWithTypeGuard(mixedArray, (x): x is number => typeof x === 'number')
  console.log('Filtered numbers:', numbers)

  // Check if array is non-empty
  if (isNonEmpty(numbers)) {
    console.log('First number:', numbers[0]) // Type-safe access
  }

  // Check if all numbers
  if (isAllNumbers(numbers)) {
    const stats = ArrayUtils.getStats(numbers)
    console.log('Number array stats:', stats)
  }

  console.log('\n')
}

/**
 * 非同期操作の例
 */
async function asyncOperationsExample(): Promise<void> {
  console.log('=== Async Operations Example ===\n')

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ]

  try {
    // Simulate async processing
    const processUrl = async (url: string): Promise<{ url: string; length: number }> => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 100))
      return { url, length: url.length }
    }

    const results = await ArrayUtils.mapAsync(urls, processUrl)
    console.log('Async map results:', results)

    // Filter with async predicate
    const longUrls = await ArrayUtils.filterAsync(urls, async (url) => {
      await new Promise((resolve) => setTimeout(resolve, 50))
      return url.length > 50
    })
    console.log('Long URLs:', longUrls)
  } catch (error) {
    console.error('Async operation failed:', error)
  }

  console.log('\n')
}

/**
 * パフォーマンステストの例
 */
function performanceExample(): void {
  console.log('=== Performance Example ===\n')

  // Benchmark a simple operation
  const fibMemo = memoize((n: number): number => {
    if (n <= 1) return n
    return fibMemo(n - 1) + fibMemo(n - 2)
  })

  const fibNormal = (n: number): number => {
    if (n <= 1) return n
    return fibNormal(n - 1) + fibNormal(n - 2)
  }

  const n = 35

  const normalResult = benchmark('Normal Fibonacci', () => fibNormal(n), 1)

  const memoResult = benchmark('Memoized Fibonacci', () => fibMemo(n), 1)

  console.log(formatPerformanceResults([normalResult, memoResult]))

  // Array operations performance test
  const perfTest = performanceTest()
  console.log('\nArray Operations Performance:')
  console.log(formatPerformanceResults(perfTest.nativeVsCustom))

  console.log('\n')
}

/**
 * 実用例：データ処理パイプライン
 */
function realWorldExample(): void {
  console.log('=== Real World Example: Data Processing Pipeline ===\n')

  // Sample sales data
  const salesData = [
    { id: 1, product: 'Laptop', amount: 1200, date: '2024-01-15', region: 'North' },
    { id: 2, product: 'Mouse', amount: 25, date: '2024-01-16', region: 'South' },
    { id: 3, product: 'Keyboard', amount: 75, date: '2024-01-17', region: 'North' },
    { id: 4, product: 'Laptop', amount: 1200, date: '2024-01-18', region: 'East' },
    { id: 5, product: 'Monitor', amount: 300, date: '2024-01-19', region: 'West' },
    { id: 6, product: 'Mouse', amount: 25, date: '2024-01-20', region: 'North' },
    { id: 7, product: 'Laptop', amount: 1200, date: '2024-01-21', region: 'South' },
  ]

  // Data processing pipeline
  const monthlyReport = chain(salesData)
    .filter((sale) => new Date(sale.date) >= new Date('2024-01-01'))
    .groupBy((sale) => sale.region)
    .value()

  console.log('Sales by region:', monthlyReport)

  // Calculate total revenue per product
  const productRevenue = ArrayUtils.groupBy(salesData, (sale) => sale.product)
  const revenueByProduct = ArrayUtils.map(Object.entries(productRevenue), ([product, sales]) => ({
    product,
    totalRevenue: ArrayUtils.reduce(sales, (sum, sale) => sum + sale.amount, 0),
    salesCount: sales.length,
  }))

  console.log('Revenue by product:', revenueByProduct)

  // Top selling products
  const topProducts = chain(revenueByProduct)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .take(3)
    .value()

  console.log('Top 3 products by revenue:', topProducts)

  // Statistics
  const amounts = ArrayUtils.map(salesData, (sale) => sale.amount)
  const salesStats = ArrayUtils.getStats(amounts)
  console.log('Sales statistics:', salesStats)

  console.log('\n')
}

/**
 * すべての例を実行
 */
async function runAllExamples(): Promise<void> {
  console.log('TypeScript Array Utils - Examples and Demonstrations\n')
  console.log('==================================================\n')

  basicOperationsExample()
  chainableExample()
  advancedOperationsExample()
  pipelineExample()
  typeGuardsExample()
  await asyncOperationsExample()
  performanceExample()
  realWorldExample()

  console.log('All examples completed successfully! 🎉')
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples().catch(console.error)
}

export {
  basicOperationsExample,
  chainableExample,
  advancedOperationsExample,
  pipelineExample,
  typeGuardsExample,
  asyncOperationsExample,
  performanceExample,
  realWorldExample,
  runAllExamples,
}
