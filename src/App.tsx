import { useLandingPage } from "./hooks/useLandingPage";
import KanbanBoard from "./components/KanbanBoard";
import SocialCard from "./components/SocialCard";

export default function App() {
  const { hasVisitedLanding, markLandingPageVisited } = useLandingPage();

  const handleLaunchApp = () => {
    markLandingPageVisited();
  };

  // Show landing page if user hasn't visited before
  if (!hasVisitedLanding) {
    return (
      <div className="grid place-items-center min-h-dvh place-content-center">
        <SocialCard onLaunchApp={handleLaunchApp} />
      </div>
    );
  }

  // Show the actual kanban board
  return <KanbanBoard />;
}
