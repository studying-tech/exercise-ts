/**
 * TypeScript Array Utils - Type Guard Functions
 * 型ガード関数の実装
 */

import type { TypeGuard } from './types'

/**
 * 配列かどうかをチェック
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * 空でない配列かどうかをチェック
 */
export function isNonEmpty<T>(value: T[]): value is [T, ...T[]] {
  return Array.isArray(value) && value.length > 0
}

/**
 * すべて数値の配列かどうかをチェック
 */
export function isAllNumbers(value: unknown[]): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'number' && !Number.isNaN(item))
}

/**
 * すべて文字列の配列かどうかをチェック
 */
export function isAllStrings(value: unknown[]): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

/**
 * すべてブール値の配列かどうかをチェック
 */
export function isAllBooleans(value: unknown[]): value is boolean[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'boolean')
}

/**
 * すべてオブジェクトの配列かどうかをチェック
 */
export function isAllObjects(value: unknown[]): value is Record<string, unknown>[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
  )
}

/**
 * すべて関数の配列かどうかをチェック
 */
export function isAllFunctions(value: unknown[]): value is ((...args: unknown[]) => unknown)[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'function')
}

/**
 * null/undefinedでない要素のみの配列かどうかをチェック
 */
export function isAllDefined<T>(value: (T | null | undefined)[]): value is T[] {
  return Array.isArray(value) && value.every((item) => item !== null && item !== undefined)
}

/**
 * 特定の型の配列かどうかをチェック
 */
export function isArrayOf<T>(value: unknown, typeGuard: TypeGuard<unknown, T>): value is T[] {
  return Array.isArray(value) && value.every(typeGuard)
}

/**
 * 数値かどうかをチェック
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

/**
 * 有限数値かどうかをチェック
 */
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/**
 * 整数かどうかをチェック
 */
export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value)
}

/**
 * 正の数値かどうかをチェック
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && value > 0
}

/**
 * 負でない数値かどうかをチェック
 */
export function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && value >= 0
}

/**
 * 文字列かどうかをチェック
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 空でない文字列かどうかをチェック
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

/**
 * ブール値かどうかをチェック
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * オブジェクトかどうかをチェック
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * 関数かどうかをチェック
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function'
}

/**
 * null/undefinedかどうかをチェック
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * プリミティブ型かどうかをチェック
 */
export function isPrimitive(value: unknown): value is string | number | boolean | null | undefined | symbol | bigint {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol' ||
    typeof value === 'bigint'
  )
}

/**
 * Dateオブジェクトかどうかをチェック
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

/**
 * RegExpオブジェクトかどうかをチェック
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

/**
 * Errorオブジェクトかどうかをチェック
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}

/**
 * Promiseかどうかをチェック
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (typeof value === 'object' && value !== null && typeof (value as { then?: unknown }).then === 'function')
  )
}

/**
 * Iterableかどうかをチェック
 */
export function isIterable<T = unknown>(value: unknown): value is Iterable<T> {
  return (
    value !== null &&
    value !== undefined &&
    typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function'
  )
}

/**
 * 特定のプロパティを持つオブジェクトかどうかをチェック
 */
export function hasProperty<K extends string>(value: unknown, property: K): value is Record<K, unknown> {
  return typeof value === 'object' && value !== null && property in value
}

/**
 * 複数のプロパティを持つオブジェクトかどうかをチェック
 */
export function hasProperties<K extends string>(value: unknown, properties: K[]): value is Record<K, unknown> {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return properties.every((prop) => prop in value)
}

/**
 * 型の組み合わせ用ヘルパー
 */
export function or<T, U>(guard1: TypeGuard<unknown, T>, guard2: TypeGuard<unknown, U>): TypeGuard<unknown, T | U> {
  return (value: unknown): value is T | U => guard1(value) || guard2(value)
}

/**
 * 型の組み合わせ用ヘルパー（AND）
 */
export function and<T, U>(guard1: TypeGuard<unknown, T>, guard2: TypeGuard<T, U>): TypeGuard<unknown, U> {
  return (value: unknown): value is U => guard1(value) && guard2(value)
}

/**
 * 型ガードの否定
 */
export function not<T>(guard: TypeGuard<unknown, T>): TypeGuard<unknown, Exclude<unknown, T>> {
  return (value: unknown): value is Exclude<unknown, T> => !guard(value)
}
