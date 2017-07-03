import React from 'react';
import locales from './i18n';

class HeaderMenu extends React.Component {
  static propTypes = {
    currentUserData: React.PropTypes.object,
    activeMainMenuName: React.PropTypes.string,
    activeSubMenuName: React.PropTypes.string,
    showHideDropdown: React.PropTypes.string
  };

  static defaultProps = {
    activeMainMenuName: 'Home',
    showHideDropdown: "dropdown",
    activeSubMenuName: null
  };

  constructor(props) {
    super(props);

    this.state = {
      oldOpenMenuName: null,
      currentOpenMenuName: null,
      showHideDropdown: "dropdown",
      activeMainMenuName: this.props.activeMainMenuName,
      activeSubMenuName: this.props.activeSubMenuName,
      activeLanguage: 'English'
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

  toggleDropDown() {
    const css = (this.state.showHideDropdown === "dropdown open") ? "dropdown" : "dropdown open";
    this.setState({ "showHideDropdown": css });
  }

  componentWillMount(){
    if(this.context.i18n) {
      this.i18n = this.context.i18n.register('HeaderMenu', locales);
    }
  }

  render() {
    const { showHideDropdown } = this.state;
    const { currentUserData } = this.props;

    return (
      <div className="navbar navbar-default navbar-main-menu" style={{ paddingRight: '25px' }}>
        <div className="navbar-header pull-right">
          <form className="navbar-form navbar-right">
            <div className="form-group">
              <input type="text" className="form-control" placeholder={this.i18n? this.i18n.getMessage('HeaderMenu.search') : 'Search'}/>
            </div>
            <button type="submit" className="btn btn-default">
              <span className="glyphicon glyphicon-search" />
            </button>
          </form>
          <ul className="nav navbar-nav navbar-no-collapse navbar-right">
            <li className={showHideDropdown}>
              <a
                className="dropdown-toggle hidden-sm hidden-xs"
                onClick={ (e) => { this.toggleDropDown.bind(this); e.preventDefault(); } }
                data-toggle="dropdown"
                href="#"
              >
                {currentUserData.id}
                <b className="caret" />
              </a>
              <a className="dropdown-toggle icon-nav-item visible-sm visible-xs" data-toggle="dropdown" href="#">
                <span className="glyphicon glyphicon-user" />
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-header">
                  {this.i18n? this.i18n.getMessage('HeaderMenu.language') : 'Lanuage'}
                </li>
                <li className="divider" />
                <li>
                  <a id="lanugage-de" onClick={ (e) => { this.onLanguageChange.bind('German','de'); e.preventDefault(); } }>
                      {this.i18n? this.i18n.getMessage('HeaderMenu.german') : 'German'}
                  </a>
                </li>
                <li>
                  <a id="lanugage-en" onClick={ (e) => { this.onLanguageChange.bind('English','ee'); e.preventDefault(); } }>
                      {this.i18n? this.i18n.getMessage('HeaderMenu.english') : 'English'}
                  </a>
                </li>
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
          </ul>
        </div>
      </div>
    )
  }
}

export default HeaderMenu;
