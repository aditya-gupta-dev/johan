<script lang="ts">
    import DarkMode from "./DarkMode.svelte";
    import UserButton from "./UserButton.svelte";
</script>

<nav
    class="flex flex-row justify-between items-center p-4 sticky top-0 left-0 w-full gap-4 bg-white shadow-md z-50 dark:bg-zinc-900"
>
    <h1 class="text-3xl font-extrabold">Johan</h1>

    <div class="flex flex-row gap-4 items-center">
        <DarkMode />
        <UserButton />
    </div>
</nav>
