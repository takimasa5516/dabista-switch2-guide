import { Jockey, RaceTacticInfo, PaddockSign, RaceRoute, OverseasRace } from '../types';

export const jockeys: Jockey[] = [
  {
    id: 'lemaire',
    name: 'Ｃ．ルメール',
    type: 'トップ',
    rank: 'S',
    preferredTactic: '先行',
    finishStrength: '特A',
    temperControl: '特A',
    startSkill: 'A',
    bigRaceBonus: true,
    description: '現役最強ジョッキー。抜群のポジショニングセンスと直線の鋭い追いで、勝率・G1勝利数ともに圧倒的No.1。',
    advice: 'G1の勝負レースでは最優先で確保したい。先行〜差しの指示で最も能力を発揮する。'
  },
  {
    id: 'take-yutaka',
    name: '武 豊',
    type: 'レジェンド',
    rank: 'S',
    preferredTactic: '逃げ',
    finishStrength: 'A',
    temperControl: '特A',
    startSkill: '特A',
    bigRaceBonus: true,
    description: '日本競馬の生ける伝説。神がかり的な体内時計（ペース配分）とスタートの上手さ。気性難の馬を落ち着かせる技術は世界最高峰。',
    advice: '逃げ馬や気性が荒い馬に乗せると劇的に安定する。大舞台での一発逆転騎乗も魅力。'
  },
  {
    id: 'kawada',
    name: '川田 将雅',
    type: 'トップ',
    rank: 'S',
    preferredTactic: '先行',
    finishStrength: '特A',
    temperControl: 'A',
    startSkill: '特A',
    bigRaceBonus: true,
    description: '剛腕のトップジョッキー。スタートダッシュで好位を取り、直線で馬の闘争心・勝負根性を限界まで引き出す。',
    advice: '勝負根性が高い馬に乗せると競り合いで絶対に負けない。「先行」指示が最もフィットする。'
  },
  {
    id: 'demuro',
    name: 'Ｍ．デムーロ',
    type: 'ベテラン',
    rank: 'A',
    preferredTactic: '差し',
    finishStrength: '特A',
    temperControl: 'B',
    startSkill: 'B',
    bigRaceBonus: true,
    description: 'ド派手な大外一気と勝負強さが持ち味。出遅れ癖はあるものの、直線の追いの迫力と爆発力は屈指。',
    advice: 'ズブい（反応が鈍い）馬やスタミナ型中長距離馬を「差し・追込」で勝たせたい時に最適。'
  },
  {
    id: 'lane',
    name: 'Ｄ．レーン / 外国人短期免許',
    type: '短期免許',
    rank: 'S',
    preferredTactic: '自在',
    finishStrength: '特A',
    temperControl: '特A',
    startSkill: '特A',
    bigRaceBonus: true,
    description: '春・秋のG1シーズンに来日する外国人騎手。すべての技術がワールドクラスで、騎乗馬の能力を120%引き出す。',
    advice: '来日期間中は他厩舎に取られる前に最優先で依頼しよう。乗り替わりでも即座に結果を出す。'
  },
  {
    id: 'yokoyama-t',
    name: '横山 武史',
    type: '若手・中堅',
    rank: 'A',
    preferredTactic: '先行',
    finishStrength: 'A',
    temperControl: 'A',
    startSkill: 'A',
    bigRaceBonus: true,
    description: '若手世代のエース。積極的なポジション取りと強気の競馬でクラシックG1を多数制覇。',
    advice: '若馬・早熟馬の2歳重賞〜クラシック戦線で主戦として長期間コンビを組ませるのがおすすめ。'
  }
];

