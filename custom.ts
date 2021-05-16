namespace custom {
    //% blockId=tilemap_editor_eight block="set tilemap (8) to $tilemap"
    //% weight=200 blockGap=8
    //% tilemap.fieldEditor="tilemap"
    //% tilemap.fieldOptions.decompileArgumentAsString="true"
    //% tilemap.fieldOptions.filter="tile"
    //% tilemap.fieldOptions.tileWidth=8
    //% tilemap.fieldOptions.taggedTemplate="tilemap"
    //% blockNamespace="scene" group="Tiles" duplicateShadowOnDrag
    //% help=tiles/set-tile-map
    export function setTilemap(tilemap: tiles.TileMapData) {
        scene.setTileMapLevel(tilemap);
    }
}