import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImageSlider } from './ImageSlider';
import { Model3DViewer } from './Model3DViewer';
import { Images, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductMediaViewerProps {
  images: string[];
  modelPath: string;
  productName: string;
  className?: string;
}

export const ProductMediaViewer = ({ 
  images, 
  modelPath, 
  productName, 
  className 
}: ProductMediaViewerProps) => {
  const [viewMode, setViewMode] = useState<'images' | '3d'>('images');

  return (
    <div className={cn("relative", className)}>
      {/* Toggle Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant={viewMode === 'images' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('images')}
          className="flex items-center gap-2"
        >
          <Images size={16} />
          Images
        </Button>
        <Button
          variant={viewMode === '3d' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('3d')}
          className="flex items-center gap-2"
        >
          <Box size={16} />
          3D View
        </Button>
      </div>

      {/* Content */}
      <div className="w-full h-full">
        {viewMode === 'images' ? (
          <ImageSlider 
            images={images} 
            name={productName} 
            className="w-full h-full"
          />
        ) : (
          <Model3DViewer 
            modelPath={modelPath} 
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};