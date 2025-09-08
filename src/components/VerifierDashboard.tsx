import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Satellite, XCircle, MapPin } from 'lucide-react';

// --- EXAMPLE LOCATIONS ---
// These are 5 interesting locations in India known to have good satellite data.
const exampleLocations = [
  { name: 'India Gate, Delhi', lat: 28.6129, lon: 77.2295 },
  { name: 'Mumbai Port', lat: 18.9647, lon: 72.8427 },
  { name: 'Himalayan Peaks', lat: 27.9881, lon: 86.9250 },
  { name: 'Rann of Kutch', lat: 23.7337, lon: 70.4131 },
  { name: 'Punjab Fields', lat: 30.8990, lon: 75.8573 },
];

const SatelliteVerifier = () => {
  // State for the input fields
  const [lat, setLat] = useState<string>('28.6129');
  const [lon, setLon] = useState<string>('77.2295');

  // State for the API call and image display
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Fetches satellite image from your backend API
  const handleFetchImage = async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    const apiUrl = `http://localhost:3001/api/satellite/image?lat=${lat}&lon=${lon}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the backend, including "No image found"
        throw new Error(data.error || 'Failed to fetch image from server.');
      }
      
      setImageUrl(data.imageUrl);
      toast({ title: "Success!", description: "Satellite image loaded." });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
      toast({ title: "Error", description: message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  // Sets the coordinates when an example button is clicked
  const handleExampleClick = (exampleLat: number, exampleLon: number) => {
    setLat(exampleLat.toString());
    setLon(exampleLon.toString());
    // Automatically fetch the image for the selected example
    handleFetchImage(); 
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Satellite className="h-6 w-6 text-primary" />
            <span>Live Satellite Image Verifier</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: Controls and Inputs */}
            <div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="latitude" className="text-sm font-medium">Latitude</label>
                  <Input id="latitude" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="e.g., 28.6129" />
                </div>
                <div>
                  <label htmlFor="longitude" className="text-sm font-medium">Longitude</label>
                  <Input id="longitude" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="e.g., 77.2295" />
                </div>
                <Button onClick={handleFetchImage} disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <MapPin className="h-4 w-4 mr-2" />}
                  Fetch Image
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Or try an example:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {exampleLocations.map(loc => (
                    <Button key={loc.name} variant="outline" size="sm" onClick={() => handleExampleClick(loc.lat, loc.lon)}>
                      {loc.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Image Display */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {isLoading && (
                <div className="text-center text-muted-foreground">
                  <Loader2 className="h-12 w-12 mx-auto mb-2 animate-spin" />
                  <p>Contacting Satellite...</p>
                </div>
              )}
              {error && (
                <div className="text-center text-destructive p-4">
                  <XCircle className="h-12 w-12 mx-auto mb-2" />
                  <p>{error}</p>
                </div>
              )}
              {imageUrl && !isLoading && !error && (
                <img src={imageUrl} alt={`Satellite view of ${lat}, ${lon}`} className="w-full h-full object-cover" />
              )}
              {!imageUrl && !isLoading && !error && (
                <div className="text-center text-muted-foreground p-4">
                  <Satellite className="h-12 w-12 mx-auto mb-2" />
                  <p>Enter coordinates or select an example to begin.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SatelliteVerifier;