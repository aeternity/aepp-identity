<template>
  <div class="settings">
    <Guide size="big">
      <em>{{ $t('settings.title') }}</em>
    </Guide>

    <AeCard fill="maximum">
      <ListItemSettingsReset />

      <ListItem
        :title="$t('network.settings.title')"
        class="network"
        :subtitle="networkId ? $t('network.settings.subtitle', { id: networkId }) : ''"
      >
        <ListItemCircle slot="icon">
          <Network />
        </ListItemCircle>
        <div
          slot="right"
          class="value"
        >
          {{ currentNetwork.name }}
          <ButtonPlain @click="networkMode = 'switch'">
            <LeftMore ref="networkIcon" />
          </ButtonPlain>
        </div>
      </ListItem>

      <ListItem
        :title="$t('settings.currency.title')"
        :subtitle="$t('settings.currency.subtitle')"
        class="currency"
      >
        <ListItemCircle slot="icon">
          <Currency />
        </ListItemCircle>
        <ButtonPlain
          slot="right"
          @click="showCurrencySwitcher = true"
        >
          <LeftMore ref="currencyIcon" />
        </ButtonPlain>
      </ListItem>

      <ListItemSettingsLanguage>
        <ButtonPlain @click="showLanguageSwitcher = true">
          <LeftMore ref="languageIcon" />
        </ButtonPlain>
      </ListItemSettingsLanguage>
    </AeCard>
    <SettingsVersion />

    <AePopover
      :anchor="networkMode ? $refs.networkIcon : null"
      v-bind="popoverOrigin"
      @close="closeNetworkPopover"
    >
      <NetworkSwitcher
        v-if="networkMode === 'switch'"
        @network-add-button-click="networkMode = 'add'"
        @switch="networkMode = false"
      />
      <NetworkAdd
        v-else-if="networkMode === 'add'"
        @finally="networkMode = 'switch'"
      />
    </AePopover>

    <AePopover
      :anchor="showCurrencySwitcher ? $refs.currencyIcon : null"
      v-bind="popoverOrigin"
      @close="showCurrencySwitcher = false"
    >
      <CurrencySwitcher @switch="showCurrencySwitcher = false" />
    </AePopover>

    <AePopover
      :anchor="showLanguageSwitcher ? $refs.languageIcon : null"
      v-bind="popoverOrigin"
      @close="showLanguageSwitcher = false"
    >
      <LanguageSwitcher @switch="showLanguageSwitcher = false" />
    </AePopover>
  </div>
</template>

<script>
import { defer } from 'lodash-es';
import { mapState, mapGetters } from 'vuex';
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import AePopover from '../../components/AePopover.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemCircle from '../../components/ListItemCircle.vue';
import ListItemSettingsReset from '../../components/ListItemSettingsReset.vue';
import ListItemSettingsLanguage from '../../components/ListItemSettingsLanguage.vue';
import { Network, LeftMore, Currency } from '../../components/icons';
import ButtonPlain from '../../components/ButtonPlain.vue';
import NetworkSwitcher from '../../components/NetworkSwitcher.vue';
import NetworkAdd from '../../components/NetworkAdd.vue';
import CurrencySwitcher from '../../components/CurrencySwitcher.vue';
import LanguageSwitcher from '../../components/LanguageSwitcher.vue';
import SettingsVersion from '../../components/SettingsVersion.vue';

export default {
  components: {
    AePopover,
    AeCard,
    Guide,
    ListItem,
    ListItemCircle,
    ListItemSettingsReset,
    ListItemSettingsLanguage,
    Network,
    ButtonPlain,
    LeftMore,
    Currency,
    NetworkSwitcher,
    NetworkAdd,
    CurrencySwitcher,
    LanguageSwitcher,
    SettingsVersion,
  },
  data: () => ({
    popoverOrigin: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'right' },
    },
    networkMode: false,
    showLanguageSwitcher: false,
    showCurrencySwitcher: false,
  }),
  computed: {
    ...mapGetters(['currentNetwork']),
    ...mapState({
      networkId: state => state.sdk && state.sdk.getNetworkId && state.sdk.getNetworkId(),
    }),
  },
  methods: {
    closeNetworkPopover() {
      defer(() => { this.networkMode = false; });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.settings {
  .ae-card {
    margin: 0 rem(-15px);

    .list-item {
      &.network .list-item-circle {
        background-color: $color-secondary;
      }

      &.currency .list-item-circle {
        background-color: #f8963d;
      }

      .value {
        @extend %face-sans-xs;
        color: $color-neutral-negative-1;
      }

      .button-plain {
        margin-left: rem(10px);

        .icon {
          transform: rotate(90deg);
          color: #000;
        }
      }
    }
  }
}
</style>
