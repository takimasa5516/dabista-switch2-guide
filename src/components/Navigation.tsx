import React from 'react';
import { TabType } from '../types';
import { Dna, Award, Dumbbell, MessageSquareQuote, Flag, Coins, Trophy, BookOpen, Sparkles, BookMarked } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'mating' as TabType,
      label: '配合シミュレータ',
      sub: '全327牝馬×237種牡馬判定',
      icon: Sparkles,
      badge: '強力',
      activeColor: 'text-indigo-400 border-indigo-500 bg-indigo-500/10'
    },
    {
      id: 'breeding' as TabType,
      label: '配合理論解説',
      sub: '凝った配合・3代ロードマップ',
      icon: Dna,
      activeColor: 'text-blue-400 border-blue-500 bg-blue-500/10'
    },
    {
      id: 'training' as TabType,
      label: '調教・汎用メニュー',
      sub: 'デビュー前・後ローテ＆体重計算',
      icon: Dumbbell,
      badge: '必携',
      activeColor: 'text-emerald-400 border-emerald-500 bg-emerald-500/10'
    },
    {
      id: 'stallions' as TabType,
      label: '種牡馬DB',
      sub: 'イクイノックス等最新スペック',
      icon: Award,
      activeColor: 'text-amber-400 border-amber-500 bg-amber-500/10'
    },
    {
      id: 'comments' as TabType,
      label: 'コメント・診断',
      sub: '逆引き辞書・素質自動判定',
      icon: MessageSquareQuote,
      activeColor: 'text-amber-400 border-amber-500 bg-amber-500/10'
    },
    {
      id: 'races' as TabType,
      label: 'レース・作戦',
      sub: '前壁対策・騎手・凱旋門賞',
      icon: Flag,
      activeColor: 'text-rose-400 border-rose-500 bg-rose-500/10'
    },
    {
      id: 'money' as TabType,
      label: '資金稼ぎ',
      sub: '破産回避・馬券術・地方交流',
      icon: Coins,
      activeColor: 'text-yellow-400 border-yellow-500 bg-yellow-500/10'
    },
    {
      id: 'trophy' as TabType,
      label: 'G1制覇シート',
      sub: 'トロフィー記録・三冠称号',
      icon: Trophy,
      badge: '保存',
      activeColor: 'text-yellow-300 border-yellow-400 bg-yellow-500/10'
    },
    {
      id: 'myhorses' as TabType,
      label: '愛馬カルテ',
      sub: '自厩舎メモ・体重記録',
      icon: BookOpen,
      activeColor: 'text-teal-400 border-teal-500 bg-teal-500/10'
    }
  ];

  return (
    <div className="w-full bg-slate-900/80 border-b border-slate-800 shadow-md">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        {/* モバイルで横スクロール可能なタブバー */}
        <div className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? `${item.activeColor} shadow-md shadow-black/30 font-bold`
                    : 'border-slate-800/80 bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                    isActive ? 'bg-white/10 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm leading-tight flex items-center gap-1.5">
                    <span className="whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 py-0.1 rounded bg-amber-500/30 text-amber-300 font-normal">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-normal hidden lg:block whitespace-nowrap">
                    {item.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
