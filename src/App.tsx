
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./contexts/WalletContext";
import { GameProvider } from "./contexts/GameContext";
import Index from "./pages/Index";
import Swap from "./pages/Swap";
import Quests from "./pages/Quests";
import Guilds from "./pages/Guilds";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <GameProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/guilds" element={<Guilds />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/game" element={<Game />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </GameProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
