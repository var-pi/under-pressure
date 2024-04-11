// https://github.com/developit/mitt/issues/130

import mitt from "mitt";
import { Emitter, EventType } from "mitt";
import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: (): Emitter<Record<EventType, unknown>> => mitt(),
});
