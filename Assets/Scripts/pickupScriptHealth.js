var screenLeft          : int                    = -25;
var screenRight     : int                        =  25;
var screenTop       : int                =  30;
var screenBottom    : int                = -15;
var speedRandomness :float;
var sizeRandomness  :float;
var pickupSpeed     :float             =  0.0;
var spawntime       :float             =  1.5;
function Start() {
 	Respawn();
}
 
function Update () {
	if (spawntime < Time.time) {
		transform.Translate(Vector3.down * pickupSpeed * Time.deltaTime);
	}
    if (transform.position.x > screenRight || transform.position.x < screenLeft || transform.position.y > screenTop || transform.position.y < screenBottom) {
    	Destroy(gameObject);
    }
}
function OnTriggerEnter(otherObject : Collider){
    if(otherObject.gameObject.tag == "player"){
       Destroy(gameObject);
       sceneManager.lives += 1;
       Respawn();
}        

}
 
function Respawn () {

	transform.position.x = Random.Range(screenLeft, screenRight);
	transform.position.y = screenTop;
	if (pickupSpeed > 5.0) {       
		pickupSpeed+=Random.Range(-speedRandomness,speedRandomness);
    }
    else {
    	pickupSpeed += Random.Range(0,speedRandomness);
    }
    var randomNum = Random.Range(sizeRandomness,sizeRandomness); // for the random scale
    transform.localScale += Vector3(randomNum, randomNum, 0);
}
