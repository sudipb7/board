import { Board } from "@/components/board";
import { LandingPage } from "@/components/landing";
import { useLandingPage } from "@/hooks/useLandingPage";

export default function App() {
  const { hasVisitedLanding, markLandingPageVisited } = useLandingPage();

  const handleLaunchApp = () => {
    markLandingPageVisited();
  };

  if (!hasVisitedLanding) {
    return (
      <div className="grid place-items-center min-h-dvh place-content-center">
        <LandingPage onLaunchApp={handleLaunchApp} />
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Board />
    </div>
  );
}
