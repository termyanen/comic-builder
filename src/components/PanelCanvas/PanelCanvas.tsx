import { useRef, useEffect } from 'react';
import type { PanelData } from '../../types/comic';
import { renderPanel } from '../../rendering/PanelRenderer';

interface Props {
  panel: PanelData;
  active: boolean;
  onClick: () => void;
}

export function PanelCanvas({ panel, active, onClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderPanel(canvasRef.current, panel, window.devicePixelRatio);
    }
  }, [panel]);

  return (
    <div className={`panel ${active ? 'active' : ''}`} onClick={onClick}>
      <canvas ref={canvasRef} />
    </div>
  );
}
