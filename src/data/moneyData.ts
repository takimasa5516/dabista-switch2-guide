import { MoneyGuide, FarmFacility } from '../types';

export interface StaffMember {
  id: number;
  role: string;
  name: string;
  monthlyFee: number;
  effect: string;
  condition: string;
}

export const allStaffList: StaffMember[] = [
  { id: 1, role: '入厩スタッフ', name: '入江 駒知', monthlyFee: 10, effect: '育成馬の能力や適性に合ったおすすめ厩舎を提案', condition: '施設「事務所」を2段階目まで拡張' },
  { id: 2, role: '繁殖スタッフ', name: '知野 継造', monthlyFee: 10, effect: '繁殖牝馬に合わせたおすすめの種牡馬を提案', condition: '施設「事務所」を2段階目まで拡張' },
  { id: 3, role: 'セールスタッフ', name: '馬場 幸三', monthlyFee: 10, effect: 'セールで牧場資金に合わせたおすすめ上場馬を提案', condition: '施設「事務所」を2段階目まで拡張' },
  { id: 4, role: '事務スタッフ', name: '代田 しおり', monthlyFee: 40, effect: 'オーナーに代わって馬たちの様子を確認し、能力や適性を「育成メモ」に自動記録', condition: '施設「事務所」を2段階目まで拡張' },
  { id: 5, role: '育成馬スタッフ', name: '判沢 明', monthlyFee: 40, effect: '長年の相馬眼で育成馬の適性や性格を見抜く', condition: '施設「事務所」を2段階目まで拡張' },
  { id: 6, role: 'BC登録スタッフ', name: '登 美羽', monthlyFee: 10, effect: '一年の締めくくりに元気な入厩馬をブリーダーズカップに自動登録', condition: '施設「事務所」を2段階目まで拡張' },
  { id: 7, role: '獣医師', name: 'Dr.啓司', monthlyFee: 30, effect: '定期診療で故障を防ぎ、骨折・ハ行の発生を限りなく抑制', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 8, role: '理学療法士', name: '曽江 直子', monthlyFee: 30, effect: '日々のケアで屈腱炎・ソエの発生を限りなく抑制', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 9, role: '庭師', name: '植木 茂', monthlyFee: 20, effect: '放牧地を手入れし、放牧馬の疲労回復を促進', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 10, role: '装蹄師', name: '日詰 守', monthlyFee: 10, effect: '落鉄を限りなく抑制（蹄鉄工房があれば絶対に落鉄しない）', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 11, role: '芝走路スタッフ', name: '芝田 大輔', monthlyFee: 50, effect: '芝調教でスピード能力を引き出し、早期からの活躍を促す', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 12, role: '坂路スタッフ', name: '坂上 一本', monthlyFee: 50, effect: '坂路調教でパワーを引き出し、早期からの活躍を促す', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 13, role: 'ダート走路スタッフ', name: '土橋 沙苗', monthlyFee: 50, effect: 'ダート調教でスタミナ能力を引き出し、早期からの活躍を促す', condition: '施設「事務所」を3段階目まで拡張' },
  { id: 14, role: '併せ走路スタッフ', name: '二藤 駆', monthlyFee: 50, effect: '併せ馬調教で根性を引き出し、早期からの活躍を促す', condition: '施設「事務所」を3段階目まで拡張' }
];

