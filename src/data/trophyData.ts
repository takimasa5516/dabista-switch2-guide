import { TrophyRace, SpecialTitle } from '../types';

export const trophyRaces: TrophyRace[] = [
  // 2歳G1
  { id: 'hanshin-jf', name: '阪神ジュベナイルフィリーズ', grade: 'G1', course: '芝1600m', racecourse: '阪神', season: '2歳秋', category: '2歳G1' },
  { id: 'asahi-fs', name: '朝日杯フューチュリティステークス', grade: 'G1', course: '芝1600m', racecourse: '阪神', season: '2歳秋', category: '2歳G1' },
  { id: 'hopeful-s', name: 'ホープフルステークス', grade: 'G1', course: '芝2000m', racecourse: '中山', season: '2歳秋', category: '2歳G1' },

  // 3歳クラシック・マイル
  { id: 'oka-sho', name: '桜花賞', grade: 'G1', course: '芝1600m', racecourse: '阪神', season: '3歳春', category: 'クラシック' },
  { id: 'satsuki-sho', name: '皐月賞', grade: 'G1', course: '芝2000m', racecourse: '中山', season: '3歳春', category: 'クラシック' },
  { id: 'nhk-mile', name: 'NHKマイルカップ', grade: 'G1', course: '芝1600m', racecourse: '東京', season: '3歳春', category: '短距離・マイル' },
  { id: 'oaks', name: '優駿牝馬（オークス）', grade: 'G1', course: '芝2400m', racecourse: '東京', season: '3歳春', category: 'クラシック' },
  { id: 'derby', name: '東京優駿（日本ダービー）', grade: 'G1', course: '芝2400m', racecourse: '東京', season: '3歳春', category: 'クラシック' },
  { id: 'shuka-sho', name: '秋華賞', grade: 'G1', course: '芝2000m', racecourse: '京都', season: '3歳秋', category: '牝馬限定' },
  { id: 'kikuka-sho', name: '菊花賞', grade: 'G1', course: '芝3000m', racecourse: '京都', season: '3歳秋', category: 'クラシック' },

  // 古馬王道
  { id: 'osaka-hai', name: '大阪杯', grade: 'G1', course: '芝2000m', racecourse: '阪神', season: '4歳上春', category: '古馬王道' },
  { id: 'tenno-spring', name: '天皇賞（春）', grade: 'G1', course: '芝3200m', racecourse: '京都', season: '4歳上春', category: '古馬王道' },
  { id: 'takarazuka', name: '宝塚記念', grade: 'G1', course: '芝2200m', racecourse: '阪神', season: '4歳上春', category: '古馬王道' },
  { id: 'tenno-autumn', name: '天皇賞（秋）', grade: 'G1', course: '芝2000m', racecourse: '東京', season: '4歳上秋', category: '古馬王道' },
  { id: 'japan-cup', name: 'ジャパンカップ', grade: 'G1', course: '芝2400m', racecourse: '東京', season: '4歳上秋', category: '古馬王道' },
  { id: 'arima-kinen', name: '有馬記念', grade: 'G1', course: '芝2500m', racecourse: '中山', season: '4歳上秋', category: '古馬王道' },

  // 短距離・マイル
  { id: 'takamatsunomiya', name: '高松宮記念', grade: 'G1', course: '芝1200m', racecourse: '中京', season: '4歳上春', category: '短距離・マイル' },
  { id: 'yasuda-kinen', name: '安田記念', grade: 'G1', course: '芝1600m', racecourse: '東京', season: '4歳上春', category: '短距離・マイル' },
  { id: 'sprinters-s', name: 'スプリンターズステークス', grade: 'G1', course: '芝1200m', racecourse: '中山', season: '4歳上秋', category: '短距離・マイル' },
  { id: 'mile-cs', name: 'マイルチャンピオンシップ', grade: 'G1', course: '芝1600m', racecourse: '京都', season: '4歳上秋', category: '短距離・マイル' },

  // 牝馬限定
  { id: 'victoria-mile', name: 'ヴィクトリアマイル', grade: 'G1', course: '芝1600m', racecourse: '東京', season: '4歳上春', category: '牝馬限定' },
  { id: 'queen-elizabeth', name: 'エリザベス女王杯', grade: 'G1', course: '芝2200m', racecourse: '京都', season: '4歳上秋', category: '牝馬限定' },

  // ダート
  { id: 'february-s', name: 'フェブラリーステークス', grade: 'G1', course: 'ダート1600m', racecourse: '東京', season: '4歳上春', category: 'ダート' },
  { id: 'champions-cup', name: 'チャンピオンズカップ', grade: 'G1', course: 'ダート1800m', racecourse: '中京', season: '4歳上秋', category: 'ダート' },
  { id: 'tokyo-daishoten', name: '東京大賞典', grade: 'G1', course: 'ダート2000m', racecourse: '大井', season: '4歳上秋', category: 'ダート' },
  { id: 'teio-sho', name: '帝王賞', grade: 'Jpn1', course: 'ダート2000m', racecourse: '大井', season: '4歳上春', category: 'ダート' },

  // 海外遠征
  { id: 'arc', name: '凱旋門賞', grade: '海外G1', course: '芝2400m', racecourse: 'パリ・ロンシャン', season: '4歳上秋', category: '海外遠征' },
  { id: 'dubai-wc', name: 'ドバイワールドカップ', grade: '海外G1', course: 'ダート2000m', racecourse: 'メイダン', season: '4歳上春', category: '海外遠征' },
  { id: 'bc-classic', name: 'BCクラシック', grade: '海外G1', course: 'ダート2000m', racecourse: 'アメリカ', season: '4歳上秋', category: '海外遠征' }
];

