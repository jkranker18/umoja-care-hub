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
import MealPlanning from "./pages/member/education/MealPlanning";
import PortionControl from "./pages/member/education/PortionControl";
import MicronutrientsImmunity from "./pages/member/education/MicronutrientsImmunity";
import StressEating from "./pages/member/education/StressEating";
import BetterSleep from "./pages/member/education/BetterSleep";
import StayingActive from "./pages/member/education/StayingActive";
import MindfulEating from "./pages/member/education/MindfulEating";
import HeartHealthy from "./pages/member/education/HeartHealthy";
import DiabetesNutrition from "./pages/member/education/DiabetesNutrition";
import ManagingHypertension from "./pages/member/education/ManagingHypertension";
import KidneyHealth from "./pages/member/education/KidneyHealth";
import HydrationGIHealth from "./pages/member/education/HydrationGIHealth";
import KitchenBasics from "./pages/member/education/KitchenBasics";
import BatchCooking from "./pages/member/education/BatchCooking";
import HealthySubstitutions from "./pages/member/education/HealthySubstitutions";
import QuickRecipes from "./pages/member/education/QuickRecipes";
import PreventiveCare from "./pages/member/education/PreventiveCare";
import TalkingToDoctor from "./pages/member/education/TalkingToDoctor";
import Medications from "./pages/member/education/Medications";
import InsuranceBasics from "./pages/member/education/InsuranceBasics";
import FoodAssistance from "./pages/member/education/FoodAssistance";
import CommunityHealth from "./pages/member/education/CommunityHealth";
import Transportation from "./pages/member/education/Transportation";
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
            {/* Education - Healthy Eating */}
            <Route path="/member/education/general-nutrition" element={<GeneralNutrition />} />
            <Route path="/member/education/reading-nutrition-label" element={<ReadingNutritionLabel />} />
            <Route path="/member/education/budget-friendly-meals" element={<BudgetFriendlyMeals />} />
            <Route path="/member/education/meal-planning" element={<MealPlanning />} />
            <Route path="/member/education/portion-control" element={<PortionControl />} />
            <Route path="/member/education/micronutrients-immunity" element={<MicronutrientsImmunity />} />
            {/* Education - Lifestyle & Mental Health */}
            <Route path="/member/education/stress-eating" element={<StressEating />} />
            <Route path="/member/education/better-sleep" element={<BetterSleep />} />
            <Route path="/member/education/staying-active" element={<StayingActive />} />
            <Route path="/member/education/mindful-eating" element={<MindfulEating />} />
            {/* Education - Managing Health Conditions */}
            <Route path="/member/education/heart-healthy" element={<HeartHealthy />} />
            <Route path="/member/education/diabetes-nutrition" element={<DiabetesNutrition />} />
            <Route path="/member/education/managing-hypertension" element={<ManagingHypertension />} />
            <Route path="/member/education/kidney-health" element={<KidneyHealth />} />
            <Route path="/member/education/hydration-gi-health" element={<HydrationGIHealth />} />
            {/* Education - Recipes & Food Prep */}
            <Route path="/member/education/kitchen-basics" element={<KitchenBasics />} />
            <Route path="/member/education/batch-cooking" element={<BatchCooking />} />
            <Route path="/member/education/healthy-substitutions" element={<HealthySubstitutions />} />
            <Route path="/member/education/quick-recipes" element={<QuickRecipes />} />
            {/* Education - Understanding Healthcare */}
            <Route path="/member/education/preventive-care" element={<PreventiveCare />} />
            <Route path="/member/education/talking-to-doctor" element={<TalkingToDoctor />} />
            <Route path="/member/education/medications" element={<Medications />} />
            <Route path="/member/education/insurance-basics" element={<InsuranceBasics />} />
            {/* Education - Local Resources */}
            <Route path="/member/education/food-assistance" element={<FoodAssistance />} />
            <Route path="/member/education/community-health" element={<CommunityHealth />} />
            <Route path="/member/education/transportation" element={<Transportation />} />
            
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
