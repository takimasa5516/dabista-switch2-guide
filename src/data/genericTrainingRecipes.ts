export interface GenericTrainingStep {
  timing: string;
  menu: string;
  weightTarget: string;
  purpose: string;
  keyPoints: string[];
}

export interface TrainingRoutine {
  id: string;
  title: string;
  targetSituation: string;
  pace: string;
  steps: GenericTrainingStep[];
  goldenRule: string;
}

export const preDebutRoutines: TrainingRoutine[] = [
  {
    id: 'pre-debut-standard',
    title: '【王道】入厩〜ゲート合格〜デビュー仕上げ 汎用標準メニュー',
    targetSituation: '2歳普通型・早熟型馬の標準入厩後ルーティン（デビュー前約2〜3ヶ月）',
    pace: '全8週間',
    steps: [
      {
        timing: '入厩第1〜2週（慣らし・基礎体力）',
        menu: '水曜：坂路馬なり ／ 木曜：ウッド馬なり',
        weightTarget: '+10kg〜+16kg（まだ太くてOK）',
        purpose: '環境変化に慣れさせつつ、脚元を傷めずに基礎体力を立ち上げる',
        keyPoints: ['強めの追いは絶対NG', 'カイバをしっかり食べさせて体重を増やす']
      },
      {
        timing: '入厩第3〜4週（ゲート試験集中期間）',
        menu: '水曜：ゲート練習×2本 ／ 木曜：プール（疲労抜き）',
        weightTarget: '+6kg〜+10kg',
        purpose: '最短でのゲート試験合格と出遅れ癖の解消',
        keyPoints: [
          'ゲート練習は疲労が溜まりやすいため木曜にプールで脚元冷却＆リフレッシュ',
          '2〜3週連続で受けると合格する。合格後は即通常調教へシフト'
        ]
      },
      {
        timing: 'デビュー3週前（本格乗り込み期）',
        menu: '水曜：ウッド強め ／ 木曜：坂路強め',
        weightTarget: 'ベスト+6kg〜+8kg',
        purpose: '心肺機能の強化とスピード・スタミナの底上げ',
        keyPoints: ['ここで一気に-4kg〜-6kg絞り込む', '併せ馬はまだ不要']
      },
      {
        timing: 'デビュー2週前（本追い切り・勝負仕上げ）',
        menu: '水曜：芝一杯（または併せ馬一杯） ／ 木曜：プール',
        weightTarget: 'ベスト+4kg〜+6kg',
        purpose: '最高速の引き出しと闘争心（根性）の点火',
        keyPoints: [
          '最も負荷をかける重要週。スピードの上限値を突破させる',
          '木曜はプールで体重を維持しつつ疲労を残さない'
        ]
      },
      {
        timing: 'デビュー1週前（直前追い切り）',
        menu: '水曜：坂路強め ／ 木曜：ポリトラック馬なり',
        weightTarget: 'ベスト+2kg〜+4kg',
        purpose: '脚元への負担を抑えつつパワーを補強',
        keyPoints: ['息遣いと時計をチェック。仕上がっていれば木曜は完全休養でも可']
      },
      {
        timing: 'デビュー当週（最終微調整）',
        menu: '水曜：ポリトラック馬なり（または坂路馬なり）',
        weightTarget: 'ベストジャスト（±0kg〜+2kg）',
        purpose: 'ベスト体重への完全合致とレースでのガス欠防止',
        keyPoints: [
          '強めや一杯は厳禁！マイナス体重（細め残り）になると勝率が半減する',
          'パドックで「仕上がり万全」と言わせる'
        ]
      }
    ],
    goldenRule: '「2週前に芝一杯、1週前に坂路強め、当週はポリ馬なり」がダビスタ全シリーズ共通の黄金仕上げサイクル！'
  },
  {
    id: 'pre-debut-fragile',
    title: '【脚元不安・虚弱馬専用】ソエ・故障ゼロ仕上げメニュー',
    targetSituation: '「脚元に不安」「体質が弱い」と言われた素質馬のデビュー前調整',
    pace: '全10週間（じっくり型）',
    steps: [
      {
        timing: '第1〜4週（坂路＆プール養成）',
        menu: '水曜：坂路馬なり ／ 木曜：プール調教',
        weightTarget: '+10kg以上',
        purpose: '芝・ダートを一切使わず、脚元負荷ゼロで心肺機能と背腰を鍛える',
        keyPoints: ['ダートやウッドはソエ（骨膜炎）の引き金になるため回避']
      },
      {
        timing: '第5〜6週（ゲート試験）',
        menu: '水曜：ゲート練習 ／ 木曜：プール調教',
        weightTarget: '+6kg〜+8kg',
        purpose: '無理のないゲート試験合格',
        keyPoints: ['連闘試験は避け、疲労コメントが出たら1週見送る']
      },
      {
        timing: 'デビュー2週前〜当週',
        menu: '2週前：坂路一杯 ／ 1週前：坂路強め＋プール ／ 当週：ポリトラック馬なり',
        weightTarget: 'ベスト±0kg',
        purpose: '坂路とポリトラックのみで安全にベストコンディションを完成',
        keyPoints: ['芝や併せ馬を一切使わなくても、坂路一杯でスピード・パワーは充分仕上がる']
      }
    ],
    goldenRule: '虚弱馬は「坂路・ポリトラック・プール」の3点セットを徹底。芝一杯は怪我のリスクが高いため使わない！'
  }
];

