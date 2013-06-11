var screenLeft          : int                    = -25;
var screenRight     : int                        =  25;
var screenTop       : int                =  30;
var screenBottom    : int                = -15;
var speedRandomness :float;
var sizeRandomness  :float;
var pickupSpeed     :float             =  0.0;
var spawntime       :float             =  1.5;
//var screenSizes		:Array = [screenLeft, screenRight, screenBottom, screenTop];
//function Start() {
// 	
// 	
//}
 
function Update () {
	transform.Translate(Vector3.down * pickupSpeed * Time.deltaTime, Space.World);
    if (transform.position.x > screenRight || transform.position.x < screenLeft || transform.position.y > screenTop || transform.position.y < screenBottom) {
    	Destroy(gameObject);
    }
}
function OnTriggerEnter(otherObject : Collider){
    if(otherObject.gameObject.tag == "player"){
	    var other : player;
	    other = otherObject.GetComponent("player");
	    other.doubleShot = true;
	    other.doubleShotTime = Time.time;
		Destroy(gameObject);
	}        

}