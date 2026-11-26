import { IntentLandingPage } from '../components/IntentLandingPage';
import { INTENT_LANDING_PAGES } from '../data/intentLandingPagesData';

export function GstBillingSoftwarePage() {
  return <IntentLandingPage content={INTENT_LANDING_PAGES['gst-billing-software']} />;
}

export default GstBillingSoftwarePage;