export const postDebutRoutines: TrainingRoutine[] = [
  {
    id: 'post-debut-3weeks',
    title: '【中3週・王道】次走必勝の黄金ローテーションメニュー',
    targetSituation: '前走後に中3週（約1ヶ月）空けて次走に向かう最も標準的かつ理想的な調整',
    pace: '3週間サイクル',
    steps: [
      {
        timing: 'レース翌週（出走後第1週：疲労回復）',
        menu: '水曜：軽めの休養（ノーステッキ） または プール馬なり',
        weightTarget: '前走比 +4kg〜+6kg（回復させる）',
        purpose: '前走の激走で消耗したスタミナ・疲労の完全除去と馬体重の回復',
        keyPoints: ['強い調教は厳禁。カイバを食わせて体重を戻す']
      },
      {
        timing: 'レース2週前（第2週：本追い切り）',
        menu: '水曜：ウッド強め または 芝一杯 ／ 木曜：ポリトラック馬なり',
        weightTarget: 'ベスト +4kg',
        purpose: '本格的な負荷をかけて息を研ぎ澄まし、レースモードへ点火',
        keyPoints: ['ここで-2kg〜-4kg絞り、次週の微調整に備える']
      },
      {
        timing: 'レース当週（第3週：最終追い切り）',
        menu: '水曜：坂路馬なり または ポリトラック馬なり',
        weightTarget: 'ベストジャスト（±0kg〜+2kg）',
        purpose: 'ベスト馬体重への着地とテンションの沈静化',
        keyPoints: ['馬なりでサラッと流すだけでOK。パドックで「ちょうどいい」を目指す']
      }
    ],
    goldenRule: '「1週目休養 → 2週目強め → 当週馬なり」のリズムを崩さないことが連勝への最短ルート！'
  },
  {
    id: 'post-debut-4weeks-g1',
    title: '【中4週以上・勝負仕上げ】G1制覇狙いの放牧＋追切メニュー',
    targetSituation: 'クラシックG1、有馬記念、天皇賞など大目標レースへのメイチ仕上げ',
    pace: '4〜5週間サイクル',
    steps: [
      {
        timing: 'レース後直ち（第1〜2週）',
        menu: '「短期放牧（2〜3週間）」へ出す（温泉施設推奨）',
        weightTarget: 'ベスト +8kg〜+12kg',
        purpose: '疲労ゲージの完全リセットと精神的リフレッシュ',
        keyPoints: [
          '温泉施設があれば2週間で疲労が全快する',
          '放牧から戻った直後は体重が増えているが、計算通りなので心配無用'
        ]
      },
      {
        timing: '目標レース2週前（帰厩後第1週）',
        menu: '水曜：坂路一杯 ／ 木曜：ウッド強め',
        weightTarget: 'ベスト +6kg',
        purpose: '放牧で緩んだ馬体を強烈に絞り、スピード・パワーを急上昇させる',
        keyPoints: ['ここで一気に-4kg〜-6kg絞り込む']
      },
      {
        timing: '目標レース1週前',
        menu: '水曜：併せ馬一杯（勝負仕上げ）',
        weightTarget: 'ベスト +2kg〜+4kg',
        purpose: '闘争心・勝負根性を極限まで高め、G1での鼻差勝負に勝つ下準備',
        keyPoints: ['併せ馬で気合を注入。ルメールや武豊などの主戦騎手も確保']
      },
      {
        timing: '目標レース当週',
        menu: '水曜：ポリトラック馬なり',
        weightTarget: 'ベストジャスト（±0kg）',
        purpose: '疲労を残さず完璧なベスト体重で大一番へ出走',
        keyPoints: ['完璧な仕上がりでG1戴冠へ！']
      }
    ],
    goldenRule: '大目標には「放牧で疲労リセット → 2週前坂路一杯 → 1週前併せ馬一杯 → 当週ポリ馬なり」が最強の勝負手！'
  },
  {
    id: 'post-debut-2weeks',
    title: '【中2週】詰めて使いたい時の短期調整メニュー',
    targetSituation: 'オープン特別や条件戦で確実に賞金を稼ぎたい時の短期ローテーション',
    pace: '2週間サイクル',
    steps: [
      {
        timing: 'レース翌週（中1週目）',
        menu: '水曜：プール調教 または 完全休養',
        weightTarget: '前走比 +2kg〜+4kg回復',
        purpose: '疲労を蓄積させずに体重を少しだけ戻す',
        keyPoints: ['追切はしない。プールで脚元を冷やす']
      },
      {
        timing: 'レース当週（中2週目）',
        menu: '水曜：坂路強め（体重+2kgオーバーの場合） または ポリ馬なり（ジャストの場合）',
        weightTarget: 'ベスト±0kg',
        purpose: '体重差に合わせたピンポイントの微調整',
        keyPoints: ['疲労が溜まりやすいため、中2週で走らせた後は必ず放牧に出すこと']
      }
    ],
    goldenRule: '中2週は連発しないこと。2走使ったら必ず3〜4週間の放牧でリセットするのが鉄則。'
  }
];

