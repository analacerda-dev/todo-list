import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SidebarDays } from '@/components/SidebarDays';
import { WeekView } from '@/components/WeekView';
import { useTodoList } from '@/hooks/useTodoList';
import { useDarkMode } from '@/hooks/useDarkMode';
import { DayOfWeek, getDayOfWeekFromDate } from '@/types/todo';

const Index = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const {
    currentDay,
    setCurrentDay,
    filter,
    setFilter,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    moveTodoToDay,
    replicateToAllDays,
    getFilteredTodos,
    todos,
  } = useTodoList();

  const [showStatistics, setShowStatistics] = useState(false);

  // Set current day on mount
  useEffect(() => {
    const today = getDayOfWeekFromDate(new Date());
    setCurrentDay(today);
  }, [setCurrentDay]);

  const handleDayClick = (day: DayOfWeek) => {
    setCurrentDay(day);
    setShowStatistics(false);
  };

  const handleStatisticsClick = () => {
    setShowStatistics(true);
  };

  const filteredTodos = getFilteredTodos(currentDay);

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />

      <div className="flex min-h-[calc(100vh-88px)]">
        <SidebarDays
          currentDay={currentDay}
          onDayClick={handleDayClick}
          showStatistics={showStatistics}
          onStatisticsClick={handleStatisticsClick}
          getTodoCount={(day) => todos.filter((t) => t.day === day).length}
        />
        
        <WeekView
          currentDay={currentDay}
          filter={filter}
          onFilterChange={setFilter}
          todos={showStatistics ? todos : filteredTodos}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
          onMove={moveTodoToDay}
          onReplicateAll={replicateToAllDays}
          showStatistics={showStatistics}
        />
      </div>
    </div>
  );
};

export default Index;
