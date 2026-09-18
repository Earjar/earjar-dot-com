// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'
// import { makeRequest } from '../api/client'
// import * as DevBlogTypes from "../types/devBlogTypes.ts";

export const sortByDate = (items: any) => {
    items.sort((a: any, b: any) => {
        if (a.published_at == null || b.published_at == null) return 0;
        return a.published_at > b.published_at ? -1 : 1;
    })
    return items;
};