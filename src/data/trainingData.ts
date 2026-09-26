import { TrainingCourse, GrowthType } from '../types';

export const trainingCourses: TrainingCourse[] = [
  {
    id: 'turf',
    name: '芝コース',
    intensity: '一杯',
    effects: {
      speed: 5,
      stamina: 2,
      power: 2,
      guts: 3,
      fatigue: 4,
      weightChange: '-4kg',
      risk: '中'
    },
    summary: 'スピードと瞬発力を集中的に強化。脚元への負荷がやや高いため連闘時には注意。',
    bestFor: 'レース2週前の追切、スピード能力の限界突破を狙う仕上げ。'
  },
  {
    id: 'dirt',
    name: 'ダートコース',
    intensity: '一杯',
    effects: {
      speed: 2,
      stamina: 5,
      power: 4,
      guts: 3,
      fatigue: 4,
      weightChange: '-4kg',
      risk: '中'
    },
    summary: 'スタミナと推進力を徹底強化。長距離戦やダート重賞を睨む馬の基礎体力作りに最適。',
    bestFor: 'スタミナ底上げ期、菊花賞や春天を目指すクラシック候補。'
  },
  {
    id: 'wood',
    name: 'ウッドチップ',
    intensity: '強め',
    effects: {
      speed: 4,
      stamina: 3,
      power: 3,
      guts: 3,
      fatigue: 3,
      weightChange: '-3kg',
      risk: '小'
    },
    summary: '総合力をバランス良く向上。脚元への負担が芝・ダートより軽く、日常の基本調教に最適。',
    bestFor: '普段のベースアップ、体質に不安がある馬の常用調教。'
  },
  {
    id: 'slope',
    name: '坂路コース',
    intensity: '一杯',
    effects: {
      speed: 4,
      stamina: 3,
      power: 5,
      guts: 4,
      fatigue: 3,
      weightChange: '-3kg',
      risk: '極小'
    },
    summary: 'パワーと加速力を鍛える最強コース。脚元への負担が最も少なく、故障率が極めて低い。',
    bestFor: '仕上がり途上、脚元の弱い馬、直線の急坂（中山・阪神）対策。'
  },
  {
    id: 'poly',
    name: 'ポリトラック',
    intensity: '馬なり',
    effects: {
      speed: 3,
      stamina: 2,
      power: 2,
      guts: 2,
      fatigue: 1,
      weightChange: '-1kg',
      risk: '極小'
    },
    summary: '全天候型コース。疲労を残さず微調整できる。故障明けやレース当週の最終微調整に。',
    bestFor: 'レース当週の最終追い、体重微調整、連闘時。'
  },
  {
    id: 'pool',
    name: 'プール調教',
    intensity: '馬なり',
    effects: {
      speed: 1,
      stamina: 3,
      power: 1,
      guts: 1,
      fatigue: 1,
      weightChange: '-2kg',
      risk: '極小'
    },
    summary: '脚元への負担ゼロで心肺機能を鍛え、体重を絞る。疲労を抜くリフレッシュ効果もあり。',
    bestFor: '太め残り解消、脚元（ソエ・不安）を痛めている馬の運動維持。'
  },
  {
    id: 'gate',
    name: 'ゲート練習',
    intensity: '馬なり',
    effects: {
      speed: 1,
      stamina: 1,
      power: 2,
      guts: 2,
      fatigue: 2,
      weightChange: '-1kg',
      risk: '極小'
    },
    summary: 'スタートダッシュの成否を分ける重要調教。出遅れ癖を解消し、先行力を安定化。',
    bestFor: 'デビュー前必須、出遅れが目立つ逃げ・先行馬の矯正。'
  },
  {
    id: 'combined',
    name: '併せ馬 (ウッド/芝/坂路)',
    intensity: '一杯',
    effects: {
      speed: 5,
      stamina: 3,
      power: 4,
      guts: 5,
      fatigue: 5,
      weightChange: '-5kg',
      risk: '高'
    },
    summary: '他馬と並走することで闘争心（根性・気合い）を極限まで引き出す。効果は絶大だが疲労も最大。',
    bestFor: 'G1前哨戦や本番前の勝負仕上げ、気合い乗りの悪いズブい馬の刺激。'
  }
];

