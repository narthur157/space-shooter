// Instantiated from astroid
var screenLeft          : int                    = -25;
var screenRight     : int                        =  25;
var screenTop       : int                =  30;
var screenBottom    : int                = -15;
var speedRandomness :float;
//var speedRandomness :float;
//var sizeRandomness  :float;
var pickupSpeed     :float             =  0.0;
function Start() {
	// we're going to be spawning from the astroids, not randomly
 	//Respawn();
}
 
function Update () {
	transform.Translate(Vector3.down * pickupSpeed * Time.deltaTime, Space.World);
    if (transform.position.x > screenRight || transform.position.x < screenLeft || transform.position.y > screenTop || transform.position.y < screenBottom) {
   		Destroy(gameObject);
    }
}
function OnTriggerEnter(otherObject : Collider){
     if (otherObject.gameObject.tag == "player"){
	     var other : player = otherObject.GetComponent("player");
	     other.laserOn = true;
	     other.laserOnTime = Time.time;
		 Destroy(gameObject);
	}        

}