import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/home/home";
import Signin from "./pages/auths/Signin";
import Signup from "./pages/auths/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import DashboardLayout from "./pages/dashboard/components/dashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Verification from "./pages/auths/verification";
import { AuthProvider } from "./helpers/useAuth";
import Addproduct from "./pages/dashboard/add-product";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="/dashboard/product/add" element={<Addproduct />} />
              </Route>
              <Route path="/auth/verification" element={<Verification />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
