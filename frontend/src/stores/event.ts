// https://github.com/developit/mitt/issues/130

import mitt from "mitt";
import { defineStore } from "pinia";

import { EntryUpdated } from "@/stores/events/entryUpdated";
import { CurrentMissing } from "@/stores/events/currentMissing";
import { PersonalMissing } from "@/stores/events/personalMissing";
import { Followed } from "@/stores/events/followed";
import { Unfollowed } from "@/stores/events/unflollowed";

type Events = {
  // Entry of the currently selected subject has been updated.
  entryupdated: EntryUpdated;
  // Current subject was required but was missing.
  currentmissing: CurrentMissing;
  // Personal subjects have been request but none have been added yet.
  personalmissing: PersonalMissing;
  // The subject has been followed
  followed: Followed;
  // The sbject has been unfollowed
  unfollowed: Unfollowed;
};

export const useEventStore = defineStore("event", () => mitt<Events>());
