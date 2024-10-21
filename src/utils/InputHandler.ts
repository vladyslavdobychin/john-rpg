import Player from "../classes/Player";
import Game from "../classes/Game";

export default function handleInput(player: Player, game: Game) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            player.dx = player.speed;
            player.facingDirection = 'right';
        }

        if (event.key === 'ArrowLeft') {
            player.dx = -player.speed;
            player.facingDirection = 'left';
        }

        if (event.key === 'Shift' && !game.getIsDashing()) {
            game.setIsDashing(true);
            player.dashTargetX = player.x + (player.facingDirection === 'right' ? game.getDashDistance() : -game.getDashDistance());
        }

        if (event.key === ' ') {
            if (!game.getIsJumping()) {
                player.dy = -10;
                game.setIsJumping(true);
                game.setIsGrounded(false);
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            player.dx = 0;
        }
    });
}
