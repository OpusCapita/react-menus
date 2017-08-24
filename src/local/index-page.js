import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { I18nManager } from '@opuscapita/i18n';
import { HeaderMenu, SidebarMenu } from '../client';
import { formatters } from './i18n'

class IndexPage extends React.Component
{
    static childContextTypes = {
        i18n : PropTypes.object.isRequired
    }

    constructor(props)
    {
        super(props);

        this.state = {
            i18n : new I18nManager({
                locale : 'en',
                fallbackLocale : 'en',
                localeFormattingInfo : formatters
            })
        }
    }

    getChildContext()
    {
        return {
            i18n : this.state.i18n
        }
    }

    switchLanguage(lang)
    {
        this.setState({ i18n : new I18nManager({
            locale : lang,
            fallbackLocale : 'en',
            localeFormattingInfo : formatters
        })});
    }

    render()
    {
        return (
            <div>
                <HeaderMenu onLanguageChanged={(lang) => this.switchLanguage(lang)} />
            </div>
        );
    }
}

ReactDOM.render((
    <IndexPage />
),
document.getElementById('root'));
