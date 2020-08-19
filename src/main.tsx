import React from 'react';
import {Component} from 'react-subx';
import {Spin} from 'antd';

import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};
class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return <Spin size="large" />;
  }
}

export default App;
