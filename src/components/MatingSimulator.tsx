import React, { useState, useMemo } from 'react';
import { masterData, defaultEngine, RawBroodmare, RawStallion, MatingResult } from '../utils/breedingEngine';
import { Dna, Sparkles, AlertTriangle, CheckCircle2, Search, Filter, ArrowRight, DollarSign, Award, ChevronDown, ChevronUp } from 'lucide-react';

export const MatingSimulator: React.FC = () => {
  // 繁殖牝馬リスト（デフォルトはキャバレイ）
  const [selectedMareName, setSelectedMareName] = useState<string>('キャバレイ');
  const [mareSearch, setMareSearch] = useState<string>('');
  
  // シミュレーション対象種牡馬（個別モード時）
  const [selectedSireName, setSelectedSireName] = useState<string>('イクイノックス');
  const [mode, setMode] = useState<'recommend' | 'individual'>('recommend');

  // 絞り込みフィルター（おすすめモード用）
  const [filterKotta, setFilterKotta] = useState<boolean>(false);
  const [filterOmoshiro, setFilterOmoshiro] = useState<boolean>(false);
  const [filterMigoto, setFilterMigoto] = useState<boolean>(false);
  const [filterPerfect, setFilterPerfect] = useState<boolean>(false);
  const [filterNicks, setFilterNicks] = useState<boolean>(false);
  const [filterOutbreed, setFilterOutbreed] = useState<boolean>(false);
  const [filterMiracle, setFilterMiracle] = useState<boolean>(false); // 3×4
  const [excludeDangerous, setExcludeDangerous] = useState<boolean>(true);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  // 選択された繁殖牝馬
  const currentMare = useMemo(() => {
    return masterData.broodmare.find(m => m.NAME === selectedMareName) || masterData.broodmare[0];
  }, [selectedMareName]);

  // 選択された種牡馬（個別モード）
  const currentSire = useMemo(() => {
    return masterData.stallion.find(s => s.NAME === selectedSireName) || masterData.stallion[0];
  }, [selectedSireName]);

  // 個別モードの配合結果
  const individualResult = useMemo(() => {
    if (!currentMare || !currentSire) return null;
    return defaultEngine.evaluate(currentSire, currentMare);
  }, [currentMare, currentSire]);

  // 全種牡馬に対する一括シミュレーション（おすすめモード）
  const simulatedList = useMemo(() => {
    if (!currentMare) return [];
    return masterData.stallion.map((sire) => {
      const result = defaultEngine.evaluate(sire, currentMare);
      return {
        sire,
        result
      };
    });
  }, [currentMare]);

  // フィルター適用後の種牡馬リスト
  const filteredRecommendations = useMemo(() => {
    return simulatedList
      .filter(({ sire, result }) => {
        if (excludeDangerous && result.dangerous) return false;
        if (sire.PRICE > maxPrice) return false;
        if (filterPerfect && !result.perfect) return false;
        if (filterKotta && !result.kotta) return false;
        if (filterMigoto && !result.migoto) return false;
        if (filterOmoshiro && !result.omoshiro) return false;
        if (filterNicks && result.nicks === 0) return false;
        if (filterOutbreed && !result.outbreed) return false;
        if (filterMiracle) {
          const has3x4 = result.crosses.some(c => c.generations.length === 2 && c.generations[0] === 3 && c.generations[1] === 4);
          if (!has3x4) return false;
        }
        return true;
      })
      .sort((a, b) => b.result.score - a.result.score);
  }, [simulatedList, excludeDangerous, maxPrice, filterPerfect, filterKotta, filterMigoto, filterOmoshiro, filterNicks, filterOutbreed, filterMiracle]);

  // 検索による牝馬絞り込み
  const filteredMares = useMemo(() => {
    return masterData.broodmare.filter(m =>
      m.NAME.toLowerCase().includes(mareSearch.toLowerCase())
    );
  }, [mareSearch]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-blue-950/70 via-indigo-900/50 to-slate-900 border border-blue-700/50 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 mb-2">
              <Dna className="w-3.5 h-3.5" />
              <span>全327頭牝馬・237頭種牡馬 完全対応</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Switch2版 配合シミュレータ＆最適配合検索
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              繁殖牝馬を選ぶだけで、全種牡馬の中から「凝った配合」「完璧配合」「見事配合」「ニックス」「奇跡の血量」を自動解析・ランキング表示！
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 p-1.5 rounded-xl">
            <button
              onClick={() => setMode('recommend')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'recommend' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              おすすめ配合検索
            </button>
            <button
              onClick={() => setMode('individual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'individual' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              1対1 個別配合
            </button>
          </div>
        </div>
      </div>

      {/* 繁殖牝馬選択セクション */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              ① 配合したい繁殖牝馬を選択（全{masterData.broodmare.length}頭）
            </label>
            <div className="flex items-center gap-2">
              <select
                value={selectedMareName}
                onChange={(e) => setSelectedMareName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
              >
                {filteredMares.slice(0, 100).map((m) => (
                  <option key={m.ID} value={m.NAME}>
                    {m.NAME} ({m.PRICE}万円 {m.TYPE === 1 ? '◆庭先' : ''})
                  </option>
                ))}
              </select>
              <div className="relative">
                <input
                  type="text"
                  placeholder="牝馬名で絞り込み..."
                  value={mareSearch}
                  onChange={(e) => setMareSearch(e.target.value)}
                  className="bg-slate-900/90 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* 選択牝馬のスペックカード */}
          {currentMare && (
            <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">価格</span>
                <span className="font-bold text-amber-300 font-mono">{currentMare.PRICE}万円</span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 block">スピード / スタミナ / パワー</span>
                <span className="font-bold text-white font-mono">{currentMare.SPEED} / {currentMare.STAMINA} / {currentMare.POWER}</span>
              </div>
              <div className="border-l border-slate-800 pl-3">
                <span className="text-[10px] text-slate-400 block">ダート / 体質 / 気性</span>
                <span className="font-bold text-emerald-400">{currentMare.DIRT} / {currentMare.KENKO} / {currentMare.KISYO}</span>
              </div>
              {currentMare.TYPE === 1 && (
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded font-bold">
                  庭先取引限定
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* モードA: おすすめ種牡馬検索 */}
      {mode === 'recommend' && (
        <div className="space-y-4">
          {/* フィルターパネル */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-400" />
                <span>成立理論で絞り込み</span>
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">
                該当: {filteredRecommendations.length} 頭 / 237頭
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setFilterKotta(!filterKotta)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterKotta
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                凝った配合
              </button>
              <button
                onClick={() => setFilterPerfect(!filterPerfect)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterPerfect
                    ? 'bg-amber-600 text-white border-amber-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                完璧配合
              </button>
              <button
                onClick={() => setFilterMigoto(!filterMigoto)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterMigoto
                    ? 'bg-blue-600 text-white border-blue-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                見事配合
              </button>
              <button
                onClick={() => setFilterOmoshiro(!filterOmoshiro)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterOmoshiro
                    ? 'bg-purple-600 text-white border-purple-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                面白配合
              </button>
              <button
                onClick={() => setFilterNicks(!filterNicks)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterNicks
                    ? 'bg-yellow-600 text-white border-yellow-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                ニックスあり
              </button>
              <button
                onClick={() => setFilterMiracle(!filterMiracle)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterMiracle
                    ? 'bg-rose-600 text-white border-rose-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                奇跡の血量(3×4)
              </button>
              <button
                onClick={() => setFilterOutbreed(!filterOutbreed)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  filterOutbreed
                    ? 'bg-teal-600 text-white border-teal-500 shadow'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                アウトブリード
              </button>
              <button
                onClick={() => setExcludeDangerous(!excludeDangerous)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  excludeDangerous
                    ? 'bg-red-950/80 text-red-300 border-red-500/50'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400'
                }`}
              >
                危険配合を除外: {excludeDangerous ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* おすすめ種牡馬ランキングリスト */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredRecommendations.slice(0, 30).map(({ sire, result }, idx) => (
              <div
                key={sire.ID}
                className="bg-slate-800/70 border border-slate-700/80 hover:border-blue-500/60 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all"
              >
                <div>
                  {/* ヘッダー */}
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-700/60 mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                          idx === 0 ? 'bg-amber-500 text-slate-950' :
                          idx === 1 ? 'bg-slate-400 text-slate-950' :
                          idx === 2 ? 'bg-amber-800 text-amber-100' :
                          'bg-slate-700 text-slate-300'
                        }`}>
                          #{idx + 1}
                        </span>
                        <h4 className="text-base font-extrabold text-white">
                          {sire.NAME}
                        </h4>
                        <span className="text-xs font-bold text-amber-400 font-mono">
                          {sire.PRICE}万円
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        系統: {sire.SYSTEM_LITTELE || sire.SYSTEM_BIG} | 成長: {sire.GROWN} | 実績: {sire.JISSEKI} 底力: {sire.KONJO}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">配合評価値</span>
                      <span className="text-sm font-black text-blue-400 font-mono">{result.score}pt</span>
                    </div>
                  </div>

                  {/* 成立理論バッジ */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {result.perfect && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-sm">
                        ★ 完璧配合
                      </span>
                    )}
                    {result.kotta && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        凝った配合
                      </span>
                    )}
                    {result.migoto && !result.perfect && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        見事配合
                      </span>
                    )}
                    {result.omoshiro && !result.perfect && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        面白配合
                      </span>
                    )}
                    {result.nicks > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                        ニックス+{result.nicks}
                      </span>
                    )}
                    {result.outbreed && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                        アウトブリード
                      </span>
                    )}
                    {result.dangerous && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                        危険な配合
                      </span>
                    )}
                  </div>

                  {/* クロス・インブリード情報 */}
                  {result.crosses.length > 0 ? (
                    <div className="text-xs bg-slate-900/60 p-2 rounded-xl border border-slate-700/50 mb-2">
                      <span className="text-[10px] text-slate-400 block mb-0.5">インブリード</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.crosses.map((c, i) => {
                          const is3x4 = c.generations.length === 2 && c.generations[0] === 3 && c.generations[1] === 4;
                          return (
                            <span key={i} className={`text-[10px] px-2 py-0.5 rounded ${
                              is3x4
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {c.name} {c.generations.join('×')}
                              {is3x4 && ' (奇跡の血量)'}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-teal-400/90 mb-2 bg-slate-900/40 p-2 rounded-lg">
                      完全アウトブリード（虚弱・気性難リスクゼロ）
                    </div>
                  )}

                  {/* ニトロ指数 */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-300">
                    <span>ニトロ指数:</span>
                    <span>速力 <strong className="text-amber-400 font-mono">{result.nitroValues.speed}</strong></span>
                    <span>底力 <strong className="text-rose-400 font-mono">{result.nitroValues.stamina}</strong></span>
                    <span>パワー <strong className="text-emerald-400 font-mono">{result.nitroValues.power}</strong></span>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-700/60 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedSireName(sire.NAME);
                      setMode('individual');
                    }}
                    className="text-xs text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>血統詳細を見る</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* モードB: 1対1 個別配合詳細ビュー */}
      {mode === 'individual' && currentSire && individualResult && (
        <div className="space-y-6">
          {/* 種牡馬選択ドロップダウン */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              ② 配合する種牡馬を選択（全{masterData.stallion.length}頭）
            </label>
            <select
              value={selectedSireName}
              onChange={(e) => setSelectedSireName(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
            >
              {masterData.stallion.map((s) => (
                <option key={s.ID} value={s.NAME}>
                  {s.NAME} ({s.PRICE}万円 / {s.GROWN} / 実績{s.JISSEKI})
                </option>
              ))}
            </select>
          </div>

          {/* 配合結果レポートカード */}
          <div className="bg-slate-800/80 border border-blue-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
              <div>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>シミュレーション配合結果</span>
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  <span>{currentSire.NAME}</span>
                  <span className="text-slate-400 font-normal">×</span>
                  <span className="text-pink-300">{currentMare.NAME}</span>
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {individualResult.perfect && (
                  <span className="text-xs px-2.5 py-1 rounded font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md">
                    ★ 完璧配合
                  </span>
                )}
                {individualResult.kotta && (
                  <span className="text-xs px-2.5 py-1 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    凝った配合
                  </span>
                )}
                {individualResult.migoto && !individualResult.perfect && (
                  <span className="text-xs px-2.5 py-1 rounded font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    見事配合
                  </span>
                )}
                {individualResult.omoshiro && !individualResult.perfect && (
                  <span className="text-xs px-2.5 py-1 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    面白配合
                  </span>
                )}
                {individualResult.nicks > 0 && (
                  <span className="text-xs px-2.5 py-1 rounded font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                    ニックス+{individualResult.nicks}
                  </span>
                )}
                {individualResult.outbreed && (
                  <span className="text-xs px-2.5 py-1 rounded font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    アウトブリード
                  </span>
                )}
                {individualResult.dangerous && (
                  <span className="text-xs px-2.5 py-1 rounded font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                    危険な配合
                  </span>
                )}
              </div>
            </div>

            {/* 危険な配合警告 */}
            {individualResult.dangerous && (
              <div className="bg-red-950/60 border border-red-500/50 rounded-xl p-3.5 text-xs text-red-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  警告: 危険な配合です！
                </span>
                <p>理由: {individualResult.dangerReasons.join(', ')}</p>
                <p className="text-[11px] text-red-300">体質虚弱や気性難、不受胎のリスクが極めて高くなります。</p>
              </div>
            )}

            {/* 凝った配合の詳細 */}
            {individualResult.kotta && individualResult.kottaPairs.length > 0 && (
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs space-y-1">
                <span className="font-bold text-emerald-400 block">【凝った配合 マッチング祖先ペア】</span>
                <div className="flex flex-wrap gap-2">
                  {individualResult.kottaPairs.map((pair, i) => (
                    <span key={i} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
                      父方: {pair.father} ✕ 母方: {pair.mother}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* インブリード詳細 */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-1.5">
                インブリード（クロス祖先）
              </span>
              {individualResult.crosses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {individualResult.crosses.map((c, i) => (
                    <div key={i} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-700/60 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{c.name}</span>
                        <span className="font-mono text-amber-400">{c.generations.join('×')}</span>
                      </div>
                      {c.effects.length > 0 && (
                        <div className="text-[11px] text-emerald-400 mt-1">
                          因子効果: {c.effects.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-xl">
                  5代血統表内に重複祖先なし（アウトブリード）。体質・健康度MAXで順調に育ちます。
                </p>
              )}
            </div>

            {/* ニトロ指数 */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 flex flex-wrap gap-4 text-xs">
              <span className="font-bold text-slate-300">ニトロ指数（能力天井加算）:</span>
              <span>速力因子: <strong className="text-amber-400 font-mono text-sm">{individualResult.nitroValues.speed}</strong> 個</span>
              <span>底力因子: <strong className="text-rose-400 font-mono text-sm">{individualResult.nitroValues.stamina}</strong> 個</span>
              <span>パワー因子: <strong className="text-emerald-400 font-mono text-sm">{individualResult.nitroValues.power}</strong> 個</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
