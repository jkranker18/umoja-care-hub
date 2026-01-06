import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Landing from "./pages/Landing";
import MemberHome from "./pages/member/MemberHome";
import MemberSignup from "./pages/member/MemberSignup";
import CBODashboard from "./pages/cbo/CBODashboard";
import HealthPlanDashboard from "./pages/healthplan/HealthPlanDashboard";
import InternalOpsDashboard from "./pages/internal/InternalOpsDashboard";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Member Portal */}
            <Route path="/member" element={<MemberHome />} />
            <Route path="/member/signup" element={<MemberSignup />} />
            <Route path="/member/plan" element={<MemberHome />} />
            <Route path="/member/orders" element={<MemberHome />} />
            <Route path="/member/tasks" element={<MemberHome />} />
            <Route path="/member/profile" element={<MemberHome />} />
            
            {/* CBO Portal */}
            <Route path="/cbo" element={<CBODashboard />} />
            <Route path="/cbo/members" element={<CBODashboard />} />
            <Route path="/cbo/add-member" element={<MemberSignup />} />
            <Route path="/cbo/organization" element={<CBODashboard />} />
            
            {/* Health Plan Portal */}
            <Route path="/healthplan" element={<HealthPlanDashboard />} />
            <Route path="/healthplan/outcomes" element={<HealthPlanDashboard />} />
            <Route path="/healthplan/members" element={<HealthPlanDashboard />} />
            <Route path="/healthplan/reports" element={<HealthPlanDashboard />} />
            
            {/* Internal Ops Portal */}
            <Route path="/internal" element={<InternalOpsDashboard />} />
            <Route path="/internal/workflows" element={<InternalOpsDashboard />} />
            <Route path="/internal/rules" element={<InternalOpsDashboard />} />
            <Route path="/internal/campaigns" element={<InternalOpsDashboard />} />
            <Route path="/internal/cases" element={<InternalOpsDashboard />} />
            <Route path="/internal/integrations" element={<Integrations />} />
            <Route path="/internal/data" element={<InternalOpsDashboard />} />
            
            {/* Integrations */}
            <Route path="/integrations" element={<Integrations />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
