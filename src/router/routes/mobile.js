import { checkLoggedIn } from '../utils';
import store from '../../store/index';
import Intro from '../../pages/mobile/Intro.vue';
import Onboarding from '../../pages/mobile/Onboarding.vue';
import OnboardingWelcome from '../../pages/mobile/OnboardingWelcome.vue';
import OnboardingSend from '../../pages/mobile/OnboardingSend.vue';
import OnboardingAepps from '../../pages/mobile/OnboardingAepps.vue';
import OnboardingSubaccounts from '../../pages/mobile/OnboardingSubaccounts.vue';
import Login from '../../pages/mobile/Login.vue';
import Recover from '../../pages/mobile/Recover.vue';
import AppBrowser from '../../pages/mobile/AppBrowser.vue';
import NewAccount from '../../pages/mobile/NewAccount.vue';
import NewAccountCreate from '../../pages/mobile/NewAccountCreate.vue';
import NewAccountConfirm from '../../pages/mobile/NewAccountConfirm.vue';
import SetPassword from '../../pages/mobile/SetPassword.vue';
import AccountsNew from '../../pages/mobile/AccountsNew.vue';
import VaultSetupMethod from '../../pages/mobile/VaultSetupMethod.vue';
import VaultSetupAnotherDevice from '../../pages/mobile/VaultSetupAnotherDevice.vue';
import VaultSetupAnotherDeviceGuide from '../../pages/mobile/VaultSetupAnotherDeviceGuide.vue';
import VaultSetupSameDevice from '../../pages/mobile/VaultSetupSameDevice.vue';
import VaultSetupCompleted from '../../pages/mobile/VaultSetupCompleted.vue';
import Transfer from '../../pages/mobile/Transfer.vue';
import Receive from '../../pages/mobile/Receive.vue';
import Send from '../../pages/mobile/Send.vue';
import SendAmount from '../../pages/mobile/SendAmount.vue';
import SendConfirm from '../../pages/mobile/SendConfirm.vue';
import TransactionList from '../../pages/mobile/TransactionList.vue';
import TransactionDetails from '../../pages/mobile/TransactionDetails.vue';
import Settings from '../../pages/mobile/Settings.vue';
import SettingsNetwork from '../../pages/mobile/SettingsNetwork.vue';
import SettingsNetworkNew from '../../pages/mobile/SettingsNetworkNew.vue';
import SettingsRemoteConnection from '../../pages/mobile/SettingsRemoteConnection.vue';
import SettingsRemoteConnectionNew from '../../pages/mobile/SettingsRemoteConnectionNew.vue';
import SettingsAppList from '../../pages/mobile/SettingsAppList.vue';
import SettingsAppDetails from '../../pages/mobile/SettingsAppDetails.vue';

const Apps = () => import(/* webpackChunkName: "page-apps" */ '../../pages/mobile/Apps.vue');

const mergeEnterHandlers = (...handlers) => (to, from, next) => next(
  handlers.reduce((nextRoute, handler) => {
    if (nextRoute) return nextRoute;
    let res;
    handler(to, from, (r) => { res = r; });
    return res;
  }, undefined),
);

const checkAccountName = (to, from, next) => {
  if (!store.state.accounts.airGap.newAccountName) {
    next({ name: 'vault-new' });
    return;
  }
  next();
};

const vaultBeforeEnter = mergeEnterHandlers(checkLoggedIn(true), checkAccountName);

