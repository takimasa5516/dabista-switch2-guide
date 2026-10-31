import React, { useState } from 'react';
import {
  breedingTheories,
  inbreedingAncestors,
  breedingTheoryPriorities,
  recommendedBreedingRecipes,
  earlyRecommendedBroodmares,
  strongestBroodmares
} from '../data/breedingData';
import { BreedingTheory } from '../types';
import {
  Dna,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BookmarkCheck,
  Trophy,
  Shield,
  Zap,
  Layers,
  Flame,
  Star,
  Info,
  Heart,
  TrendingUp,
  Award
} from 'lucide-react';

interface BreedingSectionProps {
  searchQuery: string;
}

export const BreedingSection: React.FC<BreedingSectionProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'priority' | 'recipes' | 'broodmares' | 'theories' | 'ancestors'>('priority');
  const [broodmareType, setBroodmareType] = useState<'early' | 'strongest'>('early');
  const [selectedTheory, setSelectedTheory] = useState<string | null>('kottamatch');
  const [filterBadge, setFilterBadge] = useState<string>('all');

  const filteredTheories = breedingTheories.filter((theory) => {
    const matchesSearch =
      theory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theory.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theory.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theory.effects.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBadge = filterBadge === 'all' || theory.badge === filterBadge;

    return matchesSearch && matchesBadge;
  });

  const getBadgeStyle = (badge: BreedingTheory['badge']) => {
    switch (badge) {
      case '最重要':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case '必須':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case '上級':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      case '注意':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Tier 1':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-950 font-black';
      case 'Tier 2':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold';
      case 'Tier 3':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold';
      case 'Tier 4':
        return 'bg-purple-500/20 text-purple-400 border border-purple-500/40 font-bold';
      default:
        return 'bg-slate-700/60 text-slate-300 border border-slate-600 font-bold';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900 border border-blue-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 mb-2">
              <Dna className="w-3.5 h-3.5" />
              <span>血統と配合の真理</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              配合理論の優先順位 ＆ 王道組み合わせガイド
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              「どの理論から優先して狙うべきか？」のTierランキングから、G1を勝つための王道組み合わせレシピ、全理論の成立条件まで徹底網羅。
            </p>
          </div>

          {/* サブナビゲーション */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/80 border border-slate-700 p-1.5 rounded-xl self-stretch lg:self-auto justify-start sm:justify-end">
            <button
              onClick={() => setActiveSubTab('priority')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'priority' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>理論優先順位 (Tier)</span>
            </button>
            <button
              onClick={() => setActiveSubTab('recipes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'recipes' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>目的別王道レシピ</span>
            </button>
            <button
              onClick={() => setActiveSubTab('broodmares')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'broodmares' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>おすすめ牝馬ランキング</span>
            </button>
            <button
              onClick={() => setActiveSubTab('theories')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'theories' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>全配合理論一覧</span>
            </button>
            <button
              onClick={() => setActiveSubTab('ancestors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'ancestors' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>祖先因子・クロス表</span>
            </button>
          </div>
        </div>
      </div>

      {/* サブタブ1: 配合理論優先順位 (Tier表) */}
      {activeSubTab === 'priority' && (
        <div className="space-y-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    配合理論の実戦優先順位ランキング（Tier 1〜5）
                  </h3>
                  <p className="text-xs text-slate-400">
                    限られた資金と繁殖牝馬で最強馬を作るために「どの理論を最優先すべきか」の明確な答え
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full self-start sm:self-auto">
                最新攻略メタ準拠
              </span>
            </div>

            {/* 優先順位カード一覧 */}
            <div className="space-y-3.5">
              {breedingTheoryPriorities.map((item) => (
                <div
                  key={item.rank}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-all ${
                    item.rank === 1
                      ? 'bg-amber-950/20 border-amber-500/50 shadow-md'
                      : item.rank === 2
                      ? 'bg-orange-950/20 border-orange-500/40'
                      : 'bg-slate-900/70 border-slate-700/60'
                  }`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-md ${getTierColor(item.tier)}`}>
                        {item.tier} (第{item.rank}位)
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-white">
                        {item.theoryName}
                      </h4>
                      <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {item.role}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-amber-300">【優先される理由】</strong> {item.whyPriority}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                      <span className="text-slate-400">推奨シナジー:</span>
                      {item.synergyWith.map((syn, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/80 md:w-48 text-center flex-shrink-0">
                    <span className="text-[10px] text-slate-400 block font-medium">推奨ステージ</span>
                    <span className="text-xs font-bold text-amber-200 mt-0.5 block">{item.targetStage}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 完璧な配合の落とし穴コラム */}
            <div className="bg-rose-950/20 border border-rose-500/40 rounded-xl p-4 space-y-2 mt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>要注意！「完璧な配合」に潜む最大の落とし穴</span>
              </div>
              <p className="leading-relaxed">
                「完璧な配合（面白＋見事）」は最高峰の理論ですが、<strong>血統の成立条件が極めて厳しく、選べる種牡馬が極端に制限される</strong>という大きなデメリットがあります。<br />
                無理に完璧な配合を成立させようとして、<strong>「実績C・距離適性の狭い微妙な種牡馬」</strong>を付けるくらいなら、<strong>「凝った配合 ＋ 実績A・底力Aの優良種牡馬（キタサンブラックやキズナ等）」</strong>を配合した方が、圧倒的にスピードと能力の高い名馬が誕生します！
              </p>
            </div>
          </div>
        </div>
      )}

      {/* サブタブ2: 目的別王道レシピ */}
      {activeSubTab === 'recipes' && (
        <div className="space-y-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-700/80 pb-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  目的別・ステージ別の王道配合レシピ（4大黄金パターン）
                </h3>
                <p className="text-xs text-slate-400">
                  何を作りたいか（三冠馬・賞金稼ぎ・短距離爆発・最強馬）に応じたベストな配合の組み合わせ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedBreedingRecipes.map((recipe, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 sm:p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50 inline-block">
                      {recipe.targetGoal}
                    </span>
                    <h4 className="text-sm sm:text-base font-extrabold text-white">
                      {recipe.name}
                    </h4>

                    {/* 成立理論タグ */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {recipe.theories.map((th, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-blue-950/50 text-blue-300 border border-blue-800/60 font-medium">
                          {th}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {recipe.description}
                    </p>

                    {/* メリット */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[11px] font-bold text-emerald-400 block">【このレシピの強み】</span>
                      {recipe.merits.map((m, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/20 p-2.5 rounded-lg text-xs text-amber-200 mt-3">
                    <strong>注意点:</strong> {recipe.caution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* サブタブ: おすすめ繁殖牝馬ランキング（公式エンジン採点TOP） */}
      {activeSubTab === 'broodmares' && (
        <div className="space-y-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    おすすめ繁殖牝馬ランキング（公式全頭採点データ準拠）
                  </h3>
                  <p className="text-xs text-slate-400">
                    全327頭の繁殖牝馬×全237頭の種牡馬（全77,499通り）を公式エンジンで評価した実力派牝馬たち
                  </p>
                </div>
              </div>

              {/* 切替トグル */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
                <button
                  onClick={() => setBroodmareType('early')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    broodmareType === 'early'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  序盤おすすめ TOP7 (8,000万以下)
                </button>
                <button
                  onClick={() => setBroodmareType('strongest')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    broodmareType === 'strongest'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  最強繁殖牝馬 TOP10 (制限なし)
                </button>
              </div>
            </div>

            {/* 解説コラム */}
            <div className="bg-slate-900/70 border border-slate-700/70 rounded-xl p-3 sm:p-4 text-xs text-slate-300 leading-relaxed">
              {broodmareType === 'early' ? (
                <div>
                  <strong className="text-amber-400">【序盤おすすめ牝馬の選定基準】</strong><br />
                  購入価格8,000万円以下の通常販売牝馬から、安価な種牡馬（100万円未満〜数百万円）と「ニックス★★★」「凝った配合」が成立しやすく、初期資金が少なくても高確率で重賞馬を生み出せる層の厚い牝馬を厳選。
                </div>
              ) : (
                <div>
                  <strong className="text-amber-400">【最強繁殖牝馬の選定基準】</strong><br />
                  価格制限・種牡馬制限を完全撤廃。海外種牡馬（GalileoやDubawi等）や高額種牡馬も含めた上位20頭の配合スコア合計でランキング。全世代で最強のチャンピオン・BC制覇馬を量産する最高峰牝馬たちです。
                </div>
              )}
            </div>

            {/* 牝馬カード一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(broodmareType === 'early' ? earlyRecommendedBroodmares : strongestBroodmares).map((bm) => (
                <div
                  key={bm.rank}
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                    bm.rank === 1
                      ? 'bg-gradient-to-br from-rose-950/30 via-slate-900 to-amber-950/20 border-rose-500/50 shadow-lg'
                      : bm.rank <= 3
                      ? 'bg-slate-900/80 border-amber-500/40'
                      : 'bg-slate-900/60 border-slate-700/60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* ヘッダー */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                            bm.rank === 1 ? 'bg-rose-500 text-white' :
                            bm.rank === 2 ? 'bg-amber-500 text-slate-950 font-black' :
                            bm.rank === 3 ? 'bg-amber-700 text-amber-100 font-bold' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            第{bm.rank}位
                          </span>
                          <span className="text-[11px] text-slate-400">{bm.lineage}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-white">
                          {bm.name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-amber-400 font-mono">
                          {bm.priceText}
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          上位20頭: {bm.top20TotalScore}pt
                        </span>
                      </div>
                    </div>

                    {/* 能力ステータス */}
                    <div className="grid grid-cols-5 gap-1 text-center bg-slate-800/60 p-2 rounded-xl text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">スピード</span>
                        <span className="font-bold text-white">{bm.speed}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">スタミナ</span>
                        <span className="font-bold text-white">{bm.stamina}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">パワー</span>
                        <span className="font-bold text-white">{bm.power}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">体質/気性</span>
                        <span className="font-bold text-emerald-400">{bm.health} / {bm.temper}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">ダート</span>
                        <span className="font-bold text-amber-300">{bm.dirt}</span>
                      </div>
                    </div>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1.5">
                      {bm.theoryTags.map((tag, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* ベスト配合パートナー */}
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">最初の推奨相手:</span>
                        <span className="text-amber-400 font-mono font-bold">配合スコア {bm.partnerScore}pt</span>
                      </div>
                      <div className="text-xs font-bold text-white flex items-center justify-between">
                        <span>{bm.partnerSire} ({bm.partnerSireFee})</span>
                        <span className="text-slate-300 font-normal font-mono">初期合計: {bm.totalInitialCost}</span>
                      </div>
                    </div>

                    {/* 特徴・解説 */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {bm.features}
                    </p>
                  </div>

                  {bm.caution && (
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-yellow-300/90 flex items-start gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span>{bm.caution}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* サブタブ3: 全配合理論一覧 */}
      {activeSubTab === 'theories' && (
        <div className="space-y-4">
          {/* カテゴリバッジフィルター */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {['all', '最重要', '必須', '上級', '基礎', '注意'].map((badge) => (
              <button
                key={badge}
                onClick={() => setFilterBadge(badge)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  filterBadge === badge
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50 font-bold'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {badge === 'all' ? 'すべての理論' : badge}
              </button>
            ))}
          </div>

          {/* 配合理論一覧リスト */}
          <div className="grid grid-cols-1 gap-4">
            {filteredTheories.map((theory) => {
              const isOpen = selectedTheory === theory.id;
              return (
                <div
                  key={theory.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-800/90 border-blue-500/50 shadow-xl shadow-blue-950/30'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70 hover:border-slate-600'
                  }`}
                >
                  {/* カードヘッダー */}
                  <div
                    onClick={() => setSelectedTheory(isOpen ? null : theory.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center flex-shrink-0 text-blue-400">
                        <Dna className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md border ${getBadgeStyle(theory.badge)}`}>
                            {theory.badge}
                          </span>
                          <span className="text-xs text-slate-400">難易度: {theory.difficulty}</span>
                          <span className="text-xs text-slate-500 font-mono hidden sm:inline">({theory.englishName})</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                          {theory.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-1">
                          {theory.summary}
                        </p>
                      </div>
                    </div>

                    <div className="text-slate-400 p-1">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* 展開詳細 */}
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-700/60 space-y-4 text-xs sm:text-sm bg-slate-900/40">
                      {/* 成立条件 */}
                      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5">
                        <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                          <BookmarkCheck className="w-4 h-4 text-blue-400" />
                          <span>成立条件</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed font-medium">
                          {theory.condition}
                        </p>
                      </div>

                      {/* 効果一覧 */}
                      <div>
                        <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>発生する効果・ステータス補正</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {theory.effects.map((effect, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/40">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-200 leading-snug">{effect}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 攻略のコツ・実践テクニック */}
                      <div>
                        <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span>実践テクニック＆注意点</span>
                        </div>
                        <ul className="space-y-1.5">
                          {theory.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-300 bg-slate-800/30 p-2 rounded border border-slate-800">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 配合例 */}
                      {theory.examples && theory.examples.length > 0 && (
                        <div>
                          <div className="text-xs font-bold text-slate-300 mb-2">
                            ★ 代表的な鉄板配合例
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {theory.examples.map((ex, idx) => (
                              <div key={idx} className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                                  <span>父: {ex.sire}</span>
                                  <span className="text-slate-500">×</span>
                                  <span>母父: {ex.damSire}</span>
                                </div>
                                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                                  {ex.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* サブタブ4: 祖先因子・クロス表 */}
      {activeSubTab === 'ancestors' && (
        <div className="space-y-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Dna className="w-5 h-5 text-amber-400" />
                  <span>主要祖先インブリード効果・因子一覧</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  3×4（18.75%）クロスを狙う際の最重要祖先馬の因子特性まとめ
                </p>
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-700">
                    <th className="py-2.5 px-3 font-semibold">祖先馬名</th>
                    <th className="py-2.5 px-3 font-semibold">獲得因子</th>
                    <th className="py-2.5 px-3 font-semibold">主な効果</th>
                    <th className="py-2.5 px-3 font-semibold">相性の良い系統・解説</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {inbreedingAncestors.map((anc, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">{anc.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-medium">
                          {anc.factor}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-medium">{anc.effect}</td>
                      <td className="py-2.5 px-3 text-slate-300 text-xs leading-relaxed">{anc.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3代代重ね黄金ロードマップ */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>初心者〜上級者必携！ 最強馬生産 3代配合黄金ロードマップ</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              ゼロから凱旋門賞・三冠制覇を目指すための王道ステップバイステップ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/90 border border-blue-500/30 rounded-xl p-4 relative">
                <div className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full inline-block mb-2">
                  STEP 1: 基礎牝馬作り
                </div>
                <h4 className="text-sm font-bold text-white">安価な繁殖牝馬 × スピード種牡馬</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  セリで手頃な牝馬（2000〜5000万）を購入し、ヘニーヒューズやパイロなどの早熟・ダート兼用種牡馬を配合。まずは重賞を1勝できる「初代牝馬」を作る。
                </p>
              </div>

              <div className="bg-slate-800/90 border border-emerald-500/30 rounded-xl p-4 relative">
                <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mb-2">
                  STEP 2: 能力の底上げ
                </div>
                <h4 className="text-sm font-bold text-white">初代自家製牝馬 × 凝った配合</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  誕生した牝馬に「凝った配合」が成立する良血種牡馬（ロードカナロアやエピファネイア等）を配合。底力とスタミナを一気に引き上げ、クラシック級の2代目を誕生させる。
                </p>
              </div>

              <div className="bg-slate-800/90 border border-amber-500/30 rounded-xl p-4 relative">
                <div className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mb-2">
                  STEP 3: 怪物爆誕
                </div>
                <h4 className="text-sm font-bold text-white">2代目牝馬 × 凝った＋奇跡の血量</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  「凝った配合」に「サンデーサイレンス3×4」または「ミスプロ3×4」を重ね掛け！スピード・スタミナの限界値を突破した無敵のクラシック三冠＆海外遠征馬が完成する。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
