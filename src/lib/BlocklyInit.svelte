<script lang="ts">
    import { browser } from "$app/environment";
    import { generateHexputBlockly } from "@hexput/blockly";
    import { onMount } from "svelte";

    let blockly = browser ? (window as any).Blockly : null;
    let ready = false;

    onMount(() => {
        let interval = setInterval(() => {
            if (browser) {
                if ((window as any).Blockly) {
                    blockly = (window as any).Blockly;
                    clearInterval(interval);
                    ready = true;
                    if (!blockly.Hexput) blockly.Hexput = generateHexputBlockly(blockly);
                }
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<svelte:head>
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
</svelte:head>