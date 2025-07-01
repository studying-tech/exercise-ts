/**
 * TypeScript Array Utils - Unit Tests
 * 配列操作関数のユニットテスト
 */

import * as ArrayUtils from '../src/array-utils'
import { ArrayUtilsError } from '../src/types'

describe('Array Utils', () => {
  describe('map', () => {
    it('should transform array elements correctly', () => {
      const numbers = [1, 2, 3, 4, 5]
      const doubled = ArrayUtils.map(numbers, (x) => x * 2)

      expect(doubled).toEqual([2, 4, 6, 8, 10])
    })

    it('should handle empty arrays', () => {
      const empty: number[] = []
      const result = ArrayUtils.map(empty, (x) => x * 2)

      expect(result).toEqual([])
    })

    it('should pass index and array to mapper function', () => {
      const numbers = [10, 20, 30]
      const withIndex = ArrayUtils.map(numbers, (val, index, arr) => `${val}_${index}_${arr.length}`)

      expect(withIndex).toEqual(['10_0_3', '20_1_3', '30_2_3'])
    })

    it('should throw error for non-array input', () => {
      expect(() => {
        ArrayUtils.map('not an array' as unknown as number[], (x) => x)
      }).toThrow(ArrayUtilsError)
    })
  })

  describe('filter', () => {
    it('should filter elements correctly', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      const evens = ArrayUtils.filter(numbers, (x) => x % 2 === 0)

      expect(evens).toEqual([2, 4, 6])
    })

    it('should handle empty arrays', () => {
      const empty: number[] = []
      const result = ArrayUtils.filter(empty, (x) => x > 0)

      expect(result).toEqual([])
    })

    it('should handle no matches', () => {
      const numbers = [1, 3, 5]
      const evens = ArrayUtils.filter(numbers, (x) => x % 2 === 0)

      expect(evens).toEqual([])
    })

    it('should throw error for non-array input', () => {
      expect(() => {
        ArrayUtils.filter('not an array' as unknown as number[], (x) => x > 0)
      }).toThrow(ArrayUtilsError)
    })
  })

  describe('reduce', () => {
    it('should reduce array correctly', () => {
      const numbers = [1, 2, 3, 4, 5]
      const sum = ArrayUtils.reduce(numbers, (acc, x) => acc + x, 0)

      expect(sum).toBe(15)
    })

    it('should handle empty arrays with initial value', () => {
      const empty: number[] = []
      const sum = ArrayUtils.reduce(empty, (acc, x) => acc + x, 0)

      expect(sum).toBe(0)
    })

    it('should work with different types', () => {
      const words = ['hello', 'world', 'test']
      const concatenated = ArrayUtils.reduce(words, (acc, word) => `${acc} ${word}`, '')

      expect(concatenated).toBe(' hello world test')
    })
  })

  describe('groupBy', () => {
    it('should group elements correctly', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      const grouped = ArrayUtils.groupBy(numbers, (x) => x % 2)

      expect(grouped).toEqual({
        0: [2, 4, 6],
        1: [1, 3, 5],
      })
    })

    it('should handle string keys', () => {
      const people = [
        { name: 'Alice', department: 'Engineering' },
        { name: 'Bob', department: 'Sales' },
        { name: 'Charlie', department: 'Engineering' },
      ]

      const grouped = ArrayUtils.groupBy(people, (person) => person.department)

      expect(grouped).toEqual({
        Engineering: [
          { name: 'Alice', department: 'Engineering' },
          { name: 'Charlie', department: 'Engineering' },
        ],
        Sales: [{ name: 'Bob', department: 'Sales' }],
      })
    })
  })

  describe('partition', () => {
    it('should partition array correctly', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      const [evens, odds] = ArrayUtils.partition(numbers, (x) => x % 2 === 0)

      expect(evens).toEqual([2, 4, 6])
      expect(odds).toEqual([1, 3, 5])
    })

    it('should handle all true predicate', () => {
      const numbers = [2, 4, 6]
      const [evens, odds] = ArrayUtils.partition(numbers, (x) => x % 2 === 0)

      expect(evens).toEqual([2, 4, 6])
      expect(odds).toEqual([])
    })

    it('should handle all false predicate', () => {
      const numbers = [1, 3, 5]
      const [evens, odds] = ArrayUtils.partition(numbers, (x) => x % 2 === 0)

      expect(evens).toEqual([])
      expect(odds).toEqual([1, 3, 5])
    })
  })

  describe('unique', () => {
    it('should remove duplicates', () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4]
      const unique = ArrayUtils.unique(numbers)

      expect(unique).toEqual([1, 2, 3, 4])
    })

    it('should handle arrays without duplicates', () => {
      const numbers = [1, 2, 3, 4]
      const unique = ArrayUtils.unique(numbers)

      expect(unique).toEqual([1, 2, 3, 4])
    })

    it('should handle empty arrays', () => {
      const empty: number[] = []
      const unique = ArrayUtils.unique(empty)

      expect(unique).toEqual([])
    })
  })

  describe('uniqueBy', () => {
    it('should remove duplicates by key', () => {
      const people = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice Clone' },
        { id: 3, name: 'Charlie' },
      ]

      const unique = ArrayUtils.uniqueBy(people, (person) => person.id)

      expect(unique).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ])
    })
  })

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      const nested = [
        [1, 2],
        [3, 4],
        [5, 6],
      ]
      const flattened = ArrayUtils.flatten(nested)

      expect(flattened).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('should handle mixed types', () => {
      const mixed = [1, [2, 3], 4, [5]]
      const flattened = ArrayUtils.flatten(mixed)

      expect(flattened).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('deepFlatten', () => {
    it('should deeply flatten nested arrays', () => {
      const deepNested = [1, [2, [3, [4, 5]]], 6]
      const flattened = ArrayUtils.deepFlatten(deepNested)

      expect(flattened).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('chunk', () => {
    it('should chunk array correctly', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
      const chunked = ArrayUtils.chunk(numbers, 3)

      expect(chunked).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8],
      ])
    })

    it('should handle exact division', () => {
      const numbers = [1, 2, 3, 4]
      const chunked = ArrayUtils.chunk(numbers, 2)

      expect(chunked).toEqual([
        [1, 2],
        [3, 4],
      ])
    })

    it('should throw error for invalid chunk size', () => {
      const numbers = [1, 2, 3]

      expect(() => {
        ArrayUtils.chunk(numbers, 0)
      }).toThrow(ArrayUtilsError)
    })
  })

  describe('getStats', () => {
    it('should calculate statistics correctly', () => {
      const numbers = [1, 2, 3, 4, 5]
      const stats = ArrayUtils.getStats(numbers)

      expect(stats.length).toBe(5)
      expect(stats.sum).toBe(15)
      expect(stats.average).toBe(3)
      expect(stats.min).toBe(1)
      expect(stats.max).toBe(5)
      expect(stats.median).toBe(3)
    })

    it('should handle empty arrays', () => {
      const empty: number[] = []
      const stats = ArrayUtils.getStats(empty)

      expect(stats.length).toBe(0)
      expect(stats.sum).toBeUndefined()
    })
  })

  describe('difference', () => {
    it('should find difference between arrays', () => {
      const array1 = [1, 2, 3, 4]
      const array2 = [3, 4, 5, 6]
      const diff = ArrayUtils.difference(array1, array2)

      expect(diff).toEqual([1, 2])
    })
  })

  describe('intersection', () => {
    it('should find intersection between arrays', () => {
      const array1 = [1, 2, 3, 4]
      const array2 = [3, 4, 5, 6]
      const intersection = ArrayUtils.intersection(array1, array2)

      expect(intersection).toEqual([3, 4])
    })
  })

  describe('union', () => {
    it('should create union of arrays', () => {
      const array1 = [1, 2, 3]
      const array2 = [3, 4, 5]
      const array3 = [5, 6, 7]
      const union = ArrayUtils.union(array1, array2, array3)

      expect(union).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('take', () => {
    it('should take specified number of elements', () => {
      const numbers = [1, 2, 3, 4, 5]
      const taken = ArrayUtils.take(numbers, 3)

      expect(taken).toEqual([1, 2, 3])
    })

    it('should handle taking more than available', () => {
      const numbers = [1, 2]
      const taken = ArrayUtils.take(numbers, 5)

      expect(taken).toEqual([1, 2])
    })
  })

  describe('skip', () => {
    it('should skip specified number of elements', () => {
      const numbers = [1, 2, 3, 4, 5]
      const skipped = ArrayUtils.skip(numbers, 2)

      expect(skipped).toEqual([3, 4, 5])
    })

    it('should handle skipping more than available', () => {
      const numbers = [1, 2]
      const skipped = ArrayUtils.skip(numbers, 5)

      expect(skipped).toEqual([])
    })
  })

  describe('findIndex', () => {
    it('should find index of matching element', () => {
      const numbers = [1, 2, 3, 4, 5]
      const index = ArrayUtils.findIndex(numbers, (x) => x > 3)

      expect(index).toBe(3)
    })

    it('should return -1 if no match found', () => {
      const numbers = [1, 2, 3]
      const index = ArrayUtils.findIndex(numbers, (x) => x > 10)

      expect(index).toBe(-1)
    })
  })

  describe('compact', () => {
    it('should remove null and undefined values', () => {
      const array = [1, null, 2, undefined, 3, null, 4]
      const compacted = ArrayUtils.compact(array)

      expect(compacted).toEqual([1, 2, 3, 4])
    })
  })

  describe('shuffle', () => {
    it('should return array with same elements', () => {
      const numbers = [1, 2, 3, 4, 5]
      const shuffled = ArrayUtils.shuffle(numbers)

      expect(shuffled).toHaveLength(5)
      expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5])
    })

    it('should not modify original array', () => {
      const numbers = [1, 2, 3, 4, 5]
      const original = [...numbers]
      ArrayUtils.shuffle(numbers)

      expect(numbers).toEqual(original)
    })
  })

  describe('sample', () => {
    it('should return specified number of elements', () => {
      const numbers = [1, 2, 3, 4, 5]
      const sampled = ArrayUtils.sample(numbers, 3)

      expect(sampled).toHaveLength(3)
    })

    it('should return all elements if count exceeds length', () => {
      const numbers = [1, 2, 3]
      const sampled = ArrayUtils.sample(numbers, 5)

      expect(sampled).toHaveLength(3)
    })
  })

  describe('async operations', () => {
    describe('mapAsync', () => {
      it('should map array elements asynchronously', async () => {
        const numbers = [1, 2, 3]
        const doubled = await ArrayUtils.mapAsync(numbers, async (x) => {
          await new Promise((resolve) => setTimeout(resolve, 10))
          return x * 2
        })

        expect(doubled).toEqual([2, 4, 6])
      })
    })

    describe('filterAsync', () => {
      it('should filter array elements asynchronously', async () => {
        const numbers = [1, 2, 3, 4, 5]
        const evens = await ArrayUtils.filterAsync(numbers, async (x) => {
          await new Promise((resolve) => setTimeout(resolve, 10))
          return x % 2 === 0
        })

        expect(evens).toEqual([2, 4])
      })
    })
  })
})
