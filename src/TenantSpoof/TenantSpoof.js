import React from 'react';
import request from 'superagent-bluebird-promise';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import locales from './i18n';

export default class TenantSpoof extends React.Component {
  static defaultProps = {
    currentUserData: {},
    show: false,
    onSpoofWindowClose: () => {}
  }

  static propTypes = {
    show: React.PropTypes.bool,
    isSpoofed: React.PropTypes.bool,
    onSpoofWindowClose: React.PropTypes.func
  }

  static contextTypes = {
    i18n: React.PropTypes.object,
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      customerId: '',
      supplierId: '',
      updating: false
    }
  }

  componentWillMount() {
    if(this.context.i18n) {
      this.i18n = this.context.i18n.register('TenantSpoof', locales);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      customerId: nextProps.currentUserData && nextProps.currentUserData.customerid ? nextProps.currentUserData.customerid : '',
      supplierId: nextProps.currentUserData && nextProps.currentUserData.supplierid ? nextProps.currentUserData.supplierid : '',
    });
  }

  closeModal = () => {
    this.resetState();
    this.props.onSpoofWindowClose();
  }

  onChange = (name, e) => {
    let state = this.state;
    state[name] = e.target.value;

    this.setState({
      ...state
    });
  }

  unsetTenant = () => {
    this.setState({updating: true});
    request.post('/auth/tenant/reset')
    .then(() => {
      return request.get('/refreshIdToken');
    })
    .then(this.reloadCurrentWindow)
    .catch(this.closeModal);
  }

  changeTenant = () => {
    if (this.state.customerId || this.state.supplierId) {
      this.setState({updating: true});
      request.post('/auth/tenant/set')
     .send({customerId: this.state.customerId, supplierId: this.state.supplierId})
     .set('Accept', 'application/json')
     .then(() => {
       return request.get('/refreshIdToken');
     })
     .then(this.reloadCurrentWindow)
     .catch(this.closeModal);
   } else {
     unsetTenant();
   }
  }

  resetState = () => {
    this.setState({
      show: false,
      customerId: '',
      supplierId: '',
      updating: false
    });
  }

  reloadCurrentWindow = () => {
    window.location.reload(); //#TODO temporary, need to find a way
  }

  render() {
    return (
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>{this.i18n.getMessage('TenantSpoof.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup>
              <ControlLabel>{this.i18n.getMessage('TenantSpoof.customerIdLabel')}</ControlLabel>
              <FormControl
              type="text"
              value={this.state.customerId}
              onChange={this.onChange.bind(this, 'customerId')}
              placeholder={this.i18n.getMessage('TenantSpoof.customerIdPlaceHolder')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>{this.i18n.getMessage('TenantSpoof.supplierIdLabel')}</ControlLabel>
              <FormControl
              type="text"
              value={this.state.supplierId}
              onChange={this.onChange.bind(this, 'supplierId')}
              placeholder={this.i18n.getMessage('TenantSpoof.supplierIdPlaceHolder')}
              />
            </FormGroup>
            <FormGroup>
              {this.state.updating ? this.i18n.getMessage('TenantSpoof.message') : ''}
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>{this.i18n.getMessage('TenantSpoof.closeButtonText')}</Button>
          {
            this.props.currentUserData.originaltenant ?
            <Button bsStyle="default" onClick={this.unsetTenant}>{this.i18n.getMessage('TenantSpoof.clearButtonText')}</Button>
            : ''
          }
          <Button bsStyle="primary" onClick={this.changeTenant}>{this.i18n.getMessage('TenantSpoof.setButtonText')}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
