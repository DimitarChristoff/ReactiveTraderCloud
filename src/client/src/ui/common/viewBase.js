import React from 'react';
import { CompositeDisposable } from 'esp-js/src';
import { router, logger } from '../../system';
import { ModelBase } from '../common';

import './styles/_base.scss';
import './styles/_fonts.scss';

var _log:logger.Logger = logger.create('ViewBase');

export default class ViewBase extends React.Component {
  _disposables:CompositeDisposable;
  _isObservingModel:boolean;

  static propTypes = {
    modelId: React.PropTypes.string
  }

  constructor() {
    super();
    this._disposables = new CompositeDisposable();
    this._isObservingModel = false;
  }

  componentWillReceiveProps() {
    this._tryObserveModel();
  }

  componentWillMount() {
    this._tryObserveModel();
  }

  componentWillUnmount() {
    _log.debug(`component will unmount. model id: ${this.props.modelId}`);
    this._disposables.dispose();
  }

  _tryObserveModel() {
    let modelId = this.props.modelId || this.state.modelId;
    if (!this._isObservingModel && modelId) {
      this._isObservingModel = true;
      this._disposables.add(
        router.getModelObservable(modelId)
              .where((model:ModelBase) => !model.updatesSuspended)
              .observe((model:ModelBase) => {
                this.setState({model: model});
              })
      );
    }
  }
}
