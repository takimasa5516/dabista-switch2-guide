import React, { useState, useEffect } from 'react';
import { MyHorse } from '../types';
import { BookOpen, Plus, Trash2, Edit3, Heart, Sparkles, Scale, Compass, Check } from 'lucide-react';

export const MyHorsesSection: React.FC = () => {
  const STORAGE_KEY = 'dabista_my_horses_v1';

  const defaultHorses: MyHorse[] = [
    {
      id: 'demo-1',
      name: 'アンティグラビティ',
      sex: '牡',
      sire: 'イクイノックス',
      dam: 'ハープスター',
      bestWeight: 476,
      growthType: '普通',
      comments: ['かなりのスピード', '豊富なスタミナ', '大物の雰囲気'],
      targetRace: '日本ダービー・菊花賞',
      memo: 'サンデー4×3奇跡の血量。坂路一杯でパワーを仕上げ中。前壁対策で「先行」固定。',
      createdAt: Date.now()
    }
  ];

  const [horses, setHorses] = useState<MyHorse[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultHorses;
    } catch {
      return defaultHorses;
    }
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newSex, setNewSex] = useState<'牡' | '牝' | 'セン'>('牡');
  const [newSire, setNewSire] = useState<string>('');
  const [newDam, setNewDam] = useState<string>('');
  const [newBestWeight, setNewBestWeight] = useState<string>('480');
  const [newGrowthType, setNewGrowthType] = useState<string>('普通');
  const [newTargetRace, setNewTargetRace] = useState<string>('日本ダービー');
  const [newMemo, setNewMemo] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(horses));
    } catch (e) {
      console.error(e);
    }
  }, [horses]);

  const handleAddHorse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newHorse: MyHorse = {
      id: `horse-${Date.now()}`,
      name: newName.trim(),
      sex: newSex,
      sire: newSire.trim() || '未設定',
      dam: newDam.trim() || '未設定',
      bestWeight: newBestWeight ? Number(newBestWeight) : undefined,
      growthType: newGrowthType,
      comments: [],
      targetRace: newTargetRace.trim(),
      memo: newMemo.trim(),
      createdAt: Date.now()
    };

    setHorses([newHorse, ...horses]);
    // リセット
    setNewName('');
    setNewSire('');
    setNewDam('');
    setNewMemo('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('この愛馬カルテを削除しますか？')) {
      setHorses(horses.filter(h => h.id !== id));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 導入バナー */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-teal-900/40 to-slate-900 border border-emerald-800/40 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>マイホースカルテ＆育成管理</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              自厩舎・所有馬管理メモ帳
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              育てている愛馬の「血統」「判明ベスト体重」「成長型」「目標レース」「育成メモ」をブラウザに永続記録。
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>新しい愛馬を登録</span>
          </button>
        </div>
      </div>

      {/* 新規登録フォーム */}
      {isAdding && (
        <form onSubmit={handleAddHorse} className="bg-slate-800/90 border border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>新規愛馬のカルテ作成</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">馬名 *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="例: トウカイテイオー"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">性別</label>
              <select
                value={newSex}
                onChange={e => setNewSex(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="牡">牡（オス）</option>
                <option value="牝">牝（メス）</option>
                <option value="セン">セン馬</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">成長タイプ</label>
              <select
                value={newGrowthType}
                onChange={e => setNewGrowthType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              >
                <option value="早熟">早熟型</option>
                <option value="普通">普通型</option>
                <option value="晩成">晩成型</option>
                <option value="持続・鍋底">持続・鍋底型</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">父馬（種牡馬）</label>
              <input
                type="text"
                value={newSire}
                onChange={e => setNewSire(e.target.value)}
                placeholder="例: イクイノックス"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">母馬（繁殖牝馬）</label>
              <input
                type="text"
                value={newDam}
                onChange={e => setNewDam(e.target.value)}
                placeholder="例: アーモンドアイ"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">判明ベスト体重 (kg)</label>
              <input
                type="number"
                value={newBestWeight}
                onChange={e => setNewBestWeight(e.target.value)}
                placeholder="480"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">目標レース・路線</label>
              <input
                type="text"
                value={newTargetRace}
                onChange={e => setNewTargetRace(e.target.value)}
                placeholder="例: 日本ダービー、有馬記念"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1">調教・育成メモ</label>
              <input
                type="text"
                value={newMemo}
                onChange={e => setNewMemo(e.target.value)}
                placeholder="例: 脚元弱いため坂路中心、ルメール確保"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs cursor-pointer"
            >
              カルテに保存
            </button>
          </div>
        </form>
      )}

      {/* 馬カルテ一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {horses.map((horse) => (
          <div
            key={horse.id}
            className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-700/60">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      horse.sex === '牝' ? 'bg-pink-500/20 text-pink-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {horse.sex}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      成長: {horse.growthType}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {horse.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleDelete(horse.id)}
                  className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                  title="カルテ削除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* 血統 */}
              <div className="text-xs text-slate-300 mb-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/40">
                <div>父: <strong className="text-white">{horse.sire}</strong></div>
                <div>母: <strong className="text-white">{horse.dam}</strong></div>
              </div>

              {/* ステータス・体重 */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">ベスト体重</span>
                  <span className="text-sm font-bold text-amber-300 font-mono">
                    {horse.bestWeight ? `${horse.bestWeight} kg` : '未測定'}
                  </span>
                </div>
                <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">目標レース</span>
                  <span className="text-xs font-bold text-white truncate block">
                    {horse.targetRace || '未定'}
                  </span>
                </div>
              </div>

              {/* メモ */}
              {horse.memo && (
                <p className="text-xs text-slate-300 bg-slate-900/30 p-2 rounded border border-slate-800 leading-relaxed mb-2">
                  📝 {horse.memo}
                </p>
              )}
            </div>

            <div className="pt-2 text-[10px] text-slate-500 font-mono text-right">
              登録日: {new Date(horse.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
