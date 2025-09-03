import { DeleteArea } from "./delete-area";
import { KanbanBoard } from "./kanban-board";
import { useTasks } from "@/hooks/useTasks";

export const Board = () => {
  const { tasks, clearAllTasks } = useTasks();

  const handleShowLanding = () => {
    try {
      localStorage.removeItem("board-landing-page-visited");
      window.location.reload();
    } catch (error) {
      console.warn("Failed to reset landing page state:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full p-6 w-full overflow-hidden">
      <DeleteArea
        tasks={tasks}
        onClearAll={clearAllTasks}
        onShowLanding={handleShowLanding}
      />
      <KanbanBoard tasks={tasks} />
    </div>
  );
};
