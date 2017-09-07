import React from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';
import ajax from 'superagent-bluebird-promise'
import i18n from './i18n';

class HeaderMenu extends React.Component
{
    static propTypes = {
        onLanguageChanged: PropTypes.func,
        onUserProfileChanged: PropTypes.func
    }

    static defaultProps = {
        onLanguageChanged: () => null,
        onUserProfileChanged: () => null
    }

    static contextTypes = {
        i18n : PropTypes.object
    }

    constructor(props)
    {
        super(props);

        this.languageDropdown = null;
        this.showDropdown = false;

        this.state = {
            userProfile : null,
            currentLanguage : null,
            username : '',
            tenantName : '',
        }
    }

    componentWillReceiveProps(nextProps, nextContext)
    {
        if(this.context.i18n != nextContext.i18n)
        {
            this.context.i18n = nextContext.i18n;
            this.context.i18n.register('HeaderMenu', i18n);
        }
    }

    changeLanguage(lang)
    {
        this.props.onLanguageChanged(lang);
        this.setShowDropdown(false);
    }

    loadUserProfile(userId)
    {}

    storeUserProfile(profile)
    {}

    toggleDropDown(e)
    {
        e.preventDefault();

        this.showDropdown = !this.showDropdown;
        this.setShowDropdown(this.showDropdown);
    }

    setShowDropdown(show)
    {
        const classes = this.languageDropdown.className.split(' ');
        const openIndex = classes.indexOf('open');

        if(openIndex > -1 && !show)
            delete classes[openIndex];
        else if(show)
            classes.push('open');

        this.languageDropdown.className = classes.join(' ');
    }

    componentWillMount()
    {
        if(this.context.i18n)
            this.context.i18n.register('HeaderMenu', i18n);
    }

    render()
    {
        const { i18n } = this.context;

        return(
            <div className="navbar navbar-default navbar-main-menu" style={{ paddingRight: '25px' }}>
                <div className="navbar-header pull-right">
                    <form className="navbar-form navbar-right">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder={i18n.getMessage('HeaderMenu.search')}/>
                        </div>
                        <button type="submit" className="btn btn-default">
                            <span className="glyphicon glyphicon-search" />
                        </button>
                    </form>
                    <ul className="nav navbar-nav navbar-no-collapse navbar-right">
                        <li className="dropdown" ref={node => this.languageDropdown = node}>
                            <a className="dropdown-toggle hidden-sm hidden-xs" onClick={e => this.toggleDropDown(e) } onBlur={e => this.toggleDropDown(e) } data-toggle="dropdown" href="#">
                                {this.state.username} <b className="caret" />
                            </a>
                            <a className="dropdown-toggle icon-nav-item visible-sm visible-xs" data-toggle="dropdown" href="#">
                                <span className="glyphicon glyphicon-user" />
                            </a>
                            <ul className="dropdown-menu">
                                <li className="dropdown-header">
                                    {i18n.getMessage('HeaderMenu.language')}
                                </li>

                                <li>
                                    <a id="lanugage-de" onClick={() => this.changeLanguage('de') }>
                                        {i18n.getMessage('HeaderMenu.german')}
                                    </a>
                                </li>
                                <li>
                                    <a id="lanugage-en" onClick={() => this.changeLanguage('en') }>
                                        {i18n.getMessage('HeaderMenu.english')}
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li className="dropdown-header">
                                    {i18n.getMessage('HeaderMenu.user')}
                                </li>

                                <li>
                                    <a href="/auth/logout">{i18n.getMessage('HeaderMenu.logout')}</a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle hidden-sm hidden-xs" data-toggle="dropdown" href="#">
                                {this.state.tenantName}
                            </a>
                        </li>
                    </ul>
                </div>
          </div>
        )
    }
}

export default HeaderMenu;
