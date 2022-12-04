import { computed } from "vue";

export default function useParallelNodesLen(props: any, callBack?: () => void) {
  const parallelNodesLen = computed(() => {
    let count = 0;
    let flag = false;

    function getLen(nodes: any[]) {
      nodes.forEach((node) => {
        if (Array.isArray(node)) {
          count += Math.max(node[0].length, node[1].length);
          getLen(node[0]);
          if (flag && callBack) {
             callBack();
          }
          flag = true;
        }
      });
    }

    getLen(props.data);

    return count;
  });

  return parallelNodesLen.value;
}
