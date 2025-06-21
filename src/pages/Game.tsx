
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { toast } from 'sonner';

interface PredictionGame {
  token: string;
  currentPrice: number;
  targetTime: number;
  timeLeft: number;
  prediction: 'up' | 'down' | null;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const Game = () => {
  const { addXp } = useGame();
  const [activeGames, setActiveGames] = useState<PredictionGame[]>([
    {
      token: 'SOL',
      currentPrice: 98.45,
      targetTime: 300, // 5 minutes
      timeLeft: 300,
      prediction: null,
      reward: 100,
      difficulty: 'easy'
    },
    {
      token: 'JUP',
      currentPrice: 0.87,
      targetTime: 600, // 10 minutes
      timeLeft: 600,
      prediction: null,
      reward: 150,
      difficulty: 'medium'
    },
    {
      token: 'RAY',
      currentPrice: 2.34,
      targetTime: 900, // 15 minutes
      timeLeft: 900,
      prediction: null,
      reward: 200,
      difficulty: 'hard'
    }
  ]);

  const [winStreak, setWinStreak] = useState(3);
  const [totalPredictions, setTotalPredictions] = useState(12);
  const [correctPredictions, setCorrectPredictions] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGames(prev => prev.map(game => ({
        ...game,
        timeLeft: Math.max(0, game.timeLeft - 1),
        currentPrice: game.currentPrice + (Math.random() - 0.5) * 0.02 // Simulate price movement
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const makePrediction = (tokenIndex: number, direction: 'up' | 'down') => {
    setActiveGames(prev => prev.map((game, index) => 
      index === tokenIndex 
        ? { ...game, prediction: direction }
        : game
    ));
    
    toast.success(`Prediction made: ${direction === 'up' ? '📈' : '📉'} ${activeGames[tokenIndex].token}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'rarity-common';
      case 'medium': return 'rarity-rare';
      case 'hard': return 'rarity-epic';
      default: return 'border-muted';
    }
  };

  const pastPredictions = [
    { token: 'SOL', prediction: 'up', actual: 'up', correct: true, reward: 100, time: '2h ago' },
    { token: 'USDC', prediction: 'down', actual: 'up', correct: false, reward: 0, time: '4h ago' },
    { token: 'JUP', prediction: 'up', actual: 'up', correct: true, reward: 150, time: '6h ago' },
    { token: 'RAY', prediction: 'down', actual: 'down', correct: true, reward: 200, time: '8h ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <span className="mr-2">🔮</span>
              Price Oracle Game
            </h1>
            <p className="text-muted-foreground">Predict token price movements and earn XP rewards</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Predictions */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Active Predictions</h2>
              
              <div className="space-y-6">
                {activeGames.map((game, index) => (
                  <Card key={game.token} className="gaming-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {game.token === 'SOL' && '◎'}
                            {game.token === 'JUP' && '🪐'}
                            {game.token === 'RAY' && '🌊'}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.token}/USD</CardTitle>
                            <CardDescription>
                              Current: ${game.currentPrice.toFixed(4)}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            +{game.reward} XP
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Timer */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Time Remaining</span>
                            <span className="font-mono">{formatTime(game.timeLeft)}</span>
                          </div>
                          <Progress 
                            value={(game.timeLeft / game.targetTime) * 100} 
                            className="h-2"
                          />
                        </div>

                        {/* Prediction Buttons */}
                        {game.prediction ? (
                          <div className="text-center">
                            <Badge 
                              variant="outline" 
                              className={`text-lg px-4 py-2 ${
                                game.prediction === 'up' ? 'bg-xp/10 text-xp border-xp' : 'bg-red-100 text-red-600 border-red-300'
                              }`}
                            >
                              {game.prediction === 'up' ? '📈 Bullish' : '📉 Bearish'}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-2">
                              Prediction locked in! Wait for results...
                            </div>
                          </div>
                        ) : game.timeLeft > 0 ? (
                          <div className="flex space-x-4">
                            <Button 
                              onClick={() => makePrediction(index, 'up')}
                              className="flex-1 bg-xp hover:bg-xp/90 text-white"
                            >
                              📈 Price Up
                            </Button>
                            <Button 
                              onClick={() => makePrediction(index, 'down')}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                            >
                              📉 Price Down
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Badge variant="outline" className="text-sm">
                              Time's Up! Results processing...
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stats & History */}
            <div>
              {/* Statistics */}
              <Card className="gaming-card mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Prediction Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Win Streak</span>
                    <Badge variant="outline" className="bg-xp/10 text-xp border-xp">
                      {winStreak} 🔥
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Accuracy</span>
                    <span className="font-semibold">
                      {Math.round((correctPredictions / totalPredictions) * 100)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Total Predictions</span>
                    <span className="font-semibold">{totalPredictions}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>XP Earned</span>
                    <Badge variant="secondary">1,250 XP</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Streak Rewards */}
              <Card className="gaming-card mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Streak Rewards</CardTitle>
                  <CardDescription>
                    Consecutive correct predictions unlock bonuses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">5-streak</span>
                    <Badge variant="outline" className="rarity-rare text-xs">
                      2x XP Bonus
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">10-streak</span>
                    <Badge variant="outline" className="rarity-epic text-xs">
                      Oracle NFT
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">20-streak</span>
                    <Badge variant="outline" className="rarity-legendary text-xs">
                      Legendary Title
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Predictions */}
              <Card className="gaming-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Predictions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pastPredictions.map((pred, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{pred.correct ? '✅' : '❌'}</span>
                        <span>{pred.token}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${pred.prediction === 'up' ? 'text-xp' : 'text-red-500'}`}
                        >
                          {pred.prediction === 'up' ? '📈' : '📉'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={pred.correct ? 'text-xp' : 'text-muted-foreground'}>
                          +{pred.reward} XP
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pred.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
