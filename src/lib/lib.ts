export function getId(url: string): string {
    let out = url.substring(url.lastIndexOf("/") + 1, url.length);
    return out.split('?')[0];
}

export function getIdFromStore(): string {
    let url = localStorage.getItem("last_link");

    if (!url) return "nothing";
    return getId(url);
}