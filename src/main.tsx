import React from 'react';
import {Component} from 'react-subx';
import {Input, Button, Form, Row, Col, Spin} from 'antd';

import {StoreType} from './store';
import {FormInstance} from 'antd/lib/form';

import RingCentralIcon from './ringcentral.png';

type PropsStore = {
  store: StoreType;
};
type StateType = {
  email: string;
};

class App extends Component<PropsStore> {
  render() {
    const store = this.props.store;
    return store.ready ? <Main store={store} /> : <Spin size="large" />;
  }
}

class Main extends Component<PropsStore, StateType> {
  form: React.RefObject<FormInstance>;
  constructor(props: PropsStore) {
    super(props);
    this.state = {email: ''};
    this.form = React.createRef<FormInstance>();
  }
  render() {
    const store = this.props.store;
    return (
      <Row className="main-row">
        <Col span={8} offset={8}>
          <Form ref={this.form}>
            <img src={RingCentralIcon} width="128" className="logo-img" />

            <div className="centered-text">
              Join &#34;{store.teamName}&#34; on RingCentral app.
            </div>
            <div className="centered-text">
              Currently {store.teamSize} users joined.
            </div>

            <div className="separator"></div>

            <Form.Item
              rules={[
                {required: true, message: 'Please input your email!'},
                {type: 'email', message: 'Invalid email!'},
              ]}
              name="email"
            >
              <Input
                placeholder="Email"
                type="email"
                onChange={e => this.setState({email: e.target.value})}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="centered-block"
                onClick={() => {
                  if (
                    this.state.email.length > 0 &&
                    !this.form
                      .current!.getFieldsError()
                      .some(i => i.errors.length > 0)
                  ) {
                    store.join(this.state.email);
                  }
                }}
              >
                Join
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default App;
