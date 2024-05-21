<script lang="ts">
    import { Collection, SignedIn } from "sveltefire";
    import { ScrollArea } from "../ui/scroll-area";
    import type { HistoryItem } from "src/modals";
    import { getId } from "$lib/lib";

    let histories: HistoryItem[] = [];
</script>

<SignedIn let:user>
    <div class="pt-6 flex flex-col gap-4">
        <h1 class="text-3xl font-extrabold">History</h1>
        <Collection ref={`users/${user.uid}/history`} let:data={histories}>
            <ScrollArea
                class="flex flex-col p-4 max-h-[360px] min-h-[360px] w-full rounded-xl shadow-md z-50 border bg-zinc-900"
                orientation="vertical"
            >
                {#each histories as hist}
                    <div class="w-full pb-4 text-center">
                        {getId(hist.url)}
                    </div>
                    <div class="h-[1px] bg-black dark:bg-white" />
                {/each}
            </ScrollArea>
        </Collection>
    </div>
</SignedIn>
