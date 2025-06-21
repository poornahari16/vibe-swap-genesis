
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWallet } from '@/contexts/WalletContext';
import { useGame } from '@/contexts/GameContext';
import { toast } from 'sonner';
import LootBox from '@/components/LootBox';

interface Token {
  symbol: string;
  name: string;
  mint: string;
  price: number;
  icon: string;
}

const Swap = () => {
  const { isConnected, balance } = useWallet();
  const { addXp, incrementSwaps } = useGame();
  const [fromToken, setFromToken] = useState<Token>({
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    price: 98.45,
    icon: '◎'
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: 'USDC',
    name: 'USD Coin',
    mint: '6LX8E5Ksde8vYF2y1TdHNhXd2K5Nv8Zt6nUCHQhEf7cN',
    price: 1.00,
    icon: '💲'
  });
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [slippage, setSlippage] = useState('0.5');

  const availableTokens: Token[] = [
    { symbol: 'SOL', name: 'Solana', mint: 'So11111111111111111111111111111111111111112', price: 98.45, icon: '◎' },
    { symbol: 'USDC', name: 'USD Coin', mint: '6LX8E5Ksde8vYF2y1TdHNhXd2K5Nv8Zt6nUCHQhEf7cN', price: 1.00, icon: '💲' },
    { symbol: 'JUP', name: 'Jupiter', mint: '27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4', price: 0.87, icon: '🪐' },
    { symbol: 'RAY', name: 'Raydium', mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', price: 2.34, icon: '🌊' }
  ];

  useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const estimated = (parseFloat(fromAmount) * fromToken.price) / toToken.price;
      setToAmount(estimated.toFixed(6));
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSwapping(true);
    
    try {
      // Simulate Jupiter API call
      console.log('Fetching Jupiter quote...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful swap
      toast.success(`Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}!`);
      
      // Add XP and increment swap count
      const xpGained = Math.floor(parseFloat(fromAmount) * fromToken.price * 0.1);
      addXp(xpGained);
      incrementSwaps();
      
      toast.success(`+${xpGained} XP earned!`);
      
      // Reset form
      setFromAmount('');
      setToAmount('');
      
    } catch (error) {
      console.error('Swap failed:', error);
      toast.error('Swap failed. Please try again.');
    } finally {
      setIsSwapping(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="gaming-card max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Wallet Required</CardTitle>
              <CardDescription>Please connect your wallet to access the swap interface</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Jupiter Swap</h1>
            <p className="text-muted-foreground">Trade tokens with the best rates on Solana</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Swap Interface */}
            <div className="lg:col-span-2">
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Swap Tokens</span>
                    <Badge variant="outline" className="text-sm">
                      Best Route via Jupiter
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* From Token */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          className="text-lg h-12"
                        />
                      </div>
                      <Select value={fromToken.symbol} onValueChange={(value) => {
                        const token = availableTokens.find(t => t.symbol === value);
                        if (token) setFromToken(token);
                      }}>
                        <SelectTrigger className="w-32 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              <div className="flex items-center space-x-2">
                                <span>{token.icon}</span>
                                <span>{token.symbol}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Balance: {balance.toFixed(4)} {fromToken.symbol}</span>
                      <span>${(fromToken.price * parseFloat(fromAmount || '0')).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Switch Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={switchTokens}
                      className="rounded-full w-10 h-10 p-0"
                    >
                      ↕️
                    </Button>
                  </div>

                  {/* To Token */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={toAmount}
                          readOnly
                          className="text-lg h-12 bg-muted"
                        />
                      </div>
                      <Select value={toToken.symbol} onValueChange={(value) => {
                        const token = availableTokens.find(t => t.symbol === value);
                        if (token) setToToken(token);
                      }}>
                        <SelectTrigger className="w-32 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              <div className="flex items-center space-x-2">
                                <span>{token.icon}</span>
                                <span>{token.symbol}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Estimated Output</span>
                      <span>${(toToken.price * parseFloat(toAmount || '0')).toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Settings */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Slippage Tolerance</span>
                    <Select value={slippage} onValueChange={setSlippage}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.1">0.1%</SelectItem>
                        <SelectItem value="0.5">0.5%</SelectItem>
                        <SelectItem value="1.0">1.0%</SelectItem>
                        <SelectItem value="3.0">3.0%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Swap Button */}
                  <Button 
                    onClick={handleSwap}
                    disabled={isSwapping || !fromAmount}
                    className="jupiter-button w-full text-lg py-6"
                  >
                    {isSwapping ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Swapping...
                      </>
                    ) : (
                      'Swap Tokens'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Price Info */}
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-lg">Market Prices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {availableTokens.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{token.icon}</span>
                        <span className="font-medium">{token.symbol}</span>
                      </div>
                      <span className="text-sm font-mono">${token.price.toFixed(2)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Loot Box */}
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-lg">Daily Rewards</CardTitle>
                  <CardDescription>
                    Complete swaps to unlock mystery boxes!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <LootBox />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Swaps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>1.5 SOL → 147.67 USDC</span>
                      <Badge variant="secondary" className="text-xs">+15 XP</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>100 USDC → 115 JUP</span>
                      <Badge variant="secondary" className="text-xs">+10 XP</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>0.8 SOL → 34.2 RAY</span>
                      <Badge variant="secondary" className="text-xs">+8 XP</Badge>
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

export default Swap;
