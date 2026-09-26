import React, { useState } from 'react';
import { preStablingComments } from '../data/commentsData';
import { Sparkles, Award, Target, Compass, RefreshCw, CheckSquare, Square, AlertCircle } from 'lucide-react';

export const SimulatorSection: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['spd-high', 'sta-high', 'aura-super']);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleReset = () => {
    setSelectedIds([]);
  };

  // 判定ロジック
  const hasSpdHigh = selectedIds.includes('spd-high');
  const hasSpdMid = selectedIds.includes('spd-mid');
  const hasStaHigh = selectedIds.includes('sta-high');
  const hasStaMid = selectedIds.includes('sta-mid');
  const hasGuts = selectedIds.includes('guts-high');
  const hasAuraSuper = selectedIds.includes('aura-super');
  const hasAuraGood = selectedIds.includes('aura-good');
  const hasHealthTough = selectedIds.includes('health-tough');
  const hasHealthWeak = selectedIds.includes('health-weak');
  const hasEarly = selectedIds.includes('growth-early');
  const hasLate = selectedIds.includes('growth-late');

  // 素質ランク計算
  let score = 0;
  if (hasSpdHigh) score += 35;
  else if (hasSpdMid) score += 18;

  if (hasStaHigh) score += 35;
  else if (hasStaMid) score += 18;

  if (hasAuraSuper) score += 30;
  else if (hasAuraGood) score += 15;

  if (hasGuts) score += 10;
  if (hasHealthTough) score += 5;
  if (hasHealthWeak) score -= 5;

  let rank = 'C';
  let rankColor = 'text-slate-400 bg-slate-800 border-slate-700';
  let rankTitle = '未勝利脱出〜条件戦クラス';

  if (score >= 80) {
    rank = 'SS';
    rankColor = 'text-amber-300 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-amber-500/50';
    rankTitle = '歴代最強！クラシック三冠＆凱旋門賞級';
  } else if (score >= 60) {
    rank = 'S';
    rankColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-500/50';
    rankTitle = 'G1複数勝利・八大競走有力馬';
  } else if (score >= 40) {
    rank = 'A';
    rankColor = 'text-blue-300 bg-blue-500/20 border-blue-500/50';
    rankTitle = '重賞（G2/G3）勝ち負け〜オープン級';
  } else if (score >= 20) {
    rank = 'B';
    rankColor = 'text-purple-300 bg-purple-500/20 border-purple-500/50';
    rankTitle = '条件戦（2〜3勝クラス）堅実活躍馬';
  }

  // 適性距離推定
  let distance = 'マイル〜中距離 (1600m〜2200m)';
  if (hasStaHigh && !hasSpdHigh) {
    distance = '中長距離〜ステイヤー (2400m〜3600m)';
  } else if (hasSpdHigh && !hasStaHigh) {
    distance = '短距離〜マイル (1200m〜1600m)';
  } else if (hasSpdHigh && hasStaHigh) {
    distance = '万能クラシック (1600m〜2500m)';
  }

  // おすすめ路線
  let targetRoute = 'クラシック路線（皐月賞・ダービー・菊花賞）';
  if (hasEarly && hasSpdHigh) {
    targetRoute = '2歳重賞総なめ → 朝日杯FS / 桜花賞 / NHKマイルC';
  } else if (hasLate) {
    targetRoute = '3歳夏本格化 → 古馬中長距離G1（秋天・JC・有馬）';
  } else if (hasSpdHigh && !hasStaHigh) {
    targetRoute = 'スプリンターズS / 高松宮記念 / マイルCS';
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-purple-950/60 via-pink-900/40 to-slate-900 border border-purple-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>育成逆引きシミュレーター</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              愛馬の素質・路線 リアルタイム自動診断
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              牧場で出たコメントにチェックを入れるだけで、素質ランク、適性距離、おすすめ目標レース、育成調教プランを即座に判定します。
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>選択をリセット</span>
          </button>
        </div>
      </div>

      {/* 診断結果パネル（上部に大きく表示） */}
      <div className={`rounded-2xl border p-5 sm:p-6 shadow-2xl transition-all ${rankColor}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/40 border border-white/20 flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
              <span className="text-[10px] text-slate-400 font-bold tracking-wider">RANK</span>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{rank}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400">診断された期待ランク</div>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {rankTitle}
              </h3>
              <div className="text-xs text-slate-300 mt-1">
                選択されたコメント数: <strong className="text-amber-400 font-mono">{selectedIds.length}</strong> 個 （素質スコア: {score}点）
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 self-stretch md:self-auto">
            <div className="bg-black/30 px-3.5 py-2 rounded-xl border border-white/10 text-xs flex-1 md:flex-initial">
              <span className="text-slate-400 block text-[10px]">推定適性距離</span>
              <span className="font-bold text-white">{distance}</span>
            </div>
            <div className="bg-black/30 px-3.5 py-2 rounded-xl border border-white/10 text-xs flex-1 md:flex-initial">
              <span className="text-slate-400 block text-[10px]">目標路線</span>
              <span className="font-bold text-amber-300">{targetRoute}</span>
            </div>
          </div>
        </div>

        {/* 育成・調教のアドバイス */}
        <div className="pt-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong className="text-amber-300">★ 総合アドバイス: </strong>
          {score >= 80 ? (
            <span>
              文句なしの怪物体質です！怪我さえさせなければクラシック三冠や古馬王道G1、有馬記念の完全制覇が狙えます。坂路を中心に仕上げ、本番2週前に芝一杯追いで仕上げましょう。
            </span>
          ) : score >= 60 ? (
            <span>
              非常に優秀な重賞候補です。適性距離に合わせたレース選びを行えば、G1奪取も充分可能です。体質に合わせた無理のないローテーションを心がけてください。
            </span>
          ) : score >= 40 ? (
            <span>
              スピードまたはスタミナに光るものがあります。得意条件（芝/ダート、距離）を固定して使い、オープン特別やG3重賞の勝ち上がりを狙いましょう。
            </span>
          ) : (
            <span>
              コメントがまだ少ないか、標準的な素質です。未勝利戦を早めに勝ち上がり、出走手当や条件戦で手堅く稼ぎつつ、次代の配合用牝馬として血統をつなぐことも検討しましょう。
            </span>
          )}
        </div>
      </div>

      {/* コメント選択エリア */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
          <CheckSquare className="w-4 h-4 text-purple-400" />
          <span>牧場で言われたコメントをタップして選択してください</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {preStablingComments.map((comment) => {
            const isSelected = selectedIds.includes(comment.id);
            return (
              <div
                key={comment.id}
                onClick={() => toggleSelect(comment.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-purple-900/40 border-purple-500/80 text-white shadow-md'
                    : 'bg-slate-900/50 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <div className="mt-0.5 text-purple-400 flex-shrink-0">
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-purple-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {comment.category}
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold">
                      {comment.importance}ランク
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 leading-snug">
                    {comment.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
