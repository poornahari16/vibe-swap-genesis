
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';

const Index = () => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
      setTimeout(() => {
        navigate('/swap');
      }, 1000);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    navigate('/swap');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-jupiter-50/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-jupiter-gradient mb-6 animate-pulse-glow">
            <span className="text-3xl font-bold text-white">VS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-jupiter-600 via-accent to-xp bg-clip-text text-transparent animate-fade-in">
            VibeSwap Genesis
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            The first gamified DEX on Solana. Trade, quest, compete, and earn legendary NFTs
            while swapping tokens with Jupiter's best-in-class aggregation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="outline" className="text-lg px-4 py-2 rarity-epic">
              🚀 Powered by Jupiter
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 rarity-rare">
              ⚡ Lightning Fast
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 rarity-legendary">
              🎮 Gamified Trading
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="gaming-card hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="text-4xl mb-2">⚔️</div>
              <CardTitle className="text-jupiter-600">Epic Quests</CardTitle>
              <CardDescription>
                Complete trading challenges and unlock exclusive rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Challenges</span>
                  <Badge variant="secondary">+100 XP</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Volume Milestones</span>
                  <Badge variant="secondary">NFT Rewards</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gaming-card hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="text-4xl mb-2">🏆</div>
              <CardTitle className="text-accent">Guild Wars</CardTitle>
              <CardDescription>
                Join trading guilds and compete for the top leaderboard spots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Team Trading</span>
                  <Badge variant="secondary">2x XP</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Guild Rewards</span>
                  <Badge variant="secondary">Exclusive NFTs</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gaming-card hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="text-4xl mb-2">🔮</div>
              <CardTitle className="text-xp">Price Oracle</CardTitle>
              <CardDescription>
                Predict price movements and earn bonus rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Prediction Games</span>
                  <Badge variant="secondary">Win Streaks</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Oracle Rewards</span>
                  <Badge variant="secondary">Legendary Status</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="gaming-card max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Trading?</CardTitle>
              <CardDescription>
                Connect your wallet and begin your journey to become a legendary trader
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="jupiter-button w-full text-lg py-6"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    🚀 Connect Wallet & Start
                  </>
                )}
              </Button>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Supported wallets: Phantom, Solflare, Backpack</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-jupiter-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-xp/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Index;
