
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useWallet } from '@/contexts/WalletContext';
import { useGame } from '@/contexts/GameContext';

const Profile = () => {
  const { address, balance } = useWallet();
  const { level, xp, maxXp, totalSwaps, totalVolume, achievements } = useGame();

  const formatAddress = (addr: string) => 
    `${addr.slice(0, 8)}...${addr.slice(-8)}`;

  const stats = [
    { label: 'Total Swaps', value: totalSwaps.toString(), icon: '⚡' },
    { label: 'Total Volume', value: `$${totalVolume.toLocaleString()}`, icon: '💰' },
    { label: 'Current Level', value: level.toString(), icon: '🏆' },
    { label: 'Guild Rank', value: '#8', icon: '⚔️' },
    { label: 'SOL Balance', value: `${balance.toFixed(4)} SOL`, icon: '◎' },
    { label: 'NFTs Earned', value: '3', icon: '🎨' }
  ];

  const nftCollection = [
    {
      id: '1',
      name: 'First Swap Badge',
      rarity: 'common' as const,
      description: 'Commemorates your first successful swap',
      icon: '🚀',
      earned: '2024-01-15'
    },
    {
      id: '2',
      name: 'Volume Trader',
      rarity: 'rare' as const,
      description: 'Achieved $1000+ in trading volume',
      icon: '💎',
      earned: '2024-01-20'
    },
    {
      id: '3',
      name: 'Guild Warrior',
      rarity: 'epic' as const,
      description: 'Top 10 performer in guild rankings',
      icon: '⚔️',
      earned: '2024-01-25'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'rarity-common';
      case 'rare': return 'rarity-rare';
      case 'epic': return 'rarity-epic';
      case 'legendary': return 'rarity-legendary';
      default: return 'border-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="gaming-card mb-8">
            <CardContent className="pt-8">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-2xl bg-jupiter-gradient text-white">
                    {address ? address.slice(0, 2).toUpperCase() : 'VS'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">
                    Trader Profile
                  </h1>
                  <p className="text-muted-foreground font-mono text-sm mb-4">
                    {address ? formatAddress(address) : 'Not connected'}
                  </p>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        Level {level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ({xp.toLocaleString()} / {maxXp.toLocaleString()} XP)
                      </span>
                    </div>
                    <Badge variant="outline" className="rarity-rare">
                      Jupiter Traders Guild
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Experience Progress</span>
                      <span>{Math.round((xp / maxXp) * 100)}%</span>
                    </div>
                    <Progress value={(xp / maxXp) * 100} className="h-3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Statistics */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Trading Statistics</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={stat.label} className="gaming-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                        <div className="text-3xl opacity-60">
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Achievements */}
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`gaming-card ${achievement.unlocked ? '' : 'opacity-60'}`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`${getRarityColor(achievement.rarity)} text-xs`}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                          {achievement.unlocked ? (
                            <Badge variant="outline" className="mt-2 bg-xp/10 text-xp border-xp text-xs">
                              ✓ Unlocked
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="mt-2 text-xs">
                              🔒 Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* NFT Collection */}
            <div>
              <h2 className="text-2xl font-bold mb-6">NFT Collection</h2>
              
              <div className="space-y-4">
                {nftCollection.map((nft) => (
                  <Card key={nft.id} className={`gaming-card ${getRarityColor(nft.rarity)} bg-gradient-to-br`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="text-3xl">{nft.icon}</div>
                        <Badge variant="outline" className={`${getRarityColor(nft.rarity)} capitalize`}>
                          {nft.rarity}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{nft.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {nft.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-xs text-muted-foreground">
                        Earned: {nft.earned}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Locked NFT Slots */}
                <Card className="gaming-card opacity-60 border-dashed">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-2">🔒</div>
                    <div className="text-sm text-muted-foreground">
                      Unlock more NFTs by completing quests
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="gaming-card mt-8">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Completed "Volume Trader" quest</span>
                      <Badge variant="secondary" className="text-xs">+200 XP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Swapped 1.5 SOL → USDC</span>
                      <Badge variant="secondary" className="text-xs">+15 XP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Joined Jupiter Traders Guild</span>
                      <Badge variant="secondary" className="text-xs">+50 XP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Earned "Guild Warrior" NFT</span>
                      <Badge variant="outline" className="rarity-epic text-xs">Epic</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
