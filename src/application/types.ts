import * as Application from "./index";

export type UseCaseInstances = {
  [K in keyof typeof Application.UsesCases as Capitalize<K & string>]:
    InstanceType<typeof Application.UsesCases[K]>
}

