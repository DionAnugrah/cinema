import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerLayout from '../../components/layouts/CustomerLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import SeatGrid from '../../components/ui/SeatGrid';
import { mockMovies, mockStudios, mockSchedules, mockPriceRules, generateSeatsForStudio } from '../../data/mockData';
import { Movie, Schedule, Studio, Seat, PaymentMethod } from '../../types';
import { Calendar, Clock, User, CreditCard } from 'lucide-react';

const BookingPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [seats, setSeats] = useState<{ [seatId: string]: Seat }>({});
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  
  // Fetch movie details
  useEffect(() => {
    if (movieId) {
      const foundMovie = mockMovies.find(m => m.id === movieId);
      if (foundMovie) {
        setMovie(foundMovie);
        
        // Get available dates for this movie
        const movieSchedules = mockSchedules.filter(s => s.movieId === movieId);
        const dates = [...new Set(movieSchedules.map(s => s.date))];
        setAvailableDates(dates);
        
        if (dates.length > 0) {
          setSelectedDate(dates[0]);
        }
      }
    }
  }, [movieId]);
  
  // Update schedules when date changes
  useEffect(() => {
    if (selectedDate && movie) {
      const filteredSchedules = mockSchedules.filter(
        s => s.movieId === movie.id && s.date === selectedDate
      );
      setSchedules(filteredSchedules);
      setSelectedScheduleId('');
    }
  }, [selectedDate, movie]);
  
  // Update studio when schedule changes
  useEffect(() => {
    if (selectedScheduleId) {
      const schedule = schedules.find(s => s.id === selectedScheduleId);
      if (schedule) {
        const studio = mockStudios.find(s => s.id === schedule.studioId);
        if (studio) {
          setSelectedStudio(studio);
          setSeats(generateSeatsForStudio(studio.id));
          
          // Calculate ticket price based on studio type and day
          const date = new Date(schedule.date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const dayType = isWeekend ? 'Weekend' : 'Weekday';
          
          const priceRule = mockPriceRules.find(
            p => p.studioType === studio.type && p.dayType === dayType
          );
          
          if (priceRule) {
            setTicketPrice(priceRule.price);
          }
        }
      }
    }
  }, [selectedScheduleId, schedules]);
  
  // Update total price when seats change
  useEffect(() => {
    setTotalPrice(selectedSeats.length * ticketPrice);
  }, [selectedSeats, ticketPrice]);
  
  const handleSeatSelect = (seat: Seat) => {
    // Toggle seat selection
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
      
      // Update seat status in the seats object
      setSeats(prev => ({
        ...prev,
        [seat.id]: { ...seat, status: 'available' }
      }));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      
      // Update seat status in the seats object
      setSeats(prev => ({
        ...prev,
        [seat.id]: { ...seat, status: 'selected' }
      }));
    }
  };
  
  const handleContinue = () => {
    if (step === 1 && selectedScheduleId) {
      setStep(2);
    } else if (step === 2 && selectedSeats.length > 0) {
      setStep(3);
    } else if (step === 3) {
      // In a real app, this would process the payment and create tickets
      navigate('/booking-confirmation', { 
        state: {
          movie,
          schedule: schedules.find(s => s.id === selectedScheduleId),
          studio: selectedStudio,
          seats: selectedSeats,
          totalPrice,
          paymentMethod
        }
      });
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (!movie) {
    return (
      <CustomerLayout>
        <div className="flex justify-center items-center h-64">
          <p>Movie not found</p>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Book Tickets</h1>
        
        {/* Movie Info */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <img 
                src={movie.posterUrl} 
                alt={movie.title} 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="w-full md:w-3/4">
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  {movie.genre}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  {movie.releaseYear}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  {movie.duration} min
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{movie.description}</p>
            </div>
          </div>
        </Card>
        
        {/* Booking Steps */}
        <div className="mb-6">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <Calendar size={16} />
            </div>
            <div className="h-1 w-16 mx-2 bg-gray-200">
              <div className={`h-1 bg-red-600 ${step > 1 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
            </div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <User size={16} />
            </div>
            <div className="h-1 w-16 mx-2 bg-gray-200">
              <div className={`h-1 bg-red-600 ${step > 2 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
            </div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              <CreditCard size={16} />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Choose Schedule</span>
            <span>Select Seats</span>
            <span>Payment</span>
          </div>
        </div>
        
        {/* Step 1: Select Schedule */}
        {step === 1 && (
          <Card className="mb-6">
            <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
            
            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Select Date:</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {availableDates.map(date => {
                  const dateObj = new Date(date);
                  const formattedDate = dateObj.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  });
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 rounded-lg text-center transition-colors ${
                        selectedDate === date
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="text-xs">{formattedDate.split(',')[0]}</div>
                      <div className="text-sm font-medium">{formattedDate.split(',')[1]}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Time Selection */}
            {schedules.length > 0 ? (
              <div>
                <label className="block text-sm font-medium mb-1">Select Time:</label>
                <div className="flex flex-wrap gap-2">
                  {schedules.map(schedule => {
                    const studio = mockStudios.find(s => s.id === schedule.studioId);
                    
                    return (
                      <button
                        key={schedule.id}
                        onClick={() => setSelectedScheduleId(schedule.id)}
                        className={`flex flex-col px-4 py-2 rounded-lg transition-colors ${
                          selectedScheduleId === schedule.id
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-sm font-medium">{schedule.startTime}</span>
                        <span className="text-xs">Studio {studio?.name}</span>
                        <span className="text-xs">{studio?.type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No schedules available for the selected date.</p>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleContinue} 
                disabled={!selectedScheduleId}
              >
                Continue to Seat Selection
              </Button>
            </div>
          </Card>
        )}
        
        {/* Step 2: Select Seats */}
        {step === 2 && (
          <Card className="mb-6">
            <h3 className="text-lg font-medium mb-4">Select Your Seats</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">
                    {movie.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedDate} • {schedules.find(s => s.id === selectedScheduleId)?.startTime} • Studio {selectedStudio?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Ticket Price</p>
                  <p className="text-lg font-bold">${ticketPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <SeatGrid seats={seats} onSeatSelect={handleSeatSelect} />
            
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Selected Seats</p>
                  <p className="text-sm">
                    {selectedSeats.length > 0 
                      ? selectedSeats.map(s => s.id).join(', ') 
                      : 'None selected'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Total</p>
                  <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleContinue} 
                disabled={selectedSeats.length === 0}
              >
                Continue to Payment
              </Button>
            </div>
          </Card>
        )}
        
        {/* Step 3: Payment */}
        {step === 3 && (
          <Card className="mb-6">
            <h3 className="text-lg font-medium mb-4">Payment</h3>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Movie:</span>
                  <span>{movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span>{selectedDate} • {schedules.find(s => s.id === selectedScheduleId)?.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Studio:</span>
                  <span>{selectedStudio?.name} ({selectedStudio?.type})</span>
                </div>
                <div className="flex justify-between">
                  <span>Seats:</span>
                  <span>{selectedSeats.map(s => s.id).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Price:</span>
                  <span>${ticketPrice.toFixed(2)} × {selectedSeats.length}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="flex gap-4">
                <label className={`flex-1 border rounded-lg p-4 cursor-pointer ${paymentMethod === 'Cash' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === 'Cash'}
                    onChange={() => setPaymentMethod('Cash')}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Cash</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay at the counter</p>
                    </div>
                    <Clock size={24} className={paymentMethod === 'Cash' ? 'text-red-500' : 'text-gray-400'} />
                  </div>
                </label>
                
                <label className={`flex-1 border rounded-lg p-4 cursor-pointer ${paymentMethod === 'Non-Cash' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Non-Cash"
                    checked={paymentMethod === 'Non-Cash'}
                    onChange={() => setPaymentMethod('Non-Cash')}
                    className="sr-only"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Card/Digital</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pay with card or digital wallet</p>
                    </div>
                    <CreditCard size={24} className={paymentMethod === 'Non-Cash' ? 'text-red-500' : 'text-gray-400'} />
                  </div>
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleContinue}>
                Complete Booking
              </Button>
            </div>
          </Card>
        )}
      </div>
    </CustomerLayout>
  );
};

export default BookingPage;