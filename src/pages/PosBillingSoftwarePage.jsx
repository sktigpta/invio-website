import { IntentLandingPage } from '../components/IntentLandingPage';
import { INTENT_LANDING_PAGES } from '../data/intentLandingPagesData';

export function PosBillingSoftwarePage() {
  return <IntentLandingPage content={INTENT_LANDING_PAGES['pos-billing-software']} />;
}

export default PosBillingSoftwarePage;
