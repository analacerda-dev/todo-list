import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { DayOfWeek } from '@/types/todo';

interface TodoInputProps {
  onAdd: (text: string, day: DayOfWeek) => boolean;
  currentDay: DayOfWeek;
}

export const TodoInput = ({ onAdd, currentDay }: TodoInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdd(text, currentDay);
    if (success) {
      setText('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nova tarefa..."
        className="flex-1 px-4 py-3 rounded-xl bg-card border-2 border-border focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
      />
      <motion.button
        type="submit"
        className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-soft hover:shadow-medium transition-shadow flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        <span>Adicionar</span>
      </motion.button>
    </motion.form>
  );
};
