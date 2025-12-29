import * as Application from "./index";
export type UseCaseInstances = {
  [K in keyof typeof Application.UseCases as Capitalize<K & string>]:
    InstanceType<typeof Application.UseCases[K]>
}

