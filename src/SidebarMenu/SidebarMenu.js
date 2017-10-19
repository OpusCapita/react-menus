import React from 'react';
import logo from './oc-logo-white.svg';
import locales from './i18n';

export default class SidebarMenu extends React.Component {
  static defaultProps = {
    isBuyer: true,
    logo: logo
  }

  static propTypes = {
    isBuyer: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    logo: React.PropTypes.string
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      oldOpenMenuName: null,
      currentOpenMenuName: null,
      activeMainMenuName: 'Home',
      activeSubMenuName: null,
    };
    let i18n;
  }

  componentWillMount(){
    if(this.context.i18n) {
      this.i18n = this.context.i18n.register('SidebarMenu', locales);
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideMenu, false);
    const elem = document.querySelector(`a[href='${window.location.pathname}']`);
    if (elem != null) {
      elem.click();
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideMenu, false);
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.i18n && this.i18n.locale && nextContext.i18n && nextContext.i18n.locale != this.i18n.locale){
      this.i18n = nextContext.i18n.register('SidebarMenu', locales);
    }
  }

  hideMenu = () => {
    if (this.state.currentOpenMenuName) {
      this.setState({
        oldOpenMenuName: this.state.currentOpenMenuName,
        currentOpenMenuName: null,
      });
    } else if (this.state.oldOpenMenuName) {
      this.setState({ oldOpenMenuName: null });
    }
  };

  mainMenuWithSubmenuClick(menuName, e) {
    e.preventDefault();

    if (this.state.oldOpenMenuName !== menuName) {
      this.setState({ currentOpenMenuName: menuName });
    }
  }

  handleMenuItemClick(link, activeMainMenuName, activeSubMenuName, e) {

    e.preventDefault();

    // Third argument is optional, null if a main-menu item does not have sub-menu items.
    if (typeof activeSubMenuName !== 'string') {
      activeSubMenuName = null;  // eslint-disable-line no-param-reassign
      e = arguments[2];  // eslint-disable-line no-param-reassign
    }

    const activeMenuName = {};

    if (this.state.activeMainMenuName !== activeMainMenuName) {
      activeMenuName.activeMainMenuName = activeMainMenuName;
    }

    if (this.state.activeSubMenuName !== activeSubMenuName) {
      activeMenuName.activeSubMenuName = activeSubMenuName;
    }

    if (Object.keys(activeMenuName).length) {
      this.setState(activeMenuName);
    }

    var currentPath = window.location.pathname;
    var slashIndex = currentPath && currentPath.indexOf('/', 1);
    var currentBasePath = slashIndex > 0 ? currentPath.substr(0, slashIndex) : currentPath;
    var linkBasePathIndex = link.indexOf(currentBasePath);
    var linkIsRelative = linkBasePathIndex === 0;

    if(linkIsRelative) {
      var newPath = link.substr(currentBasePath.length) || '/'
      this.context.router.push(newPath);
    } else {
        window.location = link;
    }
  }

  render() {
    const { isBuyer, logo, style } = this.props;
    const isSupplier = !isBuyer;
    return (
      <section
        className="sidebar"
        style={Object.assign({ minHeight: '100vh', position: 'fixed', zIndex: 3 }, style)}
      >
        <nav className="navbar navbar-default" style={{ border: 0 }}>
          <div className="nav-background" />
          <div className="navbar-header hidden-md">
            <a className="navbar-brand visible-lg" href="http://www.opuscapita.com/">
              <img src={logo} style={{ height: '1.4em' }} />
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className={`${this.state.activeMainMenuName === 'Home' && ' active' || ''}`}>
              <a
                href="/bnp/dashboard"
                onClick={this.handleMenuItemClick.bind(this, '/bnp/dashboard', 'Home')}
              >
                <span className="oci oci-store" />
                {this.i18n? this.i18n.getMessage('SidebarMenu.home') : 'Home'}
              </a>
            </li>

            {
              /*<li
                className={`dropdown${
              this.state.currentOpenMenuName === 'Orders' && ' open' || ''
                }${
              this.state.activeMainMenuName === 'Orders' && ' active' || ''
                }`}
              >
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.mainMenuWithSubmenuClick.bind(this, 'Orders')}
                >
                  <span className="oci oci-order" />
                  {this.i18n? this.i18n.getMessage('SidebarMenu.orders.label') : 'Orders'} <span className="badge">3</span>
                </a>
                <ul className="dropdown-menu">
                  { isBuyer &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Orders' &&
                  this.state.activeSubMenuName === 'OrderInspect' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/orderInspect"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/orderInspect', 'Orders', 'OrderInspect')}
                    >
                      Order Inspect
                    </a>
                  </li>}
                  { isSupplier &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Orders' &&
                  this.state.activeSubMenuName === 'OrderCon' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/orderConfirmation"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/orderConfirmation', 'Orders', 'OrderCon')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.orders.OrderConfirmation') : 'Order Confirmation'} <span className="badge">3</span>
                    </a>
                  </li>}
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Orders' &&
                  this.state.activeSubMenuName === 'OrderHistory' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/orderHistory"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/orderHistory', 'Orders', 'OrderHistory')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.orders.OrderHistory') : 'Order History'}
                    </a>
                  </li>
                  { isSupplier &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Orders' &&
                  this.state.activeSubMenuName === 'PO Download' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/poDownload"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/poDownload', 'Orders', 'PO Download')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.orders.poDownload') : 'PO Download'}
                    </a>
                  </li>}
                </ul>
              </li>*/
            }

            {
              /*isBuyer &&
              <li className={`${this.state.activeMainMenuName === 'ShippingNotice' && ' active' || ''}`}>
                <a href="/bnp/shippingNotice" onClick={this.handleMenuItemClick.bind(this, '/bnp/shippingNotice', 'ShippingNotice')}>
                  <span className="oci oci-texts" />
                  Shipping Notice
                </a>
              </li>*/
            }

            {/*<li
              className={`dropdown${
            this.state.currentOpenMenuName === 'Invoice' && ' open' || ''
              }${
            this.state.activeMainMenuName === 'Invoice' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Invoice')}
              >
                <span className="oci oci-invoice" />
                {this.i18n? this.i18n.getMessage('SidebarMenu.invoice.label') : 'Invoice'} <span className="badge">7</span>
              </a>
              <ul className="dropdown-menu">
                {
                  isBuyer &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Invoice' &&
                  this.state.activeSubMenuName === 'Approval' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/invoiceApproval"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/invoiceApproval', 'Invoice', 'Approval')}
                    >
                      Approval <span className="badge">7</span>
                    </a>
                  </li>
                }
                <li
                  className={`${
                this.state.activeMainMenuName === 'Invoice' &&
                this.state.activeSubMenuName === 'Inspect' &&
                ' active' ||
                ''
                  }`}
                >
                  <a
                    href="/bnp/invoiceInspect"
                    onClick={this.handleMenuItemClick.bind(this, '/bnp/invoiceInspect', 'Invoice', 'Inspect')}
                  >
                    {this.i18n? this.i18n.getMessage('SidebarMenu.invoice.inspect') : 'Inspect'}
                  </a>
                </li>
                {
                  isBuyer &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Invoice' &&
                  this.state.activeSubMenuName === 'DisputeManagement' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/disputeManagement"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/disputeManagement', 'Invoice', 'DisputeManagement')}
                    >
                      Dispute Management
                    </a>
                  </li>
                }
                {
                  isSupplier &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Invoice' &&
                  this.state.activeSubMenuName === 'Create New' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/invoice/create"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/invoice/create', 'Invoice', 'Create New')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.invoice.createNew') : 'Create New'}
                    </a>
                  </li>
                }
              </ul>
            </li>*/}

            {/*<li className={`${this.state.activeMainMenuName === 'OtherDocs' && ' active' || ''}`}>
              <a href="/bnp/otherDocuments" onClick={this.handleMenuItemClick.bind(this, '/bnp/otherDocuments', 'OtherDocs')}>
                <span className="oci oci-docu" />
                {this.i18n? this.i18n.getMessage('SidebarMenu.otherDocs.label') : 'Other Docs'}
              </a>
            </li>*/}

            {
              /*isSupplier &&
              <li className={`${this.state.activeMainMenuName === 'Products' && ' active' || ''}`}>
                <a href="/bnp/products" onClick={this.handleMenuItemClick.bind(this, '/bnp/products', 'Products')}>
                  <span className="oci oci-products" />
                  {this.i18n? this.i18n.getMessage('SidebarMenu.products.label') : 'Products'}
                </a>
              </li>*/
            }

            {/*<li
              className={`dropdown${
            this.state.currentOpenMenuName === 'RfQ' && ' open' || ''
              }${
            this.state.activeMainMenuName === 'RfQ' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'RfQ')}
              >
                <span className="oci oci-order-v2" />
                RfQ
              </a>
              <ul className="dropdown-menu">
                {
                  isBuyer &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'RfQ' &&
                  this.state.activeSubMenuName === 'CreateRfQ' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/createRfQ"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/createRfQ', 'RfQ', 'CreateRfQ')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.rfg.label') : 'RfQ'}
                    </a>
                  </li>
                }
                {
                  isBuyer &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'RfQ' &&
                  this.state.activeSubMenuName === 'InspectRfQ' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/inspectRfQ"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/inspectRfQ', 'RfQ', 'InspectRfQ')}
                    >
                      Inspect RfQ
                    </a>
                  </li>
                }
                {
                  isSupplier &&
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'RfQ' &&
                  this.state.activeSubMenuName === 'ViewRfQs' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/viewsRfQs"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/viewRfQs', 'RfQ', 'ViewRfQs')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.rfg.viewRfQs') : 'View RfQs'}
                    </a>
                  </li>
                }
              </ul>
            </li>*/}

            {
              isBuyer &&
              <li
                className={`dropdown${
              this.state.currentOpenMenuName === 'Suppliers' && ' open' || ''
                }${
              this.state.activeMainMenuName === 'Suppliers' && ' active' || ''
                }`}
              >
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={this.mainMenuWithSubmenuClick.bind(this, 'Suppliers')}
                >
                  <span className="oci oci-supdirect" />
                  {this.i18n? this.i18n.getMessage('SidebarMenu.supplier.label') : 'Suppliers'}
                </a>
                <ul className="dropdown-menu">
                  {/*<li
                    className={`${
                  this.state.activeMainMenuName === 'Suppliers' &&
                  this.state.activeSubMenuName === 'Dir' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/supplierDirectory"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/supplierDirectory', 'Suppliers', 'Dir')}
                    >
                      Supplier Directory
                    </a>
                  </li>*/}
                  {/*<li
                    className={`${
                  this.state.activeMainMenuName === 'Suppliers' &&
                  this.state.activeSubMenuName === 'Rating' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/supplierRating"
                      onClick={this.handleMenuItemClick.bind(this, '/bnp/supplierRating', 'Suppliers', 'Rating')}
                    >
                      Supplier Rating
                    </a>
                  </li>*/}
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Suppliers' &&
                  this.state.activeSubMenuName === 'Dashboard' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/onboarding/dashboard"
                      onClick={this.handleMenuItemClick.bind(this, '/onboarding/dashboard', 'Suppliers', 'Dashboard')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.supplier.onboardingDashboard') : 'Onboarding Dashboard'}
                    </a>
                  </li>
                  <li
                    className={`${
                    this.state.activeMainMenuName === 'Suppliers' &&
                    this.state.activeSubMenuName === 'Campaigns' &&
                    ' active' ||
                    ''
                      }`}
                  >
                    <a
                      href="/onboarding"
                      onClick={this.handleMenuItemClick.bind(this, '/onboarding', 'Suppliers', 'Campaigns')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.supplier.onboardingCampaigns') : 'Onboarding Campaigns'}
                    </a>
                  </li>
                  <li
                    className={`${
                    this.state.activeMainMenuName === 'Suppliers' &&
                    this.state.activeSubMenuName === 'Campaign' &&
                    ' active' ||
                    ''
                      }`}
                  >
                    <a
                      href="/onboarding/create"
                      onClick={this.handleMenuItemClick.bind(this, '/onboarding/create', 'Suppliers', 'Campaign')}
                    >
                      {this.i18n? this.i18n.getMessage('SidebarMenu.supplier.createOnboardingCampaign') : 'Create Onboarding Campaign'}
                    </a>
                  </li>
                </ul>
              </li>
            }

            {
            isSupplier &&
            <li
              className={`dropdown${
                this.state.currentOpenMenuName === 'Invoice' && ' open' || ''
              }${
                this.state.activeMainMenuName === 'Invoice' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Invoice')}
              >
                <span className="oci oci-invoice" />
                {this.i18n? this.i18n.getMessage('SidebarMenu.invoice.label') : 'Invoice'}
              </a>
              <ul className="dropdown-menu">
                <li
                  className={`${
                    this.state.activeMainMenuName === 'Invoice' &&
                    this.state.activeSubMenuName === 'ServiceConfig' &&
                    ' active' ||
                    ''
                  }`}
                >
                  <a
                    href="/einvoice-send"
                    onClick={this.handleMenuItemClick.bind(this, '/einvoice-send', 'Invoice', 'ServiceConfig')}
                  >
                    {this.i18n? this.i18n.getMessage('SidebarMenu.invoice.serviceConfiguration') : 'Service Configuration'}
                  </a>
                </li>
                <li
                  className={`${
                    this.state.activeMainMenuName === 'Invoice' &&
                    this.state.activeSubMenuName === 'KeyIn' &&
                    ' active' ||
                    ''
                  }`}
                >
                  <a
                    href="/einvoice-send"
                    onClick={this.handleMenuItemClick.bind(this, '/einvoice-send/#/key-in', 'Invoice', 'KeyIn')}
                  >
                    {this.i18n? this.i18n.getMessage('SidebarMenu.invoice.keyIn') : 'Invoice Key-In'}
                  </a>
                </li>
              </ul>
            </li>
            }

            {
            isSupplier &&
            <li
              className={`dropdown${
            this.state.currentOpenMenuName === 'Company' && ' open' || ''
              }${
            this.state.activeMainMenuName === 'Company' && ' active' || ''
              }`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={this.mainMenuWithSubmenuClick.bind(this, 'Company')}
              >
                <span className="oci oci-user" />
                {this.i18n? this.i18n.getMessage('SidebarMenu.company.label') : 'Company'}
              </a>
              <ul className="dropdown-menu">
                <li
                  className={`${
                this.state.activeMainMenuName === 'Company' &&
                this.state.activeSubMenuName === 'Approval' &&
                ' active' ||
                ''
                  }`}
                >
                  <a
                    href="/bnp/supplierInformation"
                    onClick={this.handleMenuItemClick.bind(this, '/bnp/supplierInformation', 'Company', 'Profile')}
                  >
                    {this.i18n? this.i18n.getMessage('SidebarMenu.company.profile') : 'Profile'}
                  </a>
                </li>
               {/* <li
                  className={`${
                this.state.activeMainMenuName === 'Company' &&
                this.state.activeSubMenuName === 'ServiceConfig' &&
                ' active' ||
                ''
                  }`}
                >
                  <a
                    href="/einvoice-send"
                    onClick={this.handleMenuItemClick.bind(this, '/einvoice-send', 'Company', 'ServiceConfig')}
                  >
                    {this.i18n? this.i18n.getMessage('SidebarMenu.company.serviceConfiguration') : 'Service Configuration'}
                  </a>
                </li>*/}
                {/*<li
                  className={`${
                this.state.activeMainMenuName === 'Company' &&
                this.state.activeSubMenuName === 'CompanyInfo' &&
                ' active' ||
                ''
                  }`}
                >
                  <a
                    href="/bnp/companyInformation"
                    onClick={this.handleMenuItemClick.bind(this, '/bnp/companyInformation', 'Company', 'CompanyInfo')}
                  >
                    {this.i18n? this.i18n.getMessage('SidebarMenu.company.companyInformation') : 'Company Information'}
                  </a>
                </li>*/}
              </ul>
            </li>
            }

            {/*<li className={`${this.state.activeMainMenuName === 'Settings' && ' active' || ''}`}>
              <a href="/bnp/settings" onClick={this.handleMenuItemClick.bind(this, '/bnp/settings', 'Settings')}>
                <span className="oci oci-admin" />
                {this.i18n? this.i18n.getMessage('SidebarMenu.settings.label') : 'Settings'}
              </a>
            </li>*/}
          </ul>
        </nav>
      </section>
    );
  }
}
