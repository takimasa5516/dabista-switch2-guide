// 攻略データの型定義

export type TabType =
  | 'breeding'    // 配合理論
  | 'stallions'   // 種牡馬DB
  | 'training'    // 調教・体重
  | 'comments'    // コメント・診断
  | 'races'       // レース・作戦・騎手
  | 'money'       // 資金稼ぎ
  | 'trophy'      // G1制覇シート
  | 'myhorses';   // 愛馬カルテ

// 配合理論
export interface BreedingTheory {
  id: string;
  name: string;
  englishName: string;
  badge: '必須' | '最重要' | '基礎' | '上級' | '注意';
  difficulty: '★☆☆☆☆' | '★★☆☆☆' | '★★★☆☆' | '★★★★☆' | '★★★★★';
  summary: string;
  condition: string;
  effects: string[];
  tips: string[];
  examples?: {
    sire: string;
    damSire: string;
    desc: string;
  }[];
}

export interface InbreedingAncestor {
  name: string;
  effect: string;
  factor: string;
  recommendedPartner: string;
  notes: string;
}

// 種牡馬
export interface Stallion {
  id: string;
  name: string;
  generation: '最新・Switch2' | '現代主要' | 'レジェンド';
  fee: string; // 種付け料（万円）
  distance: string; // 距離適性 例: 1800m-2400m
  growth: '早熟' | '普通' | '晩成' | '持続';
  dirt: '◎' | '◯' | '△' | '✕';
  temper: 'A' | 'B' | 'C'; // 気性
  performance: 'A' | 'B' | 'C'; // 実績
  resilience: 'A' | 'B' | 'C'; // 底力
  stamina: 'A' | 'B' | 'C'; // 体質
  stability: 'A' | 'B' | 'C'; // 安定
  lineage: string; // 父系
  damSireLine: string; // 母父系
  bestMatch: string; // おすすめ配合・相性の良い牝馬系統
  comment: string; // 特徴・攻略ワンポイント
}

// 調教メニュー
export interface TrainingCourse {
  id: string;
  name: string;
  intensity: '馬なり' | '強め' | '一杯';
  effects: {
    speed: number;    // 1-5
    stamina: number;  // 1-5
    power: number;    // 1-5
    guts: number;     // 1-5
    fatigue: number;  // 1-5
    weightChange: string;
    risk: '極小' | '小' | '中' | '高';
  };
  summary: string;
  bestFor: string;
}

export interface GrowthType {
  type: string;
  debut: string;
  peak: string;
  retirement: string;
  strategy: string;
  keyComments: string[];
}

// 入厩前コメント
export interface PreStablingComment {
  id: string;
  category: 'スピード' | 'スタミナ' | '勝負根性' | '気性' | '体質' | '成長型' | '雰囲気・大物' | '父・母似';
  text: string;
  timing: string;
  condition: string;
  importance: 'S' | 'A' | 'B' | 'C';
  description: string;
  advice: string;
}

// 資金稼ぎ
export interface MoneyGuide {
  id: string;
  stage: '序盤（1〜3年目）' | '中盤（4〜10年目）' | '終盤（牧場完成後）' | '馬券術' | 'セリ市裏技';
  title: string;
  summary: string;
  steps: string[];
  recommendedSiresOrHorses?: string[];
  caution: string;
}

// 騎手データ
export interface Jockey {
  id: string;
  name: string;
  type: 'レジェンド' | 'トップ' | 'ベテラン' | '若手・中堅' | '短期免許';
  rank: 'S' | 'A' | 'B';
  preferredTactic: '逃げ' | '先行' | '差し' | '追込' | '自在';
  finishStrength: '特A' | 'A' | 'B'; // 直線の追い
  temperControl: '特A' | 'A' | 'B'; // 折り合い・気性宥め
  startSkill: '特A' | 'A' | 'B'; // ゲート・出遅れ回避
  bigRaceBonus: boolean; // G1勝負強さ
  description: string;
  advice: string;
}

// レース作戦・前壁対策
export interface RaceTacticInfo {
  tactic: '逃げ' | '先行' | '差し' | '追込';
  pros: string[];
  cons: string[];
  antiTrafficTip: string; // 前壁・不利回避の秘訣
  recommendedFor: string;
}

// パドック気配
export interface PaddockSign {
  sign: string;
  meaning: string;
  impact: '絶好調' | '好調' | '平行線' | '危険' | '能力大幅ダウン';
  countermeasure: string;
}

// 王道ローテーション
export interface RaceRoute {
  title: string;
  targetHorse: string;
  springSchedule: string[];
  autumnSchedule: string[];
  notes: string;
}

// 海外遠征
export interface OverseasRace {
  name: string;
  country: string;
  course: string;
  date: string;
  conditions: string[];
  requiredStats: string;
  strategy: string;
}

// G1トロフィー
export interface TrophyRace {
  id: string;
  name: string;
  grade: 'G1' | 'Jpn1' | '海外G1';
  course: string; // 例: 芝2400m
  racecourse: string; // 例: 東京競馬場
  season: '2歳春' | '2歳秋' | '3歳春' | '3歳秋' | '4歳上春' | '4歳上秋' | '通年';
  category: 'クラシック' | '古馬王道' | '短距離・マイル' | '牝馬限定' | 'ダート' | '2歳G1' | '障害' | '海外遠征';
}

export interface SpecialTitle {
  id: string;
  title: string;
  races: string[]; // 必要なレースID
  reward: string;
  description: string;
}

// 愛馬カルテ
export interface MyHorse {
  id: string;
  name: string;
  sex: '牡' | '牝' | 'セン';
  sire: string;
  dam: string;
  bestWeight?: number;
  growthType: string;
  comments: string[];
  targetRace: string;
  memo: string;
  createdAt: number;
}
