import React from 'react';
import {Component} from 'react-subx';
import {Input, Button} from 'antd';

import {StoreType} from './store';

type PropsStore = {
  store: StoreType;
};
type StateType = {
  email: string;
};
class App extends Component<PropsStore, StateType> {
  constructor(props: PropsStore) {
    super(props);
    this.state = {email: ''};
  }
  render() {
    const store = this.props.store;
    return (
      <>
        <Input
          placeholder="Email Address"
          type="email"
          onChange={e => this.setState({email: e.target.value})}
        />
        <Button type="primary" onClick={() => store.invite(this.state.email)}>
          Invite
        </Button>
      </>
    );
  }
}

export default App;
