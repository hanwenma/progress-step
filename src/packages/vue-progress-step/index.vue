<template>
  <div class="progress-step_container" :style="containerStyle">
    <progress-step ref="progressStep" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
export default {
  name: "vue-progress-step",
};
</script>
<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
import ProgressStep from './ProgressStep.vue'

const progressStep: any = ref(null)

const containerStyle = reactive({
  height: 'auto'
});

onMounted(() => {
  const { reactHeight, parallelNodesLen } = progressStep.value;
  if (parallelNodesLen) containerStyle.height = reactHeight * 2.5 + 'px';
});

</script>
  
<style lang="scss" scoped>
.progress-step_container {
  display: flex;
  align-items: center;
  overflow-x: auto;
}
</style>