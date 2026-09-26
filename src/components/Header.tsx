import React from 'react';
import { Search, Trophy, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
          
          {/* ロゴ・タイトルエリア */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 p-0.5 shadow-md shadow-emerald-950 flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Switch2 対応
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-medium">完全攻略Wiki</span>
                </div>
                <h1 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-tight whitespace-nowrap">
                  ダービースタリオン <span className="text-amber-400">攻略マスター</span>
                </h1>
              </div>
            </div>

            {/* バッジ（モバイル用） */}
            <div className="sm:hidden flex items-center gap-1 text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-3 h-3" />
              <span>最新版</span>
            </div>
          </div>

          {/* 全文検索バー */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="理論、調教、コメント、資金術を検索..."
              className="w-full pl-9 pr-7 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                title="クリア"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