export const purposeRecipes = [
  {
    purpose: '⚡ スピード特化レシピ（短距離・マイル重賞狙い）',
    menu: '2週前：芝一杯 ＋ 1週前：坂路一杯 ＋ 当週：ポリ馬なり',
    effect: 'スピード上限値を最大突破。瞬発力と切れ味が極限に達する。'
  },
  {
    purpose: '🏔️ スタミナ・長距離制覇レシピ（菊花賞・春天・有馬）',
    menu: '2週前：ダート一杯 ＋ 1週前：ウッド一杯 ＋ 当週：坂路強め',
    effect: '3000m超でも絶対にバテない無尽蔵のスタミナとパワーを構築。'
  },
  {
    purpose: '🧘 気性難・イレ込み矯正レシピ（落ち着かせたい時）',
    menu: '常用：ゲート練習 ＋ ポリトラック馬なり ＋ プール（芝・併せ馬は禁止）',
    effect: 'レース前のパドックでのチャカつきや暴走（掛かり）を大幅に抑制。'
  },
  {
    purpose: '🩹 ソエ（骨膜炎）発生時の緊急回避レシピ',
    menu: '芝・ダートを全面中止 → 坂路馬なり ＋ プール調教のみに切り替え',
    effect: '脚元への衝撃を完全遮断し、能力を落とさずに炎症の治癒を待つ。'
  },
  {
    purpose: '⚖️ 太め残り一掃レシピ（急激に-6kg〜-8kg絞る）',
    menu: '水曜：芝一杯(-4kg) ＋ 木曜：プール(-2kg) ＋ 日曜：坂路強め(-3kg)',
    effect: '太め残りを一瞬で解消してベスト体重へ戻す緊急減量メニュー。'
  }
];
