<script lang="ts">
  import { FirebaseApp } from "sveltefire";
  import { auth, firestore } from "./lib/firebase";
  import { Route, Router } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";
  import Asset from "$lib/components/custom/Asset.svelte";
</script>

<FirebaseApp {auth} {firestore}>
  <Router>
    <Route path="/" component={Home} />
    <Route path="*" component={Home} />
  </Router>
  <ModeWatcher />
  <Toaster />
</FirebaseApp>
