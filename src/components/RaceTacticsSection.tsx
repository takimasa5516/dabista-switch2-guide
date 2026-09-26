import React, { useState } from 'react';
import { jockeys, raceTactics, paddockSigns, raceRoutes, overseasRaces } from '../data/raceTacticsData';
import { Flag, Eye, Users, Compass, Globe, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RaceTacticsSectionProps {
  searchQuery: string;
}

export const RaceTacticsSection: React.FC<RaceTacticsSectionProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'tactics' | 'paddock' | 'jockeys' | 'routes'>('tactics');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-red-950/60 via-rose-900/40 to-slate-900 border border-red-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 mb-2">
              <Flag className="w-3.5 h-3.5" />
              <span>レース戦略・騎手・海外遠征</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              レース作戦＆前壁対策・パドック・騎手戦略
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              勝敗を左右する「前壁（進路塞がり）」回避策、パドック気配の見極め、トップジョッキー起用法、そして凱旋門賞制覇への海外遠征条件を徹底解説。
            </p>
          </div>
          
          {/* サブタブ切替 */}
          <div className="flex flex-wrap gap-1.5 bg-slate-800/90 border border-slate-700 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveSubTab('tactics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'tactics' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              作戦・前壁対策
            </button>
            <button
              onClick={() => setActiveSubTab('paddock')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'paddock' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              パドック見極め
            </button>
            <button
              onClick={() => setActiveSubTab('jockeys')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'jockeys' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              騎手データ
            </button>
            <button
              onClick={() => setActiveSubTab('routes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'routes' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              王道ローテ・海外
            </button>
          </div>
        </div>
      </div>

      {/* サブタブ1: レース作戦＆前壁対策 */}
      {activeSubTab === 'tactics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {raceTactics.map((tactic, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                      作戦: {tactic.tactic}
                    </h3>
                    <span className="text-xs text-slate-400">
                      推奨: {tactic.recommendedFor}
                    </span>
                  </div>

                  {/* メリット */}
                  <div className="space-y-1.5 mb-3">
                    <span className="text-xs font-bold text-emerald-400 block">【メリット】</span>
                    {tactic.pros.map((p, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  {/* デメリット */}
                  <div className="space-y-1.5 mb-3">
                    <span className="text-xs font-bold text-red-400 block">【デメリット・弱点】</span>
                    {tactic.cons.map((c, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 前壁回避の極意 */}
                <div className="pt-3 border-t border-slate-700/60 bg-slate-900/60 p-3 rounded-xl">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    【必見】進路塞がり・前壁回避の秘訣
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tactic.antiTrafficTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* サブタブ2: パドック気配の見極め */}
      {activeSubTab === 'paddock' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paddockSigns.map((sign, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-400" />
                      {sign.sign}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      sign.impact === '絶好調' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      sign.impact === '好調' ? 'bg-blue-500/20 text-blue-400' :
                      sign.impact === '危険' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {sign.impact}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {sign.meaning}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700 text-xs text-amber-200 bg-slate-900/40 p-2.5 rounded-xl">
                  <strong>★ プレイヤーの対処法:</strong> {sign.countermeasure}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* サブタブ3: 騎手データ */}
      {activeSubTab === 'jockeys' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jockeys.map((jockey) => (
              <div
                key={jockey.id}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-xs">
                        {jockey.rank}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          {jockey.name}
                          {jockey.bigRaceBonus && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                              G1勝負強さ
                            </span>
                          )}
                        </h3>
                        <span className="text-[11px] text-slate-400">{jockey.type}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-200">
                      得意: {jockey.preferredTactic}
                    </span>
                  </div>

                  {/* パラメータ */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3 bg-slate-900/60 p-2 rounded-xl">
                    <div>
                      <span className="text-[10px] text-slate-400 block">直線の追い</span>
                      <span className="font-bold text-white">{jockey.finishStrength}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">折り合い・宥め</span>
                      <span className="font-bold text-white">{jockey.temperControl}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">スタート発馬</span>
                      <span className="font-bold text-white">{jockey.startSkill}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {jockey.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-700 text-xs text-emerald-300 font-medium">
                  <strong>起用アドバイス:</strong> {jockey.advice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* サブタブ4: 王道ローテ・海外遠征 */}
      {activeSubTab === 'routes' && (
        <div className="space-y-6">
          {/* 王道ローテ */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-400" />
              <span>タイトルと賞金を最大化する王道年間ローテーション</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raceRoutes.map((route, idx) => (
                <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white text-rose-300">{route.title}</h4>
                    <span className="text-xs text-slate-400">対象: {route.targetHorse}</span>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl space-y-2 text-xs">
                    <div>
                      <span className="text-amber-400 font-bold block mb-0.5">【春季スケジュール】</span>
                      {route.springSchedule.map((s, i) => (
                        <div key={i} className="text-slate-300">{s}</div>
                      ))}
                    </div>
                    <div className="pt-1 border-t border-slate-800">
                      <span className="text-amber-400 font-bold block mb-0.5">【秋季スケジュール】</span>
                      {route.autumnSchedule.map((s, i) => (
                        <div key={i} className="text-slate-300">{s}</div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 bg-slate-900/30 p-2 rounded">
                    ★ {route.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 海外遠征 */}
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>世界最高峰！海外G1遠征の出走条件と攻略法</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {overseasRaces.map((race, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      {race.country}
                    </span>
                    <h4 className="text-base font-black text-white mt-1 mb-0.5">{race.name}</h4>
                    <div className="text-xs text-slate-400 mb-2 font-mono">{race.course} ({race.date})</div>

                    <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-700/60 mb-2.5 text-xs">
                      <span className="text-amber-400 font-bold block mb-1">出走条件:</span>
                      <ul className="space-y-1 text-slate-300">
                        {race.conditions.map((c, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-amber-400">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-slate-300 mb-2">
                      <span className="font-bold text-slate-200">必要能力:</span> {race.requiredStats}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2 rounded-lg">
                    <strong>攻略メモ:</strong> {race.strategy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
