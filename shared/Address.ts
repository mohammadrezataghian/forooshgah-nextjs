import { Address } from '@/types/types';
import { atom } from 'jotai';

export const address = atom<Address | undefined>(undefined);