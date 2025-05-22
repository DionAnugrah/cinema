import { User, Movie, Studio, Schedule, Employee, Ticket, PriceRule, Shift, SalesReport } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@cinema.com',
    role: 'admin',
    password: 'admin123' // In a real app, this would be hashed
  },
  {
    id: '2',
    name: 'Operator User',
    email: 'operator@cinema.com',
    role: 'operator',
    password: 'operator123'
  },
  {
    id: '3',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'customer',
    password: 'customer123'
  }
];

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    releaseYear: 2010,
    duration: 148,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    posterUrl: 'https://images.pexels.com/photos/9764505/pexels-photo-9764505.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    genre: 'Action',
    releaseYear: 2008,
    duration: 152,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    releaseYear: 2014,
    duration: 169,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    posterUrl: 'https://images.pexels.com/photos/5797899/pexels-photo-5797899.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '4',
    title: 'Parasite',
    genre: 'Drama',
    releaseYear: 2019,
    duration: 132,
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    posterUrl: 'https://images.pexels.com/photos/8107206/pexels-photo-8107206.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const mockStudios: Studio[] = [
  {
    id: '1',
    name: 'Studio A',
    type: 'Regular',
    capacity: 120
  },
  {
    id: '2',
    name: 'Studio B',
    type: 'Regular',
    capacity: 100
  },
  {
    id: '3',
    name: 'Studio C',
    type: 'Premiere',
    capacity: 80
  }
];

export const mockSchedules: Schedule[] = [
  {
    id: '1',
    movieId: '1',
    studioId: '1',
    date: '2023-09-20',
    startTime: '10:00',
    endTime: '12:30'
  },
  {
    id: '2',
    movieId: '2',
    studioId: '2',
    date: '2023-09-20',
    startTime: '13:00',
    endTime: '15:30'
  },
  {
    id: '3',
    movieId: '3',
    studioId: '3',
    date: '2023-09-20',
    startTime: '16:00',
    endTime: '19:00'
  },
  {
    id: '4',
    movieId: '4',
    studioId: '1',
    date: '2023-09-21',
    startTime: '18:30',
    endTime: '21:00'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Ticket Seller',
    email: 'john@cinema.com',
    phone: '123-456-7890'
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'Usher',
    email: 'jane@cinema.com',
    phone: '123-456-7891'
  },
  {
    id: '3',
    name: 'Tom Wilson',
    position: 'Projectionist',
    email: 'tom@cinema.com',
    phone: '123-456-7892'
  }
];

export const mockShifts: Shift[] = [
  {
    id: '1',
    employeeId: '1',
    date: '2023-09-20',
    startTime: '09:00',
    endTime: '17:00'
  },
  {
    id: '2',
    employeeId: '2',
    date: '2023-09-20',
    startTime: '12:00',
    endTime: '20:00'
  },
  {
    id: '3',
    employeeId: '3',
    date: '2023-09-20',
    startTime: '15:00',
    endTime: '23:00'
  }
];

export const mockPriceRules: PriceRule[] = [
  { studioType: 'Regular', dayType: 'Weekday', price: 10 },
  { studioType: 'Regular', dayType: 'Weekend', price: 12 },
  { studioType: 'Premiere', dayType: 'Weekday', price: 15 },
  { studioType: 'Premiere', dayType: 'Weekend', price: 18 }
];

export const mockSalesReports: SalesReport[] = [
  {
    month: 'August 2023',
    ticketsSold: 3240,
    revenue: 42800,
    popularMovie: {
      id: '2',
      title: 'The Dark Knight',
      ticketsSold: 890
    }
  },
  {
    month: 'September 2023',
    ticketsSold: 2980,
    revenue: 38700,
    popularMovie: {
      id: '3',
      title: 'Interstellar',
      ticketsSold: 720
    }
  }
];

// Helper function to generate mock seats for a studio
export const generateSeatsForStudio = (studioId: string): { [seatId: string]: any } => {
  const seats: { [seatId: string]: any } = {};
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = studioId === '3' ? 10 : 12; // Premiere has fewer seats per row
  
  rows.forEach(row => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatId = `${row}${i}`;
      seats[seatId] = {
        id: seatId,
        row,
        number: i,
        status: Math.random() > 0.7 ? 'booked' : 'available' // Randomly mark some seats as booked
      };
    }
  });
  
  return seats;
};