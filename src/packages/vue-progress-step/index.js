import VueProgressStep from "./index.vue";
import ProgressStep from "./ProgressStep.vue";

let installed = false;

const componts = [VueProgressStep, ProgressStep];

export default function install(app) {
  if (installed) return;
  componts.forEach((Comp) => {
    console.log("install .... ", Comp.name, Comp);
    app.component(Comp.name, Comp);
  });
  installed = true;
}
