import { reducer } from "./store";
import { LoadingStatus } from "./tools";

export type RootState = ReturnType<typeof reducer>;
