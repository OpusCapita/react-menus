import React, { Component } from 'react';

class SidebarMenu extends Component {
  static defaultProps = {
    isBuyer: true
  }

  static propTypes = {
    isBuyer: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    logo: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      oldOpenMenuName: null,
      currentOpenMenuName: null,
      activeMainMenuName: 'Home',
      activeSubMenuName: null,
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideMenu, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideMenu, false);
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
    // Third argument is optional, null if a main-menu item does not have sub-menu items.
    if (typeof activeSubMenuName !== 'string') {
      activeSubMenuName = null;  // eslint-disable-line no-param-reassign
      e = arguments[2];  // eslint-disable-line no-param-reassign
    }

    e.preventDefault();
    // browserHistory.push(`/${link}`);

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
  }

  render() {
    const { isBuyer, logo, style } = this.props;
    const isSupplier = !isBuyer;

    return (
      <section
        className="sidebar"
        style={Object.assign({ minHeight: '100vh', position: 'static', zIndex: 3 }, style)}
      >
        <nav className="navbar navbar-default">
          <div className="nav-background" />
          <div className="navbar-header hidden-md">
            <a className="navbar-brand visible-lg" href="http://www.opuscapita.com/">
              <img src={logo} style={{ height: '1.4em' }} />
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className={`${this.state.activeMainMenuName === 'Home' && ' active' || ''}`}>
              <a
                href="#"
                onClick={this.handleMenuItemClick.bind(this, 'dashboard', 'Home')}
              >
                <span className="oci oci-store" />
                Home
              </a>
            </li>

            {
              <li
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
                  Orders <span className="badge">3</span>
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
                    >
                      Order Confirmation <span className="badge">3</span>
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
                    >
                      Order History
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
                    >
                      PO Download
                    </a>
                  </li>}
                </ul>
              </li>
            }

            {
              isBuyer &&
              <li className={`${this.state.activeMainMenuName === 'ShippingNotice' && ' active' || ''}`}>
                <a href="/shippingNotice">
                  <span className="oci oci-texts" />
                  Shipping Notice
                </a>
              </li>
            }

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
                Invoice <span className="badge">7</span>
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
                  >
                    Inspect
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
                    >
                      Create New
                    </a>
                  </li>
                }
              </ul>
            </li>

            <li className={`${this.state.activeMainMenuName === 'OtherDocs' && ' active' || ''}`}>
              <a href="/otherDocuments">
                <span className="oci oci-docu" />
                Other Docs
              </a>
            </li>

            {
              isSupplier &&
              <li className={`${this.state.activeMainMenuName === 'Products' && ' active' || ''}`}>
                <a href="/bnp/products">
                  <span className="oci oci-products" />
                  Products
                </a>
              </li>
            }

            <li
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
                    >
                      Create RfQ
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
                    >
                      View RfQs
                    </a>
                  </li>
                }
              </ul>
            </li>

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
                  Suppliers
                </a>
                <ul className="dropdown-menu">
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Suppliers' &&
                  this.state.activeSubMenuName === 'Dir' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/supplierDirectory"
                    >
                      Supplier Directory
                    </a>
                  </li>
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Suppliers' &&
                  this.state.activeSubMenuName === 'Rating' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/bnp/supplierRating"
                    >
                      Supplier Rating
                    </a>
                  </li>
                  <li
                    className={`${
                  this.state.activeMainMenuName === 'Suppliers' &&
                  this.state.activeSubMenuName === 'Dashboard' &&
                  ' active' ||
                  ''
                    }`}
                  >
                    <a
                      href="/campaigns/dashboard"
                    >
                      Onboarding Dashboard
                    </a>
                  </li>
                  <li>
                    <a href={'/campaigns/'}>
                      Onboarding Campaigns
                    </a>
                  </li>
                  <li>
                    <a href={'/campaigns/create'}>
                      Create Onboarding Campaign
                    </a>
                  </li>
                  <li>
                    <a href={'/campaigns/ncc_onboard'}>
                      View Onboarding Page
                    </a>
                  </li>
                </ul>
              </li>
            }

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
                Company
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
                  >
                    Profile
                  </a>
                </li>
                <li
                  className={`${
                this.state.activeMainMenuName === 'Company' &&
                this.state.activeSubMenuName === 'ServiceConfig' &&
                ' active' ||
                ''
                  }`}
                >
                  <a
                    href="/bnp/serviceConfiguration"
                  >
                    Service Configuration
                  </a>
                </li>
                <li
                  className={`${
                this.state.activeMainMenuName === 'Company' &&
                this.state.activeSubMenuName === 'CompanyInfo' &&
                ' active' ||
                ''
                  }`}
                >
                  <a
                    href="/bnp/companyInformation"
                  >
                    Company Information
                  </a>
                </li>
              </ul>
            </li>

            <li className={`${this.state.activeMainMenuName === 'Settings' && ' active' || ''}`}>
              <a href="/settings" >
                <span className="oci oci-admin" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </section>
    );
  }
}

export default SidebarMenu;
