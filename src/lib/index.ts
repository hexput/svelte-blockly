// Reexport your entry components here
import BlocklyComponent from './Blockly.svelte';
import BlocklyInit from './BlocklyInit.svelte';
import { initBlockly, addCustomLiteral as addCustomLiteralDefault, generateHexputBlockly } from '@hexput/blockly';

function addCustomLiteral(type: string, literalLabel: string, literalValue: string): void {
    let blockly = (window as any).Blockly;
    if (blockly) {
        if (!blockly.Hexput) {
            blockly.Hexput = generateHexputBlockly(blockly);
        }
        addCustomLiteralDefault(blockly, blockly.Hexput, type, literalLabel, literalValue);
    } else {
        let interval = setInterval(() => {
            if (blockly) {
                clearInterval(interval);
                if (!blockly.Hexput) {
                    blockly.Hexput = generateHexputBlockly(blockly);
                }
                addCustomLiteralDefault(blockly, blockly.Hexput, type, literalLabel, literalValue);
            }
        }, 100);
    }
}

export {
  BlocklyComponent,
  BlocklyInit,
  initBlockly,
  addCustomLiteral,
  generateHexputBlockly
};
