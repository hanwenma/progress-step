<script setup lang="ts">
import ProgressSteps from './components/progressSteps/index.vue'
const data1 = [
  {
    key: '1',
    status: 'green',
    text: '节点1',
  },

  {
    key: '2',
    status: 'gray',
    text: '节点2',
  },
  {
    key: '3',
    status: 'gray',
    text: '节点3',
  },
]

const data2 = [
  {
    key: '1',
    status: 'green',
    text: '节点1',
  },
  {
    children1: [
      {
        key: '5',
        status: 'blue',
        text: '节点5',
      },
      {
        key: '6',
        status: 'blue',
        text: '节点6',
      },
    ],
    children2: [
      {
        key: '3',
        status: 'gray',
        text: '节点3',
      },
      {
        key: '7',
        status: 'blue',
        text: '节点7',
      },
    ],
  },
  {
    key: '4',
    status: 'gray',
    text: '节点4',
  },
]

const data3 = [
  {
    key: '1',
    status: 'green',
    text: '节点1',
  },
  {
    children1: [
      // {
      //   key: '11',
      //   status: 'blue',
      //   text: '节点11',
      // },
      {
        children1: [
          {
            key: '11',
            status: 'blue',
            text: '节点11',
          },
          {
            children1: [
              {
                key: '21',
                status: 'blue',
                text: '节点7',
              },
            ],
            children2: [
              {
                key: '22',
                status: 'gray',
                text: '节点22',
              },
            ],
          },
        ],
        children2: [
          {
            key: '12',
            status: 'gray',
            text: '节点12',
          },
        ],
      },
      {
        key: '5',
        status: 'blue',
        text: '节点5',
      },
    ],
    children2: [
      {
        key: '3',
        status: 'gray',
        text: '节点3',
      },
      {
        children1: [
          {
            key: '7',
            status: 'blue',
            text: '节点7',
          },
          {
            children1: [
              {
                key: '77',
                status: 'blue',
                text: '节点77',
              },
            ],
            children2: [
              {
                key: '98',
                status: 'gray',
                text: '节点98',
              },
            ],
          },
        ],
        children2: [
          {
            key: '9',
            status: 'gray',
            text: '节点9',
          },
        ],
      },
    ],
  },
  {
    key: '4',
    status: 'gray',
    text: '节点4',
  },
]
</script>

<template>
  <RouterView />

  <h1>串行节点</h1>
  <progress-steps :data="data1" />

  <h1>简单并行节点</h1>
  <progress-steps :data="data2" />

  <h1>复杂并行节点</h1>
  <progress-steps :data="data3" />
</template>

<style>
h1 {
  margin: 20px 0;
}
</style>
