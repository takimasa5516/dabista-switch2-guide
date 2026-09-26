import React, { useState } from 'react';
import { Scale, Calculator, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const WeightCalculator: React.FC = () => {
  const [currentWeight, setCurrentWeight] = useState<number>(480);
  const [commentType, setCommentType] = useState<string>('fat'); // fat(+6kg), slight_fat(+3kg), just(0), slight_thin(-3kg), thin(-6kg)

  const commentOptions = [
    { id: 'fat', label: '太め残り / 太い', diff: 6, desc: 'ベストより約6〜8kg太い。走破時計に明確な悪影響。' },
    { id: 'slight_fat', label: '余裕がある / 少し重い', diff: 3, desc: 'ベストより約2〜4kg太め。もう一絞り欲しい状態。' },
    { id: 'just', label: 'ちょうどいい / 仕上がり万全', diff: 0, desc: 'ベスト体重（±1kg以内）。能力100%発揮！' },
    { id: 'slight_thin', label: '少し細い / 馬体が寂しい', diff: -3, desc: 'ベストより約2〜4kg細い。スタミナ減・故障率上昇。' },
    { id: 'thin', label: '細すぎる / カラボネ', diff: -6, desc: 'ベストより約6〜8kg以上細い。能力半減の危険状態。' },
  ];

  const selectedOpt = commentOptions.find(o => o.id === commentType) || commentOptions[0];
  const calculatedBestWeight = currentWeight - selectedOpt.diff;

  // 次走までに必要な調教アドバイス
  const getAdjustmentPlan = () => {
    const diff = currentWeight - calculatedBestWeight;
    if (diff === 0) {
      return {
        plan: '現状維持（ポリトラック馬なり、坂路馬なり）',
        note: '今の体重をキープ！強めの追いは避け、軽めの調整でベスト体重のまま出走させましょう。'
      };
    } else if (diff > 0) {
      // 太い場合
      if (diff >= 6) {
        return {
          plan: '芝またはダート一杯追いを2本、または坂路強め＋プール',
          note: `約${diff}kg絞る必要があります。来週出走なら芝一杯(-4kg)＋プール(-2kg)でぴったりに仕上げましょう。`
        };
      } else {
        return {
          plan: '坂路強め(-3kg) または ウッド強め(-3kg)を1本',
          note: `約${diff}kg太めです。当週または1週前に強めの追いを1本入れるだけでジャストベストになります。`
        };
      }
    } else {
      // 細い場合
      const absDiff = Math.abs(diff);
      return {
        plan: '完全休養（ノーステッキ）または軽めのプールのみ',
        note: `約${absDiff}kg細いです。無理な調教は厳禁。レース間隔を中3〜4週空けて+4kg〜+6kg回復させてから出走させましょう。`
      };
    }
  };

  const plan = getAdjustmentPlan();

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/40 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span>パドック馬体重・ベスト体重一発計算ツール</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              即算
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            出走時の体重とパドックコメントを選ぶだけで、真のベスト体重と次回調整プランを逆算！
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* 入力フォーム */}
        <div className="space-y-3.5 bg-slate-950/60 p-4 rounded-xl border border-slate-700/60">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              ① 出走時（パドック）の馬体重
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                step={2}
                min={350}
                max={600}
                className="w-32 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-base font-bold text-white text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-sm font-bold text-slate-400">kg</span>
              <div className="flex gap-1 ml-2">
                {[-4, -2, +2, +4].map((adj) => (
                  <button
                    key={adj}
                    onClick={() => setCurrentWeight(prev => prev + adj)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono cursor-pointer"
                  >
                    {adj > 0 ? `+${adj}` : adj}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              ② パドック・解説のコメント
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {commentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCommentType(opt.id)}
                  className={`px-3 py-2 rounded-lg text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    commentType === opt.id
                      ? 'bg-emerald-600 text-white font-bold shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-[11px] opacity-80 font-mono">
                    {opt.diff > 0 ? `+${opt.diff}kg太め` : opt.diff < 0 ? `${opt.diff}kg細め` : 'ジャスト'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 算出結果パネル */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>推定ベスト馬体重 結果</span>
            </div>
            
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {calculatedBestWeight}
              </span>
              <span className="text-base font-bold text-slate-400">kg</span>
              <span className="text-xs text-amber-300 ml-2 font-medium">
                (適正範囲: {calculatedBestWeight - 2}kg 〜 {calculatedBestWeight + 2}kg)
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              {selectedOpt.desc}
            </p>
          </div>

          {/* 調整アドバイス */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              次走への調教調整メニュー
            </span>
            <div className="text-xs text-emerald-300 font-bold">
              {plan.plan}
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {plan.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