export const raceTactics: RaceTacticInfo[] = [
  {
    tactic: '逃げ',
    pros: [
      '前が壁になる「進路塞がり（どん詰まり）」のリスクが完全にゼロ',
      'スローペースに持ち込むとスタミナ消費を抑えて逃げ切れる',
      'ダート戦や小回りコース（福島・小倉・函館）で圧倒的有利'
    ],
    cons: [
      '同型（他の逃げ馬）と競り合うとハイペースになり直線で大失速する',
      'スタミナと根性が低い馬は最後の直線でバテて馬群に沈む'
    ],
    antiTrafficTip: 'ダビスタSwitch特有の「前壁事故」を100%防げるため、スピード値が抜けている馬は迷わず「逃げ」を選択するのが最も勝率が高い。',
    recommendedFor: 'スピード自慢の馬、ゲート適性が高い馬、内枠（1〜3枠）を引いた時。'
  },
  {
    tactic: '先行',
    pros: [
      '勝率・連対率が最も安定する王道の作戦',
      '直線入口で好位（2〜4番手）から抜け出すため、展開の有利不利を受けにくい',
      '勝負根性が活きやすく、ゴール前の激しい競り合いに強い'
    ],
    cons: [
      '前の馬が垂れてきたときに進路を塞がれるケースが稀にある'
    ],
    antiTrafficTip: 'ルメール騎手や川田騎手などの位置取りが上手いトップ騎手を乗せることで、前壁リスクを最小限に抑えられる。',
    recommendedFor: '能力バランスが良い馬、クラシック王道戦線の本命馬。'
  },
  {
    tactic: '差し',
    pros: [
      '道中中団で脚を溜めるため、直線の末脚・瞬発力を最大限に発揮できる',
      'ハイペースになった時に前の馬が一斉に崩れてごっそり差し切れる',
      '東京・京都などの直線が長くて広い競馬場で真価を発揮'
    ],
    cons: [
      '多頭数（16〜18頭）のレースでは直線で前が壁になりやすい',
      'スローペースの前残り展開になると届かない'
    ],
    antiTrafficTip: '外枠（6〜8枠）を引いた場合は外に出しやすいため差しの勝率が上がる。内枠のときは先行か逃げへの切り替えも検討。',
    recommendedFor: '瞬発力・スピード値が高い馬、直線の長いコース（東京2400mなど）。'
  },
  {
    tactic: '追込',
    pros: [
      '道中は後方に死んだふり。スタミナ消費が最小限で済む',
      '直線で大外を一気に捲る大逆転の爽快感がある',
      '超ハイペース必至の重賞（スプリンターズSや安田記念等）で波乱を演出'
    ],
    cons: [
      '最も展開に左右される（スローペースではほぼ敗北確定）',
      'コーナーで大外を回る距離ロスが大きい'
    ],
    antiTrafficTip: '大外を回すため前壁事故自体は少ないが、届かないリスクが高い。デムーロ騎手など捲りが得意な騎手を起用すること。',
    recommendedFor: '気性難で馬群に入ると掛かる馬、圧倒的な瞬発力を持つ個性派ホース。'
  }
];

export const paddockSigns: PaddockSign[] = [
  {
    sign: '鶴首（首を美しく曲げて気合い乗る）',
    meaning: '闘志が最高潮に満ちており、気合いと落ち着きが完璧に調和している状態。',
    impact: '絶好調',
    countermeasure: '勝利のチャンス！自信を持ってレースに送り出そう。'
  },
  {
    sign: '二人引き（厩務員が2人で手綱を持つ）',
    meaning: 'テンションが高すぎて暴れ気味。イレ込み寸前のサイン。',
    impact: '危険',
    countermeasure: '騎手の「折り合い・宥め」能力に期待。パドック調教やブリンカー装着を次回検討。'
  },
  {
    sign: 'チャカつき・発汗（白く泡を吹いている）',
    meaning: '興奮・イレ込み状態。レース前にスタミナを消費してしまっている。',
    impact: '能力大幅ダウン',
    countermeasure: 'スタミナ消費が激しいため、作戦を「後方待機（差し・追込）」にして息を入れさせる。'
  },
  {
    sign: 'トボトボ歩く・気合が乗らない',
    meaning: '闘争心が不足しているか、連闘による慢性疲労が残っている。',
    impact: '平行線',
    countermeasure: '併せ馬調教で気合いを注入するか、レース後は即座に放牧に出す。'
  }
];

