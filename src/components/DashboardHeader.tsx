import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import the logo directly from the assets folder.
// Ensure your logo is at 'src/assets/logob.png' for this to work.
import companyLogo from '@/assets/logob.png'; 

const ngoData = {
  name: "Green Future Initiative",
  initials: "GF"
};

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem('userEmail');
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account",
    });
    navigate('/');
  };

  return (
    // Main header container: fixed, full-width, with padding to contain the cylindrical element
    <header className="w-full sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8">
      {/* Cylindrical content wrapper: applies the new background color and rounded corners */}
      <div 
        className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 sm:px-8 lg:px-10 rounded-full shadow-lg"
        style={{ backgroundColor: '#9370db' }} // Apply custom purple background
      >
        
        {/* Left Side: Title and Branding */}
        <div className="flex items-center space-x-4">
          {/* Container for the logo with hover effect */}
          <div 
            className="group cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            {/* The img tag for your logo, now styled to be circular */}
            <img 
              src={companyLogo} 
              alt="Company Logo" 
              className="h-10 w-10 rounded-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110" 
            />
          </div>
          <div>
            {/* Text color changed to white for contrast */}
            <h1 className="text-xl font-semibold tracking-tight text-white">{title}</h1>
            <p className="text-purple-100 mt-0.5 text-sm">{subtitle}</p>
          </div>
        </div>

        {/* Right Side: User Actions */}
        <div className="flex items-center space-x-2">
          {children}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full group transition-transform duration-300 ease-in-out hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white">
                <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-white/50 transition-colors duration-300">
                  {/* Avatar fallback colors adjusted for purple background */}
                  <AvatarFallback className="bg-purple-700 text-purple-100 font-semibold">{ngoData.initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">{ngoData.name}</p>
                  <p className="text-xs leading-none text-slate-500 pt-1">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="group cursor-pointer">
                <User className="mr-2 h-4 w-4 text-slate-500 transition-colors duration-200 group-hover:text-purple-600" />
                <span className="transition-colors duration-200 group-hover:text-purple-600">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="group cursor-pointer">
                <Settings className="mr-2 h-4 w-4 text-slate-500 transition-colors duration-200 group-hover:text-purple-600" />
                <span className="transition-colors duration-200 group-hover:text-purple-600">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="group cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4 text-slate-500 transition-colors duration-200 group-hover:text-red-500" />
                <span className="transition-colors duration-200 group-hover:text-red-500">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

