<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount } from "svelte";
    import type { DataStream } from "src/modals";
    import { getDataStreams } from "../../../api/index";
    import { toast } from "svelte-sonner";
    import Asset from "./Asset.svelte";
    import { ScrollArea } from "../ui/scroll-area";
    import { RotateCcw, Loader } from "lucide-svelte";
    import { getIdFromStore } from "$lib/lib";

    let dataStreams: DataStream[] = [];
    let loading: boolean = false;
    let id: string = "";

    const loadStreams = async () => {
        loading = true;
        let item = localStorage.getItem("last_link");
        id = getIdFromStore();
        if (item) {
            try {
                dataStreams = (await getDataStreams(item)) ?? [];
            } catch (e: any) {
                loading = false;
                toast("Error Occurred", {
                    description: e.message,
                    action: {
                        label: "Close",
                        onClick: () => {},
                    },
                });
            }
        }
        loading = false;
    };

    onMount(async () => {
        await loadStreams();
        id = getIdFromStore();
    });
</script>

<Sheet.Root>
    <Sheet.Trigger class="min-w-full">
        <Button class="min-w-full z-50 shadow-md" variant="outline">
            View assets
        </Button>
    </Sheet.Trigger>
    <Sheet.Content side="left">
        <Sheet.Header class="pb-4">
            <Sheet.Title>Assets</Sheet.Title>
            <Sheet.Description>
                Download links for {id}.
            </Sheet.Description>
        </Sheet.Header>

        <ScrollArea
            orientation="vertical"
            class="h-3/4 p-4 border rounded-xl z-50 shadow-md"
        >
            {#each dataStreams as dataStream}
                <Asset data={dataStream} />
                <div class="my-2" />
            {/each}
        </ScrollArea>

        <Sheet.Footer class="pt-4">
            <Button
                class="gap-2 shadow-md z-50"
                variant="outline"
                disabled={loading}
                on:click={loadStreams}
            >
                {#if loading}
                    <div class="animate-spin">
                        <Loader />
                    </div>
                {:else}
                    <RotateCcw />
                    Refresh
                {/if}
            </Button>
        </Sheet.Footer>
    </Sheet.Content>
</Sheet.Root>
