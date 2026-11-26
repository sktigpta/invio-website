import { IntentLandingPage } from '../components/IntentLandingPage';
import { INTENT_LANDING_PAGES } from '../data/intentLandingPagesData';

export function FreeInvoiceSoftwarePage() {
  return <IntentLandingPage content={INTENT_LANDING_PAGES['free-invoice-software']} />;
}

export default FreeInvoiceSoftwarePage;
