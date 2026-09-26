// 攻略データの型定義

export type TabType =
  | 'mating'      // 配合シミュレータ（新機能！）
  | 'breeding'    // 配合理論解説
  | 'stallions'   // 種牡馬DB
  | 'training'    // 調教・体重・汎用メニュー
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
  fee: string;
  distance: string;
  growth: '早熟' | '普通' | '晩成' | '持続';
  dirt: '◎' | '◯' | '△' | '✕';
  temper: 'A' | 'B' | 'C';
  performance: 'A' | 'B' | 'C';
  resilience: 'A' | 'B' | 'C';
  stamina: 'A' | 'B' | 'C';
  stability: 'A' | 'B' | 'C';
  lineage: string;
  damSireLine: string;
  bestMatch: string;
  comment: string;
}

// 調教メニュー
export interface TrainingCourse {
  id: string;
  name: string;
  intensity: '馬なり' | '強め' | '一杯' | '強め / 馬なり';
  effects: {
    speed: number;
    stamina: number;
    power: number;
    guts: number;
    fatigue: number;
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
  stage: '序盤（1〜3年目）' | '中盤（4〜10年目）' | '終盤（牧場完成後）' | '馬券術' | 'セリ市裏技' | '初期設定（モード選択）' | 'ミッション活用術' | '実機馬券術＆小ネタ' | '中盤以降の経営術';
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
  finishStrength: '特A' | 'A' | 'B';
  temperControl: '特A' | 'A' | 'B';
  startSkill: '特A' | 'A' | 'B';
  bigRaceBonus: boolean;
  description: string;
  advice: string;
}

// レース作戦・前壁対策
export interface RaceTacticInfo {
  tactic: '大逃げ' | '逃げ' | '先行' | '差し' | '追込';
  pros: string[];
  cons: string[];
  antiTrafficTip: string;
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
  course: string;
  racecourse: string;
  season: '2歳春' | '2歳秋' | '3歳春' | '3歳秋' | '4歳上春' | '4歳上秋' | '通年';
  category: 'クラシック' | '古馬王道' | '短距離・マイル' | '牝馬限定' | 'ダート' | '2歳G1' | '障害' | '海外遠征';
}

export interface SpecialTitle {
  id: string;
  title: string;
  races: string[];
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
