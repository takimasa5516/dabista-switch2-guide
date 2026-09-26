import React, { useState } from 'react';
import {
  trainingCourses,
  growthTypes,
  weightAndFatigueGuide,
  trainingRanking,
  beginnerGoldenRoutine,
  injuryPreventionRules,
  balancePhilosophy
} from '../data/trainingData';
import {
  preDebutRoutines,
  postDebutRoutines,
  purposeRecipes,
  preDebut4WeekRotation,
  omakaseTrainingAdvice
} from '../data/genericTrainingRecipes';
import { WeightCalculator } from './WeightCalculator';
import {
  Dumbbell,
  Scale,
  HeartPulse,
  Sparkles,
  AlertCircle,
  ShieldAlert,
  Award,
  Calculator,
  Calendar,
  Zap,
  CheckCircle2,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface TrainingSectionProps {
  searchQuery: string;
}

export const TrainingSection: React.FC<TrainingSectionProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'routines' | 'theory' | 'calculator' | 'courses' | 'weight' | 'growth'>('routines');

  const filteredCourses = trainingCourses.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.bestFor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMeter = (value: number, color: string) => {
    return (
      <div className="flex items-center gap-1.5 flex-1">
        <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden flex">
          <div
            className={`h-full rounded-full ${color}`}
            style={{ width: `${(value / 5) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-slate-300 w-3 text-right">{value}</span>
      </div>
    );
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case '高':
        return 'text-red-400 bg-red-500/20 border-red-500/40';
      case '中':
        return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
      case '小':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40';
      default:
        return 'text-blue-400 bg-blue-500/20 border-blue-500/40';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-teal-900/40 to-slate-900 border border-emerald-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 mb-2">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Switch2版：週1回進行・実機調教システム完全同期</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              調教理論・汎用メニュー＆ベスト体重計算
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              「ダート強め＋坂路」の黄金基本形から、デビュー前4週・8週ローテ、レース間調整、故障防止5大鉄則、馬体重逆算まで完全網羅。
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 bg-slate-800/80 border border-slate-700 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveSubTab('routines')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'routines' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>汎用調教メニュー</span>
            </button>
            <button
              onClick={() => setActiveSubTab('theory')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'theory' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>調教理論＆TOP6</span>
            </button>
            <button
              onClick={() => setActiveSubTab('calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'calculator' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>体重一発計算</span>
            </button>
            <button
              onClick={() => setActiveSubTab('courses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'courses' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              調教コース
            </button>
            <button
              onClick={() => setActiveSubTab('weight')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'weight' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              体重＆疲労
            </button>
            <button
              onClick={() => setActiveSubTab('growth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'growth' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              成長タイプ
            </button>
          </div>
        </div>
      </div>

      {/* サブタブ1: 汎用調教メニュー（デビュー前・後＆目的別レシピ） */}
      {activeSubTab === 'routines' && (
        <div className="space-y-6">
          {/* 初心者黄金基本調教ハイライトカード */}
          <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Basic Golden Routine
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {beginnerGoldenRoutine.title}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                実機同期
              </span>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs text-amber-200">
              {beginnerGoldenRoutine.systemNotice}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900/80 border border-emerald-600/30 p-3.5 rounded-xl space-y-1.5">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>デビュー前 育成サイクル</span>
                </div>
                <div className="text-sm font-bold text-white leading-snug">
                  {beginnerGoldenRoutine.preDebutCycle}
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  ダートでスタミナの基礎を固め、坂路でパワー・スピードを上乗せ。併せ馬で根性を点火！
                </p>
              </div>

              <div className="bg-slate-900/80 border border-emerald-600/30 p-3.5 rounded-xl space-y-1.5">
                <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>レース転戦時（中3週ローテ）</span>
                </div>
                <div className="text-sm font-bold text-white leading-snug">
                  {beginnerGoldenRoutine.inSeasonCycle}
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  レース翌週は休養かプールで疲労抜き。2週前に本追い切り、出走週は馬なりでベスト体重合致！
                </p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/20 p-3 rounded-xl text-xs text-emerald-200 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>プロの体重＆スタッフ運用鉄則: </strong>
                {beginnerGoldenRoutine.adaptation}
              </div>
            </div>
          </div>

          {/* ブログ推奨：デビュー前おすすめ4週実践ローテーション */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-700/60 pb-2.5">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  4-Week Rotation
                </span>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span>{preDebut4WeekRotation.title}</span>
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-700 self-start sm:self-auto">
                スタミナ軸＋スピード＋根性
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {preDebut4WeekRotation.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {preDebut4WeekRotation.weeks.map((w, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-700/70 p-3 rounded-xl flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-xs font-black text-amber-300 block mb-1">
                      {w.week}
                    </span>
                    <div className="bg-slate-800/80 p-2 rounded-lg text-xs space-y-1 mb-1.5">
                      <div className="text-emerald-300 font-bold">
                        調教: <span>{w.wednesday}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      {w.effect}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-200">
              <strong>★ 運用鉄則:</strong> {preDebut4WeekRotation.goldenRule}
            </div>
          </div>

          {/* 実機仕様：おまかせ調教の特徴と注意点 */}
          <div className="bg-gradient-to-r from-blue-950/40 via-slate-800 to-indigo-950/40 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-black text-white">{omakaseTrainingAdvice.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{omakaseTrainingAdvice.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {omakaseTrainingAdvice.points.map((pt, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-700/80 p-3 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-cyan-300 block">{pt.title}</span>
                  <p className="text-xs text-slate-300 leading-snug">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ① デビュー前ルーティン */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="text-base sm:text-lg font-black text-white">
                【デビュー前】入厩〜ゲート合格〜デビュー仕上げ 汎用スケジュール
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {preDebutRoutines.map((routine) => (
                <div key={routine.id} className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-700/60 pb-2.5">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-emerald-300">
                        {routine.title}
                      </h4>
                      <span className="text-xs text-slate-400">{routine.targetSituation}</span>
                    </div>
                    <span className="text-xs font-mono font-bold bg-slate-900 px-2.5 py-1 rounded text-amber-300 border border-slate-700 self-start sm:self-auto">
                      期間: {routine.pace}
                    </span>
                  </div>

                  {/* ステップ一覧 */}
                  <div className="space-y-2.5">
                    {routine.steps.map((st, i) => (
                      <div key={i} className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-3 text-xs space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-amber-400">{st.timing}</span>
                          <span className="text-slate-400 font-mono text-[11px]">目標体重: {st.weightTarget}</span>
                        </div>
                        <div className="font-bold text-white text-sm">
                          {st.menu}
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {st.purpose}
                        </p>
                        <ul className="pt-1 text-[11px] text-slate-400 space-y-0.5 border-t border-slate-800">
                          {st.keyPoints.map((kp, k) => (
                            <li key={k} className="flex items-start gap-1">
                              <span className="text-emerald-400">•</span>
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* 黄金ルール */}
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-200">
                    <strong>★ 黄金鉄則:</strong> {routine.goldenRule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ② デビュー後レース間調整ルーティン */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <h3 className="text-base sm:text-lg font-black text-white">
                【デビュー後】出走間隔別（中1週・中2週・中3週・中4週）汎用調整メニュー
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {postDebutRoutines.map((routine) => (
                <div key={routine.id} className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="border-b border-slate-700/60 pb-2 mb-2">
                      <h4 className="text-sm sm:text-base font-extrabold text-blue-300">
                        {routine.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{routine.targetSituation}</p>
                    </div>

                    <div className="space-y-2">
                      {routine.steps.map((st, i) => (
                        <div key={i} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs space-y-0.5">
                          <span className="font-bold text-amber-400 block text-[11px]">{st.timing}</span>
                          <span className="font-bold text-white text-xs block">{st.menu}</span>
                          <span className="text-[10px] text-slate-400 block">体重目安: {st.weightTarget}</span>
                          <p className="text-[11px] text-slate-300 leading-snug">{st.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-2.5 text-xs text-blue-200">
                    <strong>★ 要点:</strong> {routine.goldenRule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ③ 目的別汎用調教レシピ */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>目的別・即効調教レシピ（プリセット6選）</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {purposeRecipes.map((recipe, idx) => (
                <div key={idx} className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60 text-xs space-y-1.5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-black text-amber-300">{recipe.purpose}</h4>
                    <div className="font-bold text-white bg-slate-800 p-2 rounded mt-1">{recipe.menu}</div>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed pt-1 border-t border-slate-800">{recipe.effect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* サブタブ2: 調教理論＆TOP6（ペンギン研究室攻略準拠） */}
      {activeSubTab === 'theory' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 理論ヘッダー */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-2.5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-black text-white">
                  Switch2版『ダビスタ2』調教完全攻略理論
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Switch2実機仕様（週1回カレンダー進行・施設スタッフ連動）
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              『ダービースタリオン2』で強い馬を育てるために最重要なのが調教です。
              強い調教を連発すれば強くなるわけではなく、疲労蓄積と故障リスクを抑えながら、スピード・スタミナ・勝負根性・体調・馬体重をバランス良く高めることがG1制覇への絶対条件となります。
            </p>
          </div>

          {/* おすすめ調教ランキング TOP6 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>使いやすさ抜群！おすすめ調教ランキング TOP6</span>
              </h3>
              <span className="text-xs text-slate-400">実戦での有用性・安全性基準</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {trainingRanking.map((rank) => (
                <div
                  key={rank.rank}
                  className="bg-slate-800/70 border border-slate-700/80 hover:border-emerald-500/40 rounded-2xl p-4 shadow-lg flex flex-col justify-between space-y-2.5 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                          rank.rank === 1 ? 'bg-amber-500 text-slate-950 shadow-md' :
                          rank.rank === 2 ? 'bg-slate-300 text-slate-950' :
                          rank.rank === 3 ? 'bg-amber-700 text-white' :
                          'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          {rank.rank}位
                        </span>
                        <h4 className="text-base font-black text-white">
                          {rank.courseName} <span className="text-xs font-normal text-slate-400">({rank.intensity})</span>
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {rank.rating}
                      </span>
                    </div>

                    <div className="mt-2 text-xs font-bold text-emerald-400">
                      目的: {rank.primaryPurpose}
                    </div>

                    <p className="mt-1 text-xs text-slate-200 leading-relaxed">
                      {rank.strength}
                    </p>
                  </div>

                  {rank.staffSynergy && (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-xl text-[11px] text-emerald-200 leading-snug">
                      <strong>✨ スタッフ効果:</strong> {rank.staffSynergy}
                    </div>
                  )}

                  <div className="bg-slate-900/60 border border-slate-700/40 p-2.5 rounded-xl text-[11px] text-amber-200/90 leading-snug">
                    <strong>⚠️ 注意点:</strong> {rank.caution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 最強馬を作る調教バランス論 */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
            <div className="border-b border-indigo-500/20 pb-2">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>{balancePhilosophy.title}</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {balancePhilosophy.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              {balancePhilosophy.roles.map((r, i) => (
                <div key={i} className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl space-y-1">
                  <div className="text-2xl">{r.icon}</div>
                  <div className="text-xs font-bold text-white">{r.track}</div>
                  <div className="text-[11px] text-indigo-300">{r.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 故障を防ぐ5大鉄則 */}
          <div className="bg-slate-800/70 border border-red-500/30 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-red-400 border-b border-slate-700 pb-2">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-black text-white">
                故障を防ぐための5大鉄則マニュアル
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {injuryPreventionRules.map((rule, idx) => (
                <div key={idx} className="bg-slate-900/70 border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                  <h4 className="font-bold text-red-400">{rule.title}</h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{rule.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-red-950/30 border border-red-500/20 p-3 rounded-xl text-xs text-red-200">
              <strong>★ 格言:</strong> 「調教できるから毎回調教する」のではなく、「必要なときだけ調教して休ませる」という引き算の判断が名馬を育てます。
            </div>
          </div>
        </div>
      )}

      {/* サブタブ2: ベスト体重一発計算機 */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-4">
          <WeightCalculator />
        </div>
      )}

      {/* サブタブ3: 調教コース一覧 */}
      {activeSubTab === 'courses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl p-4 sm:p-5 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          {course.name}
                          <span className="text-[11px] font-normal text-slate-400 px-1.5 py-0.5 rounded bg-slate-700/60">
                            {course.intensity}
                          </span>
                        </h3>
                        <span className="text-[11px] text-slate-400 font-mono">
                          体重増減: <span className="text-amber-300 font-semibold">{course.effects.weightChange}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRiskBadge(course.effects.risk)}`}>
                      故障リスク: {course.effects.risk}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* ステータス上昇メーター */}
                  <div className="space-y-1.5 bg-slate-900/60 rounded-xl p-3 border border-slate-700/40 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400 w-16">スピード</span>
                      {renderMeter(course.effects.speed, 'bg-emerald-400')}
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400 w-16">スタミナ</span>
                      {renderMeter(course.effects.stamina, 'bg-blue-400')}
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400 w-16">パワー</span>
                      {renderMeter(course.effects.power, 'bg-amber-400')}
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400 w-16">勝負根性</span>
                      {renderMeter(course.effects.guts, 'bg-rose-400')}
                    </div>
                    <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-800">
                      <span className="text-[11px] text-slate-400 w-16">疲労蓄積</span>
                      {renderMeter(course.effects.fatigue, 'bg-purple-400')}
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-emerald-300/90 font-medium">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>推奨用途: {course.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* サブタブ4: 体重＆疲労管理 */}
      {activeSubTab === 'weight' && (
        <div className="space-y-6">
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-400 mb-3">
              <Scale className="w-5 h-5" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                {weightAndFatigueGuide.bestWeight.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {weightAndFatigueGuide.bestWeight.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {weightAndFatigueGuide.bestWeight.rules.map((rule, idx) => (
                <div key={idx} className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{rule}</span>
                </div>
              ))}
            </div>

            {/* 体重増減早見表 */}
            <div className="mt-5 bg-slate-900/50 rounded-xl p-3 border border-slate-700/40">
              <div className="text-xs font-bold text-slate-300 mb-2">★ 1週あたりの体重変動早見表</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <div className="text-slate-400">芝/ダート一杯</div>
                  <div className="text-rose-400 font-bold">-4kg</div>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <div className="text-slate-400">坂路/ウッド強め</div>
                  <div className="text-rose-400 font-bold">-3kg</div>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <div className="text-slate-400">ポリ/馬なり/プール</div>
                  <div className="text-amber-400 font-bold">-1〜-2kg</div>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg">
                  <div className="text-slate-400">休養・ノーステッキ</div>
                  <div className="text-emerald-400 font-bold">+2〜+4kg</div>
                </div>
              </div>
            </div>
          </div>

          {/* 疲労と故障管理 */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2.5 text-rose-400 mb-3">
              <HeartPulse className="w-5 h-5" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                {weightAndFatigueGuide.fatigueManagement.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-red-500/20">
                <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>見逃し厳禁！疲労蓄積の危険シグナル</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {weightAndFatigueGuide.fatigueManagement.signs.map((sign, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/20">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>故障・屈腱炎を防ぐ鉄則ルール</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {weightAndFatigueGuide.fatigueManagement.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="leading-snug">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* サブタブ5: 成長タイプ別戦略 */}
      {activeSubTab === 'growth' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {growthTypes.map((growth, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      {growth.type}
                    </h3>
                    <span className="text-[11px] text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                      ピーク: {growth.peak}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400 mb-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/40">
                    <div>デビュー目安: <span className="text-slate-200 font-medium">{growth.debut}</span></div>
                    <div>引退目安時期: <span className="text-slate-200 font-medium">{growth.retirement}</span></div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {growth.strategy}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 text-xs">
                  <span className="text-slate-400 font-semibold block mb-1">【判別コメント例】</span>
                  {growth.keyComments.map((c, i) => (
                    <div key={i} className="text-emerald-400/90 font-mono text-[11px]">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
