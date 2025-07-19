import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns'

function Calendar({ selectedDate, onDateSelect, availableDates = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = "d"
  const rows = []
  
  let days = []
  let day = startDate
  let formattedDate = ""

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat)
      const cloneDay = day
      const isCurrentMonth = isSameMonth(day, monthStart)
      const isSelected = selectedDate && isSameDay(day, selectedDate)
      const isTodayDate = isToday(day)
      const isAvailable = availableDates.some(date => isSameDay(date, day))
      const isPast = day < new Date().setHours(0, 0, 0, 0)

      days.push(
        <div
          className={`
            h-10 w-10 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors
            ${!isCurrentMonth ? 'text-gray-300' : ''}
            ${isSelected ? 'bg-primary-600 text-white' : ''}
            ${isTodayDate && !isSelected ? 'bg-primary-100 text-primary-600 font-semibold' : ''}
            ${isAvailable && !isSelected && !isTodayDate ? 'bg-green-50 text-green-600 hover:bg-green-100' : ''}
            ${!isAvailable && !isPast && isCurrentMonth && !isSelected ? 'text-gray-400 cursor-not-allowed' : ''}
            ${isPast && !isSelected ? 'text-gray-300 cursor-not-allowed' : ''}
            ${isCurrentMonth && !isPast && !isSelected && !isTodayDate ? 'hover:bg-gray-100' : ''}
          `}
          key={day}
          onClick={() => {
            if (isCurrentMonth && !isPast && (isAvailable || availableDates.length === 0)) {
              onDateSelect(cloneDay)
            }
          }}
        >
          <span>{formattedDate}</span>
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1" key={day}>
        {days}
      </div>
    )
    days = []
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {rows}
      </div>

      {/* Legend */}
      {availableDates.length > 0 && (
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-100 rounded"></div>
            <span className="text-gray-600">Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-600 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar