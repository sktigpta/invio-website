import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FinanceToolsDashboard } from '../components/FinanceToolsDashboard';
import { detectDeviceOS, triggerDirectDownload } from '../utils/osDetector';
import { useDownloadModal } from '../context/DownloadModalContext';
import { applySEO } from '../utils/seoHelper';

export function ToolsPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { openDownloadModal } = useDownloadModal();
  const activeOS = detectDeviceOS();

  useEffect(() => {
    applySEO(toolId || 'tools');
    window.scrollTo(0, 0);
  }, [toolId]);

  const handleToolChange = (newToolId) => {
    navigate(`/tools/${newToolId}`);
  };

  const handleDownload = () => {
    if (activeOS.isMobileFallback) {
      openDownloadModal(activeOS);
    } else {
      triggerDirectDownload(activeOS);
    }
  };

  return (
    <FinanceToolsDashboard
      initialToolId={toolId || 'gst-calculator'}
      onSelectTool={handleToolChange}
      onDirectDownload={handleDownload}
    />
  );
}

export default ToolsPage;