// 公式実機データ：全39件の牧場施設完全マスタ
export const allFarmFacilities: FarmFacility[] = [
  { id: 1, name: '事務所', star: 1, cost: 0, costText: '無料（初期）', effect: '牧場に関する記録を管理。拡張することで雇用できるスタッフが増加', condition: '初期から', category: '基本施設' },
  { id: 2, name: '事務所', star: 2, cost: 5000, costText: '5,000万円', effect: '拡張することで雇用できるスタッフが更に増加（代田しおり、知野継造等）', condition: '条件なし（資金のみ）', category: '基本施設' },
  { id: 3, name: '事務所', star: 3, cost: 10000, costText: '1億円', effect: 'たくさんのスタッフが雇える最大事務所（獣医Dr.啓司、理学療法士、走路スタッフ等）', condition: '事務所★★建設', category: '基本施設' },
  { id: 4, name: '厩舎・牧柵', star: 1, cost: 0, costText: '無料（初期）', effect: '繁殖牝馬3頭・種牡馬2頭を管理可能', condition: '初期から', category: '基本施設' },
  { id: 5, name: '厩舎・牧柵', star: 2, cost: 5000, costText: '5,000万円', effect: '繁殖牝馬6頭・種牡馬4頭に拡張', condition: '条件なし（資金のみ）', category: '基本施設' },
  { id: 6, name: '厩舎・牧柵', star: 3, cost: 10000, costText: '1億円', effect: '繁殖牝馬12頭・種牡馬6頭に拡張', condition: '厩舎・牧柵★★建設', category: '基本施設' },
  { id: 7, name: '厩舎・牧柵', star: 4, cost: 15000, costText: '1億5,000万円', effect: '繁殖牝馬24頭・種牡馬8頭に拡張（最大レベル）', condition: '厩舎・牧柵★★★建設', category: '基本施設' },
  { id: 8, name: '病院', star: 1, cost: 15000, costText: '1億5,000万円', effect: '入厩馬のための医療施設。骨折などの故障防止に役立つ', condition: '入厩馬を自分で放牧', category: '療養・医療' },
  { id: 9, name: '病院', star: 2, cost: 30000, costText: '3億円', effect: '入厩馬の骨折などの重度故障防止効果がさらに向上', condition: '病院★建設', category: '療養・医療' },
  { id: 10, name: '温泉', star: 1, cost: 15000, costText: '1億5,000万円', effect: '入厩馬のための療養施設。屈腱炎などの故障防止に役立つ', condition: '入厩馬を自分で帰厩', category: '療養・医療' },
  { id: 11, name: '温泉', star: 2, cost: 30000, costText: '3億円', effect: '屈腱炎などの故障防止に加え、故障時の治りも格段に早くなる', condition: '温泉★建設', category: '療養・医療' },
  { id: 12, name: '飼い葉畑', star: 1, cost: 15000, costText: '1億5,000万円', effect: '馬のご飯となる飼い葉を育てる。放牧中の馬体重回復に役立つ', condition: '入厩馬を10回調教', category: '療養・医療' },
  { id: 13, name: '森林馬道', star: 1, cost: 15000, costText: '1億5,000万円', effect: 'リラックス効果が得られる自然散歩道。放牧中の疲労回復を大幅促進', condition: 'レースに5回出走', category: '療養・医療' },
  { id: 14, name: '森林馬道', star: 2, cost: 30000, costText: '3億円', effect: '放牧中の疲労回復促進に加え、休み明け初戦もイレ込みにくくなる', condition: '森林馬道★建設', category: '療養・医療' },
  { id: 15, name: '子宝地蔵', star: 1, cost: 10000, costText: '1億円', effect: '子宝祈願のご利益。種付け時に受胎しやすくなる', condition: '種付けを3回実施', category: '地蔵・祈願' },
  { id: 16, name: '馬頭観音', star: 1, cost: 10000, costText: '1億円', effect: '健康祈願のご利益。牧場の繁殖馬たちがより長生きできる', condition: 'レースに3回勝利', category: '地蔵・祈願' },
  { id: 17, name: '芝コース', star: 1, cost: 8000, costText: '8,000万円', effect: '育成中に芝調教を実施。入厩時のスピード基礎能力が高まる', condition: '入厩馬を30回芝調教', category: '調教コース' },
  { id: 18, name: '芝コース', star: 2, cost: 25000, costText: '2億5,000万円', effect: '入厩時のスピード能力がさらに大幅に高まる', condition: '芝コース★建設', category: '調教コース' },
  { id: 19, name: '坂路コース', star: 1, cost: 8000, costText: '8,000万円', effect: '育成中に坂路調教を実施。入厩時のパワー基礎能力が高まる', condition: '入厩馬を30回坂路調教', category: '調教コース' },
  { id: 20, name: '坂路コース', star: 2, cost: 25000, costText: '2億5,000万円', effect: '入厩時のパワー能力がさらに大幅に高まる', condition: '坂路コース★建設', category: '調教コース' },
  { id: 21, name: '併せコース', star: 1, cost: 8000, costText: '8,000万円', effect: '育成中に併せ調教を実施。入厩時の勝負根性が高まる', condition: '入厩馬を30回併せ調教', category: '調教コース' },
  { id: 22, name: '併せコース', star: 2, cost: 25000, costText: '2億5,000万円', effect: '入厩時の勝負根性がさらに大幅に高まる', condition: '併せコース★建設', category: '調教コース' },
  { id: 23, name: 'ダートコース', star: 1, cost: 8000, costText: '8,000万円', effect: '育成中にダート調教を実施。入厩時のスタミナ基礎能力が高まる', condition: '入厩馬を30回ダート調教', category: '調教コース' },
  { id: 24, name: 'ダートコース', star: 2, cost: 25000, costText: '2億5,000万円', effect: '入厩時のスタミナ能力がさらに大幅に高まる', condition: 'ダートコース★建設', category: '調教コース' },
  { id: 25, name: 'ゲート', star: 1, cost: 2000, costText: '2,000万円', effect: '育成中にゲート練習を実施。入厩時のスタート能力が高まる', condition: '入厩馬を30回ゲート調教', category: '調教コース' },
  { id: 26, name: 'ウォーキングマシン', star: 1, cost: 100000, costText: '10億円', effect: '放牧中に運動ができる施設。放牧中の能力低下抑制・気合乗り・馬体重によい影響', condition: '牧場開設10周年', category: '特別施設' },
  { id: 27, name: '蹄鉄工房', star: 1, cost: 10000, costText: '1億円', effect: '馬の蹄鉄を作る工房。建設することでレース中の落鉄を完全に防止', condition: 'レースに10回出走', category: '特別施設' },
  { id: 28, name: '検疫所', star: 1, cost: 30000, costText: '3億円', effect: '海外馬の検疫施設。毎年3月に海外種牡馬株（Galileo等）を受け入れ可能（購入後は無料種付け）', condition: '海外種牡馬の産駒を2歳セリで購入', category: '特別施設' },
  { id: 29, name: '検疫所', star: 2, cost: 60000, costText: '6億円', effect: '海外種牡馬株の受け入れ枠がさらに拡張', condition: '検疫所★建設', category: '特別施設' },
  { id: 30, name: '牡地蔵', star: 1, cost: 50000, costText: '5億円', effect: '種付け時にお参りすることで産まれてくる仔馬が牡馬になりやすくなる', condition: '牡馬を30頭生産', category: '地蔵・祈願' },
  { id: 31, name: '牡地蔵', star: 2, cost: 60000, costText: '6億円', effect: '牡馬誕生の確率がさらに上昇', condition: '牡地蔵★建設', category: '地蔵・祈願' },
  { id: 32, name: '牡地蔵', star: 3, cost: 70000, costText: '7億円', effect: '牡馬誕生の確率がさらに上昇', condition: '牡地蔵★★建設', category: '地蔵・祈願' },
  { id: 33, name: '牡地蔵', star: 4, cost: 80000, costText: '8億円', effect: '牡馬誕生の確率が大幅に上昇', condition: '牡地蔵★★★建設', category: '地蔵・祈願' },
  { id: 34, name: '牡地蔵', star: 5, cost: 90000, costText: '9億円', effect: '【究極効果】産まれてくる仔馬が「必ず牡馬」になる！（最大レベル）', condition: '牡地蔵★★★★建設', category: '地蔵・祈願' },
  { id: 35, name: '牝地蔵', star: 1, cost: 50000, costText: '5億円', effect: '種付け時にお参りすることで産まれてくる仔馬が牝馬になりやすくなる', condition: '牝馬を30頭生産', category: '地蔵・祈願' },
  { id: 36, name: '牝地蔵', star: 2, cost: 60000, costText: '6億円', effect: '牝馬誕生の確率がさらに上昇', condition: '牝地蔵★建設', category: '地蔵・祈願' },
  { id: 37, name: '牝地蔵', star: 3, cost: 70000, costText: '7億円', effect: '牝馬誕生の確率がさらに上昇', condition: '牝地蔵★★建設', category: '地蔵・祈願' },
  { id: 38, name: '牝地蔵', star: 4, cost: 80000, costText: '8億円', effect: '牝馬誕生の確率が大幅に上昇', condition: '牝地蔵★★★建設', category: '地蔵・祈願' },
  { id: 39, name: '牝地蔵', star: 5, cost: 90000, costText: '9億円', effect: '【究極効果】産まれてくる仔馬が「必ず牝馬」になる！（最大レベル）', condition: '牝地蔵★★★★建設', category: '地蔵・祈願' }
];

