export function numberToPx(num: number) {
  return num + "px";
}

export function getStyle(name: string, value: number | string) {
  return { [name]: typeof value === "number" ? value + "px" : value };
}

