<script lang="ts">
    import { onMount } from 'svelte';
    import type { Workspace } from 'blockly';
    import * as HexputBlockly from '@hexput/blockly';
    import type { Snippet } from 'svelte';
    import { browser } from '$app/environment';

    let container = $state<HTMLDivElement>();
    let toolboxElm = $state<Element>();
    let ready = false;
    let blockly = (window as any).Blockly;

    let {
        toolBox,
        ref = $bindable(),
        afterinit = $bindable(),
        workspace = $bindable(),
        generate = $bindable(),
        class: className = 'blocklyWorkspace',
        width = '100%',
        height = '100%'
    }: {
        toolBox?: Snippet,
        ref?: HTMLDivElement,
        class?: string,
        workspace?: Workspace,
        generate?: () => string,

        afterinit?: () => void | Promise<void>,
        width?: string,
        height?: string
    } = $props();

    onMount(() => {
        let interval = setInterval(() => {
            if ((window as any).Blockly) {
                blockly = (window as any).Blockly;
                clearInterval(interval);
                ready = true;
                init();
                console.log('Blockly initialized');
            }
        }, 100);

        return () => {
            clearInterval(interval);
            if (workspace) {
                workspace.dispose();
            }
        };
    });
    
    function init() {
        let ws = HexputBlockly.initBlockly(blockly, container as any, toolboxElm);
        if (ws) {
            if ((afterinit as any)?.then) {
                (async () => {
                    await afterinit?.();
                    workspace = ws;
                    generate = generateFn;
                })();
            } else {
                workspace = ws;
                afterinit?.();
                generate = generateFn;
            }
        }
    }

    function generateFn() {
        const code = (blockly as any).Hexput.workspaceToCode(workspace);
        return code;
    }
</script>

<style>
  :global(.blocklyWorkspace) {
    height: 100%;
    width: 100%;
  }
</style>



{#if browser}
    <div bind:this={ref} class={className} style="height:{height}; width:{width};">
    <div bind:this={container} class="blocklyWorkspace">
      <xml bind:this={toolboxElm} id="toolbox" style="display: none">
          {#if toolBox}
              {@render toolBox()}
          {:else}
              <category name="Variables" colour="230">
                  <block type="variable_declaration"></block>
                  <block type="variable_reference"></block>
              </category>
              <category name="Values" colour="160">
                  <block type="number_literal"></block>
                  <block type="string_literal"></block>
                  <block type="boolean_literal"></block>
                  <block type="any_concat"></block>
                  <block type="math_subtract"></block>
                  <block type="math_multiply"></block>
                  <block type="math_divide"></block>
              </category>
              <category name="Collections" colour="290">
                  <block type="array_literal"></block>
                  <block type="array_item"></block>
                  <block type="object_literal"></block>
                  <block type="object_property"></block>
                  <block type="object_property_access"></block>
                  <block type="object_bracket_access"></block>
                  <block type="array_index_access"></block>
              </category>
              <category name="Control" colour="210">
                  <block type="if_statement"></block>
                  <block type="loop_statement"></block>
                  <block type="function_call"></block>
                  <block type="function_params"></block>
                  <block type="function_parameter"></block>
              </category>
              <category name="Logic" colour="210">
                  <block type="logic_and"></block>
                  <block type="logic_or"></block>
                  <block type="logic_not"></block>
                  <block type="comparison_eq"></block>
                  <block type="comparison_neq"></block>
                  <block type="comparison_gt"></block>
                  <block type="comparison_lt"></block>
                  <block type="comparison_gte"></block>
                  <block type="comparison_lte"></block>
              </category>
          {/if}
      </xml>
    </div>
  </div>
{/if}
