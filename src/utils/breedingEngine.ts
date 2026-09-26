import masterDataRaw from '../data/masterData.json';

export interface RawStallion {
  ID: number;
  STALLION_ID?: number;
  SERIES?: string;
  NAME: string;
  PRICE: number;
  COLOR?: string;
  SYSTEM_BIG?: string;
  SYSTEM_LITTELE?: string;
  SYSTEM_LITTLE?: string;
  MIN?: number;
  MAX?: number;
  GROWN?: string;
  DIRT?: string;
  KENKO?: string;
  KISYO?: string;
  JISSEKI?: string;
  KONJO?: string;
  ANTEI?: string;
  OMOSHIRO: string;
  MIGOTO: string;
  TERM?: string;
  TYPE?: number;
  ANCESTOR: string[];
}

export interface RawBroodmare {
  ID: number;
  NAME: string;
  PRICE: number;
  SPEED: number;
  STAMINA: number;
  POWER: number;
  DIRT: string;
  KENKO: string;
  KISYO: string;
  SYSTEM_BIG?: string;
  SYSTEM_LITTELE?: string;
  OMOSHIRO: string;
  MIGOTO: string;
  TYPE?: number;
  COMMENT?: string;
  COLOR?: string;
  ANCESTOR: string[];
}

export interface RawAncestor {
  NAME: string;
  SEX: number;
  CROSS: (number | string)[];
}

export interface RawKotta {
  ID?: number;
  FATHER: string;
  MOTHER: string;
}

export interface RawNix {
  FATHER: string;
  MOTHER: string;
  NIX: number;
}

export interface MasterData {
  stallion: RawStallion[];
  broodmare: RawBroodmare[];
  ancestor: RawAncestor[];
  kotta: RawKotta[];
  nix: RawNix[];
}

export const masterData: MasterData = masterDataRaw as unknown as MasterData;

export interface CrossInfo {
  name: string;
  generations: number[];
  independentPairs: number;
  mare: boolean;
  effects: string[];
}

export interface MatingResult {
  omoshiro: boolean;
  migoto: boolean;
  perfect: boolean;
  kotta: boolean;
  nicks: number;
  inbreed: boolean;
  outbreed: boolean;
  dangerous: boolean;
  dangerReasons: string[];
  crosses: CrossInfo[];
  inbreedList: string[];
  nitroValues: {
    speed: number;
    stamina: number;
    power: number;
  };
  kottaPairs: { father: string; mother: string }[];
  score: number; // 総合配合評価スコア（ソート用）
}

const LABELS = ['短距離', '速力', 'パワー', '底力', '長距離', 'ダート', '丈夫さ', '早熟型', '晩成型', '堅実さ', '気性難'];

function maskOf(chars: string | undefined): number | null {
  if (typeof chars !== 'string' || !/^[a-o]{4}$/.test(chars)) return null;
  let mask = 0;
  for (let i = 0; i < 4; i++) mask |= 1 << (chars.charCodeAt(i) - 97);
  return mask;
}

function bitCount(mask: number): number {
  let count = 0;
  for (; mask; mask &= mask - 1) count++;
  return count;
}

const generation = (node: number) => 32 - Math.clz32(node);

function inheritedPair(a: number, b: number, left: string[], right: string[]): boolean {
  while (a > 1 && b > 1 && (a & 1) === (b & 1)) {
    a >>= 1;
    b >>= 1;
    if (left[a] && left[a] === right[b]) return true;
  }
  return false;
}

// エンジンクラス
export class BreedingEngine {
  private ancestors = new Map<string, { sex: number | null; effects: string[]; speed: number; stamina: number; power: number }>();
  private kottaPairs = new Map<string, Set<string>>();
  private nicksMap = new Map<string, Map<string, number>>();

  constructor() {
    // 祖先データ
    for (const row of masterData.ancestor || []) {
      const name = row.NAME ? row.NAME.trim() : '';
      if (!name) continue;
      const flags = row.CROSS.map(v => v === 1 || v === '1');
      this.ancestors.set(name, {
        sex: row.SEX === 1 || row.SEX === 0 ? row.SEX : null,
        effects: LABELS.filter((_, i) => flags[i]),
        speed: 2 * Number(flags[0]) + Number(flags[1]),
        stamina: Number(flags[4]) + Number(flags[3]) - Number(flags[0]),
        power: Number(flags[2])
      });
    }

    // 凝った配合データ
    for (const row of masterData.kotta || []) {
      const a = row.FATHER?.trim();
      const b = row.MOTHER?.trim();
      if (!a || !b || a === b) continue;
      if (!this.kottaPairs.has(a)) this.kottaPairs.set(a, new Set());
      this.kottaPairs.get(a)!.add(b);
      if (!this.kottaPairs.has(b)) this.kottaPairs.set(b, new Set());
      this.kottaPairs.get(b)!.add(a);
    }

    // ニックスデータ
    for (const row of masterData.nix || []) {
      const a = row.FATHER?.trim();
      const b = row.MOTHER?.trim();
      if (!a || !b) continue;
      if (!this.nicksMap.has(a)) this.nicksMap.set(a, new Map());
      this.nicksMap.get(a)!.set(b, Number(row.NIX) || 0);
    }
  }

