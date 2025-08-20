// components/ui/calendar.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfWeek,
  endOfWeek
} from 'date-fns';

export const Calendar = ({ 
  selected, 
  onSelect, 
  mode = 'single', 
  disabled = () => false,
  className = '' 
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handleSelect = (day) => {
    if (disabled(day)) return;
    
    if (mode === 'single') {
      onSelect(day);
    } else if (mode === 'multiple') {
      const isSelected = Array.isArray(selected) && 
        selected.some(d => isSameDay(d, day));
      
      if (isSelected) {
        onSelect(selected.filter(d => !isSameDay(d, day)));
      } else {
        onSelect([...(selected || []), day]);
      }
    }
  };

  const isSelected = (day) => {
    if (mode === 'single') {
      return selected && isSameDay(day, selected);
    } else if (mode === 'multiple') {
      return Array.isArray(selected) && 
        selected.some(d => isSameDay(d, day));
    }
    return false;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-lg">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelectedDay = isSelected(day);
          const isTodayDate = isToday(day);
          const isDisabled = disabled(day);

          return (
            <button
              key={index}
              onClick={() => handleSelect(day)}
              disabled={isDisabled}
              className={`
                p-2 text-sm rounded-lg transition-all
                ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}
                ${isSelectedDay ? 'bg-blue-500 text-white font-semibold' : ''}
                ${isTodayDate && !isSelectedDay ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' : ''}
                ${!isSelectedDay && !isTodayDate && isCurrentMonth ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};