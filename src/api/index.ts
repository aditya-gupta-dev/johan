import axios from "axios";
import type { Info } from "lucide-svelte";
import type { DataStream } from "src/modals";

export async function getInfo(link: string): Promise<Info | null> {

    try {
        const res = await axios.get('https://api-7isd.onrender.com/info', {
            headers: {
                "url": link
            }
        });
        if (res.status < 300) {
            return res.data as Info;
        } else {
            throw new Error("Unauthorized request");
        }
    } catch {
        throw new Error("Check your internet connection");
    }
}

export async function getDataStreams(link: string): Promise<DataStream[] | null> {
    try {
        const res = await axios.get('https://api-7isd.onrender.com/streams', {
            headers: {
                "url": link
            }
        });
        if (res.status < 300) {
            return res.data as DataStream[];
        } else {
            throw new Error("Unauthorized request");
        }
    } catch {
        throw new Error("Check your internet connection");
    }
}