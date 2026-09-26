import React, { useState } from 'react';
import { breedingTheories, inbreedingAncestors } from '../data/breedingData';
import { BreedingTheory } from '../types';
import { Dna, ChevronDown, ChevronUp, Sparkles, AlertTriangle, CheckCircle2, BookmarkCheck, ArrowRight } from 'lucide-react';

interface BreedingSectionProps {
  searchQuery: string;
}

export const BreedingSection: React.FC<BreedingSectionProps> = ({ searchQuery }) => {
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

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900 border border-blue-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 mb-2">
              <Dna className="w-3.5 h-3.5" />
              <span>血統と配合の真理</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Switch2版 配合理論 完全攻略
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              今作でも圧倒的な強さを誇る「<span className="text-amber-300 font-bold">凝った配合</span>」をはじめ、G1常勝馬や海外遠征馬を生産するための全配合理論・インブリード効果を網羅解説。
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center self-stretch sm:self-auto min-w-[140px]">
            <div className="text-[11px] text-slate-400 font-medium">現行トレンド最優先</div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">凝った配合 × 奇跡の血量</div>
          </div>
        </div>
      </div>

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
              {/* カードヘッダー（クリックで開閉） */}
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

                  {/* 配合例（ある場合） */}
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

      {/* 祖先別インブリード効果表 */}
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
  );
};
