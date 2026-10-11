import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FinanceToolsDashboard } from '../components/FinanceToolsDashboard';
import { detectDeviceOS, triggerDirectDownload } from '../utils/osDetector';
import { applySEO } from '../utils/seoHelper';

export function ToolsPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const activeOS = detectDeviceOS();

  useEffect(() => {
    applySEO(toolId || 'tools');
    window.scrollTo(0, 0);
  }, [toolId]);

  const handleToolChange = (newToolId) => {
    navigate(`/tools/${newToolId}`);
  };

  return (
    <FinanceToolsDashboard
      initialToolId={toolId || 'gst-calculator'}
      onSelectTool={handleToolChange}
      onDirectDownload={() => triggerDirectDownload(activeOS)}
    />
  );
}

export default ToolsPage;
