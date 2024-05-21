<script lang="ts">
    import { SignedIn, SignedOut } from "sveltefire";
    import { addSearchedUrl, signIn } from "../lib/firebase";
    import { Button } from "$lib/components/ui/button";
    import Nav from "$lib/components/custom/Nav.svelte";
    import { Input } from "$lib/components/ui/input";
    import Glass from "svelte-radix/MagnifyingGlass.svelte";
    import Globe from "svelte-radix/Globe.svelte";
    import * as Card from "$lib/components/ui/card";
    import { toast } from "svelte-sonner";
    import { getInfo } from "../api/index";
    import type { Info } from "src/modals";
    import { Loader } from "lucide-svelte";
    import AssetSheet from "$lib/components/custom/AssetSheet.svelte";

    let link: string = "";
    let data: Info | null = null;
    let loading: boolean = false;

    const launch = async () => {
        loading = true;

        if (link.includes("youtu.be") || link.includes("youtube")) {
            localStorage.setItem("last_link", link);
            try {
                data = await getInfo(link);
                await addSearchedUrl(link);
            } catch (e: any) {
                toast("Error Occurred", {
                    description: e.message,
                    action: { label: "Close", onClick: () => {} },
                });
            }
        } else {
            loading = false;
            toast("Link Error", {
                description: "Enter a valid youtube url",
                action: {
                    label: "close",
                    onClick: () => {},
                },
            });
            return null;
        }
        loading = false;
    };
</script>

<main class="flex flex-col min-h-screen">
    <SignedOut>
        <div class="flex flex-1 flex-col items-center justify-center gap-8">
            <div class="flex flex-col gap-2">
                <h1 class="text-5xl font-extrabold text-center">
                    Johan Liebert
                </h1>
                <span class="text-zinc-600 dark:text-zinc-400 text-center">
                    "" Hatred is born when people gather together. ""
                </span>
            </div>
            <Button on:click={signIn} class="gap-2">
                <Globe />
                Sign In With Google
            </Button>
        </div>
    </SignedOut>
    <SignedIn>
        <Nav />

        <div class="flex justify-center">
            <div
                class="flex w-full max-w-sm items-center space-x-3 pt-12 pb-8 px-4 lg:px-0"
            >
                <Input
                    type="url"
                    placeholder="Your youtube url"
                    bind:value={link}
                    class="z-50 shadow-md bg-white dark:bg-zinc-900"
                />
                <Button on:click={launch} disabled={loading}>
                    {#if loading}
                        <div class="animate-spin">
                            <Loader />
                        </div>
                    {:else}
                        Launch
                    {/if}
                </Button>
            </div>
        </div>

        {#if data}
            <div
                class="w-full max-w-full mx-auto sm:max-w-[380px] px-8 lg:px-0"
            >
                <Card.Root class="w-full z-50 shadow-md px-4 py-2">
                    <Card.Header>
                        <input
                            class="font-bold p-4 rounded-xl z-50 shadow-md border min-w-full"
                            value={data?.title}
                        />
                        <!-- <h2 class="text-2xl font-bold">{data?.title}</h2> -->
                        <h2 class="text-md font-semibold text-zinc-500 pt-2">
                            {data?.views} views
                        </h2>
                    </Card.Header>
                    <Card.Content>
                        <Button class="w-full py-2 px-4 z-50 shadow-md">
                            <a target="_blank" href={`${data.thumbnail}`}>
                                Download thumbnail
                            </a>
                        </Button>
                    </Card.Content>
                    <Card.Footer>
                        <AssetSheet />
                    </Card.Footer>
                </Card.Root>
            </div>
        {:else}
            <div
                class="flex flex-col min-w-full items-center justify-center px-8"
            >
                <div
                    class="flex w-full flex-col items-center gap-2 border p-4 rounded-xl lg:max-w-80 z-50 shadow-md"
                >
                    <Glass size={56} />
                    <span class="text-zinc-500 text-center">
                        Try searching something...
                    </span>
                </div>
            </div>
        {/if}
    </SignedIn>
</main>
