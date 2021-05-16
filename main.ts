namespace SpriteKind {
    export const CollisionSprite = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Top)) {
        if (collisionLeft.tileKindAt(TileDirection.Top, assets.tile`tile1`)) {
            tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(collisionLeft), CollisionDirection.Top), assets.tile`tile3`)
            tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(collisionLeft), CollisionDirection.Top), false)
        }
        if (collisionRight.tileKindAt(TileDirection.Top, assets.tile`tile1`)) {
            tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(collisionRight), CollisionDirection.Top), assets.tile`tile3`)
            tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(collisionRight), CollisionDirection.Top), false)
        }
    } else if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        if (collisionRight.tileKindAt(TileDirection.Bottom, assets.tile`tile6`) || collisionLeft.tileKindAt(TileDirection.Bottom, assets.tile`tile6`)) {
            isSlow = true
            controller.moveSprite(thePlayer, 50, 0)
        } else {
            controller.moveSprite(thePlayer, 150, 0)
            isSlow = false
        }
    }
})
function doAJump (sprite: Sprite, height: number) {
    sprite.vy = 0 - Math.sqrt(2 * height * sprite.ay)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    if (blockSettings.exists("bestTime")) {
        blockSettings.writeNumber("bestTime", Math.min(elapsedTime, blockSettings.readNumber("bestTime")))
    } else {
        blockSettings.writeNumber("bestTime", elapsedTime)
    }
    game.splash("TIME:" + formatTime(elapsedTime), "BEST:" + formatTime(blockSettings.readNumber("bestTime")))
    game.over(true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
        if (isSlow) {
            doAJump(thePlayer, 16)
        } else {
            doAJump(thePlayer, 24)
        }
    }
})
function updateTimer () {
    elapsedTime = game.runtime() - levelStartTime
    textSprite.setText(formatTime(elapsedTime))
    textSprite.setPosition(80, 10)
}
function formatTime (time: number) {
    milliChunk = "" + Math.idiv(time % 1000, 10)
    while (milliChunk.length < 2) {
        milliChunk = "0" + milliChunk
    }
    return "" + Math.idiv(time, 1000) + "." + milliChunk
}
function startLevel () {
    tiles.placeOnRandomTile(thePlayer, assets.tile`tile5`)
    levelStartTime = game.runtime()
}
let milliChunk = ""
let levelStartTime = 0
let elapsedTime = 0
let isSlow = false
let textSprite: TextSprite = null
let collisionRight: Sprite = null
let collisionLeft: Sprite = null
let thePlayer: Sprite = null
music.magicWand.play()
game.showLongText("Welcome to the second puzzle. In this puzzle, you are younger and are an intern to a game development studio. Rush to your office by going through the sewers!", DialogLayout.Bottom)
thePlayer = sprites.create(img`
    . . e e e e e . 
    . e e e e e . . 
    . e d f d f . . 
    . d d d d d . . 
    . f f 1 2 f f . 
    . f f 1 1 f f . 
    d d f f f f d d 
    . . f . . f . . 
    `, SpriteKind.Player)
custom.setTilemap(tilemap`level1`)
let gravity = 700
thePlayer.ay = gravity
controller.moveSprite(thePlayer, 150, 0)
collisionLeft = sprites.create(img`
    2 
    `, SpriteKind.CollisionSprite)
collisionLeft.setFlag(SpriteFlag.Invisible, true)
collisionRight = sprites.create(img`
    2 
    `, SpriteKind.CollisionSprite)
collisionRight.setFlag(SpriteFlag.Invisible, true)
scene.cameraFollowSprite(thePlayer)
textSprite = textsprite.create("8:00", 1, 15)
textSprite.setMaxFontHeight(8)
textSprite.setBorder(1, 1)
textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
textSprite.setFlag(SpriteFlag.Ghost, true)
game.onUpdate(function () {
    collisionLeft.left = thePlayer.left
    collisionLeft.top = thePlayer.top
    collisionRight.right = thePlayer.right
    collisionRight.top = thePlayer.top
    updateTimer()
})
forever(function () {
    music.playMelody("E A B A F B A B ", 120)
})
