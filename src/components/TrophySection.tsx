import React, { useState, useEffect } from 'react';
import { trophyRaces, specialTitles } from '../data/trophyData';
import { Trophy, CheckCircle, Circle, Award, Sparkles, RotateCcw, Filter } from 'lucide-react';

export const TrophySection: React.FC = () => {
  const STORAGE_KEY = 'dabista_trophy_checked_races_v1';

  // ローカルストレージから初期化
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['derby', 'satsuki-sho', 'arima-kinen'];
    } catch {
      return ['derby', 'satsuki-sho', 'arima-kinen'];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleRace = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleReset = () => {
    if (window.confirm('チェック状態をすべてリセットしますか？')) {
      setCheckedIds([]);
    }
  };

  const categories = [
    'all',
    'クラシック',
    '古馬王道',
    '短距離・マイル',
    '牝馬限定',
    'ダート',
    '2歳G1',
    '海外遠征'
  ];

  const filteredRaces = trophyRaces.filter(r =>
    selectedCategory === 'all' || r.category === selectedCategory
  );

  // 制覇率計算
  const totalRaces = trophyRaces.length;
  const completedCount = trophyRaces.filter(r => checkedIds.includes(r.id)).length;
  const progressPercent = Math.round((completedCount / totalRaces) * 100);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-yellow-950/60 via-amber-900/40 to-slate-900 border border-yellow-700/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/20 mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>G1制覇アチーブメント</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              G1・重賞完全制覇 トロフィーチェックシート
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              勝ったG1レースをタップして記録（自動保存）。クラシック三冠や秋古馬三冠など、伝説の称号バッジを獲得しよう！
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>リセット</span>
          </button>
        </div>
      </div>

      {/* 制覇率プログレスバー */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>全G1完全制覇進捗状況</span>
          </span>
          <span className="text-sm sm:text-base font-black text-amber-400 font-mono">
            {completedCount} / {totalRaces} 制覇 ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-3.5 p-0.5 overflow-hidden border border-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300 shadow-md shadow-amber-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 獲得できる特別称号バッジ一覧 */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-400" />
          <span>特別称号・殿堂入りバッジ</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {specialTitles.map((title) => {
            const isUnlocked = title.races.every(r => checkedIds.includes(r));
            return (
              <div
                key={title.id}
                className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-amber-900/40 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/40 text-amber-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black flex items-center gap-1.5">
                      <Award className={`w-3.5 h-3.5 ${isUnlocked ? 'text-amber-400' : 'text-slate-600'}`} />
                      <span className={isUnlocked ? 'text-white' : 'text-slate-400'}>{title.title}</span>
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      isUnlocked ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isUnlocked ? '獲得済！' : '未達成'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-1.5">
                    {title.description}
                  </p>
                </div>
                <div className="text-[10px] text-amber-400/90 font-mono pt-1.5 border-t border-slate-800">
                  報奨: {title.reward}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* カテゴリフィルター */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-yellow-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'すべてのG1' : cat}
          </button>
        ))}
      </div>

      {/* G1レースリスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredRaces.map((race) => {
          const isChecked = checkedIds.includes(race.id);
          return (
            <div
              key={race.id}
              onClick={() => toggleRace(race.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                isChecked
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md text-white'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${isChecked ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {isChecked ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-700 text-amber-300">
                      {race.grade}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {race.season}
                    </span>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {race.name}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {race.racecourse} / {race.course}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