export const moneyGuides: MoneyGuide[] = [
  {
    id: 'mode-selection',
    stage: '初期設定（モード選択）',
    title: '「カジュアルモード」と「レガシーモード」の決定的な違い',
    summary: 'Switch2版ではゲーム開始時に2つのモードを選択できます。序盤の破産リスクを回避する最重要ポイントです。',
    steps: [
      '【カジュアルモード（初心者推奨）】初期自己資金が「1億円」でスタート。各種サポートが手厚く、最大の特長として「破産ゲームオーバーが存在しない」。',
      '【レガシーモード（旧作経験者向け）】初期自己資金が「3,000万円」スタート。従来のダビスタ同様、資金ショートによる破産ゲームオーバーが存在する。',
      '【破産時の救済措置】レガシーモードで破産した場合でも、カジュアルモードに変更してセーブデータをそのまま継続することが可能！'
    ],
    recommendedSiresOrHorses: [
      '初心者や配合研究を存分に楽しみたい方は、まず「カジュアルモード」で始めるのが絶対におすすめ。'
    ],
    caution: 'レガシーモードで挑む場合は、後述のミッション達成やコスパ種牡馬選定を厳格に行いましょう。'
  },
  {
    id: 'missions-reward',
    stage: 'ミッション活用術',
    title: 'ビギナー＆育成ミッションで数百万円＋重要施設を即時獲得',
    summary: 'Switch2版で新設された「ミッション機能」は、序盤最大の資金＆施設供給源です。',
    steps: [
      '【ビギナーミッション即時制覇】ダビスタチャンネル動画視聴（50万）、育成馬入厩（50万）、調教（50万）、出走登録（50万）、出走（50万）、勝利（50万）などをこなすだけで手元に数百万円が即時入金される。',
      '【重要施設がミッション報酬・出走数で解放】10回出走で「蹄鉄工房（落鉄防止）」、3回勝利で「馬頭観音」が解放。',
      '【調教数による各コース解放】芝・坂路・ダート・併せ・ゲートを各30回調教することで、牧場にコースを建設できるようになり、仔馬の入厩時ステータスが恒久的に底上げされる！'
    ],
    caution: 'ゲーム開始直後はミッション一覧を確認し、達成できるものから順次クリアしていきましょう。'
  },
  {
    id: 'betting-trick',
    stage: '実機馬券術＆小ネタ',
    title: 'Switch2実機仕様：馬券ミッション一撃達成＆堅実錬金術',
    summary: '前作Switch版の「本体時間変更による確定着順閲覧裏技」は今作では完全対策され無効化。実機に即した新仕様と小ネタを活用します。',
    steps: [
      '【馬券ミッションの小ネタ】ミッションの『X回馬券を当てる』はレース数判定ではなく「的中した馬券の枚数判定」！そのため、圧倒的1番人気の複勝を1レースで100枚買えば、1レース当てるだけで100回達成ミッションが一発クリアできる。',
      '【パドックでの危険馬排除】今作は人気馬で順当に決まる傾向が強い。パドックで「イレ込み」「調整不足」「気配冴えない」のコメントが出ている人気馬を消すことで的中率が跳ね上がる。',
      '【三連単フォーメーション絞り】抜けた本命がいるレースで、1着固定・2〜3着に調子の良い上位人気2〜3頭を絞って流す。',
      '【セーブデータの複製活用】大一番の前にセーブデータを複製しておき、資金ショートのリスクヘッジを行う。'
    ],
    caution: '大穴狙いで資金を溶かすのは厳禁。パドック気配の良い人気馬の複勝転がしが最も安全です。'
  },
  {
    id: 'local-and-sale',
    stage: '中盤以降の経営術',
    title: '地方競馬5場遠征 ＆ 1月4週繁殖セール厳選テクニック',
    summary: '今作から追加された地方競馬（大井・川崎・船橋・浦和・盛岡）と、繁殖セール複製技で資産を爆発的に増やします。',
    steps: [
      '【地方重賞（ダート）の賞金総なめ】中央の強豪が集まる芝G1より、地方競馬の交流重賞（Jpn2・Jpn3）は手薄。ダート馬を送り込んで3,000万〜5,000万円の1着賞金を連続獲得。',
      '【1月4週セーブデータ複製】繁殖牝馬セール直前の1月4週データを複製しておくことで、セリ市に目当ての良血牝馬（アーモンドアイや高額牝馬）が登場するまで厳選が可能。',
      '【1歳馬セリでの高値売り抜け】牧場コメントで「スピード」「大物」が出た1歳馬を、自分で走らせずセリに出品して数千万円〜数億円の即時キャッシュを獲得。'
    ],
    recommendedSiresOrHorses: [
      'ドレフォン産駒（ダート◎、早熟で地方重賞荒稼ぎ）',
      'ナダル産駒（ダート◎、パワー抜群）',
      'シニスターミニスター産駒、ヘニーヒューズ産駒'
    ],
    caution: '地方競馬への遠征は輸送による馬体重減少（-4kg〜-8kg）が発生するため、出走前に太め（+4kg）に仕上げておくのがコツ。'
  },
  {
    id: 'overseas-stallion-unlock',
    stage: '終盤（牧場完成後）',
    title: '【重要解禁】海外種牡馬（Galileo・Dubawi等）株の購入＆無料種付け手順',
    summary: '世界最強クラスの海外種牡馬（Galileo、Dubawi、Frankel、Cracksman等）は初期状態では種付けできません。以下の手順で解禁します。',
    steps: [
      '【ステップ1】2歳セリ市で「父馬の名前が英語表記」の海外種牡馬産駒を落札・購入する。',
      '【ステップ2】購入後、牧場施設「検疫所（建設費3億円）」が建設可能になるため即建設する。',
      '【ステップ3】検疫所があると、毎年3月に海外種牡馬の種牡馬株を購入できるようになる。',
      '【ステップ4】株を購入した海外種牡馬は、以降毎年の種付け料が「完全無料（0円）」で配合可能になる！'
    ],
    recommendedSiresOrHorses: [
      'Galileo（サドラーズウェルズ系・最強牝馬ラヴズオンリーミー等と神配合）',
      'Dubawi（ドバイミレニアム系・レディオブオペラやサマーハと抜群の相性）',
      'Cracksman（見事＋凝った配合が狙える優良海外馬）'
    ],
    caution: 'サンデーサイレンス、ノーザンテースト、リアルシャダイ、マルゼンスキー、オグリキャップなどの伝説名馬も初期は使用不可。特定ミッションや実績達成で解放されます。'
  }
];

