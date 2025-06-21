
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useGame } from '@/contexts/GameContext';
import { Badge } from '@/components/ui/badge';

const Navigation = () => {
  const location = useLocation();
  const { isConnected, address, disconnectWallet } = useWallet();
  const { level, xp, maxXp } = useGame();

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (addr: string) => 
    `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-jupiter-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-jupiter-600 to-accent bg-clip-text text-transparent">
              VibeSwap
            </span>
          </Link>

          {isConnected && (
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/swap" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/swap') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Swap
              </Link>
              <Link 
                to="/quests" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/quests') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Quests
              </Link>
              <Link 
                to="/guilds" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/guilds') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Guilds
              </Link>
              <Link 
                to="/game" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/game') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Predict
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isConnected && (
            <>
              <div className="hidden sm:flex items-center space-x-3">
                <Badge variant="secondary" className="font-semibold">
                  Level {level}
                </Badge>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">XP:</span>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-xp to-jupiter-400 transition-all duration-500"
                      style={{ width: `${(xp / maxXp) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{xp}/{maxXp}</span>
                </div>
              </div>
              
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  {formatAddress(address!)}
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={disconnectWallet}
                className="text-muted-foreground hover:text-foreground"
              >
                Disconnect
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
