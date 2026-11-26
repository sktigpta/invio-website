import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FinanceToolsDashboard } from '../components/FinanceToolsDashboard';
import { triggerDirectDownload } from '../utils/osDetector';
import { useDeviceOS } from '../hooks/useDeviceOS';
import { useDownloadModal } from '../context/DownloadModalContext';
import { applySEO } from '../utils/seoHelper';

export function ToolsPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { openDownloadModal } = useDownloadModal();
  const activeOS = useDeviceOS();

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
      initialToolId={toolId || 'invoice-generator'}
      isOverview={!toolId}
      onSelectTool={handleToolChange}
      onDirectDownload={handleDownload}
    />
  );
}

export default ToolsPage;
