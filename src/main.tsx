import React from 'react';
import {Component} from 'react-subx';
import {Input, Button} from 'antd';

import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};
class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return (
      <>
        <Input placeholder="Email Address" type="email" />
        <Button type="primary" onClick={() => store.invite()}>
          Invite
        </Button>
      </>
    );
  }
}

export default App;