export const specialTitles: SpecialTitle[] = [
  {
    id: 'triple-crown',
    title: 'クラシック三冠馬',
    races: ['satsuki-sho', 'derby', 'kikuka-sho'],
    reward: '歴史的名馬の称号 / 種牡馬入り時の価格跳ね上がり',
    description: '皐月賞・日本ダービー・菊花賞のすべてを同一年度に制覇した至高の称号。'
  },
  {
    id: 'triple-tiara',
    title: '牝馬三冠（トリプルティアラ）',
    races: ['oka-sho', 'oaks', 'shuka-sho'],
    reward: '殿堂入り確定 / 繁殖牝馬としての価値最高ランク',
    description: '桜花賞・オークス・秋華賞の3大牝馬クラシックを完全制覇。'
  },
  {
    id: 'autumn-triple-crown',
    title: '秋古馬三冠',
    races: ['tenno-autumn', 'japan-cup', 'arima-kinen'],
    reward: '数億円の特別報奨金ボーナス支給',
    description: '天皇賞(秋)・ジャパンカップ・有馬記念を同一年に連勝した最強古馬の証明。'
  },
  {
    id: 'spring-triple-crown',
    title: '春古馬三冠',
    races: ['osaka-hai', 'tenno-spring', 'takarazuka'],
    reward: '特別ボーナス報奨金',
    description: '大阪杯・天皇賞(春)・宝塚記念の春の中長距離王道を完全制圧。'
  },
  {
    id: 'sprint-king',
    title: '春秋スプリント王',
    races: ['takamatsunomiya', 'sprinters-s'],
    reward: '最優秀短距離馬タイトル',
    description: '高松宮記念とスプリンターズSの芝1200m頂上決戦を両制覇。'
  },
  {
    id: 'mile-king',
    title: '春秋マイル王',
    races: ['yasuda-kinen', 'mile-cs'],
    reward: '最優秀マイラータイトル',
    description: '安田記念とマイルCSを同一年に制覇した絶対的スピードの象徴。'
  },
  {
    id: 'dirt-master',
    title: 'ダート完全制覇',
    races: ['february-s', 'champions-cup', 'tokyo-daishoten'],
    reward: '最優秀ダートホース',
    description: 'JRAフェブラリーS、チャンピオンズC、そして大井の東京大賞典を全制覇。'
  },
  {
    id: 'world-conqueror',
    title: '世界完全制覇 (凱旋門賞制覇)',
    races: ['arc'],
    reward: 'ダビスタ完全エンディング到達！',
    description: '日本競馬界悲願の凱旋門賞（ロンシャン芝2400m）を勝利した世界最強の証。'
  }
];
