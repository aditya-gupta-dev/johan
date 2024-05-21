<script lang="ts">
    import Button from "../ui/button/button.svelte";
    import Person from "svelte-radix/Person.svelte";
    import { SignedIn } from "sveltefire";
    import * as Sheet from "../ui/sheet";
    import { ScrollArea } from "../ui/scroll-area";
    import History from "./History.svelte";
    import { DoorOpen } from "lucide-svelte";
</script>

<SignedIn let:user let:signOut>
    <Sheet.Root>
        <Sheet.Trigger>
            <Button variant="outline" size="icon" class="shadow-md z-50">
                <Person />
            </Button>
        </Sheet.Trigger>

        <Sheet.Content side="right">
            <Sheet.Header class="pt-4">
                <div class="flex flex-1 flex-col items-center lg:items-start">
                    <img
                        src={user.photoURL}
                        alt="avatar"
                        class="rounded-full border-4 z-50 shadow-md size-12 lg:size-16"
                    />
                </div>
                <Sheet.Title
                    class="w-full border z-50 shadow-md p-4 overflow-x-hidden rounded-xl dark:bg-zinc-900"
                >
                    {user.displayName}
                    <ScrollArea
                        orientation="horizontal"
                        class="w-full pb-4 lg:pb-0"
                    >
                        <Sheet.Description>{user.email}</Sheet.Description>
                    </ScrollArea>
                </Sheet.Title>
            </Sheet.Header>

            <History />

            <Sheet.Footer class="py-4">
                <Button class="gap-2 w-full" on:click={signOut}>
                    <DoorOpen />
                    Logout
                </Button>
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>
</SignedIn>