export const initialFarmExpansionPriority = [
  { priority: '第1位', facility: '事務所拡張（★★〜★★★）', cost: '5,000万〜1億円', reason: '事務スタッフ（代田しおり：育成メモ自動記録）や各種走路スタッフ、獣医師を雇用するための絶対的前提条件！' },
  { priority: '第2位', facility: '坂路コース（★〜★★）', cost: '8,000万〜2億5,000万円', reason: '入厩時のパワー能力が恒久的に底上げされる最重要走路施設。入厩馬の坂路調教30回で解放。' },
  { priority: '第3位', facility: '温泉施設（★〜★★）', cost: '1億5,000万〜3億円', reason: '屈腱炎などの故障を防止し、★★で故障の治りも劇的に短縮。入厩馬を自分で帰厩させると解放。' },
  { priority: '第4位', facility: '蹄鉄工房（★）', cost: '1億円', reason: 'レース中の落鉄事故を100%完全防止。レース10回出走で解放される。' },
  { priority: '第5位', facility: '検疫所（★）', cost: '3億円', reason: '海外種牡馬株（Galileo等）を受け入れるための必須施設。海外種牡馬産駒の購入で解放。' },
  { priority: '第6位', facility: '牡地蔵・牝地蔵（★〜★★★★★）', cost: '5億〜9億円', reason: 'エンドコンテンツ。★5まで拡張すると産まれてくる仔馬の性別が100%固定される超強力施設！' }
];
