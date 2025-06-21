
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGame } from '@/contexts/GameContext';

interface LootItem {
  id: string;
  name: string;
  type: 'XP' | 'NFT' | 'Token';
  value: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

const LootBox = () => {
  const [isOpening, setIsOpening] = useState(false);
  const [rewards, setRewards] = useState<LootItem[]>([]);
  const [hasOpened, setHasOpened] = useState(false);
  const { addXp } = useGame();

  const possibleRewards: LootItem[] = [
    { id: '1', name: 'XP Boost', type: 'XP', value: '100', rarity: 'common', icon: '⚡' },
    { id: '2', name: 'SOL Tokens', type: 'Token', value: '0.1', rarity: 'rare', icon: '◎' },
    { id: '3', name: 'Trader Badge NFT', type: 'NFT', value: '#001', rarity: 'epic', icon: '🏆' },
    { id: '4', name: 'Legendary Boost', type: 'XP', value: '500', rarity: 'legendary', icon: '🌟' },
    { id: '5', name: 'Jupiter Token', type: 'Token', value: '25', rarity: 'rare', icon: '🪐' },
  ];

  const openLootBox = async () => {
    setIsOpening(true);
    
    // Simulate opening animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate random rewards (1-3 items)
    const numRewards = Math.floor(Math.random() * 3) + 1;
    const selectedRewards = [];
    
    for (let i = 0; i < numRewards; i++) {
      const randomIndex = Math.floor(Math.random() * possibleRewards.length);
      selectedRewards.push(possibleRewards[randomIndex]);
    }
    
    setRewards(selectedRewards);
    setIsOpening(false);
    setHasOpened(true);
    
    // Add XP for any XP rewards
    selectedRewards.forEach(reward => {
      if (reward.type === 'XP') {
        addXp(parseInt(reward.value));
      }
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-common bg-common/10';
      case 'rare': return 'border-rare bg-rare/10';
      case 'epic': return 'border-epic bg-epic/10';
      case 'legendary': return 'border-legendary bg-legendary/10';
      default: return 'border-muted';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="jupiter-button animate-pulse-glow">
          🎁 Open Loot Box
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Mystery Loot Box</DialogTitle>
          <DialogDescription className="text-center">
            {!hasOpened 
              ? "Open to discover exclusive rewards!" 
              : "Congratulations on your rewards!"
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {!hasOpened ? (
            <>
              <div className="relative">
                <div className={`w-32 h-32 rounded-xl bg-gradient-to-br from-jupiter-400 to-accent flex items-center justify-center text-6xl transition-transform duration-300 ${
                  isOpening ? 'animate-bounce scale-110' : 'hover:scale-105'
                }`}>
                  🎁
                </div>
                {isOpening && (
                  <div className="absolute inset-0 rounded-xl animate-pulse-glow" />
                )}
              </div>
              
              <Button 
                onClick={openLootBox}
                disabled={isOpening}
                className="jupiter-button min-w-[120px]"
              >
                {isOpening ? 'Opening...' : 'Open Box'}
              </Button>
            </>
          ) : (
            <div className="w-full space-y-4">
              <div className="text-center text-lg font-semibold text-primary mb-4">
                🎉 You received:
              </div>
              
              {rewards.map((reward, index) => (
                <Card 
                  key={`${reward.id}-${index}`} 
                  className={`gaming-card ${getRarityColor(reward.rarity)} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="flex items-center space-x-4 p-4">
                    <div className="text-3xl">{reward.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{reward.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reward.type} • {reward.value}
                      </div>
                    </div>
                    <Badge variant="outline" className={`rarity-${reward.rarity} capitalize`}>
                      {reward.rarity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                onClick={() => setHasOpened(false)}
                className="w-full mt-4"
                variant="outline"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LootBox;