export const growthTypes: GrowthType[] = [
  {
    type: '早熟型',
    debut: '2歳6月〜8月（最速入厩）',
    peak: '2歳秋〜3歳春（朝日杯・阪神JF、クラシック前半）',
    retirement: '4歳春〜秋（能力減衰が早め）',
    strategy: '仕上がりが極めて早いため、2歳夏からガンガン使って2歳重賞を総なめにする。クラシック戦線（皐月賞・桜花賞・NHKマイルC）で賞金を荒稼ぎし、古馬になって衰えが見えたら無理せず繁殖入り。',
    keyComments: ['「かなり仕上がりが早い」「早い時期から動けそう」「夏のデビュー戦を目標に」']
  },
  {
    type: '普通型',
    debut: '2歳10月〜12月',
    peak: '3歳春〜4歳秋（日本ダービー、有馬記念、古馬王道）',
    retirement: '5歳秋〜6歳春',
    strategy: '最も王道で活躍期間の長いタイプ。2歳秋にデビューさせ、3歳のクラシック（三冠・牝馬三冠）にピークを合わせる。古馬になってもG1戦線で長期間主役を張れる。',
    keyComments: ['「順調に成長しています」「標準的な仕上がり」「クラシックを意識できる」']
  },
  {
    type: '晩成型',
    debut: '3歳1月〜4月（遅め）',
    peak: '4歳秋〜6歳（天皇賞・ジャパンC・海外遠征）',
    retirement: '7歳〜8歳',
    strategy: '2歳時はステータスが低く未勝利戦すら取りこぼすことがあるため焦りは禁物。3歳春まではウッドや坂路でじっくり基礎体力を鍛え、3歳夏以降の本格化から破竹の快進撃を狙う。',
    keyComments: ['「仕上がりは遅そう」「まだ時間がかかりそう」「奥が深そう」「本格化は先」']
  },
  {
    type: '持続・鍋底型',
    debut: '2歳秋〜3歳春',
    peak: '3歳〜5歳（鍋底は一度衰退したあと再上昇）',
    retirement: '6歳後半〜7歳',
    strategy: '能力のピーク期間が非常に長く続く。鍋底型は4歳頃に一度調子を落とすが、休養や軽めの調教で乗り切ると5歳以降に全盛期以上の強さに復活する伝説の成長タイプ。',
    keyComments: ['「息の長い活躍ができそう」「タフで衰えにくい」']
  }
];

export const weightAndFatigueGuide = {
  bestWeight: {
    title: 'ベスト馬体重の割り出し方',
    description: '競走馬は各自固有の「ベスト馬体重」を持っています。ベストから±2kg以内が出走時の理想コンディションです。',
    rules: [
      '初出走時：パドックで「太め」「細め」のコメントが出ない体重をメモ（これが暫定ベスト）',
      '「太め残り」「余裕がある」と言われた場合：ベスト体重は表示より4〜8kg下',
      '「馬体が寂しい」「細め」と言われた場合：ベスト体重は表示より4〜8kg上（能力が30%近く落ちる危険状態）',
      'レース翌週は休養・軽めの調整で+2〜+4kg増える。追切で-2〜-4kg絞る計算で出走週を逆算する'
    ]
  },
  fatigueManagement: {
    title: '疲労と故障（ソエ・屈腱炎・骨折）の完全防止マニュアル',
    signs: [
      '調教師コメント「少し疲れが溜まっています」「気配が冴えません」',
      'カイバ食いが悪い、毛ヅヤがくすんでいる',
      '調教時のタイムが急激に悪化、併せ馬で遅れる'
    ],
    rules: [
      '中2週以内の連闘・過密ローテは絶対に避ける（中3週〜4週が黄金サイクル）',
      '重賞出走後は必ず「放牧（3〜4週間）」に出して疲労ゲージを完全リセットする',
      '「ソエ（骨膜炎）」の予兆が出たら芝・併せ馬を中止し、坂路かポリトラック・プールに切り替える',
      '牧場施設に「温泉」を建設すると、放牧時の疲労回復スピードが倍増する'
    ]
  }
};
