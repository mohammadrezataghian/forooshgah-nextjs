import { AdvertisementResponse } from '@/types/types';
import { atom } from 'jotai';

export const banners = atom<AdvertisementResponse | null>(null);