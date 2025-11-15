<img alt="date-fns" title="date-fns" src="https://raw.githubusercontent.com/date-fns/date-fns/master/docs/logotype.svg" width="150">

date-fns-jp は、date-fns に和暦のサポートを追加したものです。
date-fns はブラウザと Node.js で JavaScript の日付を操作するための、最も包括的でありながらシンプルで一貫性のあるツールセットを提供します。

👉 [date-fns ドキュメント](https://date-fns.org/)

👉 [date-fns ブログ](https://blog.date-fns.org/)

---

date-fns は日付版の [Lodash](https://lodash.com) のようなものです。

  - [あらゆる目的に対応する **200以上の関数**](https://date-fns.org/docs/Getting-Started/)があります。
  - **モジュール式**: 必要なものだけを選べます。webpack、Browserify、または Rollup で動作し、ツリーシェイキングもサポートしています。
  - **ネイティブな日付**: 既存のネイティブ型を使用します。安全のため、コアオブジェクトを拡張することはありません。
  - **不変性 & 純粋**: 純粋関数を使用して構築されており、常に新しい日付インスタンスを返します。
  - **TypeScript**: このライブラリは、真新しい手作りの型を備えた100% TypeScriptです。
  - **国際化 (I18n)**: 数十のロケール。必要なものだけを含めます。
  - [その他にも多くの利点があります](https://date-fns.org/)

<!-- end list -->

```js
import { compareAsc, format } from "date-fns";

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]
```

## 🇯🇵 日本の元号 (和暦) サポート

`format` および `parse` 関数で日本の元号（和暦）を扱うための新しい書式トークンを追加しました。ロケールに `ja` を使用することで、和暦のフォーマットとパースが可能です。

### 新しい元号トークン

| トークン | 説明 | 出力例 (令和5年) |
| :--- | :--- | :--- |
| **`NNNN`** | 元号の**正式名称** (例: 令和) | `令和` |
| **`NNN`** | 元号の**漢字略称** (例: 令) | `令` |
| **`NN`** | 元号の**英字略称** (例: R) | `R` |
| **`N`** | 元号の**数字番号** (例: 5) | `5` |
| **`nn`** | 和暦年 (**ゼロパディング**、例: 05) | `05` |
| **`n`** | 和暦年 (**パディングなし**、例: 5) | `5` |
| **`no`** | 和暦年 (**元年**表記) | `元年` |

### コード例（和暦）

```js
import { format, parse } from "date-fns";
import ja from "date-fns/locale/ja";

const date = new Date(2023, 5, 15); // 2023年6月15日 (令和5年)
const dateGannen = new Date(2019, 0, 1); // 2019年1月1日 (令和元年)

// フォーマットの例
// 令和5年6月15日
format(date, "NNNNn年M月d日", { locale: ja });
//=> '令和5年6月15日'

// R5年6月15日
format(date, "NNn年M月d日", { locale: ja });
//=> 'R5年6月15日'

// 令和元年1月1日
format(dateGannen, "NNNNno年M月d日", { locale: ja });
//=> '令和元年1月1日'


// パースの例
const referenceDate = new Date(); 

// "令和5年6月15日" をパース
parse("令和5年6月15日", "NNNNn年M月d日", referenceDate, { locale: ja });
//=> Date object for 2023/06/15

// "R050615" (元号英字略称2桁 + 和暦年2桁 + 月2桁 + 日2桁) をパース
parse("R050615", "NNnnMMdd", referenceDate, { locale: ja });
//=> Date object for 2023/06/15
```

## ドキュメント

date-fns の詳細、API、その他のドキュメントについては、[date-fns.org をご覧ください](https://date-fns.org/)。

<br>

## ライセンス

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)