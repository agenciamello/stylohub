import React, { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useUser,
} from "@clerk/clerk-react";

import { DashboardPage } from "./components/DashboardPage";
import { OnboardingQuiz } from "./components/onboarding/OnboardingQuiz";

// 🔒 Garante que o usuário está logado
function RequireAuth({ children }: { children: JSX.Element }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  );
}

// 🧠 Garante que o onboarding foi completado (POR USUÁRIO)
function RequireOnboarding({ children }: { children: JSX.Element }) {
  const { user, isLoaded } = useUser();

  // evita redirecionamento errado enquanto o Clerk ainda está carregando
  if (!isLoaded) return null;

  const userId = user?.id;
  const key = `stylohub:onboarding_completed:${userId ?? "anonymous"}`;
  const completed = localStorage.getItem(key);

  if (!completed) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<SignIn routing="path" path="/login" />} />
        <Route
          path="/cadastro"
          element={<SignUp routing="path" path="/cadastro" />}
        />

        {/* ONBOARDING */}
        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <OnboardingQuiz />
            </RequireAuth>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <RequireOnboarding>
                <DashboardPage />
              </RequireOnboarding>
            </RequireAuth>
          }
        />

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
