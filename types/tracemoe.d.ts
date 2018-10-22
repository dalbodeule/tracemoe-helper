export = TraceMoe
declare class TraceMoe {
    apiKey: string;
    uri: {
        search: string;
        me: string;
        previewImage: string;
        previewVideo: string;
    };
    ready: boolean;

    constructor(apiKey: string);
    isReady(): void;
    search(image: string): Promise<TraceMoe.search>;
    me(): Promise<TraceMoe.me>;
    previewImage(anilist_id: number, filename: string, at: number, tokenthumb: string): Promise<string>;
    previewVideo(anilist_id: number, filename: string, at: number, tokenthumb: string): Promise<string>;
    imgEncode(image: string): Promise<string>;
}

declare namespace TraceMoe {
    export interface me {
        user_id: number;
        email: string;
        quota: number;
        quota_ttl: number;
    }

    export interface search {
        RawDocsCount: number;
        RawDocsSearchTime: number;
        ReRankSearchTime: number;
        CacheHit: boolean;
        trial: number;
        quota: number;
        expire: number;
        docs: Array<searchResult>;
    }

    export interface searchResult {
        from: number;
        to: number;
        at: number;
        episode: number | string;
        similarity: number;
        anilist_id: number;
        mal_id: number | null;
        is_adult: boolean;
        title: undefined;
        title_native: string | null;
        title_chinese: string | null;
        title_english: string | null;
        title_romazi: string;
        synonyms: Array<string> | Array<null>;
        synonyms_chinese: Array<string> | Array<null>;
        season: undefined;
        anime: undefined;
        filename: string;
        tokenthumb: string;
    }
}
