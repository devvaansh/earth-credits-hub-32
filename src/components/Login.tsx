import React, { useState } from 'react';
// Note: In a real app, you would use a router library like react-router-dom.
// For this single-file component, we'll simulate navigation by updating state.
// import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Placeholder
import { Input } from '@/components/ui/input'; // Placeholder
import { Label } from '@/components/ui/label'; // Placeholder
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Placeholder
import { useToast } from '@/hooks/use-toast'; // Placeholder
import { Leaf, Waves, AlertCircle } from 'lucide-react';

// --- Start: UI Component Placeholders ---
// In a real project, these would be in separate files and imported.
// For this self-contained example, we define them here.

const Toaster = ({ toasts }) => (
  <div className="fixed top-0 right-0 p-4 z-50">
    {toasts.map(toast => (
      <div key={toast.id} className={`p-4 mt-2 rounded-md shadow-lg text-white ${toast.variant === 'destructive' ? 'bg-red-600' : 'bg-green-600'}`}>
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 mr-3 mt-0.5" />
          <div>
            <p className="font-bold">{toast.title}</p>
            <p className="text-sm">{toast.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Custom hook placeholder
const useCustomToast = () => {
  const [toasts, setToasts] = useState([]);
  const toast = ({ title, description, variant }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
    }, 4000);
  };
  return { toast, toasts };
};

const CustomButton = ({ children, className, ...props }) => (
  <button className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${className}`} {...props}>
    {children}
  </button>
);

const CustomInput = ({ className, ...props }) => (
  <input className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

const CustomLabel = ({ className, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />
);

const CustomCard = ({ className, ...props }) => <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props} />;
const CustomCardHeader = ({ className, ...props }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />;
const CustomCardTitle = ({ className, ...props }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />;
const CustomCardDescription = ({ className, ...props }) => <p className={`text-sm text-muted-foreground ${className}`} {...props} />;
const CustomCardContent = ({ className, ...props }) => <div className={`p-6 pt-0 ${className}`} {...props} />;

// --- End: UI Component Placeholders ---


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate(); // Simulated
  const { toast, toasts } = useCustomToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      let role = '';
      
      switch (email) {
        case 'ngo@example.com':
          role = 'NGO';
          break;
        case 'verifier@example.com':
          role = 'Verifier';
          break;
        case 'admin@example.com':
          role = 'Admin';
          break;
        default:
          toast({
            title: "Login Failed",
            description: "Invalid credentials. Please use one of the demo accounts.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
      }

      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${role}! Redirecting...`,
        variant: "default",
      });
      
      console.log(`Navigating to ${role} dashboard...`);
      // In a real app with react-router-dom, you would use:
      // const dashboardRoute = role === 'NGO' ? '/ngo-dashboard' : 
      //                      role === 'Verifier' ? '/verifier-dashboard' : 
      //                      '/admin-dashboard';
      // navigate(dashboardRoute);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Toaster toasts={toasts} />
      {/* Enhanced background: Changed to a dark gradient for a modern look */}
      <div className="min-h-screen w-full flex items-center justify-center bg-black text-white p-4 font-sans">
        <div className="absolute inset-0 w-full h-full bg-gray-900/50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] -z-10"></div>

        {/* Enhanced Card: Added a subtle border gradient and increased shadow */}
        <CustomCard className="w-full max-w-md bg-black/60 backdrop-blur-lg border border-primary/20 shadow-2xl shadow-primary/10">
          <CustomCardHeader className="text-center">
            {/* Enhanced Icons: Added a decorative, glowing container */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4 shadow-inner shadow-primary/20">
               <div className="flex items-center justify-center space-x-1">
                 <Waves className="h-8 w-8 text-cyan-300 animate-pulse" />
                 <Leaf className="h-8 w-8 text-green-300 animate-pulse [animation-delay:0.2s]" />
               </div>
            </div>
            
            <CustomCardTitle className="text-3xl font-bold bg-gradient-to-r from-green-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Blue Carbon Registry
            </CustomCardTitle>
            <CustomCardDescription className="text-gray-400">
              Environmental Impact Verification Platform
            </CustomCardDescription>
          </CustomCardHeader>
          <CustomCardContent className="">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <CustomLabel htmlFor="email" className="text-gray-300">Email</CustomLabel>
                {/* Enhanced Input: Added focus effects for better UX */}
                <CustomInput
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <CustomLabel htmlFor="password" className="text-gray-300">Password</CustomLabel>
                <CustomInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Enhanced Button: Added gradient, shadow, and interactive hover/active effects */}
              <CustomButton
                type="submit"
                className="w-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-lg hover:shadow-cyan-500/30"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </CustomButton>
            </form>
            
            {/* Enhanced Demo Section: Styled as an info box for clarity */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="text-sm bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-gray-400 space-y-1">
                <p className="font-medium text-white mb-2">Demo Credentials:</p>
                <p><span className="font-semibold text-cyan-300">NGO:</span> ngo@example.com</p>
                <p><span className="font-semibold text-green-300">Verifier:</span> verifier@example.com</p>
                <p><span className="font-semibold text-indigo-300">Admin:</span> admin@example.com</p>
                <p className="text-xs mt-2 text-gray-500">(Password can be anything)</p>
              </div>
            </div>
          </CustomCardContent>
        </CustomCard>
      </div>
    </>
  );
};

export default Login;
