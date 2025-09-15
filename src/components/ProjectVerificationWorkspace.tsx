import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, TrendingUp } from 'lucide-react';
import DashboardHeader from './DashboardHeader';
import EvidenceHub from './EvidenceHub';

// FONT NOTE: For this to work, ensure a modern font like 'Inter' is imported in your project's
// global CSS file (e.g., index.css) and configured in `tailwind.config.js`.
// Example for `index.css`: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
// Example for `tailwind.config.js`:
// theme: {
//   extend: {
//     fontFamily: {
//       sans: ['Inter', 'sans-serif'],
//     },
//   },
// },


//=========== TYPE DEFINITIONS for TypeScript ===========//

type ProjectStatus = 'Pending' | 'Approved' | 'Rejected';

interface ChecklistItem {
  id: string;
  label: string;
  status: 'completed' | 'warning';
  description: string;
}

interface HighlightedEntity {
  text: string;
  type: 'name' | 'coordinate' | 'legal_clause';
  confidence: number;
}

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'jpg';
  size: string;
  uploadDate: string;
  ocrText?: string;
  ocrAccuracy?: number;
  highlighted_entities?: HighlightedEntity[];
}

interface MapLayer {
  id: string;
  name: string;
  type: 'satellite' | 'photo' | 'analysis';
  date: string;
  enabled: boolean;
}

interface PhotoPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  date: string;
  thumbnail: string;
}

interface AnalysisArea {
  id: string;
  type: 'concern' | 'growth';
  coordinates: number[][];
  description: string;
}

interface AuditTrailEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

interface Message {
  id: string;
  sender: string;
  senderType: 'ngo' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}

interface ProjectData {
  id: string;
  name: string;
  ngoName: string;
  location: string;
  hectares: number;
  carbonClaim: number;
  dateSubmitted: string;
  confidenceScore: number;
  aiRecommendation: 'Data Sufficient' | 'Field Visit Recommended' | 'In Review';
  aiSummary: string;
  checklistItems: ChecklistItem[];
  documents: Document[];
  projectBounds: number[][];
  mapLayers: MapLayer[];
  photoPins: PhotoPin[];
  analysisAreas: AnalysisArea[];
  auditTrail: AuditTrailEntry[];
  messages: Message[];
}

//=========== REACT COMPONENT ===========//

const ProjectVerificationWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('Pending');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Mock project data with the defined ProjectData type
  const projectData: ProjectData = {
    id: projectId || '1',
    name: 'Mangrove Restoration Project',
    ngoName: 'Ocean Conservation NGO',
    location: 'Mombasa, Kenya',
    hectares: 150,
    carbonClaim: 2500,
    dateSubmitted: '2024-01-15',
    confidenceScore: 72,
    aiRecommendation: 'Field Visit Recommended',
    aiSummary: `The submitted land ownership deed (doc_1.pdf) was successfully processed via OCR, and the stated coordinates align with the project's geographic boundaries. However, a 15% discrepancy was noted between the claimed biomass density in the northern sector and our analysis of Sentinel-2 satellite imagery from August 2025...`,
    checklistItems: [
      { id: '1', label: 'Document Authenticity', status: 'completed', description: 'OCR data is clear and consistent' },
      { id: '2', label: 'Geospatial Integrity', status: 'completed', description: 'Boundaries match land deeds' },
      { id: '3', label: 'Visual Evidence Correlation', status: 'warning', description: 'NGO imagery partially conflicts with satellite data' },
      { id: '4', label: 'Methodology Compliance', status: 'completed', description: 'Aligns with Verra VCS standards' },
      { id: '5', label: 'Temporal Analysis', status: 'warning', description: 'Growth patterns require field verification' }
    ],
    documents: [
      { id: '1', name: 'land_ownership_deed.pdf', type: 'pdf', size: '2.4 MB', uploadDate: '2024-01-15', highlighted_entities: [{ text: 'Ocean Conservation NGO', type: 'name', confidence: 0.99 }] },
      { id: '2', name: 'project_methodology.docx', type: 'docx', size: '1.8 MB', uploadDate: '2024-01-15' },
      { id: '3', name: 'field_photos_2024.zip', type: 'jpg', size: '45.2 MB', uploadDate: '2024-01-15' }
    ],
    projectBounds: [[-4.0435, 39.6682], [-4.0445, 39.6692], [-4.0455, 39.6685], [-4.0450, 39.6675]],
    mapLayers: [{ id: 'satellite-2024', name: 'Sentinel-2 Latest', type: 'satellite', date: '2024-01-10', enabled: true }],
    photoPins: [{ id: '1', lat: -4.0440, lng: 39.6685, title: 'Northern Sector', date: '2024-01-15', thumbnail: '' }],
    analysisAreas: [{ id: '1', type: 'concern', coordinates: [[-4.0435, 39.6685], [-4.0440, 39.6690]], description: '15% biomass discrepancy detected.' }],
    auditTrail: [{ id: '1', timestamp: '2024-01-15 11:40 AM', actor: 'NGO', action: 'Project Submitted', details: 'Initial submission' }],
    messages: [{ id: '1', sender: 'Ocean Conservation NGO', senderType: 'ngo', message: 'Hello, we have submitted our project.', timestamp: '2024-01-15 12:00 PM', read: true }]
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProjectStatus('Approved');
      toast({
        title: 'Project Approved',
        description: 'The project will now proceed to carbon credit issuance.',
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setProjectStatus('Rejected');
      toast({
        title: 'Project Rejected',
        description: 'The NGO will be notified with feedback.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleRequestInfo = () => {
    toast({
      title: 'Information Request Sent',
      description: 'A message has been sent to the NGO.',
    });
  };

  const getStatusBadge = () => {
    switch (projectStatus) {
      case 'Approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Under Review</Badge>;
    }
  };

  const getAIRecommendationBadge = () => {
    switch (projectData.aiRecommendation) {
      case 'Data Sufficient':
        return <Badge className="bg-success text-success-foreground">🟢 AI: Data Sufficient ({projectData.confidenceScore}%)</Badge>;
      case 'Field Visit Recommended':
        return <Badge variant="secondary">🟡 AI: Field Visit Recommended ({projectData.confidenceScore}%)</Badge>;
      default:
        return <Badge variant="outline">🔵 AI: In Review</Badge>;
    }
  };

  return (
    // FONT STYLE: Applied a modern, sans-serif font class for better readability.
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader 
          title="Project Verification Workspace"
          subtitle="Detailed Evidence Analysis & Decision Making"
        />

        <Button 
          variant="ghost" 
          onClick={() => navigate('/verifier-dashboard')}
          // UI ENHANCEMENT: Added transition and subtle hover effect for better user feedback.
          className="mb-4 text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* UI ENHANCEMENT: Added hover effects for a more interactive, "lifting" feel. */}
        <Card className="shadow-lg border-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                {/* FONT STYLE: Increased font weight for the title to create better visual hierarchy. */}
                <CardTitle className="text-2xl font-semibold text-foreground">{projectData.name}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  ID: {projectData.id} • Submitted by <span className="font-medium text-foreground/80">{projectData.ngoName}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {getAIRecommendationBadge()}
                {getStatusBadge()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
             {/* UI ENHANCEMENT: Added a subtle border to separate summary items visually and improved styling. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-border -mx-6 px-6">
              <div className="flex items-center space-x-3 pt-4 md:pt-0">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Carbon Claim</p>
                  <p className="font-bold text-lg">{projectData.carbonClaim.toLocaleString()} Tonnes CO₂e</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-4 md:pt-0 md:pl-6">
                <div className="h-6 w-6 bg-green-100 dark:bg-green-900 rounded-lg text-green-600 dark:text-green-300 flex items-center justify-center text-lg">🌱</div>
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-bold text-lg">{projectData.hectares} Hectares</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-4 md:pt-0 md:pl-6">
                <div className="h-6 w-6 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300 flex items-center justify-center text-lg">📍</div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-bold text-lg">{projectData.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-4 md:pt-0 md:pl-6">
                <div className="h-6 w-6 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-300 flex items-center justify-center text-lg">📅</div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-bold text-lg">{projectData.dateSubmitted}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UI ENHANCEMENT: Added hover effect to the card. */}
        <Card className="shadow-lg border-accent/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="font-semibold">Verification Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleApprove}
                disabled={isProcessing || projectStatus !== 'Pending'}
                // UI ENHANCEMENT: Added transitions and a subtle scale-up on hover.
                className="bg-success hover:bg-success/90 text-success-foreground transition-all duration-200 hover:scale-105"
              >
                {isProcessing ? 'Processing...' : <><CheckCircle className="h-4 w-4 mr-2" />Approve Project</>}
              </Button>
              
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isProcessing || projectStatus !== 'Pending'}
                // UI ENHANCEMENT: Added transitions and a subtle scale-up on hover.
                className="transition-all duration-200 hover:scale-105"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Project
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRequestInfo}
                disabled={isProcessing || projectStatus !== 'Pending'}
                // UI ENHANCEMENT: Added transitions and a subtle scale-up on hover.
                className="transition-all duration-200 hover:scale-105 hover:bg-accent"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Request More Information
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* NOTE: The EvidenceHub component would also benefit from similar hover effects on its internal elements. */}
        <EvidenceHub projectData={projectData} />
      </div>
    </div>
  );
};

export default ProjectVerificationWorkspace;