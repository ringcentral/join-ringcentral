import SubX from 'subx';
import RingCentral from '@rc-ex/core';
import Rest from '@rc-ex/core/lib/Rest';

export type StoreType = {
  ready: boolean;
  invite: Function;
};

const rc = new RingCentral({server: Rest.productionServer});

const store = SubX.proxy<StoreType>({
  ready: false,
  invite: (email: string) => {
    console.log(`invite ${email}`);
    console.log('access token', process.env.RINGCENTRAL_ACCESS_TOKEN);
  },
});

export default store;
