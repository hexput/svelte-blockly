<script lang="ts">
    import { generateHexputBlockly } from "@hexput/blockly";
    import { onMount } from "svelte";

    let blockly = (window as any).Blockly;
    let ready = false;

    onMount(() => {
        let interval = setInterval(() => {
            if ((window as any).Blockly) {
                blockly = (window as any).Blockly;
                clearInterval(interval);
                ready = true;
                blockly.Hexput = generateHexputBlockly(blockly);
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