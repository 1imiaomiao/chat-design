// store.js
import { createGlobalState, useStorage } from "@vueuse/core";

export const useGlobalToken = createGlobalState(() =>
  useStorage("Token", null)
);
