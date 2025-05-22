import React from 'react';
import { BarChart3, Users, Film, Calendar, ArrowUpRight } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import Card from '../../components/ui/Card';
import { mockSalesReports, mockMovies, mockStudios, mockEmployees } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  // Get the most recent sales report
  const currentReport = mockSalesReports[mockSalesReports.length - 1];

  // Calculate some mock stats
  const totalMovies = mockMovies.length;
  const totalStudios = mockStudios.length;
  const totalEmployees = mockEmployees.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Tickets Sold"
            value={currentReport.ticketsSold.toString()}
            icon={<Ticket />}
            change={+8.2}
            color="bg-blue-500"
          />
          <StatCard
            title="Revenue"
            value={`$${currentReport.revenue.toLocaleString()}`}
            icon={<DollarSign />}
            change={+12.5}
            color="bg-green-500"
          />
          <StatCard
            title="Movies"
            value={totalMovies.toString()}
            icon={<Film />}
            color="bg-purple-500"
          />
          <StatCard
            title="Employees"
            value={totalEmployees.toString()}
            icon={<Users />}
            color="bg-amber-500"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Ticket Sales Chart */}
          <Card title="Monthly Ticket Sales">
            <div className="h-64 flex items-center justify-center">
              <BarChartPlaceholder />
            </div>
          </Card>
          
          {/* Popular Movies */}
          <Card title="Most Popular Movies">
            <div className="space-y-4">
              {mockSalesReports.map((report, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mr-4">
                    #{index + 1}
                  </span>
                  <div className="flex-grow">
                    <h3 className="font-medium">{report.popularMovie.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {report.popularMovie.ticketsSold} tickets sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card title="Recent Activities">
          <div className="space-y-4">
            <ActivityItem
              icon={<Calendar className="text-green-500" />}
              title="New Schedule Created"
              description="New schedule for 'Interstellar' was created for Studio C"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<Film className="text-blue-500" />}
              title="Movie Added"
              description="'Dune: Part Two' was added to the movie catalog"
              time="Yesterday"
            />
            <ActivityItem
              icon={<Users className="text-amber-500" />}
              title="Employee Shift Updated"
              description="John Doe's shift was updated for next week"
              time="2 days ago"
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Helper components
const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  color: string;
}> = ({ title, value, icon, change, color }) => (
  <Card className="border-t-4 border-t-gray-300 pt-2">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
        {change !== undefined && (
          <div className="mt-1 flex items-center">
            <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <ArrowUpRight size={14} className={`ml-1 ${change >= 0 ? "text-green-500" : "text-red-500 transform rotate-90"}`} />
            <span className="ml-1 text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>
      <div className={`${color} p-3 rounded-full`}>
        {icon}
      </div>
    </div>
  </Card>
);

const ActivityItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}> = ({ icon, title, description, time }) => (
  <div className="flex">
    <div className="mr-4">{icon}</div>
    <div className="flex-grow">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
  </div>
);

// Placeholder components for icons and charts
const Ticket = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

const DollarSign = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BarChartPlaceholder = () => (
  <div className="w-full h-full flex flex-col justify-end items-end">
    <div className="w-full flex items-end justify-around h-48 px-4">
      {[65, 40, 85, 55, 75, 90, 50].map((height, i) => (
        <div key={i} className="w-8 bg-indigo-600 dark:bg-indigo-500 rounded-t-md" style={{ height: `${height}%` }}></div>
      ))}
    </div>
    <div className="w-full flex justify-around mt-2">
      {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
        <div key={i} className="text-xs text-gray-500">{month}</div>
      ))}
    </div>
  </div>
);

export default AdminDashboard;