export default [{
  name: 'intro',
  path: '/',
  component: Intro,
  beforeEnter(to, from, next) {
    if (!from.name && store.state.accounts.hdWallet.encryptedWallet) {
      next({ name: 'login' });
      return;
    }
    next();
  },
}, {
  path: '/onboarding',
  component: Onboarding,
  children: [{
    name: 'onboarding',
    path: '',
    component: OnboardingWelcome,
  }, {
    name: 'onboarding-send',
    path: 'send',
    component: OnboardingSend,
  }, {
    name: 'onboarding-aepps',
    path: 'aepps',
    component: OnboardingAepps,
  }, {
    name: 'onboarding-subaccounts',
    path: 'subaccounts',
    component: OnboardingSubaccounts,
  }],
}, {
  name: 'login',
  path: '/login',
  component: Login,
  beforeEnter(to, from, next) {
    if (!store.state.accounts.hdWallet.encryptedWallet) {
      next({ name: 'set-password' });
      return;
    }
    if (store.getters.loggedIn) {
      next({ name: 'transfer' });
      return;
    }
    next();
  },
}, {
  name: 'recover',
  path: '/recover',
  component: Recover,
}, {
  name: 'new-account',
  path: '/new-account',
  component: NewAccount,
}, {
  name: 'new-account-create',
  path: '/new-account/create',
  component: NewAccountCreate,
}, {
  name: 'new-account-confirm',
  path: '/new-account/confirm',
  component: NewAccountConfirm,
  beforeEnter: checkMnemonicPassed,
  props: true,
}, {
  name: 'set-password',
  path: '/set-password',
  component: SetPassword,
  beforeEnter: checkMnemonicPassed,
  props: true,
}, {
  name: 'apps',
  path: '/browser',
  component: Apps,
  beforeEnter: checkLoggedIn(false),
}, {
  name: 'app-browser',
  path: '/browser/*',
  component: AppBrowser,
  beforeEnter: checkLoggedIn(false),
}, {
  name: 'accounts-new',
  path: '/accounts-new',
  component: AccountsNew,
  beforeEnter: checkLoggedIn(true),
  meta: {
    accountType: 'hd-wallet',
  },
}, {
  name: 'vault-new',
  path: '/vault/new',
  component: AccountsNew,
  beforeEnter: checkLoggedIn(true),
  meta: {
    accountType: 'air-gap',
  },
}, {
  name: 'vault-setup-method',
  path: '/vault/choose',
  component: VaultSetupMethod,
  beforeEnter: vaultBeforeEnter,
}, {
  name: 'vault-setup-another-device',
  path: '/vault/another-device',
  component: VaultSetupAnotherDevice,
  beforeEnter: vaultBeforeEnter,
}, {
  name: 'vault-setup-another-device-guide',
  path: '/vault/another-device/guide',
  component: VaultSetupAnotherDeviceGuide,
  beforeEnter: vaultBeforeEnter,
}, {
  name: 'vault-setup-completed',
  path: '/vault/sync-completed',
  component: VaultSetupCompleted,
  beforeEnter: vaultBeforeEnter,
}, ...process.env.UNFINISHED_FEATURES
  ? [{
    name: 'vault-setup-same-device',
    path: '/vault/this-device',
    component: VaultSetupSameDevice,
    beforeEnter: vaultBeforeEnter,
  }] : [], {
  name: 'transfer',
  path: '/transfer',
  component: Transfer,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'receive',
  path: '/transfer/receive',
  component: Receive,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'send',
  path: '/transfer/send',
  component: Send,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'send-to',
  path: '/transfer/send/:to',
  component: SendAmount,
  beforeEnter: checkLoggedIn(true),
  props: true,
}, {
  name: 'send-confirm',
  path: '/transfer/send/:to/:amount',
  component: SendConfirm,
  beforeEnter: checkLoggedIn(true),
  props: true,
}, {
  name: 'transaction-list',
  path: '/transfer/transactions/:direction?',
  component: TransactionList,
  beforeEnter: checkLoggedIn(true),
  props: true,
}, {
  name: 'transaction-details',
  path: '/transfer/transactions/details/:hash',
  component: TransactionDetails,
  beforeEnter: checkLoggedIn(true),
  props: true,
}, {
  name: 'settings',
  path: '/settings',
  component: Settings,
  beforeEnter: checkLoggedIn(false),
}, {
  name: 'settings-network',
  path: '/settings/network',
  component: SettingsNetwork,
  beforeEnter: checkLoggedIn(false),
}, {
  name: 'settings-network-new',
  path: '/settings/network/new',
  component: SettingsNetworkNew,
  beforeEnter: checkLoggedIn(false),
}, {
  name: 'settings-remote-connection',
  path: '/settings/remote-connection',
  component: SettingsRemoteConnection,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'settings-remote-connection-new',
  path: '/settings/remote-connection/new',
  component: SettingsRemoteConnectionNew,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'settings-app-list',
  path: '/settings/apps',
  component: SettingsAppList,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'settings-app-details',
  path: '/settings/apps/:appHost',
  component: SettingsAppDetails,
  beforeEnter: checkLoggedIn(true),
  props: true,
}];
