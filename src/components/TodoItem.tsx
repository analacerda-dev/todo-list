import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Pencil, Trash2, MoreVertical, MoveRight } from 'lucide-react';
import { Todo, DayOfWeek, DAYS_OF_WEEK } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => boolean;
  onDelete: (id: string) => void;
  onMove: (id: string, newDay: DayOfWeek) => void;
  onReplicateAll: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete, onMove, onReplicateAll }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showMenu, setShowMenu] = useState(false);
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const handleEdit = () => {
    const success = onEdit(todo.id, editText);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleMove = (day: DayOfWeek) => {
    onMove(todo.id, day);
    setShowMoveMenu(false);
    setShowMenu(false);
  };

  const handleReplicateAll = () => {
    onReplicateAll(todo.id);
    setShowMoveMenu(false);
    setShowMenu(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-card border-2 border-border rounded-xl p-4 shadow-soft hover:shadow-medium transition-shadow relative"
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <motion.button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-primary border-primary'
              : 'border-primary hover:border-primary'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </motion.button>

        {/* Text */}
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
              if (e.key === 'Escape') {
                setEditText(todo.text);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="flex-1 px-2 py-1 rounded bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        ) : (
          <span
            className={`flex-1 text-foreground ${
              todo.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {todo.text}
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <motion.button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-md hover:bg-muted text-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Pencil className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-md hover:bg-destructive/10 text-destructive hover:text-destructive transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>

              <div className="relative">
                <motion.button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-md hover:bg-muted text-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreVertical className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium z-10 overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setShowMoveMenu(!showMoveMenu);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground flex items-center justify-between"
                      >
                        <span>Mover para</span>
                        <MoveRight className="w-4 h-4" />
                      </button>

                      <AnimatePresence>
                        {showMoveMenu && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-muted/50"
                          >
                            {DAYS_OF_WEEK.map((day) => (
                              <button
                                key={day}
                                onClick={() => handleMove(day)}
                                disabled={day === todo.day}
                                className={`w-full text-left px-6 py-2 hover:bg-muted transition-colors text-sm ${
                                  day === todo.day
                                    ? 'text-muted-foreground cursor-not-allowed'
                                    : 'text-foreground'
                                }`}
                              >
                                {day}
                              </button>
                            ))}
                            <button
                              onClick={handleReplicateAll}
                              className="w-full text-left px-6 py-2 hover:bg-muted transition-colors text-sm text-primary font-medium border-t border-border"
                            >
                              Todos os Dias
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
