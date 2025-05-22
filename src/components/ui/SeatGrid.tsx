import React from 'react';
import { Seat } from '../../types';

interface SeatGridProps {
  seats: { [seatId: string]: Seat };
  onSeatSelect: (seat: Seat) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, onSeatSelect }) => {
  // Get unique rows
  const rows = [...new Set(Object.values(seats).map(seat => seat.row))].sort();
  
  // Get max number of seats in any row
  const maxSeats = Math.max(...rows.map(row => 
    Object.values(seats).filter(seat => seat.row === row).length
  ));

  return (
    <div className="my-8">
      {/* Screen */}
      <div className="w-3/4 h-8 mx-auto mb-10 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center text-sm text-gray-700 dark:text-gray-300">
        SCREEN
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        {rows.map(row => (
          <div key={row} className="flex items-center space-x-2">
            <div className="w-6 text-center font-medium">{row}</div>
            <div className="flex space-x-2">
              {Array.from({ length: maxSeats }, (_, i) => {
                const seatNumber = i + 1;
                const seatId = `${row}${seatNumber}`;
                const seat = seats[seatId];
                
                if (!seat) return <div key={`empty-${seatId}`} className="w-8 h-8"></div>;
                
                const statusClasses = {
                  available: 'bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 cursor-pointer',
                  selected: 'bg-blue-500 text-white cursor-pointer',
                  booked: 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                };
                
                return (
                  <div 
                    key={seat.id}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded ${statusClasses[seat.status]}`}
                    onClick={() => seat.status !== 'booked' && onSeatSelect(seat)}
                  >
                    {seat.number}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-8 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
          <span className="text-sm">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;