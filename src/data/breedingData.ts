import { BreedingTheory, InbreedingAncestor, BreedingTheoryPriority, RecommendedBreedingRecipe, RecommendedBroodmare } from '../types';

export const breedingTheories: BreedingTheory[] = [
  {
    id: 'kottamatch',
    name: '凝った配合',
    englishName: 'Elaborate Cross',
    badge: '最重要',
    difficulty: '★★☆☆☆',
    summary: 'Switch版で最も強力かつ作りやすい超重要理論！底力とスタミナ、スピードを大幅に底上げ。',
    condition: '父の祖先（父父・父母など）と母の祖先（母父・母母など）の血統表内に、特定の共通祖先が複数存在することで成立。',
    effects: [
      '底力（根性・勝負強さ）が飛躍的にアップし、競り合いで驚異的な粘りを見せる',
      'スタミナとスピードの基礎値に強力なプラス補正',
      'インブリードと併用することで、デメリットを緩和しつつ爆発的な能力を引き出せる',
      '他の配合理論（面白配合・見事配合・アウトブリード）と同時に複合成立可能'
    ],
    tips: [
      '序盤から狙いやすく、初期牝馬に特定の安価種牡馬を付けるだけで成立することが多い',
      '代重ね（牝系づくり）において「凝った配合」を連続して繋ぐ配合ラインが現在の主流',
      'インブリード（奇跡の血量）と凝った配合が合わさると、クラシック〜古馬G1完全制覇級が狙える'
    ],
    examples: [
      {
        sire: 'ロードカナロア',
        damSire: 'ディープインパクト',
        desc: 'Storm CatクロスやMr. Prospectorクロスなどと複合しやすく、超スピード血統に！'
      },
      {
        sire: 'ヘニーヒューズ',
        damSire: 'クロフネ / シンボリクリスエス',
        desc: 'ダート短距離〜中距離で破格の勝ち上がり率を誇る鉄板配合'
      }
    ]
  },
  {
    id: 'kotta-loop',
    name: '凝った配合ループ (最強代重ね技術)',
    englishName: 'Kotta Match Rotation Loop',
    badge: '最重要',
    difficulty: '★★★★☆',
    summary: 'Switch2版の最先端トレンド！世代をまたいで毎世代「凝った配合」が永続ループする循環配合術。',
    condition: '種牡馬A→種牡馬B→種牡馬Cの血統特性を計算し、母馬が代を重ねても凝った配合の成立条件ペアが途切れないようローテーション投入する。',
    effects: [
      '初代から2代目、3代目、4代目とすべての世代で「凝った配合」の能力底上げ効果が永続発動',
      '自家製繁殖牝馬のスピード・スタミナ限界値が代を追うごとに右肩上がりでインフレ',
      '奇跡の血量（3×4）やニックスをループ内に組み込むことで、BC（ブリーダーズカップ）優勝級の怪物が量産可能'
    ],
    tips: [
      'ストームキャット系（ラヴズオンリーミー等）やボールドルーラー系（ディヴィナプレシオーサ等）を起点にするとループを組みやすい',
      'サドラーズウェルズ系、ヌレイエフ系、サンデーサイレンス系、キングマンボ系を循環させるのが王道ルート'
    ]
  },
  {
    id: 'miracle',
    name: '奇跡の血量 (インブリード 18.75%)',
    englishName: 'Miracle Bloodline (3×4)',
    badge: '最重要',
    difficulty: '★★☆☆☆',
    summary: '父方3代前×母方4代前（または4×3）で特定の血量が18.75%になる黄金のクロス。',
    condition: '父母の血統表で同一祖先が3代前と4代前に重なる（3×4＝12.5% + 6.25% = 18.75%）。',
    effects: [
      'クロスの対象となった祖先の因子（スピード・スタミナ・底力・ダート適性など）が最大限に遺伝',
      'インブリードのデメリット（気性難・体質虚弱）が最小限に抑えられる',
      '能力の上限（スピード・スタミナ限界値）が大きく引き上げられる'
    ],
    tips: [
      'サンデーサイレンス3×4（底力・瞬発力UP）は現代競馬・ゲーム内ともに最強クラスの定番',
      'ノーザンダンサー3×4（底力・万能）、ミスタープロスペクター3×4（スピード・早熟性）も狙い目',
      '2×3や2×2などの25%以上（近親交配）は「危険な配合」となり体質・気性が崩壊するため厳禁'
    ],
    examples: [
      {
        sire: 'エピファネイア',
        damSire: 'ハーツクライ',
        desc: 'サンデーサイレンス4×3の奇跡の血量が成立しやすく、芝中長距離の王道クラシック仕様に'
      }
    ]
  },
  {
    id: 'perfect',
    name: '完璧配合',
    englishName: 'Perfect Cross',
    badge: '上級',
    difficulty: '★★★★★',
    summary: '「面白配合」と「見事配合」が同時に成立したダビスタ史上最高峰の夢の配合理論。',
    condition: '面白配合の条件（父4系統×母4系統で6種類以上）と、見事配合の条件（母父・母母父・母母母父・母母母母父の系統一致）を両立。',
    effects: [
      '勝負根性が爆発的に向上（先行・差しでの競り合い負けが激減）',
      '気性難が劇的に改善され、インブリードの悪影響をほぼ無力化',
      'クロス因子の効果が極限まで跳ね上がり、ステータス天井を突破しやすい'
    ],
    tips: [
      '狙って作るのは綿密な代重ね設計図（自家製種牡馬や自家製繁殖牝馬）が必要',
      '「完璧な配合＋凝った配合＋奇跡の血量」が完成した瞬間、凱旋門賞やBCクラシックすら射程圏に',
      '初心者はいきなり目指さず、まずは「凝った配合」から始めるのが鉄則'
    ]
  },
  {
    id: 'migoto',
    name: '見事配合',
    englishName: 'Splendid Cross',
    badge: '上級',
    difficulty: '★★★★☆',
    summary: 'インブリードの能力爆発力を極限まで高め、かつ気性を安定させる上級理論。',
    condition: '種牡馬の父・母父・父母父・母母父の系統が、繁殖牝馬の母父・母母父・母母母父・母母母母父の系統と一致する。',
    effects: [
      'インブリードで得られる因子効果（スピード・スタミナ等）が劇的に強化',
      '気性が落ち着き、レースでのイレ込みや掛かりのリスクが低下'
    ],
    tips: [
      'クロスがない見事配合は効果が薄いため、必ず1〜2本の強力なインブリードを仕込むこと',
      '自家製牝馬の血統を綿密にコントロールして組み立てるのが醍醐味'
    ]
  },
  {
    id: 'omoshiro',
    name: '面白配合',
    englishName: 'Interesting Cross',
    badge: '基礎',
    difficulty: '★★☆☆☆',
    summary: '多様な血を組み合わせることで、底力（勝負根性）を底上げし気性難を和らげる。',
    condition: '種牡馬の4系統（父・母父・父母父・母母父）と繁殖牝馬の4系統を合わせた8つのうち、異なる系統が6種類以上存在する。',
    effects: [
      '勝負根性（直線の競り合いでの粘り）が大幅にアップ',
      '多重インブリードによる気性悪化のデメリットを相殺してくれる'
    ],
    tips: [
      'サンデーサイレンス系偏重の現代では意図的に非主流系統（マイナー血統）を混ぜる工夫が必要',
      '「凝った配合」と同時に成立させると、競り合いで絶対に負けない根性馬が生まれやすい'
    ]
  },
  {
    id: 'nicks',
    name: 'ニックス (相性配合・3段階表示)',
    englishName: 'Nicks (★〜★★★)',
    badge: '最重要',
    difficulty: '★★☆☆☆',
    summary: 'Switch2版で完全復活！★（シングル）、★★（ダブル）、★★★（トリプル）の3段階で表示される相性理論。',
    condition: '相性の良い父祖先系統と母祖先系統の組み合わせ。成立本数に応じて★〜★★★で表示される。',
    effects: [
      '産駒のスピード・スタミナの基礎値が大幅に底上げされる',
      '★の数が多いほど（トリプルニックス）、能力の下振れを防ぎハイアベレージな産駒が誕生',
      '「凝った配合」とも完全に共存・複合可能！'
    ],
    tips: [
      '今作で配合画面に3段階で明示されるようになったため、配合検討の最重要指標のひとつ',
      '凝った配合とニックス★★★が合わさる配合ラインは、最強馬生産の定番ルート'
    ]
  },
  {
    id: 'mare-cross',
    name: '牝馬クロス (祖先牝馬インブリード)',
    englishName: 'Mare Inbreeding Cross',
    badge: '最重要',
    difficulty: '★★★☆☆',
    summary: 'Switch2版でシリーズ初登場の超注目新要素！血統表内の偉大な名牝がクロス対象に。',
    condition: '父方・母方の血統表内に同一の祖先牝馬（ウインドインハーヘア等）が存在することで成立。',
    effects: [
      '祖先牝馬が持つ固有の因子効果（速力・底力・スタミナ等）が産駒に直接遺伝',
      '種牡馬クロスと同様に能力上限を引き上げ、爆発的な瞬発力を生み出す'
    ],
    tips: [
      'ウインドインハーヘア（ディープインパクト・ブラックタイドの母）のクロスは速度＋底力を付与する超強力クロス！',
      '今作の血統表をチェックし、因子を持つ名牝が重なる配合ラインを積極的に探そう'
    ]
  },
  {
    id: 'homebred-sire-factor',
    name: '自家製種牡馬の因子付与システム',
    englishName: 'Homebred Sire Factor Inheritance',
    badge: '上級',
    difficulty: '★★★★☆',
    summary: 'Switch2版最大の革命！引退して種牡馬入りした自家生産馬に「新たな因子」が付与される。',
    condition: '自家生産の牡馬で重賞・G1を勝利し、種牡馬入りさせる（タスク・ミッションも達成）。',
    effects: [
      '競走実績やステータス（スピード・スタミナ・パワー・底力）に応じて因子が1〜2個新規付与される',
      '自身や血統表に元々なかった因子（速・底・丈・早など）が新たに発現するケースもある',
      '次世代でその自家製種牡馬を種付けすることで、オリジナルの超強力インブリードを構築可能！'
    ],
    tips: [
      '因子が少ない種牡馬の後継でも、実績を残して種牡馬入りすれば優良因子を獲得できる救済＆強化システム',
      '最強馬生産（BC用）では、自家製種牡馬に強力な因子を付与させて代重ねするのが最先端のトレンド'
    ]
  },
  {
    id: 'outbreed',
    name: 'アウトブリード (異系交配)',
    englishName: 'Outbreed',
    badge: '基礎',
    difficulty: '★☆☆☆☆',
    summary: '血統表5代以内に共通の祖先が一切存在しない配合。極めて健全でタフな産駒が誕生。',
    condition: '5代血統表の中に重複する祖先馬が1頭も存在しない。',
    effects: [
      '健康・体質が非常に強くなり、病気や故障（屈腱炎・ソエなど）のリスクが極めて低い',
      '気性が素直で扱いやすく、調教が順調に進む',
      '繁殖牝馬として引退した際、次代で自由なインブリードを仕込みやすい'
    ],
    tips: [
      '「アウトブリード＋凝った配合」の組み合わせは、リスクゼロで能力爆発を狙える現行屈指の優良配合'
    ]
  },
  {
    id: 'dangerous',
    name: '危険な配合 (近親交配)',
    englishName: 'Dangerous Inbreeding',
    badge: '注意',
    difficulty: '★☆☆☆☆',
    summary: 'クロスが7本以上、または1×N、もしくは2×2などの過度な近親交配。大きなリスクが伴う。',
    condition: 'クロスが7本以上成立、または1×N、2×2の極端なインブリードが存在する。',
    effects: [
      '体質・健康パラメータが極度に低下し、調教や出走ですぐにソエ・骨折を発症',
      '凝った配合などの好影響が相殺・無効化されるデメリットが発生',
      '気性が荒くなりやすく、レースでのイレ込みリスクが増大'
    ],
    tips: [
      '配合決定時に「うーむ…ちょっとこれは危険な配合です」と警告される',
      '危険な配合になるということはそれだけ大量のクロスがある証拠でもあるが、初心者は避けるのが無難'
    ]
  }
];

export const inbreedingAncestors: InbreedingAncestor[] = [
  {
    name: 'サンデーサイレンス',
    effect: '底力・瞬発力・芝適性',
    factor: 'スピード / 底力',
    recommendedPartner: 'ディープインパクト系牝馬、ハーツクライ系種牡馬',
    notes: '日本競馬の金字塔。3×4は芝中長距離の最強パターン。'
  },
  {
    name: 'キングカメハメハ',
    effect: '万能性・パワー・スタミナ',
    factor: 'スタミナ / パワー',
    recommendedPartner: 'ロードカナロア産駒、ドゥラメンテ産駒',
    notes: '芝・ダート問わずクラシックからマイルまで対応できる万能馬を輩出。'
  },
  {
    name: 'ミスタープロスペクター',
    effect: '圧倒的スピード・早熟・ダート適性',
    factor: '短距離スピード / ダート',
    recommendedPartner: 'エンドスウィープ系、ヘニーヒューズ系',
    notes: '2歳戦や短距離マイルで即効性のある賞金稼ぎ馬を作りたいときに必須。'
  },
  {
    name: 'ノーザンダンサー',
    effect: '底力・成長力・スタミナ',
    factor: '底力 / スタミナ',
    recommendedPartner: 'サドラーズウェルズ系、ダンチヒ系',
    notes: '代重ねで奥深さを出すための世界標準クロス。粘り強さが飛躍。'
  },
  {
    name: 'ストームキャット',
    effect: 'スピード・パワー・仕上がり早',
    factor: '短距離スピード / パワー',
    recommendedPartner: 'キズナ、ロードカナロア',
    notes: 'ディープ系やキングマンボ系と抜群の相性。仕上がり早い重賞ホースに。'
  },
  {
    name: 'ウインドインハーヘア (牝馬クロス)',
    effect: '速力・底力・クラシック適性',
    factor: '速力 / 底力',
    recommendedPartner: 'ディープインパクト系、キタサンブラック（ブラックタイド系）',
    notes: 'Switch2版で初解禁された牝馬クロス！ディープ・ブラックタイドの母であり、速度と底力を同時に付与する超重要名牝。'
  },
  {
    name: 'ロベルト',
    effect: '重馬場適性・勝負根性・スタミナ',
    factor: 'スタミナ / 底力 / 重馬場',
    recommendedPartner: 'モーリス、エピファネイア',
    notes: 'タフな馬場や坂のある中山・阪神で無類の強さを発揮するパワー血統。'
  }
];

