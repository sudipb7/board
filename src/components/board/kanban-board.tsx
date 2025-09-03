import { Column } from "./column";
import { useTasks, type Task } from "@/hooks/useTasks";

interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
  const { moveTask, clearColumn, moveAllTasks, addTask } = useTasks();
  return (
    <div className="flex-1 flex h-full w-full gap-6 overflow-x-auto pb-4">
      <Column
        title="BACKLOG"
        column="backlog"
        headingColor="text-muted-foreground"
        tasks={tasks}
        onMoveTask={moveTask}
        onClearColumn={clearColumn}
        onMoveAllTasks={moveAllTasks}
        onAddTask={addTask}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-warning"
        tasks={tasks}
        onMoveTask={moveTask}
        onClearColumn={clearColumn}
        onMoveAllTasks={moveAllTasks}
        onAddTask={addTask}
      />
      <Column
        title="IN PROGRESS"
        column="doing"
        headingColor="text-success"
        tasks={tasks}
        onMoveTask={moveTask}
        onClearColumn={clearColumn}
        onMoveAllTasks={moveAllTasks}
        onAddTask={addTask}
      />
      <Column
        title="DONE"
        column="done"
        headingColor="text-primary"
        tasks={tasks}
        onMoveTask={moveTask}
        onClearColumn={clearColumn}
        onMoveAllTasks={moveAllTasks}
        onAddTask={addTask}
      />
    </div>
  );
};
