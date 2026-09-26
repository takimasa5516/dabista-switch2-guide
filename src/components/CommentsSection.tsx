import React, { useState } from 'react';
import { preStablingComments, commentChecklistTimeline, switch2CommentFeatures } from '../data/commentsData';
import { PreStablingComment } from '../types';
import { SimulatorSection } from './SimulatorSection';
import { MessageSquareQuote, Calendar, Sparkles, Filter, CheckCircle2, HelpCircle, FileText, Award } from 'lucide-react';

interface CommentsSectionProps {
  searchQuery: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ searchQuery }) => {
  const [activeSubTab, setActiveSubTab] = useState<'comments' | 'simulator'>('comments');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImportance, setSelectedImportance] = useState<string>('all');

  const categories = [
    'all',
    'スピード',
    'スタミナ',
    '勝負根性',
    '気性',
    '体質',
    '成長型',
    '雰囲気・大物',
    '父・母似'
  ];

  const filteredComments = preStablingComments.filter((item) => {
    const matchesSearch =
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.advice.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesImp = selectedImportance === 'all' || item.importance === selectedImportance;

    return matchesSearch && matchesCat && matchesImp;
  });

  const getImportanceBadge = (importance: PreStablingComment['importance']) => {
    switch (importance) {
      case 'S':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black shadow-md shadow-amber-950';
      case 'A':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold';
      case 'B':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/40 font-bold';
      default:
        return 'bg-slate-700/60 text-slate-300 font-normal';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-amber-950/60 via-orange-900/40 to-slate-900 border border-amber-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>育成期・牧場の金言</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              入厩前コメント完全逆引き辞典＆素質診断
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              1歳9月から2歳入厩までの牧場コメントの出現条件を解析。チェックするだけで素質を判定する自動診断ツールも完備。
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveSubTab('comments')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubTab === 'comments' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              コメント辞書
            </button>
            <button
              onClick={() => setActiveSubTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                activeSubTab === 'simulator' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>素質自動診断</span>
            </button>
          </div>
        </div>
      </div>

      {/* Switch2版 新システムハイライト（育成メモ自動記録＆能力印開示） */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {switch2CommentFeatures.map((feat, idx) => (
          <div
            key={idx}
            className="bg-slate-800/80 border border-amber-600/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
                {idx === 0 ? <FileText className="w-5 h-5" /> : <Award className="w-5 h-5" />}
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                  Switch2実機仕様
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
                <div className="pt-2 text-xs text-amber-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{feat.tip}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeSubTab === 'simulator' ? (
        <SimulatorSection />
      ) : (
        <>
          {/* 育成タイムライン（カレンダー） */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>時期別コメントチェック・スケジュール</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {commentChecklistTimeline.map((item, idx) => (
                <div key={idx} className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black tracking-wider text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mb-1.5">
                      {item.month}
                    </span>
                    <h4 className="text-xs font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* フィルタバー */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* カテゴリフィルター */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-950 font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? '全カテゴリ' : cat}
                </button>
              ))}
            </div>

            {/* 重要度フィルター */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 self-end sm:self-auto">
              <span className="text-[11px] text-slate-400 px-2 font-medium">重要度:</span>
              {['all', 'S', 'A', 'B'].map((imp) => (
                <button
                  key={imp}
                  onClick={() => setSelectedImportance(imp)}
                  className={`px-2 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedImportance === imp
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {imp === 'all' ? '全て' : `${imp}ランク`}
                </button>
              ))}
            </div>
          </div>

          {/* コメント一覧カードグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-4 sm:p-5 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* カードヘッダー */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-amber-300">
                          {comment.category}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          時期: {comment.timing}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white">
                        「{comment.text}」
                      </h3>
                    </div>

                    <span className={`text-[10px] px-2 py-1 rounded-md flex-shrink-0 ${getImportanceBadge(comment.importance)}`}>
                      {comment.importance} ランク
                    </span>
                  </div>

                  {/* 出現条件・ボーダー */}
                  <div className="bg-slate-900/70 rounded-xl p-2.5 border border-slate-700/50 mb-3 text-xs">
                    <span className="text-amber-400 font-semibold block mb-0.5">【出現条件・判定ボーダー】</span>
                    <span className="text-slate-200">{comment.condition}</span>
                  </div>

                  {/* 詳細解説 */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {comment.description}
                  </p>
                </div>

                {/* 育成アドバイス */}
                <div className="pt-2.5 border-t border-slate-700/60 text-xs text-emerald-300 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
                  <span><strong className="text-slate-200">育成方針:</strong> {comment.advice}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
