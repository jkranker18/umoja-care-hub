import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Landing from "./pages/Landing";
import MemberHome from "./pages/member/MemberHome";
import MemberProfile from "./pages/member/MemberProfile";
import MemberSignup from "./pages/member/MemberSignup";
import GeneralNutrition from "./pages/member/education/GeneralNutrition";
import ReadingNutritionLabel from "./pages/member/education/ReadingNutritionLabel";
import BudgetFriendlyMeals from "./pages/member/education/BudgetFriendlyMeals";
import CBODashboard from "./pages/cbo/CBODashboard";
import CBOOrganization from "./pages/cbo/CBOOrganization";
import CBOMemberIntake from "./pages/cbo/CBOMemberIntake";
import HealthPlanDashboard from "./pages/healthplan/HealthPlanDashboard";
import HealthPlanOutcomes from "./pages/healthplan/HealthPlanOutcomes";
import HealthPlanMembers from "./pages/healthplan/HealthPlanMembers";
import HealthPlanProfile from "./pages/healthplan/HealthPlanProfile";
import InternalOpsDashboard from "./pages/internal/InternalOpsDashboard";
import AdminManagement from "./pages/internal/AdminManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
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
            <Route path="/member/profile" element={<MemberProfile />} />
            <Route path="/member/education/general-nutrition" element={<GeneralNutrition />} />
            <Route path="/member/education/reading-nutrition-label" element={<ReadingNutritionLabel />} />
            <Route path="/member/education/budget-friendly-meals" element={<BudgetFriendlyMeals />} />
            
            {/* CBO Portal */}
            <Route path="/cbo" element={<CBODashboard />} />
            <Route path="/cbo/members" element={<CBODashboard />} />
            <Route path="/cbo/add-member" element={<CBOMemberIntake />} />
            <Route path="/cbo/organization" element={<CBOOrganization />} />
            
            {/* Health Plan Portal */}
            <Route path="/healthplan" element={<HealthPlanDashboard />} />
            <Route path="/healthplan/outcomes" element={<HealthPlanOutcomes />} />
            <Route path="/healthplan/members" element={<HealthPlanMembers />} />
            <Route path="/healthplan/profile" element={<HealthPlanProfile />} />
            
            {/* Internal Ops Portal */}
            <Route path="/internal" element={<InternalOpsDashboard />} />
            <Route path="/internal/admins" element={<AdminManagement />} />
            <Route path="/internal/cases" element={<InternalOpsDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
  );
}

export default App;
