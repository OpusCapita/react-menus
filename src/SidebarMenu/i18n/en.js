let settings = {};
settings.label = 'Settings';

let company = {};
company.label = 'Company';
company.profile = 'Profile';
company.serviceConfiguration = 'Service Configuration';
company.companyInformation = 'Company Information';

let rfg = {};
rfg.label = 'RfQ';
rfg.viewRfQs = 'View RfQs';

let products = {};
products.label = 'Products';

let otherDocs = {};
otherDocs.label = 'Other Docs';

let invoice = {};
invoice.label = 'Invoice';
invoice.inspect = 'Inspect';
invoice.createNew = 'Create New';
invoice.serviceConfiguration = 'Service Configuration';
invoice.keyIn = 'Invoice Key-In';

let orders = {};
orders.label = 'Orders';
orders.OrderConfirmation = 'Order Confirmation';
orders.OrderHistory = 'Order History';
orders.poDownload = 'PO Download';

let supplier = {};
supplier.label = 'Suppliers',
supplier.onboardingDashboard = 'Onboarding Dashboard';
supplier.onboardingCampaigns = 'Onboarding Campaigns';
supplier.createOnboardingCampaign = 'Create Onboarding Campaign';
supplier.viewOnboardingPage = 'View Onboarding Page';

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