// 配合理論の優先順位（Tier表）
export const breedingTheoryPriorities: BreedingTheoryPriority[] = [
  {
    rank: 1,
    theoryName: '凝った配合',
    tier: 'Tier 1',
    role: '全能力底上げ（繁殖牝馬の能力を限界まで引き出す）',
    whyPriority: '繁殖牝馬のスピード・スタミナ・パワーを引き出す効果が絶大で、しかも4代血統内の特定ペアで成立するため最も組みやすい。序盤の初期牝馬から終盤の名牝まで全世代で最強の基盤となる。',
    targetStage: '序盤〜終盤（全プレイヤー必須の絶対王者）',
    synergyWith: ['有効クロス（3×4）', 'ニックス', 'アウトブリード']
  },
  {
    rank: 2,
    theoryName: '有効なクロス（奇跡の血量 3×4）',
    tier: 'Tier 2',
    role: 'スピード・スタミナ・底力の上限突破（起爆剤）',
    whyPriority: '「短距離」「速力」「底力」因子を直接上乗せして限界値を突破できる唯一の理論。3×4（血量18.75%）なら気性難や体質低下の副作用も最小限に抑えられる。',
    targetStage: '中盤〜終盤（クラシック制覇〜G1連覇を狙う段階）',
    synergyWith: ['凝った配合', '見事な配合', 'ニックス']
  },
  {
    rank: 3,
    theoryName: 'ニックス（★〜★★★）',
    tier: 'Tier 3',
    role: '体質・気性の安定、能力の引き出し底上げ',
    whyPriority: '父小系統×母小系統の相性。他の配合理論と一切干渉せず無条件に重複可能。Switch2版ではゲーム内で相性度が3段階表示され、配合の安定感を確実に向上させる。',
    targetStage: '全ステージ（常に意識して重ねがけ推奨）',
    synergyWith: ['凝った配合', 'アウトブリード', '見事な配合']
  },
  {
    rank: 4,
    theoryName: '見事な配合',
    tier: 'Tier 4',
    role: 'クロス効果の大幅増幅 ＆ 副作用（気性難・虚弱）軽減',
    whyPriority: '多重クロスを安全に爆発させられる。ただし「クロスが存在しないと恩恵が薄い」「繁殖牝馬自体の地力が高くないと効果を実感しにくい」ため、代重ねを行う上級者向け。',
    targetStage: '終盤・最強馬生産（代重ね計画中）',
    synergyWith: ['多重スピードクロス', '面白い配合（完璧へ昇格）']
  },
  {
    rank: 5,
    theoryName: '面白い配合',
    tier: 'Tier 5',
    role: '勝負根性の底上げ ＆ 気性改善',
    whyPriority: '3代前8頭の大系統が7種以上。直線での競り合いに強い馬ができるが、スピードへの直接的な爆発力は「凝った配合」や「クロス」に劣る。主に見事と合わせた「完璧な配合」のパーツとして機能。',
    targetStage: '中盤〜終盤',
    synergyWith: ['見事な配合（完璧な配合）', '凝った配合']
  }
];

