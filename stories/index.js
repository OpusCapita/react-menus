import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import SidebarMenu from '../src/SidebarMenu';
import { withKnobs, boolean } from '@kadira/storybook-addon-knobs';
import './assets/custom.css';
import './assets/jcatalog-bootstrap-bundle.css';
import './assets/jcatalog-bootstrap-extensions-bundle.css';
import './assets/ocui-bootstrap-bundle-0.1.2.css';
import logo from './img/oc-logo-white.svg';
import { Button as BootstrapButton } from 'react-bootstrap';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('SidebarMenu', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    'default',
    ``,
    () => (
      <SidebarMenu
        logo={logo}
        isBuyer={boolean('isBuyer', true)}
        style={{ position: 'static' }}
      />
    ),
    { inline: true, header: false }
  );

storiesOf('BootstrapButton', module)
  .addWithInfo(
    'default',
    ``,
    () => (
      <BootstrapButton>Default</BootstrapButton>
    ),
    { inline: true, header: false }
  );

