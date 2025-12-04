import { motion } from 'framer-motion';
import { DayOfWeek, DAYS_OF_WEEK, getDayOfWeekFromDate } from '@/types/todo';
import { BarChart3, CalendarDays } from 'lucide-react';

interface SidebarDaysProps {
  currentDay: DayOfWeek;
  onDayClick: (day: DayOfWeek) => void;
  showStatistics: boolean;
  onStatisticsClick: () => void;
  getTodoCount: (day: DayOfWeek) => number;
}

export const SidebarDays = ({ currentDay, onDayClick, showStatistics, onStatisticsClick, getTodoCount }: SidebarDaysProps) => {
  const today = getDayOfWeekFromDate(new Date());

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-card border-r border-border p-4 space-y-2"
    >
      <div className="flex items-center gap-2 text-primary mb-4">
        <CalendarDays className="w-5 h-5" />
        <h2 className="text-lg font-bold">Dias da Semana</h2>
      </div>

      {DAYS_OF_WEEK.map((day) => {
        const count = getTodoCount(day);
        return (
          <motion.button
            key={day}
            onClick={() => onDayClick(day)}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors relative ${
              currentDay === day && !showStatistics
                ? 'bg-gradient-primary text-white shadow-soft'
                : 'bg-muted/50 hover:bg-muted text-muted-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span>{day}</span>
              {count > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full font-semibold min-w-[24px] text-center ${
                  currentDay === day && !showStatistics
                    ? 'bg-white/20 text-white'
                    : 'bg-primary/20 text-primary'
                }`}>
                  {count}
                </span>
              )}
            </div>
          </motion.button>
        );
      })}

      <div className="pt-4 mt-4 border-t border-border">
        <motion.button
          onClick={onStatisticsClick}
          className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
            showStatistics
              ? 'bg-gradient-primary text-white shadow-soft'
              : 'bg-muted/50 hover:bg-muted text-muted-foreground'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Estatísticas</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};
