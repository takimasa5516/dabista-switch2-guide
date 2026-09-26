import { Stallion } from '../types';

export interface SpecialStallionFeature {
  title: string;
  summary: string;
  details: string[];
}

export const switch2StallionFeatures: SpecialStallionFeature[] = [
  {
    title: '自家製種牡馬に「因子」が付与される超革新システム！',
    summary: '引退して種牡馬入りした自家生産馬に、実績や適性に応じて因子が1〜2個新規付与されます。',
    details: [
      'G1勝利実績やスピード・スタミナ・パワー・底力などの能力値に基づき、対応する因子（速、底、早、丈、長など）が付与される。',
      '自身や血統表に存在しなかった因子が新たに獲得できるケースも確認されており、タスク・ミッションも同時に達成される。',
      '自家製種牡馬に因子が付くことで、次世代・次々世代の配合で「強力な自家製クロス（インブリード）」を自ら創出可能に！'
    ]
  },
  {
    title: 'おすそわけ通信特典：伝説の名馬「マチカネイワシミズ」',
    summary: 'ダビスタIIIで一世を風靡した伝説の種牡馬マチカネイワシミズがおすそわけ通信で限定入手可能！',
    details: [
      '他プレイヤーとおすそわけ通信を行うことで牧場の種牡馬リストに加入。',
      'レトロダビスタファン垂涎のボーナス要素であり、序盤の安価な種付けや特定クロス狙いにも活用可能。'
    ]
  },
  {
    title: '【実機仕様】「イクイノックス」「ドウデュース」は最強ライバル競走馬！',
    summary: 'イクイノックス・ドウデュースは種牡馬としては未収録（全237頭マスタに含まれず）、天皇賞(秋)やジャパンC等で立ちはだかる最強ライバルとして登場します。',
    details: [
      'イクイノックスやドウデュース、フォーエバーヤング、ジャンタルマンタル等は現役最強ライバル馬として参戦。',
      'なお、繁殖牝馬ダストアンドダイヤモンズにハーツクライを配合することで「ドウデュース再現配合」を楽しむことが可能！'
    ]
  }
];

