import { useState } from "react";

const LANDING_PAGE_KEY = "board-landing-page-visited";

export const useLandingPage = () => {
  const [hasVisitedLanding, setHasVisitedLanding] = useState<boolean>(() => {
    try {
      const visited = localStorage.getItem(LANDING_PAGE_KEY);
      return visited === "true";
    } catch (error) {
      console.warn("Failed to read from localStorage:", error);
      return false;
    }
  });

  const markLandingPageVisited = () => {
    try {
      localStorage.setItem(LANDING_PAGE_KEY, "true");
      setHasVisitedLanding(true);
    } catch (error) {
      console.warn("Failed to write to localStorage:", error);
      setHasVisitedLanding(true); // Still update state even if localStorage fails
    }
  };

  const resetLandingPageState = () => {
    try {
      localStorage.removeItem(LANDING_PAGE_KEY);
      setHasVisitedLanding(false);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
      setHasVisitedLanding(false);
    }
  };

  return {
    hasVisitedLanding,
    markLandingPageVisited,
    resetLandingPageState,
  };
};
