// Core data types for the cinema management system

export type UserRole = 'admin' | 'operator' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // Not stored in plain text in a real app
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  duration: number; // in minutes
  description: string;
  posterUrl: string;
}

export type StudioType = 'Regular' | 'Premiere';

export interface Studio {
  id: string;
  name: string;
  type: StudioType;
  capacity: number;
}

export interface Schedule {
  id: string;
  movieId: string;
  studioId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

export type SeatStatus = 'available' | 'selected' | 'booked';

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

export type PaymentMethod = 'Cash' | 'Non-Cash';
export type DayType = 'Weekday' | 'Weekend';

export interface Ticket {
  id: string;
  scheduleId: string;
  seat: Seat;
  price: number;
  customerId?: string;
  paymentMethod: PaymentMethod;
  purchaseDate: string;
}

export interface PriceRule {
  studioType: StudioType;
  dayType: DayType;
  price: number;
}

export interface SalesReport {
  month: string;
  ticketsSold: number;
  revenue: number;
  popularMovie: {
    id: string;
    title: string;
    ticketsSold: number;
  };
}