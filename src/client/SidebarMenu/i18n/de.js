let settings = {};
settings.label = 'Einstellungen';

let company = {};
company.label = 'Unternehmen';
company.profile = 'Profil';
company.serviceConfiguration = 'Service Konfiguration';
company.companyInformation = 'Unternehmensinformation';

let rfg = {};
rfg.label = 'Ausschreibung';
rfg.viewRfQs = 'Liste';

let products = {};
products.label = 'Produktdaten';

let otherDocs = {};
otherDocs.label = 'Andere Dokumente';

let invoice = {};
invoice.label = 'Rechnungen';
invoice.inspect = 'Liste';
invoice.createNew = 'Erstellen';

let orders = {};
orders.label = 'Bestellungen';
orders.OrderConfirmation = 'Bestellbestätigung';
orders.OrderHistory = 'Bestellhistorie';
orders.poDownload = 'Bestellung herunterladen';

let supplier = {};
supplier.label = 'Lieferanten',
supplier.onboardingDashboard = 'Onboarding Übersicht';
supplier.onboardingCampaigns = 'Onboarding Kampagnen';
supplier.createOnboardingCampaign = 'Onboarding Kampagne erstellen';
supplier.viewOnboardingPage = 'Onboarding Startseite';

export default {
  SidebarMenu: {
    home: 'Home',
    orders: orders,
    invoice: invoice,
    otherDocs: otherDocs,
    products: products,
    rfg: rfg,
    company: company,
    settings: settings,
    supplier: supplier
  }
}
