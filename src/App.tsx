import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { BreedingSection } from './components/BreedingSection';
import { StallionSection } from './components/StallionSection';
import { TrainingSection } from './components/TrainingSection';
import { CommentsSection } from './components/CommentsSection';
import { RaceTacticsSection } from './components/RaceTacticsSection';
import { MoneySection } from './components/MoneySection';
import { TrophySection } from './components/TrophySection';
import { MyHorsesSection } from './components/MyHorsesSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('breeding');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* ヘッダー */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* タブナビゲーション */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 検索中の通知 */}
      {searchQuery && (
        <div className="bg-emerald-950/40 border-b border-emerald-800/40 py-2 px-4 text-center text-xs text-emerald-300">
          「<span className="font-bold text-white">{searchQuery}</span>」で絞り込み中
          <button
            onClick={() => setSearchQuery('')}
            className="ml-2 underline text-emerald-400 hover:text-white cursor-pointer"
          >
            解除
          </button>
        </div>
      )}

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-5 sm:py-7">
        {activeTab === 'breeding' && <BreedingSection searchQuery={searchQuery} />}
        {activeTab === 'stallions' && <StallionSection searchQuery={searchQuery} />}
        {activeTab === 'training' && <TrainingSection searchQuery={searchQuery} />}
        {activeTab === 'comments' && <CommentsSection searchQuery={searchQuery} />}
        {activeTab === 'races' && <RaceTacticsSection searchQuery={searchQuery} />}
        {activeTab === 'money' && <MoneySection searchQuery={searchQuery} />}
        {activeTab === 'trophy' && <TrophySection />}
        {activeTab === 'myhorses' && <MyHorsesSection />}
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
};

export default App;
