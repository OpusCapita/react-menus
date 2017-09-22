import React from 'react';
import locales from './i18n';
import TenantSpoof from '../TenantSpoof';

class HeaderMenu extends React.Component {
  static propTypes = {
    currentUserData: React.PropTypes.object,
    activeMainMenuName: React.PropTypes.string,
    activeSubMenuName: React.PropTypes.string,
    showHideDropdown: React.PropTypes.string,
    showHideHelpDropdown: React.PropTypes.string
  };

  static defaultProps = {
    activeMainMenuName: 'Home',
    showHideDropdown: "dropdown",
    showHideHelpDropdown: "dropdown",
    activeSubMenuName: null
  };

  constructor(props) {
    super(props);

    this.state = {
      oldOpenMenuName: null,
      currentOpenMenuName: null,
      showHideDropdown: "dropdown",
      showHideHelpDropdown: "dropdown",
      activeMainMenuName: this.props.activeMainMenuName,
      activeSubMenuName: this.props.activeSubMenuName,
      activeLanguage: 'English',
      showTenantSpoof: false
    };
    let i18n;
  }

   static contextTypes = {
    i18n: React.PropTypes.object,
    formatPatterns: React.PropTypes.object,
    dateTimePattern: React.PropTypes.string,
    setLocale: React.PropTypes.func
  }

  onLanguageChange = (locale, activeLanguage) => {
    this.setState({
      activeLanguage: activeLanguage
    })
    if(this.context.setLocale != null)
      this.context.setLocale(locale)
    this.context.locale = locale;
    this.toggleDropDown();
  }

  componentWillReceiveProps(nextProps, nextContext){
    if(this.i18n && nextContext.i18n.locale != this.i18n.locale){
      this.i18n = nextContext.i18n.register('HeaderMenu', locales);
    }
  }

  toggleDropDown(e) {
    e && e.preventDefault && e.preventDefault();

    const css = (this.state.showHideDropdown === "dropdown open") ? "dropdown" : "dropdown open";
    this.setState({ "showHideDropdown": css });
    if (css === "dropdown open" && this.state.showHideHelpDropdown === "dropdown open") {
      this.setState({ "showHideHelpDropdown": "dropdown" });
    }
  }

  toggleHelpDropDown(e) {
    e && e.preventDefault && e.preventDefault();
    const css = (this.state.showHideHelpDropdown === "dropdown open") ? "dropdown" : "dropdown open";
    this.setState({ "showHideHelpDropdown": css });
    if (css === "dropdown open" && this.state.showHideDropdown === "dropdown open") {
      this.setState({ "showHideDropdown": "dropdown" })
    }
  }

  toggleHelpDropDown() {
    const css = (this.state.showHideHelpDropdown === "dropdown open") ? "dropdown" : "dropdown open";
    this.setState({ "showHideHelpDropdown": css });
  }

  componentWillMount(){
    if(this.context.i18n) {
      this.i18n = this.context.i18n.register('HeaderMenu', locales);
    }
  }

  renderManualLink() {
    let uri = '/blob/public/api/opuscapita/files/public/docs/SupplierManual.pdf';
    let manualName = this.i18n.getMessage('HeaderMenu.manualName');
    if (manualName) {
        uri = '/blob/public/api/opuscapita/files/public/docs/' + manualName;
    }
    return (
        <a href="#" onClick={ (e) => { e.preventDefault(); window.location.assign(uri); this.toggleHelpDropDown(); } }>
        {this.i18n? this.i18n.getMessage('HeaderMenu.manual') : 'Manual'}
      </a>
    );
  }

  onSpoofClick = (e) => {
    this.setState({showTenantSpoof: true});
    this.toggleDropDown();
  }

  onSpoofWindowClose = () => {
    this.setState({showTenantSpoof: false});
  }

  render() {
    const { showHideDropdown, showHideHelpDropdown } = this.state;
    const { currentUserData } = this.props;

    return (
      <div className="navbar navbar-default navbar-main-menu" style={{ paddingRight: '25px' }}>
        <div className="navbar-header pull-right">
          <form className="navbar-form navbar-right">
            <TenantSpoof onSpoofWindowClose={this.onSpoofWindowClose} currentUserData={this.props.currentUserData} show={this.state.showTenantSpoof} />
            <div className="form-group">
              <input type="text" className="form-control" placeholder={this.i18n? this.i18n.getMessage('HeaderMenu.search') : 'Search'}/>
            </div>
            <button type="submit" className="btn btn-default">
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </form>
          <ul className="nav navbar-nav navbar-no-collapse navbar-right">
            <li className={showHideDropdown}>
              <a
                className="dropdown-toggle hidden-sm hidden-xs"
                onClick={ this.toggleDropDown.bind(this) }
                data-toggle="dropdown"
                href="#"
              >
                {currentUserData.id}
                <b className="caret"></b>
              </a>
              <a className="dropdown-toggle icon-nav-item visible-sm visible-xs" data-toggle="dropdown" href="#">
                <span className="glyphicon glyphicon-user"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-header">
                  {this.i18n? this.i18n.getMessage('HeaderMenu.language') : 'Lanuage'}
                </li>
                <li className="divider"></li>
                <li>
                  <a id="lanugage-de" onClick={ this.onLanguageChange.bind('German','de') }>
                      {this.i18n? this.i18n.getMessage('HeaderMenu.german') : 'German'}
                  </a>
                </li>
                <li>
                  <a id="lanugage-en" onClick={ this.onLanguageChange.bind('English','en') }>
                      {this.i18n? this.i18n.getMessage('HeaderMenu.english') : 'English'}
                  </a>
                </li>
                {
                  currentUserData && currentUserData.roles.indexOf('admin') > -1 ?
                  <li className="divider" /> : ''
                }
                {
                  currentUserData && currentUserData.roles.indexOf('admin') > -1 ?
                  <li>
                    <a id="spoof" onClick={ this.onSpoofClick }>
                        {this.i18n? this.i18n.getMessage('HeaderMenu.spoofButtonText') : 'Spoof Tenant'}
                    </a>
                  </li> : ''
                }
                <li className="divider" />
                <li>
                  <a className="hidden" href="#">Change Assignment</a>
                </li>
                <li>
                  <a href="/auth/logout">{this.i18n? this.i18n.getMessage('HeaderMenu.logout') : 'Logout'}</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle hidden-sm hidden-xs" data-toggle="dropdown" href="#">
                { currentUserData.supplierid || currentUserData.customerid || "no tenant" }
              </a>
            </li>

            <li className={showHideHelpDropdown}>
              <a
                className="dropdown-toggle hidden-sm hidden-xs"
                onClick={ this.toggleHelpDropDown.bind(this) }
                data-toggle="dropdown"
                href="#"
              >
                <span className="glyphicon glyphicon-question-sign"></span>
                <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-header">
                  {this.i18n? this.i18n.getMessage('HeaderMenu.support') : 'Support'}
                </li>
                <li className="divider"></li>
                <li>
                  {this.i18n? this.i18n.getMessage('HeaderMenu.phone') : 'Phone'}: +49 231 3967 350
                </li>
                <li>
                  {this.i18n? this.i18n.getMessage('HeaderMenu.email') : 'Email'}: <a href="mailto:customerservice.de@opuscapita.com">customerservice.de@opuscapita.com</a>
                </li>
                <li className="divider"></li>
                  {this.renderManualLink()}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default HeaderMenu;
