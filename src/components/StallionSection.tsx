import React, { useState, useMemo } from 'react';
import { stallions as featuredStallions } from '../data/stallionData';
import { masterData, RawStallion } from '../utils/breedingEngine';
import {
  Award,
  Dna,
  Sparkles,
  Filter,
  ShieldCheck,
  ArrowRight,
  DollarSign,
  Search,
  CheckCircle2
} from 'lucide-react';

interface StallionSectionProps {
  searchQuery: string;
}

export const StallionSection: React.FC<StallionSectionProps> = ({ searchQuery }) => {
  // 表示モード：全237頭データベース or 注目種牡馬ピックアップ
  const [viewMode, setViewMode] = useState<'all237' | 'featured'>('all237');

  // 全237頭用フィルター
  const [localSearch, setLocalSearch] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [growthFilter, setGrowthFilter] = useState<string>('all');
  const [rankAFilter, setRankAFilter] = useState<string>('all');
  const [dirtFilter, setDirtFilter] = useState<boolean>(false);

  // 注目12頭用フィルター
  const [selectedGeneration, setSelectedGeneration] = useState<string>('all');
  const [selectedGrowth, setSelectedGrowth] = useState<string>('all');

  const generations = ['all', '最新・Switch2', '現代主要', 'レジェンド'];
  const growths = ['all', '早熟', '普通', '晩成'];

  // 全237頭の絞り込み
  const filteredAllStallions = useMemo(() => {
    const query = (localSearch || searchQuery).toLowerCase().trim();
    return masterData.stallion.filter((s) => {
      // 検索ワード
      if (query) {
        const matchesName = s.NAME.toLowerCase().includes(query);
        const matchesSystem = (s.SYSTEM_LITTELE || s.SYSTEM_BIG || '').toLowerCase().includes(query);
        const matchesAncestor = (s.ANCESTOR || []).some(a => a.toLowerCase().includes(query));
        if (!matchesName && !matchesSystem && !matchesAncestor) return false;
      }

      // 価格
      if (priceFilter === 'free' && s.PRICE > 100) return false;
      if (priceFilter === 'under500' && s.PRICE > 500) return false;
      if (priceFilter === '500to1500' && (s.PRICE < 500 || s.PRICE > 1500)) return false;
      if (priceFilter === 'over1500' && s.PRICE < 1500) return false;

      // 成長型
      if (growthFilter !== 'all' && s.GROWN !== growthFilter) return false;

      // 能力A
      if (rankAFilter === 'jisseki' && s.JISSEKI !== 'A') return false;
      if (rankAFilter === 'konjo' && s.KONJO !== 'A') return false;
      if (rankAFilter === 'antei' && s.ANTEI !== 'A') return false;

      // ダート
      if (dirtFilter && s.DIRT !== '◎' && s.DIRT !== '◯' && s.DIRT !== '○') return false;

      return true;
    });
  }, [localSearch, searchQuery, priceFilter, growthFilter, rankAFilter, dirtFilter]);

  // 注目種牡馬の絞り込み
  const filteredFeatured = featuredStallions.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lineage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bestMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGen = selectedGeneration === 'all' || s.generation === selectedGeneration;
    const matchesGrowth = selectedGrowth === 'all' || s.growth === selectedGrowth;

    return matchesSearch && matchesGen && matchesGrowth;
  });

  const getRankBadge = (val?: string) => {
    switch (val) {
      case 'A':
        return 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40';
      case 'B':
        return 'bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border border-slate-700';
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
              <span>全237頭 種牡馬スペック完全収録</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Switch2版 種牡馬データベース＆配合カタログ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              ゲーム内に登場する全237頭の種牡馬パラメータ（種付け料・距離適性・成長型・実績・底力・安定・系統）を完全網羅。
            </p>
          </div>
          
          {/* 表示モード切り替えスイッチ */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 p-1.5 rounded-xl self-stretch sm:self-auto">
            <button
              onClick={() => setViewMode('all237')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'all237'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              全237頭 データベース
            </button>
            <button
              onClick={() => setViewMode('featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'featured'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              注目馬ピックアップ (12頭)
            </button>
          </div>
        </div>
      </div>

      {/* モード1: 全237頭 種牡馬データベース */}
      {viewMode === 'all237' && (
        <div className="space-y-4">
          {/* フィルター・検索バー */}
          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="種牡馬名・系統名・父名で検索 (全237頭)..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono">
                <span className="text-slate-400">該当件数:</span>
                <span className="text-amber-400 font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                  {filteredAllStallions.length} / 237頭
                </span>
              </div>
            </div>

            {/* 各種絞り込みフィルターボタン */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/60 text-xs">
              {/* 価格帯 */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700/80">
                <span className="text-[11px] text-slate-400 px-1.5">価格:</span>
                <button
                  onClick={() => setPriceFilter('all')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    priceFilter === 'all' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  全種
                </button>
                <button
                  onClick={() => setPriceFilter('free')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    priceFilter === 'free' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  〜100万
                </button>
                <button
                  onClick={() => setPriceFilter('under500')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    priceFilter === 'under500' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  〜500万
                </button>
                <button
                  onClick={() => setPriceFilter('500to1500')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    priceFilter === '500to1500' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  500〜1500万
                </button>
                <button
                  onClick={() => setPriceFilter('over1500')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    priceFilter === 'over1500' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1500万〜
                </button>
              </div>

              {/* 成長型 */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700/80">
                <span className="text-[11px] text-slate-400 px-1.5">成長:</span>
                {['all', '早熟', '普通', '晩成', '持続'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrowthFilter(g)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                      growthFilter === g ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {g === 'all' ? '全て' : g}
                  </button>
                ))}
              </div>

              {/* パラメータA */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700/80">
                <span className="text-[11px] text-slate-400 px-1.5">能力:</span>
                <button
                  onClick={() => setRankAFilter(rankAFilter === 'jisseki' ? 'all' : 'jisseki')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    rankAFilter === 'jisseki' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  実績A
                </button>
                <button
                  onClick={() => setRankAFilter(rankAFilter === 'konjo' ? 'all' : 'konjo')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    rankAFilter === 'konjo' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  底力A
                </button>
                <button
                  onClick={() => setRankAFilter(rankAFilter === 'antei' ? 'all' : 'antei')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    rankAFilter === 'antei' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  安定A
                </button>
              </div>

              {/* ダート適性 */}
              <button
                onClick={() => setDirtFilter(!dirtFilter)}
                className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                  dirtFilter
                    ? 'bg-amber-600 text-white border-amber-500 shadow'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                ダート◯◎のみ
              </button>
            </div>
          </div>

          {/* 全237頭 種牡馬グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredAllStallions.map((s) => (
              <div
                key={s.ID}
                className="bg-slate-800/70 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-4 transition-all shadow-lg flex flex-col justify-between space-y-3"
              >
                <div>
                  {/* ヘッダー */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] text-amber-300 font-mono font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          {s.PRICE}万円
                        </span>
                        <span className="text-[10px] text-slate-300 bg-slate-700 px-1.5 py-0.5 rounded font-bold">
                          {s.GROWN}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {s.MIN}〜{s.MAX}m
                        </span>
                      </div>
                      <h3 className="text-base font-black text-white">
                        {s.NAME}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-300 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                      ダート:{s.DIRT}
                    </span>
                  </div>

                  {/* 5大パラメータ評価 */}
                  <div className="grid grid-cols-5 gap-1 text-center text-xs mt-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                    <div>
                      <span className="text-[9px] text-slate-400 block mb-0.5">気性</span>
                      <span className={`inline-block w-5 py-0.5 rounded text-[11px] ${getRankBadge(s.KISYO)}`}>
                        {s.KISYO || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block mb-0.5">実績</span>
                      <span className={`inline-block w-5 py-0.5 rounded text-[11px] ${getRankBadge(s.JISSEKI)}`}>
                        {s.JISSEKI || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block mb-0.5">底力</span>
                      <span className={`inline-block w-5 py-0.5 rounded text-[11px] ${getRankBadge(s.KONJO)}`}>
                        {s.KONJO || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block mb-0.5">体質</span>
                      <span className={`inline-block w-5 py-0.5 rounded text-[11px] ${getRankBadge(s.KENKO)}`}>
                        {s.KENKO || '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block mb-0.5">安定</span>
                      <span className={`inline-block w-5 py-0.5 rounded text-[11px] ${getRankBadge(s.ANTEI)}`}>
                        {s.ANTEI || '-'}
                      </span>
                    </div>
                  </div>

                  {/* 系統・血統情報 */}
                  <div className="mt-2.5 text-[11px] text-slate-300 bg-slate-900/40 p-2 rounded-lg border border-slate-800 space-y-0.5">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>系統:</span>
                      <span className="text-slate-200 font-medium">{s.SYSTEM_LITTELE || s.SYSTEM_BIG}</span>
                    </div>
                    {s.ANCESTOR && s.ANCESTOR.length >= 2 && (
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>父/母父:</span>
                        <span className="text-slate-300 font-mono">{s.ANCESTOR[0]} × {s.ANCESTOR[2] || s.ANCESTOR[1]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* モード2: 注目種牡馬ピックアップ (12頭詳細) */}
      {viewMode === 'featured' && (
        <div className="space-y-4">
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
                  {gen === 'all' ? 'すべての注目馬' : gen}
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
            {filteredFeatured.map((stallion) => (
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
      )}
    </div>
  );
};
