<template>
  <div class="note">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/typography';

.note {
  margin-bottom: rem(50px);
  @extend %face-sans-xs;
  line-height: 1.46;
  color: $color-neutral-minimum;
}
</style>
