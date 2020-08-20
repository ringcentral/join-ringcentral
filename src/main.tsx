import React from 'react';
import {Component} from 'react-subx';
import {Input, Button, Form} from 'antd';

import {StoreType} from './store';
import {FormInstance} from 'antd/lib/form';

type PropsStore = {
  store: StoreType;
};
type StateType = {
  email: string;
};
class App extends Component<PropsStore, StateType> {
  form: React.RefObject<FormInstance>;
  constructor(props: PropsStore) {
    super(props);
    this.state = {email: ''};
    this.form = React.createRef<FormInstance>();
  }
  render() {
    const store = this.props.store;
    return (
      <Form ref={this.form}>
        <Form.Item
          rules={[
            {required: true, message: 'Please input your email!'},
            {type: 'email', message: 'Invalid email address!'},
          ]}
          name="email"
        >
          <Input
            placeholder="Email Address"
            type="email"
            onChange={e => this.setState({email: e.target.value})}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              if (
                !this.form
                  .current!.getFieldsError()
                  .some(i => i.errors.length > 0)
              ) {
                store.invite(this.state.email);
              }
            }}
          >
            Invite
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default App;
