
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Users, TrendingUp, Star } from 'lucide-react';

interface StarboardData {
  id: string;
  title: string;
  description: string;
  category: string;
  participants: number;
  totalReward: string;
  timeLeft: string;
  badge: string;
  color: string;
  topContributors: Array<{
    rank: number;
    name: string;
    score: string;
    avatar: string;
  }>;
  isActive: boolean;
}

const Guilds = () => {
  const { level, xp, totalSwaps, totalVolume } = useGame();

  const starboards: StarboardData[] = [
    {
      id: '1',
      title: 'Sui Starboard',
      description: 'Spread the word of Sui and climb the leader.',
      category: 'Social',
      participants: 11472,
      totalReward: '1433,300 SUI',
      timeLeft: '7d',
      badge: '🌊',
      color: 'bg-blue-500/10 border-blue-500/20',
      topContributors: [
        { rank: 1, name: 'CryptoMaster', score: '4,250', avatar: 'CM' },
        { rank: 2, name: 'SwapKing', score: '3,890', avatar: 'SK' },
        { rank: 3, name: 'TokenHunter', score: '3,456', avatar: 'TH' }
      ],
      isActive: true
    },
    {
      id: '2',
      title: 'OG Starboard',
      description: 'Talk about the first decentralized official L.',
      category: 'Community',
      participants: 5305,
      totalReward: '680,662 OG',
      timeLeft: '12d',
      badge: '👑',
      color: 'bg-purple-500/10 border-purple-500/20',
      topContributors: [
        { rank: 1, name: 'OGTrader', score: '5,432', avatar: 'OG' },
        { rank: 2, name: 'DefiPro', score: '4,123', avatar: 'DP' },
        { rank: 3, name: 'BlockchainBoss', score: '3,789', avatar: 'BB' }
      ],
      isActive: true
    },
    {
      id: '3',
      title: 'Hye Starboard',
      description: 'Hye official Starboard',
      category: 'Trading',
      participants: 3576,
      totalReward: '58,500 HYE',
      timeLeft: '5d',
      badge: '🚀',
      color: 'bg-green-500/10 border-green-500/20',
      topContributors: [
        { rank: 1, name: 'HyeHunter', score: '2,890', avatar: 'HH' },
        { rank: 2, name: 'SwapMaster', score: '2,567', avatar: 'SM' },
        { rank: 3, name: 'You', score: '1,650', avatar: 'YU' }
      ],
      isActive: true
    },
    {
      id: '4',
      title: 'Plume Starboard',
      description: 'Put a word of the Plume blockchain supply for.',
      category: 'DeFi',
      participants: 3400,
      totalReward: '180,700 PLUME',
      timeLeft: '9d',
      badge: '🪶',
      color: 'bg-pink-500/10 border-pink-500/20',
      topContributors: [
        { rank: 1, name: 'PlumePioneer', score: '3,200', avatar: 'PP' },
        { rank: 2, name: 'FeatherTrader', score: '2,890', avatar: 'FT' },
        { rank: 3, name: 'LightWeight', score: '2,456', avatar: 'LW' }
      ],
      isActive: true
    },
    {
      id: '5',
      title: 'Starboard Starboard',
      description: 'Explore PLUME, flow chain starboard.',
      category: 'Gaming',
      participants: 1995,
      totalReward: '396,150 STAR',
      timeLeft: '15d',
      badge: '⭐',
      color: 'bg-yellow-500/10 border-yellow-500/20',
      topContributors: [
        { rank: 1, name: 'StarGazer', score: '4,567', avatar: 'SG' },
        { rank: 2, name: 'CosmicTrader', score: '3,234', avatar: 'CT' },
        { rank: 3, name: 'StellarPro', score: '2,890', avatar: 'SP' }
      ],
      isActive: true
    },
    {
      id: '6',
      title: 'Dango Starboard',
      description: 'All about Dango token Leader',
      category: 'Community',
      participants: 1647,
      totalReward: '750,200 DANGO',
      timeLeft: '8d',
      badge: '🍡',
      color: 'bg-orange-500/10 border-orange-500/20',
      topContributors: [
        { rank: 1, name: 'DangoMaster', score: '2,890', avatar: 'DM' },
        { rank: 2, name: 'SweetTrader', score: '2,456', avatar: 'ST' },
        { rank: 3, name: 'TokenTaster', score: '2,123', avatar: 'TT' }
      ],
      isActive: true
    }
  ];

  const categories = ['All Starboards', 'Social', 'Community', 'Trading', 'DeFi', 'Gaming'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Explore <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Starboards</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore Quests and community Starboards. Participate in ongoing campaigns and climb the leaderboards to earn rewards.
            </p>
          </div>

          {/* Top Contributors Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="mr-2 text-yellow-500" />
              Top Contributors
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'CryptoMaster', rank: 1, score: '1,433,300', badge: '🥇', change: '+12%' },
                { name: 'SwapKing', rank: 2, score: '890,662', badge: '🥈', change: '+8%' },
                { name: 'TokenHunter', rank: 3, score: '576,890', badge: '🥉', change: '+15%' }
              ].map((contributor) => (
                <Card key={contributor.rank} className="gaming-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{contributor.badge}</div>
                        <div>
                          <div className="font-semibold">{contributor.name}</div>
                          <div className="text-sm text-muted-foreground">Rank #{contributor.rank}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {contributor.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">{contributor.score}</div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Starboards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starboards.map((starboard) => (
              <Card key={starboard.id} className={`gaming-card hover:shadow-xl transition-all duration-300 ${starboard.color}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{starboard.badge}</span>
                      <div>
                        <CardTitle className="text-lg">{starboard.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {starboard.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {starboard.timeLeft}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {starboard.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Users className="w-3 h-3 mr-1" />
                          Participants
                        </div>
                        <div className="font-semibold">{starboard.participants.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-muted-foreground mb-1">
                          <Star className="w-3 h-3 mr-1" />
                          Reward Pool
                        </div>
                        <div className="font-semibold">{starboard.totalReward}</div>
                      </div>
                    </div>

                    {/* Top Contributors */}
                    <div>
                      <div className="text-sm font-medium mb-2 flex items-center">
                        <Trophy className="w-3 h-3 mr-1" />
                        Top Contributors
                      </div>
                      <div className="space-y-2">
                        {starboard.topContributors.slice(0, 3).map((contributor) => (
                          <div key={contributor.rank} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-muted-foreground">#{contributor.rank}</span>
                              <Avatar className="w-5 h-5">
                                <AvatarFallback className="text-xs">{contributor.avatar}</AvatarFallback>
                              </Avatar>
                              <span className={contributor.name === 'You' ? 'font-semibold text-primary' : ''}>
                                {contributor.name}
                              </span>
                            </div>
                            <span className="font-medium">{contributor.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full jupiter-button"
                      size="sm"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Join Starboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Starboards
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guilds;
