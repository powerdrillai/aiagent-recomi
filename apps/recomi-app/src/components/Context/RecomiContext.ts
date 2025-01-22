import { createContext } from "react";

import type { RecomiConfig } from "@/types/recomi";

const RecomiContext = createContext<RecomiConfig | null>(null);

export default RecomiContext;