// 目的別・ステージ別の王道推奨レシピ
export const recommendedBreedingRecipes: RecommendedBreedingRecipe[] = [
  {
    name: '【王道最強・推奨No.1】 凝った配合 ＋ 有効スピードクロス（3×4） ＋ ニックス',
    targetGoal: 'クラシック三冠・古馬王道G1・凱旋門賞制覇（全プレイヤー推奨）',
    theories: ['凝った配合', '奇跡の血量 (3×4)', 'ニックス (★★〜★★★)'],
    description: 'ダビスタプレイヤーの間で最も実績があり、最も強い馬が安定して生まれる黄金の組み合わせ。凝った配合で底上げし、サンデーサイレンスやミスプロ等の3×4でスピード限界を突破、ニックスで安定させます。',
    merits: [
      'スピード・スタミナ・根性がすべてG1級に到達しやすい',
      '「完璧な配合」より格段に組みやすく、優秀な種牡馬（実績A）を選べる',
      '代重ねでも途切れにくく、自家製牝馬にもそのまま引き継げる'
    ],
    caution: 'クロスが2×3や2×2にならないよう血量18.75%（3×4または4×3）を厳守すること。'
  },
  {
    name: '【序盤の確実な底上げ】 凝った配合 ＋ アウトブリード ＋ ニックス',
    targetGoal: '序盤の資金稼ぎ・破産回避・故障知らずのローテーション',
    theories: ['凝った配合', 'アウトブリード', 'ニックス'],
    description: '初期牝馬やセリ市の安価な牝馬からでも確実に勝ち上がる馬を作る堅実レシピ。クロスを一切持たないため体質・気性が抜群で、怪我を恐れず過密ローテで賞金を荒稼ぎできます。',
    merits: [
      '体質・脚元が極めて強く、ソエや骨折の危険がほぼゼロ',
      '気性が素直でイレ込みがなく、調教が順調に進む',
      '安価な種牡馬でも凝った配合が成立すればOP・重賞を勝てる'
    ],
    caution: 'スピードの爆発力（上限突破）はクロス入りに一歩譲るため、資金が貯まったら3×4クロス入りへ移行推奨。'
  },
  {
    name: '【爆発力特化・G1連覇狙い】 見事な配合 ＋ 多重スピードクロス（3×4）',
    targetGoal: '短距離〜マイルG1完全制覇・爆発的スピード馬生産',
    theories: ['見事な配合', '多重インブリード (短距離・速力・底力)'],
    description: '見事な配合によってクロスのデメリット（気性難・虚弱）を中和し、短距離・速力因子を2〜3本重ねてスピードの鬼を作る上級配合。',
    merits: [
      '短距離〜マイル戦で逃げ・先行して影も踏ませない超快速馬が誕生',
      'クロスの効果が限界まで高まるため、スピード値が突き抜ける'
    ],
    caution: '繁殖牝馬の血統系統（面白用系統）と種牡馬の見事用系統を合わせる必要があるため代重ね計画が必要。'
  },
  {
    name: '【究極のエンドコンテンツ】 完璧な配合（面白＋見事） ＋ 有効クロス',
    targetGoal: 'BC（ブリーダーズカップ）全国制覇・歴代最強馬生産',
    theories: ['完璧な配合 (面白＋見事)', '奇跡の血量 (3×4)', 'ニックス'],
    description: '3〜4代前から種牡馬と牝馬を計算し尽くして構築するダビスタの最高到達点。面白（根性UP）と見事（クロス増幅）が同時に発動し、全能力が最高水準にまとまります。',
    merits: [
      'ゲーム内で最も豪華な配合コメント「おぉっ これは完璧な配合です！」が発生',
      '勝負根性とスピードが両立した完全無欠のスーパーホースが狙える'
    ],
    caution: '【最大の罠】無理に完璧な配合を狙うために能力の低い種牡馬（実績Cや距離適性の狭い馬）を付けると本末転倒。「凝った配合＋実績A種牡馬」の方が強い馬が出やすい点に注意！'
  }
];