export const stallions: Stallion[] = [
  {
    id: 'kitasan',
    name: 'キタサンブラック',
    generation: '最新・Switch2',
    fee: '2,500',
    distance: '1800m-2600m',
    growth: '普通',
    dirt: '△',
    temper: 'A',
    performance: 'A',
    resilience: 'B',
    stamina: 'A',
    stability: 'C',
    lineage: 'サンデーサイレンス系（父ブラックタイド）',
    damSireLine: 'サクラバクシンオー（プリンスリーギフト系）',
    bestMatch: '短距離スピード牝馬、ノーザンダンサー系、トニービン内包牝馬',
    comment: 'Switch2版最高クラスの種付け料2,500万円。実績A・気性A・健康A。安定Cにより爆発力が高く、大物芝中長距離馬を輩出。'
  },
  {
    id: 'kizuna',
    name: 'キズナ',
    generation: '最新・Switch2',
    fee: '2,000',
    distance: '1600m-2400m',
    growth: '持続',
    dirt: '◯',
    temper: 'A',
    performance: 'A',
    resilience: 'B',
    stamina: 'A',
    stability: 'A',
    lineage: 'サンデーサイレンス系（父ディープインパクト）',
    damSireLine: 'Storm Cat（ストームキャット系）',
    bestMatch: 'ダート適性牝馬、ミスプロ系牝馬、ロベルト系牝馬',
    comment: '実績A・安定A・気性A・健康Aの超万能種牡馬。芝・ダートを問わず勝ち上がり率が極めて高く、クラシック直撃の王道。'
  },
  {
    id: 'contrail',
    name: 'コントレイル',
    generation: '最新・Switch2',
    fee: '1,800',
    distance: '1600m-2400m',
    growth: '普通',
    dirt: '△',
    temper: 'B',
    performance: 'B',
    resilience: 'B',
    stamina: 'B',
    stability: 'A',
    lineage: 'サンデーサイレンス系（父ディープインパクト）',
    damSireLine: 'Unbridled\'s Song（ファピアノ系）',
    bestMatch: 'ストームキャット系、キングカメハメハ系、ロベルト系牝馬',
    comment: '無敗の三冠馬。安定Aで堅実に良駒を出し、ディープインパクトの切れ味とスピードを忠実に受け継ぐクラシックディスタンスの主役。'
  },
  {
    id: 'epiphaneia',
    name: 'エピファネイア',
    generation: '現代主要',
    fee: '1,500',
    distance: '1800m-2600m',
    growth: '持続',
    dirt: '◯',
    temper: 'C',
    performance: 'A',
    resilience: 'A',
    stamina: 'A',
    stability: 'B',
    lineage: 'ロベルト系（父シンボリクリスエス）',
    damSireLine: 'スペシャルウィーク（サンデーサイレンス系）',
    bestMatch: 'キングカメハメハ系、ディープインパクト系牝馬（サンデー4×3奇跡の血量）',
    comment: '実績A・根性A。サンデーサイレンス4×3の奇跡の血量を狙いやすく、牝馬三冠・クラシック完全制覇級の大物を狙える。'
  },
  {
    id: 'suave-richard',
    name: 'スワーヴリチャード',
    generation: '最新・Switch2',
    fee: '1,200',
    distance: '1600m-2400m',
    growth: '持続',
    dirt: '△',
    temper: 'B',
    performance: 'A',
    resilience: 'A',
    stamina: 'A',
    stability: 'A',
    lineage: 'サンデーサイレンス系（父ハーツクライ）',
    damSireLine: 'Unbridled\'s Song（ファピアノ系）',
    bestMatch: 'ノーザンダンサー系、ミスプロ系牝馬',
    comment: '実績A・根性A・安定A。産駒の仕上がりが早く、2歳G1から日本ダービーまで幅広いクラシック戦線で主役を演じられる。'
  },
  {
    id: 'lord-kanaloa',
    name: 'ロードカナロア',
    generation: '現代主要',
    fee: '1,200',
    distance: '1200m-1800m',
    growth: '持続',
    dirt: '◯',
    temper: 'A',
    performance: 'A',
    resilience: 'A',
    stamina: 'B',
    stability: 'A',
    lineage: 'ミスタープロスペクター系（父キングカメハメハ）',
    damSireLine: 'Storm Cat（ストームキャット系）',
    bestMatch: 'サンデーサイレンス系（ディープ、ハーツ、ステイゴールド牝馬）',
    comment: '実績A・根性A・気性A・安定Aの屈指の名種牡馬。「凝った配合」のキーマンであり、短距離〜マイルのスピードモンスターを量産。'
  },
  {
    id: 'duramente',
    name: 'ドゥラメンテ',
    generation: '現代主要',
    fee: '1,000',
    distance: '1800m-2600m',
    growth: '持続',
    dirt: '◯',
    temper: 'C',
    performance: 'A',
    resilience: 'A',
    stamina: 'A',
    stability: 'B',
    lineage: 'ミスタープロスペクター系（父キングカメハメハ）',
    damSireLine: 'サンデーサイレンス（アドマイヤグルーヴ）',
    bestMatch: 'ノーザンダンサー系牝馬、ロベルト系牝馬',
    comment: '実績A・根性A。ダイナカール・エアグルーヴ・アドマイヤグルーヴという日本屈指の名牝系の血が爆発力を生む。'
  },
  {
    id: 'saturnalia',
    name: 'サートゥルナーリア',
    generation: '最新・Switch2',
    fee: '1,000',
    distance: '1400m-2000m',
    growth: '持続',
    dirt: '△',
    temper: 'B',
    performance: 'A',
    resilience: 'B',
    stamina: 'B',
    stability: 'A',
    lineage: 'ミスタープロスペクター系（父ロードカナロア）',
    damSireLine: 'スペシャルウィーク（母シーザリオ）',
    bestMatch: 'サンデーサイレンス4×3、ノーザンダンサー系牝馬',
    comment: 'ロードカナロア×シーザリオの超良血。実績A・安定Aでスピード値が高く、マイル〜中距離で卓越した瞬発力を発揮。'
  },
  {
    id: 'drefong',
    name: 'ドレフォン',
    generation: '最新・Switch2',
    fee: '800',
    distance: '1400m-2000m',
    growth: '早熟',
    dirt: '◎',
    temper: 'B',
    performance: 'B',
    resilience: 'B',
    stamina: 'B',
    stability: 'A',
    lineage: 'ストームキャット系（父Gio Ponti）',
    damSireLine: 'Ghostzapper（デピュティミニスター系）',
    bestMatch: 'サンデーサイレンス系牝馬、ディープインパクト牝馬',
    comment: 'ダート適性◎、早熟性、安定A。芝の皐月賞馬ジオグリフからダート短距離王まで出せる万能コスパ種牡馬。地方重賞でも無類の強さ。'
  },
  {
    id: 'nadal',
    name: 'ナダル',
    generation: '最新・Switch2',
    fee: '800',
    distance: '1400m-2000m',
    growth: '持続',
    dirt: '◎',
    temper: 'B',
    performance: 'B',
    resilience: 'B',
    stamina: 'B',
    stability: 'A',
    lineage: 'ロベルト系（父Blame）',
    damSireLine: 'Pulpit（エーピーインディ系）',
    bestMatch: 'サンデー系牝馬、キングカメハメハ系牝馬',
    comment: 'ダート適性◎、持続、安定A。強靭な骨量とパワーを遺伝し、今作追加された地方競馬・ダート3冠路線で大暴れする。'
  },
  {
    id: 'maurice',
    name: 'モーリス',
    generation: '現代主要',
    fee: '600',
    distance: '1400m-2200m',
    growth: '普通',
    dirt: '◯',
    temper: 'B',
    performance: 'B',
    resilience: 'A',
    stamina: 'B',
    stability: 'C',
    lineage: 'ロベルト系（父スクリーンヒーロー）',
    damSireLine: 'カーネギー（サドラーズウェルズ系）',
    bestMatch: 'サンデーサイレンス系牝馬、ディープインパクト系牝馬',
    comment: '根性A・安定Cの一発型種牡馬。サンデー牝馬との相性が抜群で、ハマれば香港国際競走やマイルG1を連覇する怪物を輩出。'
  },
  {
    id: 'deep-impact',
    name: 'ディープインパクト',
    generation: 'レジェンド',
    fee: '4,000',
    distance: '1800m-3000m',
    growth: '持続',
    dirt: '△',
    temper: 'B',
    performance: 'A',
    resilience: 'A',
    stamina: 'A',
    stability: 'A',
    lineage: 'サンデーサイレンス系',
    damSireLine: 'Alzao（リファール系）',
    bestMatch: 'ストームキャット系、フレンチデピュティ系、キングカメハメハ系',
    comment: 'ゲーム内最高額の種付け料4,000万円。実績A・根性A・安定A。驚異的な瞬発力とスタミナで三冠馬を生み出す絶対的最高峰。'
  }
];
