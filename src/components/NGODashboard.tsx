import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardHeader from './DashboardHeader';
import { Upload, MessageSquare } from 'lucide-react';
import { Chatbot } from '@/components/chatbot'; 
import { BackgroundBeams } from "@/components/ui/background-beams";

const NGODashboard = () => {
  return (
    // ## THIS LINE IS THE FIX ##
    // The 'flex', 'flex-col', and 'items-center' classes have been removed.
    <div className="min-h-screen w-full bg-neutral-950 relative antialiased">
      
      {/* This 'z-10' wrapper ensures your content is on top of the beams. */}
      <div className="relative z-10 w-full">

        {/* Your existing header */}
        <DashboardHeader 
          title="NGO Project Portal" 
          subtitle="Submit your project details using our AI assistant below."
        />
        
        {/* Your existing main content */}
        <main className="max-w-5xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
          
          <Card className="shadow-lg bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-200">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>AI Project Submission</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Chatbot />
            </CardContent>
          </Card>
          
          <Card className="shadow-lg bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-200">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your project submissions will appear here after verification.</p>
              </div>
            </CardContent>
          </Card>

        </main>
      </div>

      {/* The BackgroundBeams component remains at the end */}
      <BackgroundBeams />
    </div>
  );
};

export default NGODashboard;

