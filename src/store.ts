import SubX from 'subx';
import RingCentral from '@rc-ex/core';

export type StoreType = {
  ready: boolean;
};

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
  server: process.env.RINGCENTRAL_SERVER_URL,
});

const store = SubX.proxy<StoreType>({
  ready: false,
});

export default store;
