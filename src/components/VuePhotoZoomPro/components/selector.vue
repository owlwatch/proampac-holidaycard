<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-08-10 10:26:15
 * @Description:
-->
<template>
  <div
    :class="['selector', type]"
    :style="selectorStyle"
  >
    <div class="selector-inner">
      <slot />
    </div>

  </div>
</template>

<script>
export default {
  name: 'VuePhotoZommProSelector',
  props: {
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'square'
    }
  },
  computed: {
    selectorStyle () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        transform: `translate3d(${this.left}px, ${this.top}px, 0)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selector {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  .selector-inner {
    overflow: hidden;
    background-repeat: no-repeat;
    cursor: crosshair;
  }
  &.circle .selector-inner {
    border-radius: 50%;
  }
}

</style>