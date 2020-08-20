import SubX from 'subx';
import RingCentral from '@rc-ex/core';
import Rest from '@rc-ex/core/lib/Rest';
import {message} from 'antd';

export type StoreType = {
  ready: boolean;
  invite: Function;
};

const rc = new RingCentral({server: Rest.productionServer});
rc.token = {access_token: process.env.RINGCENTRAL_ACCESS_TOKEN};

const store = SubX.proxy<StoreType>({
  ready: false,
  invite: async (email: string) => {
    await rc
      .restapi()
      .glip()
      .teams(process.env.RINGCENTRAL_TEAM_ID)
      .add()
      .post({
        members: [{email}],
      });
    message.success('Please ', 0);
  },
});

export default store;
