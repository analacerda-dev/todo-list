import { useState } from 'react';
import { motion } from 'framer-motion';
import { Todo } from '@/types/todo';
import { CalendarDays, CalendarRange, Calendar } from 'lucide-react';

type StatMode = 'daily' | 'weekly' | 'monthly';

interface StatisticsProps {
  todos: Todo[];
}

export const Statistics = ({ todos }: StatisticsProps) => {
  const [mode, setMode] = useState<StatMode>('daily');

  const getFilteredTodos = () => {
    const now = new Date();

    switch (mode) {
      case 'daily':
        // Current day
        const dayOfWeek = now.getDay();
        const dayMapping = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const currentDay = dayMapping[dayOfWeek];
        return todos.filter(todo => todo.day === currentDay);

      case 'weekly':
        // All todos (represents current week)
        return todos;

      case 'monthly':
        // All todos (represents current month)
        return todos;

      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const total = filteredTodos.length;
  const completed = filteredTodos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getModeLabel = () => {
    switch (mode) {
      case 'daily':
        return 'Hoje';
      case 'weekly':
        return 'Esta Semana';
      case 'monthly':
        return 'Este Mês';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">📊 Estatísticas</h2>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-6">
          <motion.button
            onClick={() => setMode('daily')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              mode === 'daily'
                ? 'bg-gradient-primary text-white shadow-soft'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CalendarDays className="w-5 h-5" />
            <span>Diário</span>
          </motion.button>

          <motion.button
            onClick={() => setMode('weekly')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              mode === 'weekly'
                ? 'bg-gradient-primary text-white shadow-soft'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CalendarRange className="w-5 h-5" />
            <span>Semanal</span>
          </motion.button>

          <motion.button
            onClick={() => setMode('monthly')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              mode === 'monthly'
                ? 'bg-gradient-primary text-white shadow-soft'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5" />
            <span>Mensal</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-4">
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-lg p-6 shadow-soft"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">{getModeLabel()}</h3>

          <div className="space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total de Tarefas</span>
              <span className="text-2xl font-bold text-foreground">{total}</span>
            </div>

            {/* Completed */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Concluídas</span>
              <span className="text-2xl font-bold text-primary">{completed}</span>
            </div>

            {/* Pending */}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pendentes</span>
              <span className="text-2xl font-bold text-secondary">{pending}</span>
            </div>

            {/* Progress Bar */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progresso</span>
                <span className="text-sm font-medium text-foreground">{percentage}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-primary"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Message */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-primary rounded-lg p-4 text-center"
          >
            <p className="text-white font-medium">
              {percentage === 100
                ? '🎉 Parabéns! Todas as tarefas concluídas!'
                : percentage >= 50
                ? '💪 Continue assim! Você está no caminho certo!'
                : '🚀 Vamos lá! Você consegue!'}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