  private profile(horse: { NAME: string; ANCESTOR: string[]; OMOSHIRO: string; MIGOTO: string; SYSTEM_LITTELE?: string; SYSTEM_LITTLE?: string }) {
    const nodes = ['', horse.NAME.trim(), ...horse.ANCESTOR.map(a => a ? a.trim() : '')];
    const occurrences = new Map<string, number[]>();
    const nitroNames = new Set<string>();
    const kottaNames = new Set<string>();

    for (let node = 1; node < 32; node++) {
      const name = nodes[node];
      if (!name) continue;
      if (!occurrences.has(name)) occurrences.set(name, []);
      occurrences.get(name)!.push(node);
      const gen = generation(node);
      if (gen <= 5) nitroNames.add(name);
      if (gen <= 4) kottaNames.add(name);
    }

    let speed = 0, stamina = 0, power = 0;
    for (const name of nitroNames) {
      const info = this.ancestors.get(name);
      if (info) {
        speed += info.speed;
        stamina += info.stamina;
        power += info.power;
      }
    }

    return {
      nodes,
      occurrences,
      nitroNames,
      kottaNames,
      speed,
      stamina,
      power,
      omoshiro: maskOf(horse.OMOSHIRO),
      migoto: maskOf(horse.MIGOTO),
      omoshiroKey: maskOf(horse.OMOSHIRO) === null ? null : [...horse.OMOSHIRO].sort().join(''),
      migotoKey: maskOf(horse.MIGOTO) === null ? null : [...horse.MIGOTO].sort().join(''),
      small: (horse.SYSTEM_LITTLE ?? horse.SYSTEM_LITTELE ?? '').trim()
    };
  }

  public evaluate(stallion: RawStallion, broodmare: RawBroodmare): MatingResult {
    const left = this.profile(stallion);
    const right = this.profile(broodmare);

    // 面白配合判定
    const systemsKnown = left.omoshiro !== null && right.omoshiro !== null;
    const systemCount = systemsKnown ? bitCount(left.omoshiro! | right.omoshiro!) : null;
    const omoshiro = systemsKnown && systemCount !== null && systemCount >= 7;

    // 見事配合判定
    const migotoKnown = left.migoto !== null && right.omoshiro !== null;
    const migoto = migotoKnown && left.migoto === right.omoshiro;

    const perfect = omoshiro && migoto;

    // インブリード & 危険な配合
    const crosses: CrossInfo[] = [];
    const dangerReasons = new Set<string>();

    for (const [name, fatherNodes] of left.occurrences) {
      const motherNodes = right.occurrences.get(name);
      if (!motherNodes) continue;

      const father = new Set<number>();
      const mother = new Set<number>();
      let independentPairs = 0;

      for (const a of fatherNodes) {
        for (const b of motherNodes) {
          const ga = generation(a), gb = generation(b);
          if (ga === 1 || gb === 1) dangerReasons.add('1×N (近親交配)');
          if (ga === 2 && gb === 2) dangerReasons.add('2×2 (危険血量)');
          if (!inheritedPair(a, b, left.nodes, right.nodes)) {
            father.add(a);
            mother.add(b);
            independentPairs++;
          }
        }
      }

      if (!independentPairs) continue;

      const info = this.ancestors.get(name);
      const fatherGens = [...father].map(generation).sort((x, y) => x - y);
      const motherGens = [...mother].map(generation).sort((x, y) => x - y);
      const generations = [...fatherGens, ...motherGens].sort((x, y) => x - y);

      crosses.push({
        name,
        generations,
        independentPairs,
        mare: info?.sex === 1,
        effects: info?.effects || []
      });
    }

    if (crosses.length >= 7) dangerReasons.add('クロス過多（7本以上）');
    const dangerous = dangerReasons.size > 0;
    const inbreed = crosses.length > 0;
    const outbreed = !inbreed;

    // 凝った配合
    const matchedKottaPairs: { father: string; mother: string }[] = [];
    for (const a of left.kottaNames) {
      const partners = this.kottaPairs.get(a);
      if (partners) {
        for (const b of right.kottaNames) {
          if (partners.has(b)) {
            matchedKottaPairs.push({ father: a, mother: b });
          }
        }
      }
    }
    const kotta = !dangerous && matchedKottaPairs.length > 0;

    // ニックス
    let nicks = 0;
    if (left.small && right.small) {
      nicks = this.nicksMap.get(left.small)?.get(right.small) ?? 0;
    }

    // ニトロ指数
    let speed = left.speed + right.speed;
    let stamina = left.stamina + right.stamina;
    let power = left.power + right.power;

    for (const name of left.nitroNames) {
      if (right.nitroNames.has(name)) {
        const info = this.ancestors.get(name);
        if (info) {
          speed -= info.speed;
          stamina -= info.stamina;
          power -= info.power;
        }
      }
    }

    // 総合スコア計算（おすすめソート用）
    let score = 0;
    if (dangerous) score -= 1000;
    if (perfect) score += 500;
    else {
      if (migoto) score += 250;
      if (omoshiro) score += 150;
    }
    if (kotta) score += 300;
    score += nicks * 80;

    // 奇跡の血量（3×4）ボーナス
    for (const c of crosses) {
      if (c.generations.length === 2 && c.generations[0] === 3 && c.generations[1] === 4) {
        score += 180;
      } else if (c.generations.length === 2 && c.generations[0] === 4 && c.generations[1] === 4) {
        score += 80;
      }
    }
    if (outbreed) score += 100;
    score += speed * 5 + stamina * 4 + power * 3;

    return {
      omoshiro,
      migoto,
      perfect,
      kotta,
      nicks,
      inbreed,
      outbreed,
      dangerous,
      dangerReasons: [...dangerReasons],
      crosses,
      inbreedList: crosses.map(c => `${c.name} ${c.generations.join('×')}`),
      nitroValues: { speed, stamina, power },
      kottaPairs: matchedKottaPairs,
      score
    };
  }
}

export const defaultEngine = new BreedingEngine();
