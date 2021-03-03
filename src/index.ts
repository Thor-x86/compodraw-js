// Sanity check, make sure it's not run under NodeJS
try {
  window;
} catch (_) {
  throw new Error("You have to run CompoDraw at Browser, not NodeJS");
}

export * from "./renderer";
export * from "./interfaces";
export * from "./composer";
export * from "./errors";
