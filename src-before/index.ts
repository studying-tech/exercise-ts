// メインエントリーポイント
// 【課題82】すべてのモジュールをエクスポートしてください
// 要件:
// - types、array-utils、chainable、pipeline、type-guards、performanceから
// - 名前付きエクスポートですべて再エクスポート

/* ここに実装 - export * from './...' の形式で */

// 【課題83】よく使う関数を個別にエクスポートしてください
// 要件:
// - map、filter、reduce、groupBy、unique、chain関数を
// - 名前付きエクスポートで個別に再エクスポート

/* ここに実装 - export { ... } from './...' の形式で */

// 【課題84】デフォルトエクスポートオブジェクトを作成してください
// 要件:
// - arrayUtils、chainable、pipeline、typeGuards、performanceをプロパティとして持つ
// - 各モジュールのすべての関数を含む

import * as arrayUtils from './array-utils'
import * as chainable from './chainable'
import * as performance from './performance'
import * as pipeline from './pipeline'
import * as typeGuards from './type-guards'

const ArrayUtilsLib = {
  /* ここに実装 */
}

export default ArrayUtilsLib
