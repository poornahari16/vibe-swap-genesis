
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { toast } from 'sonner';

const Quests = () => {
  const { quests, completeQuest, addXp } = useGame();

  const handleClaimReward = (questId: string, xpReward: number) => {
    completeQuest(questId);
    addXp(xpReward);
    toast.success(`Quest completed! +${xpReward} XP earned!`);
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  const dailyQuests = [
    {
      id: 'daily-1',
      title: 'Morning Trader',
      description: 'Complete 3 swaps before noon',
      progress: 2,
      maxProgress: 3,
      xpReward: 75,
      rarity: 'common' as const,
      timeLeft: '4h 23m',
      completed: false
    },
    {
      id: 'daily-2',
      title: 'Volume Hunter',
      description: 'Trade $500+ in total volume today',
      progress: 347,
      maxProgress: 500,
      xpReward: 150,
      rarity: 'rare' as const,
      timeLeft: '15h 12m',
      completed: false
    },
    {
      id: 'daily-3',
      title: 'Token Explorer',
      description: 'Swap 5 different token pairs',
      progress: 3,
      maxProgress: 5,
      xpReward: 100,
      rarity: 'common' as const,
      timeLeft: '20h 45m',
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Quest Hub</h1>
            <p className="text-muted-foreground">Complete challenges to earn XP and unlock exclusive rewards</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Daily Quests */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">🌅</span>
                Daily Quests
                <Badge variant="outline" className="ml-2">Resets in 18h</Badge>
              </h2>
              
              <div className="space-y-4">
                {dailyQuests.map((quest) => (
                  <Card key={quest.id} className="gaming-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getRarityIcon(quest.rarity)}</span>
                          <div>
                            <CardTitle className="text-lg">{quest.title}</CardTitle>
                            <CardDescription>{quest.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className={`rarity-${quest.rarity} capitalize`}>
                          {quest.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress: {quest.progress}/{quest.maxProgress}</span>
                            <span className="text-muted-foreground">⏰ {quest.timeLeft}</span>
                          </div>
                          <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Reward:</span>
                            <Badge variant="secondary">+{quest.xpReward} XP</Badge>
                          </div>
                          
                          {quest.progress >= quest.maxProgress ? (
                            <Button 
                              onClick={() => handleClaimReward(quest.id, quest.xpReward)}
                              className="jupiter-button"
                              size="sm"
                            >
                              Claim Reward
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              In Progress
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Main Quests */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">⚔️</span>
                Epic Quests
              </h2>
              
              <div className="space-y-4">
                {quests.map((quest) => (
                  <Card key={quest.id} className="gaming-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getRarityIcon(quest.rarity)}</span>
                          <div>
                            <CardTitle className="text-lg">{quest.title}</CardTitle>
                            <CardDescription>{quest.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className={`rarity-${quest.rarity} capitalize`}>
                          {quest.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress: {quest.progress}/{quest.maxProgress}</span>
                            {quest.completed && (
                              <Badge variant="outline" className="text-xs bg-xp/10 text-xp border-xp">
                                ✓ Completed
                              </Badge>
                            )}
                          </div>
                          <Progress 
                            value={(quest.progress / quest.maxProgress) * 100} 
                            className="h-3"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Reward:</span>
                            <Badge variant="secondary">+{quest.xpReward} XP</Badge>
                            {quest.rarity === 'legendary' && (
                              <Badge variant="outline" className="rarity-legendary">
                                🏆 NFT Badge
                              </Badge>
                            )}
                          </div>
                          
                          {quest.completed ? (
                            <Badge variant="outline" className="bg-xp/10 text-xp border-xp">
                              Claimed
                            </Badge>
                          ) : quest.progress >= quest.maxProgress ? (
                            <Button 
                              onClick={() => handleClaimReward(quest.id,  quest.xpReward)}
                              className="jupiter-button"
                              size="sm"
                            >
                              Claim Reward
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              {Math.round((quest.progress / quest.maxProgress) * 100)}% Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Quest Statistics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Quest Statistics</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="gaming-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Quests Completed</div>
                </CardContent>
              </Card>
              
              <Card className="gaming-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-xp mb-2">1,847</div>
                  <div className="text-sm text-muted-foreground">Total XP Earned</div>
                </CardContent>
              </Card>
              
              <Card className="gaming-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent mb-2">5</div>
                  <div className="text-sm text-muted-foreground">Active Quests</div>
                </CardContent>
              </Card>
              
              <Card className="gaming-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-legendary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">NFT Rewards</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
