<script lang="ts">
    import Blockly from "$lib/Blockly.svelte";
    import { browser } from "$app/environment";
    import BlocklyInit from "$lib/BlocklyInit.svelte";

    let generate: (() => string) | null = null as any;

    setInterval(() => {
        if (generate) {
            const code = generate();
            console.log(code);
        }
    }, 1000);
</script>

<BlocklyInit />
{#if browser}
    <div class="mainArea">
        <div class="block" style="height: 600px !important;">
            <Blockly bind:generate={generate as any} height="600px" />
        </div>
        <button class="" onclick={() => {
            if (generate) {
                const code = generate();
                console.log(code);
            }
        }}>
            Generate Code    
        </button>
    </div>
{/if}

<style>
    
    :global(body) {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
    }
    .block {
        display: flex;
        background-color: #f0f0f0;
        height: 200px !important;
        overflow: hidden;
        width: 100%;
    }
    .mainArea {
        display: flex;
        background-color: #f0f0f0;
        height: 60%;
        width: 100%;
        flex-direction: column;
    }
    .header {
        padding: 10px 20px;
        background-color: #4a6da7;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header h1 {
        margin: 0;
        font-size: 1.5em;
    }
    .container {
        display: flex;
        flex: 1;
        overflow: hidden;
    }
    #blocklyDiv {
        flex: 2;
        height: 100%;
    }
    .output-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #f5f5f5;
        border-left: 1px solid #ddd;
        overflow: hidden;
        min-width: 300px;
    }
    #output {
        flex: 1;
        margin: 0;
        padding: 10px;
        background-color: #2d2d2d;
        color: #f8f8f2;
        font-family: 'Courier New', Courier, monospace;
        overflow: auto;
        white-space: pre;
    }
    .toolbar {
        padding: 10px;
        background-color: #eee;
        display: flex;
        justify-content: space-between;
    }
    button {
        width: min-content;
        padding: 8px 16px;
        background-color: #4a6da7;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 4px;
    }
    button:hover {
        background-color: #3b5998;
    }
</style>