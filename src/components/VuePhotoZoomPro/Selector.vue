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
    <div class="selector-wrap" :style="selectorWrapStyle">
      <slot />
    </div>
    <div class="item-label" v-if="activeItem">
      {{ $t(`items.${activeItem.key}`) }}
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
    },
    activeItem: {
      type: Object
    }
  },
  computed: {
    selectorStyle () {
      return {
        transform: `translate3d(${this.left}px, ${this.top}px, 0)`
      }
    },
    selectorWrapStyle(){
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/variables.scss';
$color: $dark-green;
.selector {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  .selector-wrap {
    position: relative;
    background-repeat: no-repeat;
    cursor: crosshair;
    overflow: hidden;
  }
  &.circle > .selector-wrap {
      border: 4px solid #ccc;
      border-radius: 50%;
  }
  &.found > .selector-wrap {
    border: 4px solid $color;
  }
  &.hint > .selector-wrap {
    border: 4px solid $color;
    // animation: pulse 2s ease-out 0s 1;
  }

  .item-label {
    position: absolute;
    left: 50%;
    bottom: 100%;
    background: rgba(#fff, 1);
    mix-blend-mode: multiply;
    z-index: 1000;
    font-size: 0.9rem;
    font-weight: 600;
    color: darken( $dark-green, 10% );
    border-radius: 0.5rem;
    padding: 4px 1em;
    transform: translate(-50%, -5px);
    border: 2px solid darken( $dark-green, 5%);
    // text-shadow: 1px 1px 1px rgba($dark-green,0.65);
    // box-shadow: 1px 1px 2px rgba(0,0,0,0.75);
    white-space: nowrap;
    transform-origin: 0% 50%;
    animation: slide-up 0.4s ease-out 0s 1;
  }
}

@keyframes pulse {
	0% {
		box-shadow: 0 0 0 0 rgba($color, 0.7);
	}

	70% {
		box-shadow: 0 0 0 100px rgba($color, 0);
	}

	100% {
		box-shadow: 0 0 0 0 rgba($color, 0);
	}
}
@keyframes slide-up {
	0% {
    opacity: 0;
		transform: scale(0) translate(-50%, -5px);
	}

	100% {
    opacity: 1;
		transform: scale(1) translate(-50%, -5px);
	}
}
</style>
