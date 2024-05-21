<script lang="ts">
    import type { DataStream } from "src/modals";
    import Button from "../ui/button/button.svelte";
    import { Headset, Video } from "lucide-svelte";
    import * as Tooltip from "$lib/components/ui/tooltip";

    export let data: DataStream;
</script>

<div class="flex flex-col w-full p-2 lg:p-4 border rounded-xl gap-4 z-50 shadow-md">
    <div class="flex flex-row justify-between items-center">
        <h1 class="text-md font-semibold">{data.filesize_mb.toFixed()} MB</h1>
        <span class="text-sm text-zinc-600 dark:text-zinc-200">{data.mime}</span
        >
    </div>

    <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row">
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        size="icon"
                        variant="outline"
                        class="rounded-r-none"
                        disabled={!data.is_audio}
                    >
                        <Headset />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom">
                    <p>Audio available: {data.is_audio}</p>
                </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button
                        size="icon"
                        variant="outline"
                        class="rounded-l-none"
                        disabled={!data.is_video}
                    >
                        <Video />
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content side="bottom">
                    <p>Video available: {data.is_video}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </div>
        <Button>
            <a href={data.url} target="_blank">Download</a>
        </Button>
    </div>
</div>