// 序盤おすすめ繁殖牝馬 TOP7（8,000万円以下）
export const earlyRecommendedBroodmares: RecommendedBroodmare[] = [
  {
    rank: 1,
    name: 'ディヴィナプレシオーサ',
    price: 7800,
    priceText: '7,800万円',
    lineage: 'Ns ボールドルーラー系',
    speed: 45,
    stamina: 45,
    power: 42,
    temper: 'B',
    health: 'B',
    dirt: '○',
    partnerSire: 'トーセンホマレボシ',
    partnerSireFee: '70万円',
    partnerScore: 281,
    totalInitialCost: '7,870万円',
    top20TotalScore: 5129,
    theoryTags: ['ニックス★★★', '凝った配合', '速力クロス'],
    features: '貴重なボールドルーラー系で、最大の魅力は豊富なサンデーサイレンス系がニックス★★★対象になること！凝った配合の相手も豊富で序盤の牝系作りに最適。',
    caution: 'Secretariatのクロスで気性難クロスが発生しやすい点に注意。',
    type: '序盤コスパ'
  },
  {
    rank: 2,
    name: 'レディオブオペラ',
    price: 5900,
    priceText: '5,900万円',
    lineage: 'Ns ボールドルーラー系',
    speed: 52,
    stamina: 41,
    power: 48,
    temper: 'B',
    health: 'B',
    dirt: '○',
    partnerSire: 'アドマイヤムーン',
    partnerSireFee: '50万円',
    partnerScore: 279,
    totalInitialCost: '5,950万円',
    top20TotalScore: 5073,
    theoryTags: ['ニックス★★★', '凝った配合', '格安種付け'],
    features: '初期投資6,000万円未満で買える屈指の良コスパ牝馬。アドマイヤムーン（50万）やDubawi（4,500万）など安価〜超高額まで高得点相手がズラリ。',
    type: '序盤コスパ'
  },
  {
    rank: 3,
    name: 'ドナブルーハ',
    price: 6200,
    priceText: '6,200万円',
    lineage: 'Ph ニアークティック系',
    speed: 48,
    stamina: 44,
    power: 44,
    temper: 'A',
    health: 'A',
    dirt: '○',
    partnerSire: 'ウインブライト',
    partnerSireFee: '80万円',
    partnerScore: 284,
    totalInitialCost: '6,280万円',
    top20TotalScore: 5057,
    theoryTags: ['凝った配合', '速力×2', '底力×2', '体質A気性A'],
    features: '体質A・気性Aの超健康優等生。ウインブライト（80万）との配合で最高284ptを叩き出し、故障知らずでガンガン走る産駒を輩出。',
    type: '序盤コスパ'
  },
  {
    rank: 4,
    name: 'ララア',
    price: 6100,
    priceText: '6,100万円',
    lineage: 'Ne ヌレイエフ系',
    speed: 46,
    stamina: 46,
    power: 45,
    temper: 'B',
    health: 'B',
    dirt: '◎',
    partnerSire: 'サンダースノー',
    partnerSireFee: '200万円',
    partnerScore: 278,
    totalInitialCost: '6,300万円',
    top20TotalScore: 5057,
    theoryTags: ['ダート◎', '凝った配合', '地方交流無双'],
    features: 'ダート適性◎のパワー牝馬。サンダースノーやドレフォンを付けることで、新設ダート三冠や地方交流重賞を総なめにするドル箱ホースが誕生。',
    type: '序盤コスパ'
  },
  {
    rank: 5,
    name: 'スタイルリスティック',
    price: 7400,
    priceText: '7,400万円',
    lineage: 'Ro ヘイルトゥリーズン系',
    speed: 47,
    stamina: 45,
    power: 43,
    temper: 'B',
    health: 'B',
    dirt: '○',
    partnerSire: 'ダイワメジャー',
    partnerSireFee: '600万円',
    partnerScore: 275,
    totalInitialCost: '8,000万円',
    top20TotalScore: 5021,
    theoryTags: ['凝った配合', 'サンデー3×4', 'クラシック対応'],
    features: 'ダイワメジャーとの配合でサンデーサイレンス3×4（奇跡の血量）と凝った配合が同時成立。2歳戦から即重賞で勝ち負け可能。',
    type: '序盤コスパ'
  },
  {
    rank: 6,
    name: 'ザズー',
    price: 4300,
    priceText: '4,300万円',
    lineage: 'Te トウルビヨン系',
    speed: 44,
    stamina: 43,
    power: 40,
    temper: 'A',
    health: 'A',
    dirt: '○',
    partnerSire: 'ディープインパクト',
    partnerSireFee: '4,000万円',
    partnerScore: 268,
    totalInitialCost: '8,300万円',
    top20TotalScore: 4809,
    theoryTags: ['格安4300万', 'トウルビヨン系', '面白配合対応'],
    features: '4,300万円という格安価格ながら、異系トウルビヨン系により様々な主要種牡馬と好配合を連発。序盤の繁殖拡大に大貢献。',
    type: '序盤コスパ'
  },
  {
    rank: 7,
    name: 'コージーベイ',
    price: 4500,
    priceText: '4,500万円',
    lineage: 'Ph ニアークティック系',
    speed: 43,
    stamina: 42,
    power: 41,
    temper: 'B',
    health: 'A',
    dirt: '○',
    partnerSire: 'ダイワメジャー',
    partnerSireFee: '600万円',
    partnerScore: 270,
    totalInitialCost: '5,100万円',
    top20TotalScore: 4796,
    theoryTags: ['総額5100万', '凝った配合', '早期勝ち上がり'],
    features: '牝馬＋種付け料合計5,100万円で即戦力配合が組める超堅実株。手元資金が少ない初期でも安全に重賞ホースを狙える。',
    type: '序盤コスパ'
  }
];