export const raceRoutes: RaceRoute[] = [
  {
    title: '牡馬クラシック三冠路線',
    targetHorse: '芝中長距離（1800m-2400m以上）の超エリート',
    springSchedule: ['3月: 弥生賞 or スプリングS（前哨戦）', '4月: 皐月賞（G1・中山2000m）', '5月: 日本ダービー（G1・東京2400m）'],
    autumnSchedule: ['9月: 神戸新聞杯（前哨戦）', '10月: 菊花賞（G1・京都3000m）', '12月: 有馬記念（G1・中山2500m）'],
    notes: '菊花賞はスタミナ値が65以上ないとバテる。スタミナが足りない場合は秋は天皇賞(秋)またはマイルCSへ転進。'
  },
  {
    title: '秋古馬三冠（秋天・JC・有馬）路線',
    targetHorse: '古馬の芝中長距離G1馬（普通〜晩成型）',
    springSchedule: ['3月: 金鯱賞 or 大阪杯（G1）', '5月: 天皇賞(春)（G1・3200m）', '6月: 宝塚記念（G1・阪神2200m）'],
    autumnSchedule: ['10月: 天皇賞(秋)（G1・東京2000m）', '11月: ジャパンカップ（G1・東京2400m）', '12月: 有馬記念（G1・中山2500m）'],
    notes: '同一年秋古馬三冠を達成すると、ゲーム内で莫大な特別ボーナス報奨金（数億円）が支給される！'
  },
  {
    title: '短距離・マイル春秋制覇路線',
    targetHorse: 'スピード特化型・1200m〜1600m適性馬',
    springSchedule: ['3月: 高松宮記念（G1・中京1200m）', '5月: ヴィクトリアM（牝馬）or マイラーズC', '6月: 安田記念（G1・東京1600m）'],
    autumnSchedule: ['9月: スプリンターズS（G1・中山1200m）', '10月: スワンS or 富士S', '11月: マイルCS（G1・京都1600m）'],
    notes: '短距離G1は展開の紛れが少ないため、スピード自慢の馬なら連勝街道を築きやすい。'
  },
  {
    title: '地方交流・ダート無双路線',
    targetHorse: 'ダート適性◎のパワーホース',
    springSchedule: ['2月: フェブラリーS（G1・東京1600m）', '4月: かきつばた記念（Jpn3）', '5月: かしわ記念（Jpn1・船橋1600m）', '6月: 帝王賞（Jpn1・大井2000m）'],
    autumnSchedule: ['10月: 白山大賞典（Jpn3）', '11月: JBCクラシック（Jpn1）', '12月: チャンピオンズC（G1）or 東京大賞典（G1）'],
    notes: '相手関係が中央G1より手薄で、年間を通して高額賞金を確実に荒稼ぎできる牧場のドル箱路線。'
  }
];

export const overseasRaces: OverseasRace[] = [
  {
    name: '凱旋門賞 (Prix de l\'Arc de Triomphe)',
    country: 'フランス（パリ・ロンシャン競馬場）',
    course: '芝2400m（右）',
    date: '10月第1週',
    conditions: [
      '日本ダービー、宝塚記念、天皇賞(春)などの国内主要G1を複数勝利していること',
      'スピード・スタミナともに最高水準（80以上）のスーパーホースであること',
      '打診イベントが8月頃に発生'
    ],
    requiredStats: 'スピードS、スタミナS、勝負根性A以上、タフな重馬場適性',
    strategy: '欧州特有の重い洋芝とロンシャンのフォルスストレート（偽りの直線）が壁。スタミナ切れを防ぐため「先行」または「差し」でじっくり脚を溜めよう。'
  },
  {
    name: 'ドバイワールドカップ',
    country: 'UAE（メイダン競馬場）',
    course: 'ダート2000m（左）',
    date: '3月下旬',
    conditions: [
      'チャンピオンズC、東京大賞典、フェブラリーSなどのダートG1を連覇級で勝利していること'
    ],
    requiredStats: 'ダート適性◎、パワーS、スタミナA、スピードA',
    strategy: 'アメリカのダート超特急たちと真っ向勝負。スタートで出遅れるとキックバック（砂被り）で失速するため、「逃げ」か「先行」で前につけること。'
  },
  {
    name: 'ブリーダーズカップ・クラシック (BCクラシック)',
    country: 'アメリカ（持ち回り競馬場）',
    course: 'ダート2000m（左）',
    date: '11月上旬',
    conditions: [
      '国内ダートG1完全制覇、またはドバイワールドカップ優勝'
    ],
    requiredStats: '世界最高峰のダートスピードと底力S',
    strategy: '世界で最も過酷なダート決戦。超ハイペースに耐えうるスタミナと根性が不可欠。'
  }
];
