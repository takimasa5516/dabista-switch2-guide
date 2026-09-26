import React from 'react';
import { Trophy, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800/80 py-8 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-slate-300">
            Switch2版 ダービースタリオン 総合攻略ポータル
          </span>
        </div>
        <div className="text-center sm:text-right space-y-1">
          <p>© 2026 Derby Stallion Strategy Master. Non-official Fansite.</p>
          <p className="text-[11px] text-slate-600">
            ※ 本サイトは有志による攻略ファンサイトです。任天堂およびパリティビット・ゲームフリークとは関係ありません。
          </p>
        </div>
      </div>
    </footer>
  );
};
