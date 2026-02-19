import type { EngineType } from "../../types";
import { PickEngine } from "./PickEngine";
import { TimedEngine } from "./TimedEngine";
import { PickOptEngine } from "./PickOptEngine";
import { PickFromEngine } from "./PickFromEngine";
import { NegEngine } from "./NegEngine";
import { BuildEngine } from "./BuildEngine";
import { LiEngine } from "./LiEngine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ENGINES: Record<EngineType, React.ComponentType<any>> = {
  pick: PickEngine,
  timed: TimedEngine,
  pickOpt: PickOptEngine,
  pickFrom: PickFromEngine,
  negation: NegEngine,
  build: BuildEngine,
  li: LiEngine,
};
