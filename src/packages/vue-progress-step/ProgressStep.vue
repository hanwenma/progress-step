<template>
  <div class="progress-step">
    <div :class="[
      'progress-step_item',
      isLast(idx) && 'is_last',
      Array.isArray(node) && 'is_parallel'
    ]" v-for="(node, idx) in props.data" :style="stepItemStyle">
      <!-- 并行节点 -->
      <template v-if="Array.isArray(node)">
        <div class="step-item_rect">
          <!-- 线条 -->
          <div class="step-item_line"></div>

          <!-- 上边节点 -->
          <progress-step class="step-item_rect_top" :data="node[0]" />
          <!-- 下边节点 -->
          <progress-step class="step-item_rect_bottom" :data="node[1]" />
        </div>
      </template>

      <!-- 单个串行节点 -->
      <template v-else>
        <!-- 头部节点 -->
        <div class="step-item_head">
          <!-- 线条 -->
          <div v-if="!isLast(idx)" class="step-item_line"></div>
          <!-- 图标 -->
          <slot name="icon">
            <div class="progress-step_icon" :style="getIconStyle(node)"></div>
          </slot>
        </div>

        <!-- 主体内容 -->
        <div class="step-item_main">
          <div class="progress-step_title">{{ node.title }}</div>
          <slot name="description">
            <div class="progress-step_desc">{{ node.description }}</div>
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>
  
<script lang="ts">
export default {
  name: "progress-step",
};
</script>
<script setup lang="ts">
import useStatuColor from './composable/useStatuColor';
import useParallelNodesLen from './composable/useParallelNodesLen';
import useStepItemInfo from './composable/useStepItemInfo';
import { getStyle, numberToPx } from './tools'

interface PropsType {
  data?: any[];
  status?: string[];
  colors?: string[];
  size?: number;
  stepWidth?: number;
  space?: number;
}

// 定义 props 和 其默认值
const props = withDefaults(defineProps<PropsType>(), {
  data: () => [],
  colors: () => ["#d2d2d2", "#3a84fb", "#67d36f"],
  status: () => ["pending", "processing", "completed"],
  size: 25,
  stepWidth: 80,
  space: 20,
});

// 默认高度
let reactHeight = 100;
// 默认背景色
const defualtBGC = "#d2d2d";

// 并行节点长度
const parallelNodesLen = useParallelNodesLen(props, () => {
  reactHeight += reactHeight;
});

// 获取和 StepItem 相关信息
const { flexBasis, rectTop, rectBot } = useStepItemInfo(props, parallelNodesLen, reactHeight);

// 自定义颜色和状态值的映射
const statusToColor = useStatuColor(props.status, props.colors);

// 计算相关值
const itemLine = props.stepWidth + props.space;
const reactItemLine = props.stepWidth - 10;
const stepItemTop = reactHeight / 2 - 12;

// 计算 style
const stepItemStyle = getStyle("flex-basis", props.stepWidth);
const getIconStyle = (node: any) => getStyle("background-color", statusToColor[node.status] || defualtBGC);

// 是否是最后一个节点
const isLast = (index: number) => {
  return index === props.data.length - 1;
}

defineExpose({
  reactHeight,
  parallelNodesLen
});
</script>
  
<style lang="scss" scoped>
.progress-step {
  display: flex;
  align-items: flex-start;

  .progress-step_item {
    flex-shrink: 0;
    text-align: center;
    box-sizing: border-box;
    margin-right: v-bind("numberToPx(props.space)");
    margin-top: v-bind("numberToPx(stepItemTop)");

    &.is_last {
      margin-right: 0;
    }

    &.is_parallel {
      margin-top: 0;
    }

    .step-item_line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: v-bind("numberToPx(itemLine)");
      transform: translateY(-50%);
      border-top: 1px dashed #c0c4cc;

      &::before {
        position: absolute;
        left: 50%;
        top: -1px;
        transform: translate(0, -50%);
        content: " ";
        border: 8px solid #c0c4cc;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }

    .step-item_rect {
      width: v-bind("numberToPx(flexBasis)");
      height: v-bind("numberToPx(reactHeight)");
      position: relative;
      border: 1px dashed #c0c4cc;
      background-color: #fff;
      border-radius: 5px;
      align-self: center;
      margin: 0 v-bind("numberToPx(props.space)");

      &>.step-item_line {
        left: 100%;
        top: 50%;
        width: v-bind("numberToPx(reactItemLine)");
      }

      .step-item_rect_top,
      .step-item_rect_bottom {
        position: absolute;
        width: 100%;

        .step-item_line {
          border-top-color: transparent;
        }
      }

      .step-item_rect_top {
        top: v-bind("numberToPx(rectTop)");
      }

      .step-item_rect_bottom {
        bottom: v-bind("numberToPx(rectBot)");
      }
    }

    .step-item_head {
      position: relative;
      display: flex;
      justify-content: center;

      .progress-step_icon {
        display: inline-block;
        width: v-bind("numberToPx(props.size)");
        height: v-bind("numberToPx(props.size)");
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      }
    }

    .step-item_main {
      margin-top: 5px;

      .progress-step_desc {
        color: "#c0c4cc";
        font-size: 12px;
      }
    }
  }
}
</style>
  