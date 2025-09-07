import React, { Suspense, lazy } from 'react'; // <-- ADDED Suspense and lazy
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight, CheckCircle, Waves, Database, Satellite, Users } from 'lucide-react';

// --- 1. DYNAMIC IMPORT FOR THE GLOBE ---
// We use React.lazy because this is not a Next.js project.
// This ensures the heavy 3D globe component only loads when needed.
const World = lazy(() => import('@/components/ui/globe').then((m) => ({ default: m.World })));

const Homepage = () => {
  // --- 2. GLOBE CONFIGURATION AND DATA ---
  // This data is copied directly from the demo to configure the globe's appearance and the animated arcs.
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 20.5937, lng: 78.9629 }, // Centered on India
    autoRotate: true,
    autoRotateSpeed: 0.8,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: colors[Math.floor(Math.random() * colors.length)] },
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: colors[Math.floor(Math.random() * colors.length)] },
    { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: colors[Math.floor(Math.random() * colors.length)] },
    { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: colors[Math.floor(Math.random() * colors.length)] },
    { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: colors[Math.floor(Math.random() * colors.length)] },
    { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: colors[Math.floor(Math.random() * colors.length)] },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-ping-slow"></div>
      </div>
      <main className="relative z-10">

        {/* HERO SECTION - This is where the change happens */}
        <section className="pt-24 pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Waves className="h-5 w-5" />
                  <span className="text-sm font-semibold tracking-widest uppercase">Blue Carbon Ecosystems</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-tight">
                  The Trust Layer for 
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Blue Carbon
                  </span>
                </h1>
                <p className="text-lg text-slate-300 max-w-lg">
                  Our platform uses blockchain and satellite-based AI to provide transparent, verifiable, and community-focused monitoring for blue carbon ecosystem restoration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/login">
                    <Button size="lg" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all duration-300 hover:scale-105 group shadow-lg shadow-cyan-500/20">
                      Access the Portal
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto text-slate-300 hover:text-white hover:bg-slate-800/50">
                    Learn More
                  </Button>
                </div>
              </div>

              {/* --- 3. HERO VISUAL REPLACED WITH THE GLOBE --- */}
              <div className="relative h-[500px] w-full">
                <Suspense fallback={<div className="text-center text-slate-400">Loading Globe...</div>}>
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* ... The rest of your homepage sections remain unchanged ... */}
        
        <section id="features" className="py-24 bg-slate-900/70 backdrop-blur-md">
           {/* ... feature content ... */}
        </section>
        <section className="py-28">
           {/* ... benefits content ... */}
        </section>
        <section id="about" className="py-24 bg-slate-900/70 backdrop-blur-md">
           {/* ... about content ... */}
        </section>
        <section className="py-28">
           {/* ... cta content ... */}
        </section>
      </main>
      <Footer />
      <style>{`
        @keyframes pulse-slow { 50% { opacity: 0.8; } }
        @keyframes pulse-slower { 50% { opacity: 0.6; } }
        @keyframes ping-slow { 75%, 100% { transform: scale(1.8); opacity: 0; } }
        .animate-pulse-slow { animation: pulse-slow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-pulse-slower { animation: pulse-slower 9s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-ping-slow { animation: ping-slow 5s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default Homepage;