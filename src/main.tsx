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
        <Col span={22} offset={1}>
          <Form ref={this.form}>
            <img src={RingCentralIcon} width="128" className="logo-img" />

            <div className="centered-text">
              Join{' '}
              <a
                target="_blank"
                href={`https://app.ringcentral.com/messages/${process.env.RINGCENTRAL_TEAM_ID}`}
                rel="noreferrer"
              >
                {store.teamName}
              </a>{' '}
              on RingCentral app.
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
              {store.joining ? (
                <Spin className="centered-block" size="large" />
              ) : (
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
              )}
            </Form.Item>
          </Form>
          <div className="centered-text">
            To get help please {' '}
            <a href="https://developers.ringcentral.com/support/create-case">
              submit a help ticket with our developer support team
            </a>
          </div>
        </Col>
      </Row>
    );
  }
}

export default App;
