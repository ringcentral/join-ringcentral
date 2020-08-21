import SubX from 'subx';
import RingCentral from '@rc-ex/core';
import Rest from '@rc-ex/core/lib/Rest';
import {message} from 'antd';

export type StoreType = {
  ready: boolean;
  teamName: string;
  teamSize: number;
  init: Function;
  join: Function;
};

export type GroupInfo = {
  name: string;
  members: string[];
};

const rc = new RingCentral({server: Rest.productionServer});
rc.token = {access_token: process.env.RINGCENTRAL_ACCESS_TOKEN};

const store = SubX.proxy<StoreType>({
  ready: false,
  teamName: '',
  teamSize: 0,
  async init() {
    const r = await rc.get(
      `/restapi/v1.0/glip/groups/${process.env.RINGCENTRAL_TEAM_ID}`
    );
    const groupInfo = r.data as GroupInfo;
    this.teamName = groupInfo.name;
    this.teamSize = groupInfo.members.length;
    document.title = `Join ${this.teamName} — RingCentral™ Platform`;
  },
  async join(email: string) {
    await rc
      .restapi()
      .glip()
      .teams(process.env.RINGCENTRAL_TEAM_ID)
      .add()
      .post({
        members: [{email}],
      });
    message.success(`You have been added to "${this.teamName}"!`, 120);
    message.info(
      'If you are a new RingCentral user, please check your email to setup your account.',
      120
    );
    message.info(
      'To get assistance please send an email to devsupport@ringcentral.com',
      120
    );
  },
});

export default store;
