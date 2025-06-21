
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';

interface GuildMember {
  rank: number;
  name: string;
  level: number;
  xp: number;
  swaps: number;
  volume: number;
  isCurrentUser?: boolean;
}

const Guilds = () => {
  const { guild, level, xp, totalSwaps, totalVolume } = useGame();

  const guildMembers: GuildMember[] = [
    { rank: 1, name: 'CryptoMaster', level: 15, xp: 4250, swaps: 234, volume: 15247.89, isCurrentUser: false },
    { rank: 2, name: 'SwapKing', level: 12, xp: 3890, swaps: 189, volume: 12456.34, isCurrentUser: false },
    { rank: 3, name: 'TokenHunter', level: 11, xp: 3456, swaps: 167, volume: 9876.12, isCurrentUser: false },
    { rank: 4, name: 'DeFiPro', level: 10, xp: 2987, swaps: 145, volume: 8234.56, isCurrentUser: false },
    { rank: 5, name: 'JupiterTrader', level: 9, xp: 2543, swaps: 123, volume: 6789.01, isCurrentUser: false },
    { rank: 6, name: 'SolanaExplorer', level: 8, xp: 2134, swaps: 98, volume: 4567.89, isCurrentUser: false },
    { rank: 7, name: 'GuildWarrior', level: 7, xp: 1876, swaps: 87, volume: 3456.78, isCurrentUser: false },
    { rank: 8, name: 'You', level: level, xp: 1500 + xp, swaps: totalSwaps, volume: totalVolume, isCurrentUser: true },
    { rank: 9, name: 'NewTrader', level: 4, xp: 1234, swaps: 45, volume: 2345.67, isCurrentUser: false },
    { rank: 10, name: 'Rookie', level: 3, xp: 987, swaps: 23, volume: 1234.56, isCurrentUser: false },
  ];

  const availableGuilds = [
    {
      name: 'Jupiter Elite',
      members: 2847,
      level: 15,
      description: 'Top-tier traders with legendary status',
      requirement: 'Level 10+ required',
      badge: '🏆',
      color: 'rarity-legendary'
    },
    {
      name: 'DeFi Dragons',
      members: 1923,
      level: 12,
      description: 'Fierce competitors in the trading arena',
      requirement: 'Level 8+ required',
      badge: '🐉',
      color: 'rarity-epic'
    },
    {
      name: 'Solana Swappers',
      members: 3456,
      level: 8,
      description: 'Community-focused trading guild',
      requirement: 'Level 5+ required',
      badge: '⚡',
      color: 'rarity-rare'
    },
    {
      name: 'Crypto Rookies',
      members: 5432,
      level: 4,
      description: 'Perfect for beginners to learn and grow',
      requirement: 'Open to all',
      badge: '🌱',
      color: 'rarity-common'
    }
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'text-legendary' };
    if (rank === 2) return { icon: '🥈', color: 'text-muted-foreground' };
    if (rank === 3) return { icon: '🥉', color: 'text-orange-600' };
    return { icon: `#${rank}`, color: 'text-muted-foreground' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Guild Wars</h1>
            <p className="text-muted-foreground">Join forces, compete, and earn exclusive guild rewards</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Guild */}
            <div className="lg:col-span-2">
              {guild ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                      <span className="mr-2">⚔️</span>
                      {guild} Leaderboard
                    </h2>
                    <Badge variant="outline" className="rarity-rare">
                      Guild Level 8
                    </Badge>
                  </div>

                  <Card className="gaming-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Weekly Rankings</CardTitle>
                        <Badge variant="secondary">Season 3 • Week 2</Badge>
                      </div>
                      <CardDescription>
                        Top performers earn bonus XP and exclusive NFT rewards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {guildMembers.map((member) => {
                          const rankBadge = getRankBadge(member.rank);
                          return (
                            <div 
                              key={member.rank}
                              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                member.isCurrentUser 
                                  ? 'bg-primary/10 border border-primary/20' 
                                  : 'hover:bg-muted/50'
                              }`}
                            >
                              <div className="flex items-center space-x-4">
                                <div className={`text-lg font-bold ${rankBadge.color} min-w-[2.5rem] text-center`}>
                                  {rankBadge.icon}
                                </div>
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-semibold flex items-center space-x-2">
                                    <span>{member.name}</span>
                                    {member.isCurrentUser && (
                                      <Badge variant="outline" className="text-xs">You</Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Level {member.level} • {member.swaps} swaps
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="font-semibold">{member.xp.toLocaleString()} XP</div>
                                <div className="text-sm text-muted-foreground">
                                  ${member.volume.toLocaleString()} volume
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Guild Challenges */}
                  <Card className="gaming-card mt-6">
                    <CardHeader>
                      <CardTitle>Guild Challenges</CardTitle>
                      <CardDescription>Contribute to guild-wide goals for massive rewards</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Weekly Volume Goal</span>
                          <span>$89,234 / $100,000</span>
                        </div>
                        <Progress value={89.2} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          Reward: +500 XP for all members + Exclusive Guild NFT
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Total Swaps This Week</span>
                          <span>1,234 / 1,500</span>
                        </div>
                        <Progress value={82.3} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          Reward: Unlock new guild perks and 2x XP weekend
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="gaming-card">
                  <CardHeader>
                    <CardTitle>No Guild Joined</CardTitle>
                    <CardDescription>Join a guild to compete and earn exclusive rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="jupiter-button">Browse Guilds</Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Guild Browser */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Available Guilds</h2>
              
              <div className="space-y-4">
                {availableGuilds.map((guildOption) => (
                  <Card key={guildOption.name} className="gaming-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{guildOption.badge}</span>
                          <CardTitle className="text-lg">{guildOption.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className={guildOption.color}>
                          Lv. {guildOption.level}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {guildOption.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Members:</span>
                          <span className="font-medium">{guildOption.members.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {guildOption.requirement}
                        </div>
                        
                        {guildOption.name === guild ? (
                          <Badge variant="outline" className="w-full justify-center bg-xp/10 text-xp border-xp">
                            Current Guild
                          </Badge>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            disabled={guildOption.name === 'Jupiter Elite' && level < 10}
                          >
                            {guildOption.name === 'Jupiter Elite' && level < 10 ? 'Level Required' : 'Join Guild'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Guild Benefits */}
              <Card className="gaming-card mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Guild Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>+20% XP bonus for guild activities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Exclusive guild NFT rewards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💬</span>
                    <span>Access to guild chat and strategies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Participate in guild challenges</span>
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

export default Guilds;
