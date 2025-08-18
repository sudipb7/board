import { useLandingPage } from "./hooks/useLandingPage";
import {LandingPage} from "./components/landing";
import { Board } from "./components/board";

export default function App() {
  const { hasVisitedLanding, markLandingPageVisited } = useLandingPage();

  const handleLaunchApp = () => {
    markLandingPageVisited();
  };

  // Show landing page if user hasn't visited before
  if (!hasVisitedLanding) {
    return (
      <div className="grid place-items-center min-h-dvh place-content-center">
        <LandingPage onLaunchApp={handleLaunchApp} />
      </div>
    );
  }

  // Show the actual kanban board
  return (
    <div className="min-h-dvh flex flex-col">
      <Board />
    </div>
  );
}
