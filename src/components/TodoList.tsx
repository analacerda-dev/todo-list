import { motion, AnimatePresence } from 'framer-motion';
import { TodoItem } from './TodoItem';
import { Todo, DayOfWeek } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => boolean;
  onDelete: (id: string) => void;
  onMove: (id: string, newDay: DayOfWeek) => void;
  onReplicateAll: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onEdit, onDelete, onMove, onReplicateAll }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-muted-foreground"
      >
        <p className="text-lg">Nenhuma tarefa encontrada</p>
        <p className="text-sm mt-2">Adicione uma nova tarefa para começar!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
            onReplicateAll={onReplicateAll}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
