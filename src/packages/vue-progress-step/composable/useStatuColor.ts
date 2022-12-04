import { computed } from "vue";

export default function useStatuColor(status: string[], colors: string[]) {
  const statusColorMap: Record<string, string> = {};
  
  const statusToColor = computed(() => {
    status.forEach((v, i) => {
      statusColorMap[v] = colors[i];
    });
    return statusColorMap;
  });

  return statusToColor.value;
}
