import React, { useState } from 'react';
import { stallions } from '../data/stallionData';
import { Stallion } from '../types';
import { Award, Dna, Sparkles, Filter, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

interface StallionSectionProps {
  searchQuery: string;
}

export const StallionSection: React.FC<StallionSectionProps> = ({ searchQuery }) => {
  const [selectedGeneration, setSelectedGeneration] = useState<string>('all');
  const [selectedGrowth, setSelectedGrowth] = useState<string>('all');

  const generations = ['all', '最新・Switch2', '現代主要', 'レジェンド'];
  const growths = ['all', '早熟', '普通', '晩成'];

  const filteredStallions = stallions.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lineage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bestMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGen = selectedGeneration === 'all' || s.generation === selectedGeneration;
    const matchesGrowth = selectedGrowth === 'all' || s.growth === selectedGrowth;

    return matchesSearch && matchesGen && matchesGrowth;
  });

  const getRankBadge = (val: string) => {
    switch (val) {
      case 'A':
        return 'bg-amber-500/20 text-amber-300 font-bold';
      case 'B':
        return 'bg-blue-500/20 text-blue-300 font-medium';
      default:
        return 'bg-slate-700/60 text-slate-400';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-amber-950/60 via-yellow-900/40 to-slate-900 border border-amber-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>種牡馬データベース＆配合カタログ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Switch2世代・最新種牡馬スペック完全網羅
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              近代世界最強馬「<span className="text-amber-300 font-bold">イクイノックス</span>」や三冠馬「コントレイル」から、序盤の資金稼ぎを支えるコスパ優良馬まで全スペックを分析。
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl text-center self-stretch sm:self-auto min-w-[150px]">
            <div className="text-[11px] text-slate-400 font-medium">Switch2世代 目玉</div>
            <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">イクイノックス</div>
          </div>
        </div>
      </div>

      {/* フィルターバー */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* 世代フィルター */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {generations.map((gen) => (
            <button
              key={gen}
              onClick={() => setSelectedGeneration(gen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedGeneration === gen
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {gen === 'all' ? 'すべての種牡馬' : gen}
            </button>
          ))}
        </div>

        {/* 成長型フィルター */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 self-end sm:self-auto">
          <span className="text-[11px] text-slate-400 px-2 font-medium">成長型:</span>
          {growths.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrowth(g)}
              className={`px-2 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                selectedGrowth === g
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {g === 'all' ? '全て' : g}
            </button>
          ))}
        </div>
      </div>

      {/* 種牡馬カード一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStallions.map((stallion) => (
          <div
            key={stallion.id}
            className="bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-4 sm:p-5 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* カードヘッダー */}
              <div className="flex items-start justify-between gap-2 mb-2.5 pb-2.5 border-b border-slate-700/60">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-amber-300">
                      {stallion.generation}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      距離: <strong className="text-white">{stallion.distance}</strong>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ダート: <strong className="text-amber-400">{stallion.dirt}</strong>
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    {stallion.name}
                    <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {stallion.fee}万円
                    </span>
                  </h3>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {stallion.growth}型
                </span>
              </div>

              {/* 5大パラメータ評価表 */}
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs mb-3 bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">気性</span>
                  <span className={`inline-block w-6 py-0.5 rounded text-xs ${getRankBadge(stallion.temper)}`}>
                    {stallion.temper}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">実績</span>
                  <span className={`inline-block w-6 py-0.5 rounded text-xs ${getRankBadge(stallion.performance)}`}>
                    {stallion.performance}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">底力</span>
                  <span className={`inline-block w-6 py-0.5 rounded text-xs ${getRankBadge(stallion.resilience)}`}>
                    {stallion.resilience}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">体質</span>
                  <span className={`inline-block w-6 py-0.5 rounded text-xs ${getRankBadge(stallion.stamina)}`}>
                    {stallion.stamina}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">安定</span>
                  <span className={`inline-block w-6 py-0.5 rounded text-xs ${getRankBadge(stallion.stability)}`}>
                    {stallion.stability}
                  </span>
                </div>
              </div>

              {/* 血統情報 */}
              <div className="space-y-1 text-xs text-slate-300 mb-3 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                <div><span className="text-slate-400">父系:</span> {stallion.lineage}</div>
                <div><span className="text-slate-400">母父系:</span> {stallion.damSireLine}</div>
              </div>

              {/* おすすめ配合相手 */}
              <div className="mb-3 text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  相性の良いおすすめ繁殖牝馬
                </span>
                <p className="text-slate-200 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 leading-relaxed text-[11px] sm:text-xs">
                  {stallion.bestMatch}
                </p>
              </div>

              {/* コメント */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {stallion.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
