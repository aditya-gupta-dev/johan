export interface Info {
    title: string;
    views: number;
    thumbnail: string;
};

export interface DataStream {
    filesize_mb: number;
    filesize_gb: number;
    url: string;
    is_audio: boolean;
    is_video: boolean;
    mime: string;
    itag: number;
};

export interface HistoryItem {
    url: string;
    created_at: Date;
};