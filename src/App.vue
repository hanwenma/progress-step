<script setup lang="ts">
import VueProgressStep from "./packages/vue-progress-step/index.vue";

const data = [
  { status: "completed", title: "开始", description: "这是描述" },
  [
    [
      { status: "completed", title: "已完成", description: "这是描述" },
      { status: "completed", title: "已完成", description: "这是描述" },
      [
        [
          { status: "completed", title: "已完成", description: "这是描述" },
          { status: "pending", title: "待处理", description: "这是描述" },
        ],
        [
          { status: "completed", title: "已完成", description: "这是描述" },
          { status: "processing", title: "处理中", description: "这是描述" },
        ]
      ],
      { status: "pending", title: "待处理", description: "这是描述" },
    ],
    [
      { status: "completed", title: "已完成", description: "这是描述" },
      { status: "completed", title: "已完成", description: "这是描述" },
      [
        [
          { status: "completed", title: "已完成", description: "这是描述" },
          { status: "pending", title: "待处理", description: "这是描述" },
        ],
        [
          { status: "completed", title: "已完成", description: "这是描述" },
          { status: "processing", title: "处理中", description: "这是描述" },
        ]
      ],
      { status: "pending", title: "待处理", description: "这是描述" },
    ],
  ],
  { status: "pending", title: "结束", description: "这是描述" },
]
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <div class="box">
    <vue-progress-step :data="data" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.box {}
</style>
