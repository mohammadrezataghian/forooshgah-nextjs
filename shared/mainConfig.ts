import { atom } from 'jotai';
import { ConfigItem } from "@/types/types";

export const mainConfig = atom<ConfigItem[]>([]);