import React, { useState } from 'react';
import { trainingCourses, growthTypes, weightAndFatigueGuide } from '../data/trainingData';
import { WeightCalculator } from './WeightCalculator';
import { Dumbbell, Scale, HeartPulse, Sparkles, AlertCircle, ShieldAlert, Award, Calculator } from 'lucide-react';

interface TrainingSectionProps {
  searchQuery: string;
}

export const TrainingSection: React.FC<TrainingSectionProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'courses' | 'weight' | 'growth'>('calculator');

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
              <span>育成・レース調整の極意</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              調教メニュー＆ベスト体重・疲労管理
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              コース毎のステータス上昇値、故障を防ぐ疲労コントロール、そして勝敗を直結する「ベスト馬体重計算機」を搭載。
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 bg-slate-800/80 border border-slate-700 p-1.5 rounded-xl">
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

      {/* サブタブ0: ベスト体重一発計算機 */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-4">
          <WeightCalculator />
        </div>
      )}

      {/* サブタブ1: 調教コース一覧 */}
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

          {/* 調教黄金ルール */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 mt-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>現役トップブリーダーが実践する「レース2週前・当週の調教ローテ」</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mt-2">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="font-bold text-emerald-400 block mb-1">【王道仕上げパターン】</span>
                ・2週前：坂路一杯 または ウッド強め（しっかり負荷）<br />
                ・1週前：芝強め または 併せ馬強め（本追い切り）<br />
                ・当週：ポリトラック馬なり または 坂路馬なり（息を整える微調整）
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <span className="font-bold text-amber-400 block mb-1">【脚元不安・虚弱馬パターン】</span>
                ・2週前：坂路一杯（脚元負担小でパワー強化）<br />
                ・1週前：坂路強め＋プール（スタミナ絞り）<br />
                ・当週：プール調教（疲労抜き＆体重キープ）
              </div>
            </div>
          </div>
        </div>
      )}

      {/* サブタブ2: 体重＆疲労管理 */}
      {activeSubTab === 'weight' && (
        <div className="space-y-6">
          {/* ベスト体重 */}
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

      {/* サブタブ3: 成長タイプ別戦略 */}
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
