// https://github.com/developit/mitt/issues/130

import mitt from "mitt";
import { defineStore } from "pinia";

import { EntryUpdated } from "@/stores/events/entryUpdated";

type Events = {
  entryupdated: EntryUpdated;
};

export const useEventStore = defineStore("event", () => mitt<Events>());
