<script setup lang="ts">
defineOptions({
  name: 'ProgressSteps',
})

const props = withDefaults(
  defineProps<{
    data: any[]
    level?: number
  }>(),
  {
    data: () => [],
  },
)

const vMount = {
  mounted: (el: HTMLDivElement, binding: any) => {
    switch (binding.arg) {
      case 'translateY':
        setTimeout(() => {
          const stepItemNormal = el
          const stepEl = el.parentElement
          const stepItemParallel = stepEl?.querySelector('.step-item-parallel')

          stepItemNormal.style.transform = `translateY(${stepItemParallel ? stepItemParallel.clientHeight / 2 - 30 : 0}px)`
        })

        break

      default:
        setTimeout(() => {
          const children1: any = el.firstChild!,
            children1Rect = children1.getBoundingClientRect()
          const children2 = children1.nextElementSibling,
            children2Rect = children2.getBoundingClientRect()
          const parallelBox: any = children2.nextElementSibling

          parallelBox.style.top = children1Rect.height / 2 - 15 + 'px'

          parallelBox.style.height = children1Rect.height / 2 + children2Rect.height / 2 + 50 + 'px'

          parallelBox.style.left = 0 + 'px'
          parallelBox.style.width = el!.clientWidth + 'px'
        })
        break
    }
  },
}
</script>

<template>
  <div class="step">
    <template v-for="item in data" :key="item.key">
      <!-- 并行 -->
      <div
        v-if="Array.isArray(item.children1 || item.children2)"
        :class="['step-item', 'step-item-parallel']"
        v-mount
      >
        <progress-steps :data="item.children1" class="children1" />
        <progress-steps :data="item.children2" class="children2" />
        <!-- 并行边框 -->
        <div class="step-item-parallel-box"></div>
      </div>
      <!-- 串联 -->
      <div v-else :class="['step-item', 'step-item-normal']" v-mount:translateY>
        <div :class="['step-item-node', item.status]"></div>
        <p class="step-item-text">{{ item.text }}</p>
      </div>
    </template>
  </div>
</template>

<style lang="less">
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
.gray {
  background-color: gray;
}

.step {
  display: flex;
  align-items: flex-start;
  position: relative;

  .children1,
  .children2 {
    z-index: 3;
  }

  .children2 {
    margin-top: 50px;
  }

  &-item {
    margin-right: 2px;
    text-align: center;
    width: 150px;

    &-parallel {
      background-color: #fff;
      border-radius: 5px;
      width: auto;
      padding: 0 30px;
      position: relative;

      &-box {
        position: absolute;
        border: 1px dashed gainsboro;
        top: 15px;
        border-radius: 5px;
        z-index: 2;
      }

      .step-item-normal {
        // 箭头
        .step-item-node::before {
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          content: ' ';
          border-left: 10px solid gainsboro;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 10;
        }

        // 右虚线
        &::after {
          border-top-color: transparent !important;
        }
        // 左虚线
        &:before {
          border-top-color: transparent !important;
        }
      }
    }

    &-normal {
      position: relative;

      &:not(:first-child) {
        // 箭头
        .step-item-node::before {
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          content: ' ';
          border-left: 10px solid gainsboro;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 10;
        }
      }

      // 右虚线
      &:not(:last-child)::after {
        position: absolute;
        left: 50%;
        top: 15px;
        content: ' ';
        height: 10px;
        width: 50%;
        border-top: 1px dashed rgb(173, 168, 168);
        z-index: -1;
      }
      // 左虚线
      &:not(:first-child)::before {
        position: absolute;
        right: 50%;
        top: 15px;
        content: ' ';
        height: 10px;
        width: 50%;
        border-top: 1px dashed rgb(173, 168, 168);
        z-index: -1;
      }
    }

    &-node {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid #fff;
      position: relative;
      z-index: 1;
    }

    &-text {
      padding: 0 5px;
    }
  }
}
</style>
