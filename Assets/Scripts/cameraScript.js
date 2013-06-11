var player :Transform;
var cameraFollow = 3;
function Update () {
	var cameraPos = transform.position.x;
	var playerPos = player.position.x;
	transform.position.x = playerPos*cameraFollow*.1;
}