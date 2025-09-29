import { Product } from '@/types/types';
import { atom } from 'jotai';

export const drawerSessionUpdate = atom<Product[]>([]);
