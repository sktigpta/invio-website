import { IntentLandingPage } from '../components/IntentLandingPage';
import { INTENT_LANDING_PAGES } from '../data/intentLandingPagesData';

export function OfflineBillingSoftwarePage() {
  return <IntentLandingPage content={INTENT_LANDING_PAGES['offline-billing-software']} />;
}

export default OfflineBillingSoftwarePage;
