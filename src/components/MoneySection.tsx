import React, { useState } from 'react';
import { moneyGuides, initialFarmExpansionPriority } from '../data/moneyData';
import { Coins, TrendingUp, AlertTriangle, CheckCircle2, Building, DollarSign, Sparkles } from 'lucide-react';

interface MoneySectionProps {
  searchQuery: string;
}

export const MoneySection: React.FC<MoneySectionProps> = ({ searchQuery }) => {
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const stages = ['all', '序盤（1〜3年目）', '馬券術', '中盤（4〜10年目）', 'セリ市裏技'];

  const filteredGuides = moneyGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.steps.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (guide.recommendedSiresOrHorses && guide.recommendedSiresOrHorses.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesStage = selectedStage === 'all' || guide.stage === selectedStage;

    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-yellow-950/60 via-amber-900/40 to-slate-900 border border-yellow-700/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>牧場経営と資産拡大</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              破産回避＆資金稼ぎの黄金テクニック
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              序盤の破産を防ぐコスパ配合から、馬券による合法錬金術、地方交流重賞の空き巣狙い、セリ市での高値売却まで網羅。
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center self-stretch sm:self-auto min-w-[150px]">
            <div className="text-[11px] text-slate-400 font-medium">破産回避の鉄則</div>
            <div className="text-sm sm:text-base font-black text-yellow-400 mt-0.5">無駄な施設を建てない</div>
          </div>
        </div>
      </div>

      {/* ステージフィルター */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => setSelectedStage(stage)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedStage === stage
                ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-950 font-bold'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            {stage === 'all' ? '全ての戦略' : stage}
          </button>
        ))}
      </div>

      {/* ガイド一覧カード */}
      <div className="grid grid-cols-1 gap-5">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  {guide.stage}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                  {guide.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 sm:text-right max-w-md">
                {guide.summary}
              </p>
            </div>

            {/* ステップ一覧 */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>実践手順・重要ポイント</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* おすすめ種牡馬（ある場合） */}
            {guide.recommendedSiresOrHorses && guide.recommendedSiresOrHorses.length > 0 && (
              <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800">
                <span className="text-xs font-bold text-amber-300 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  序盤に推奨されるコスパ最強種牡馬
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {guide.recommendedSiresOrHorses.map((sire, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                      {sire}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 注意事項 */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-yellow-200">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span><strong>注意:</strong> {guide.caution}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 牧場施設 投資優先度ランキング */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Building className="w-5 h-5 text-yellow-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            牧場施設の建設優先度ランキング
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          限られた資金をどこに投じるべきか？破産を防ぎつつ効果を最大化する投資順序
        </p>

        <div className="space-y-2.5">
          {initialFarmExpansionPriority.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                  idx === 0 ? 'bg-amber-500 text-slate-950 font-black' :
                  idx === 1 ? 'bg-slate-600 text-white font-bold' :
                  idx === 2 ? 'bg-amber-800/60 text-amber-200 font-bold' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {item.priority}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {item.facility}
                    <span className="text-xs text-amber-400 font-mono font-normal">({item.cost})</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
