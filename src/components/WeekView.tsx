import { motion, AnimatePresence } from 'framer-motion';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { Statistics } from './Statistics';
import { FilterType, DayOfWeek } from '@/types/todo';

interface WeekViewProps {
  currentDay: DayOfWeek;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todos: any[];
  onAdd: (text: string, day: DayOfWeek) => boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => boolean;
  onDelete: (id: string) => void;
  onMove: (id: string, newDay: DayOfWeek) => void;
  onReplicateAll: (id: string) => void;
  showStatistics: boolean;
}

export const WeekView = ({
  currentDay,
  filter,
  onFilterChange,
  todos,
  onAdd,
  onToggle,
  onEdit,
  onDelete,
  onMove,
  onReplicateAll,
  showStatistics,
}: WeekViewProps) => {
  return (
    <div className="flex-1 p-8">
      <AnimatePresence mode="wait">
        {showStatistics ? (
          <motion.div
            key="statistics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Statistics todos={todos} />
          </motion.div>
        ) : (
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{currentDay}</h2>
              <p className="text-muted-foreground">Organize suas tarefas do dia</p>
            </div>

            {/* Input */}
            <TodoInput onAdd={onAdd} currentDay={currentDay} />

            {/* Filters */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => onFilterChange('all')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary text-primary hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Todos
              </motion.button>

              <motion.button
                onClick={() => onFilterChange('pending')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary text-primary hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Pendentes
              </motion.button>

              <motion.button
                onClick={() => onFilterChange('completed')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary text-primary hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Completos
              </motion.button>
            </div>

            {/* Todo List */}
            <TodoList
              todos={todos}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
              onReplicateAll={onReplicateAll}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
