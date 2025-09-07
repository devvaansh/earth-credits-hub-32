import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Waves } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
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
            description: "Invalid credentials. Try ngo@example.com, verifier@example.com, or admin@example.com",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
      }

      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${role}!`,
      });

      // Navigate to appropriate dashboard
      const dashboardRoute = role === 'NGO' ? '/ngo-dashboard' : 
                           role === 'Verifier' ? '/verifier-dashboard' : 
                           '/admin-dashboard';
      navigate(dashboardRoute);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Waves className="h-8 w-8 text-primary" />
            <Leaf className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Blue Carbon Registry
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Environmental Impact Verification Platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p>NGO: ngo@example.com</p>
              <p>Verifier: verifier@example.com</p>
              <p>Admin: admin@example.com</p>
              <p className="text-xs mt-2">Password: any</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;