// 最強繁殖牝馬ランキング TOP10（全327頭・制限なし）
export const strongestBroodmares: RecommendedBroodmare[] = [
  {
    rank: 1,
    name: 'ラヴズオンリーミー',
    price: 37000,
    priceText: '3億7,000万円',
    lineage: 'Ne ストームキャット系',
    speed: 66,
    stamina: 66,
    power: 62,
    temper: 'B',
    health: 'B',
    dirt: '○',
    partnerSire: 'Galileo (海外種牡馬)',
    partnerSireFee: '5,000万円（株保有で無料）',
    partnerScore: 322,
    totalInitialCost: '4億2,000万円',
    top20TotalScore: 5881,
    theoryTags: ['全牝馬No.1スコア', '凝った相手112頭', '速力×3底力×4'],
    features: '能力は全327頭中トップクラス（スピード66/スタミナ66/パワー62）。Galileoとの配合で凝ったペア3組＋速力×3・底力×4が集中し歴代最高級の怪物が誕生！',
    caution: '危険配合の相手が18頭いるため血量チェックは必須。',
    type: '最強牝馬'
  },
  {
    rank: 2,
    name: 'サンクイーンII',
    price: 16000,
    priceText: '1億6,000万円',
    lineage: 'Ns ボールドルーラー系',
    speed: 61,
    stamina: 59,
    power: 58,
    temper: 'A',
    health: 'A',
    dirt: '○',
    partnerSire: 'トーセンホマレボシ',
    partnerSireFee: '70万円',
    partnerScore: 318,
    totalInitialCost: '1億6,070万円',
    top20TotalScore: 5839,
    theoryTags: ['ニックス★★★', '凝った配合', 'コスパ最強名牝'],
    features: '価格1.6億円ながら上位20頭合計スコアは全牝馬2位！格安種牡馬トーセンホマレボシ（70万）でも318ptの超絶スコアを叩き出す超優良名牝。',
    type: '最強牝馬'
  },
  {
    rank: 3,
    name: 'タイムフェアレディ',
    price: 9200,
    priceText: '9,200万円',
    lineage: 'Ro ヘイルトゥリーズン系',
    speed: 58,
    stamina: 57,
    power: 56,
    temper: 'A',
    health: 'A',
    dirt: '○',
    partnerSire: 'オルフェーヴル',
    partnerSireFee: '350万円',
    partnerScore: 315,
    totalInitialCost: '9,550万円',
    top20TotalScore: 5787,
    theoryTags: ['1億未満', 'オルフェーヴル神相性', 'クラシック三冠'],
    features: '1億円未満で買える牝馬の中で最高峰の総合スコア5,787pt！オルフェーヴルとの配合で芝中長距離の無敵三冠馬が狙える。',
    type: '最強牝馬'
  },
  {
    rank: 4,
    name: 'アラビアンソング',
    price: 24000,
    priceText: '2億4,000万円',
    lineage: 'Ne サドラーズウェルズ系',
    speed: 63,
    stamina: 62,
    power: 60,
    temper: 'B',
    health: 'B',
    dirt: '○',
    partnerSire: 'Galileo',
    partnerSireFee: '5,000万円',
    partnerScore: 312,
    totalInitialCost: '2億9,000万円',
    top20TotalScore: 5685,
    theoryTags: ['サドラーズウェルズ系', '凱旋門賞制覇直結', '重馬場無双'],
    features: '欧州芝適性と無尽蔵のスタミナを秘めた名牝。海外レース（凱旋門賞・キングジョージ等）を制圧するための最重要ピース。',
    type: '最強牝馬'
  },
  {
    rank: 5,
    name: 'マイグッドネス',
    price: 31000,
    priceText: '3億1,000万円',
    lineage: 'Ne ストームキャット系',
    speed: 64,
    stamina: 60,
    power: 61,
    temper: 'A',
    health: 'B',
    dirt: '◎',
    partnerSire: 'ダイワメジャー',
    partnerSireFee: '600万円',
    partnerScore: 333,
    totalInitialCost: '3億1,600万円',
    top20TotalScore: 5629,
    theoryTags: ['個別最高333pt', 'ダイワメジャー超神相性', '芝ダート万能'],
    features: 'ダイワメジャーとの単体配合スコアは驚異の333pt！芝マイル〜ダート重賞まであらゆるカテゴリーで世代最強を狙える超名牝。',
    type: '最強牝馬'
  },
  {
    rank: 6,
    name: 'レディオブオペラ',
    price: 5900,
    priceText: '5,900万円',
    lineage: 'Ns ボールドルーラー系',
    speed: 52,
    stamina: 41,
    power: 48,
    temper: 'B',
    health: 'B',
    dirt: '○',
    partnerSire: 'Dubawi (海外種牡馬)',
    partnerSireFee: '4,500万円',
    partnerScore: 308,
    totalInitialCost: '1億400万円',
    top20TotalScore: 5609,
    theoryTags: ['Dubawi神配合', 'スピード爆発', '短距離マイル完全制圧'],
    features: '序盤おすすめだけでなく最強ランキングでも堂々6位！海外種牡馬Dubawiとの配合でワールドクラスの快速スプリンターが誕生。',
    type: '最強牝馬'
  },
  {
    rank: 7,
    name: 'アンリーチャブル',
    price: 23000,
    priceText: '2億3,000万円',
    lineage: 'Ro サンデーサイレンス系',
    speed: 62,
    stamina: 60,
    power: 59,
    temper: 'A',
    health: 'A',
    dirt: '○',
    partnerSire: 'ダイワメジャー',
    partnerSireFee: '600万円',
    partnerScore: 305,
    totalInitialCost: '2億3,600万円',
    top20TotalScore: 5594,
    theoryTags: ['サンデー系名牝', '体質A気性A', '安定度抜群'],
    features: 'サンデーサイレンス直系で能力バランス抜群。キングカメハメハ系やロードカナロアとの相性も良く、王道クラシックで大活躍。',
    type: '最強牝馬'
  },
  {
    rank: 8,
    name: 'サマーハ',
    price: 15000,
    priceText: '1億5,000万円',
    lineage: 'Ne サドラーズウェルズ系',
    speed: 60,
    stamina: 59,
    power: 58,
    temper: 'B',
    health: 'A',
    dirt: '○',
    partnerSire: 'Dubawi',
    partnerSireFee: '4,500万円',
    partnerScore: 304,
    totalInitialCost: '1億9,500万円',
    top20TotalScore: 5557,
    theoryTags: ['シャケトラの母', 'Dubawi相性◎', '中長距離スタミナ'],
    features: '重賞馬シャケトラの母。サドラーズウェルズ系で底力とスタミナに優れ、DubawiやGalileoとの配合でG1戦線を席巻。',
    type: '最強牝馬'
  },
  {
    rank: 9,
    name: 'ドナブルーハ',
    price: 6200,
    priceText: '6,200万円',
    lineage: 'Ph ニアークティック系',
    speed: 48,
    stamina: 44,
    power: 44,
    temper: 'A',
    health: 'A',
    dirt: '○',
    partnerSire: 'ウインブライト',
    partnerSireFee: '80万円',
    partnerScore: 284,
    totalInitialCost: '6,280万円',
    top20TotalScore: 5528,
    theoryTags: ['安価で上位ランクイン', 'ウインブライト鉄板', '健康優等生'],
    features: '6,200万円の牝馬ながら高額牝馬たちと肩を並べて9位にランクイン。安価で最強馬を作りたいプレイヤーの絶対的味方。',
    type: '最強牝馬'
  },
  {
    rank: 10,
    name: 'コンセントリック',
    price: 47000,
    priceText: '4億7,000万円（庭先限定）',
    lineage: 'Ne サドラーズウェルズ系',
    speed: 67,
    stamina: 65,
    power: 63,
    temper: 'B',
    health: 'A',
    dirt: '○',
    partnerSire: 'キングカメハメハ',
    partnerSireFee: '1,200万円',
    partnerScore: 302,
    totalInitialCost: '4億8,200万円',
    top20TotalScore: 5519,
    theoryTags: ['庭先取引限定', 'エピファネイア等の母系', '最高峰能力値'],
    features: '庭先取引でしか手に入らない最高峰の超名牝。スピード67/スタミナ65はゲーム内屈指。キングカメハメハとの配合で日本ダービー〜JC制覇確実級。',
    type: '最強牝馬'
  }
];

