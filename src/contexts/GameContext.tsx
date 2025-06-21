
import { createContext, useContext, useState, ReactNode } from 'react';

interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
  completed: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

interface GameContextType {
  level: number;
  xp: number;
  maxXp: number;
  totalSwaps: number;
  totalVolume: number;
  guild: string | null;
  quests: Quest[];
  achievements: Achievement[];
  completeQuest: (questId: string) => void;
  addXp: (amount: number) => void;
  incrementSwaps: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(150);
  const [maxXp] = useState(500);
  const [totalSwaps, setTotalSwaps] = useState(7);
  const [totalVolume, setTotalVolume] = useState(1247.89);
  const [guild] = useState<string | null>('Jupiter Traders');

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'First Swap',
      description: 'Complete your first token swap',
      progress: 1,
      maxProgress: 1,
      xpReward: 50,
      completed: true,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Volume Trader',
      description: 'Trade $1000+ in volume',
      progress: 1247,
      maxProgress: 1000,
      xpReward: 200,
      completed: true,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Prediction Master',
      description: 'Win 3 price prediction games',
      progress: 2,
      maxProgress: 3,
      xpReward: 150,
      completed: false,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Guild Champion',
      description: 'Reach top 10 in your guild',
      progress: 8,
      maxProgress: 10,
      xpReward: 500,
      completed: false,
      rarity: 'legendary'
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Welcome Aboard',
      description: 'Connected your first wallet',
      icon: '🚀',
      rarity: 'common',
      unlocked: true
    },
    {
      id: '2',
      title: 'Swap Master',
      description: 'Completed 10 swaps',
      icon: '⚡',
      rarity: 'rare',
      unlocked: false
    },
    {
      id: '3',
      title: 'Oracle',
      description: 'Perfect prediction streak of 5',
      icon: '🔮',
      rarity: 'legendary',
      unlocked: false
    }
  ]);

  const completeQuest = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: true } : quest
    ));
  };

  const addXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      if (newXp >= maxXp) {
        setLevel(prevLevel => prevLevel + 1);
        return newXp - maxXp;
      }
      return newXp;
    });
  };

  const incrementSwaps = () => {
    setTotalSwaps(prev => prev + 1);
  };

  return (
    <GameContext.Provider value={{
      level,
      xp,
      maxXp,
      totalSwaps,
      totalVolume,
      guild,
      quests,
      achievements,
      completeQuest,
      addXp,
      incrementSwaps
    }}>
      {children}
    </GameContext.Provider>
  );
};
