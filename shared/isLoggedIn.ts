'use client'

import { atom } from 'jotai';
import Cookies from "js-cookie";

export const IsUserloggedIn = atom(!!Cookies.get('user'));