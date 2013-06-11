// Astroid Script

// Inspector Variable

var astroidSpeed : float = 10.0;
var childAdjustment:float = .3;
var speedRandomness :float = 3;
var sizeRandomness :float = .02;
var screenBottom : int	 = -15;
var screenTop	 : int	 = 30;
var screenLeft	 : int	 = -25;
var screenRight	 : int	 = 25;
var waitTime	 : int	 = 3;
var explosion 	 : Transform;
var laserPickup	 : Transform;
var EXP 		 : Transform;
var doubleShotPickup : Transform;
var hurtSound	 : AudioSource;
var childSpawnChance	 : float = 30;
var pickupSpawnChance	 : float = 20;
var astroidChild : Transform;
//Private Variables
var pickupType;
function Start () {
	Respawn();
	WaitTime();

}
function Update () {
	transform.Translate(Vector3.down * astroidSpeed * Time.deltaTime, Space.World);
	if (transform.position.y <= screenBottom) {
		Respawn();
	}
	var randomRotation = Vector3(Random.Range(0,30), Random.Range(0,30),Random.Range(0,30));
	transform.Rotate(randomRotation * Time.deltaTime, Space.Self);
}

function Respawn () {
	transform.position.x = Random.Range(screenLeft, screenRight);
	transform.position.y = screenTop;
	if (astroidSpeed > 5.0) {	
		astroidSpeed+=Random.Range(-speedRandomness,speedRandomness);
	}
	else {
		astroidSpeed += Random.Range(0,speedRandomness);
	}
	var randomNum = Random.Range(-transform.localScale.x*sizeRandomness,transform.localScale.x*sizeRandomness); // for the random scale
	var randomNumTwo = Random.Range(-transform.localScale.y*sizeRandomness,transform.localScale.y*sizeRandomness);
	var randomNumThree = Random.Range(-transform.localScale.z*sizeRandomness,transform.localScale.z*sizeRandomness);
	transform.localScale += Vector3(randomNum, randomNumTwo, randomNumThree);
	
}
function Split () {
	Instantiate(EXP, transform.position, transform.rotation);
	var numChild = Random.Range(2,7);
	var randomNum = Random.Range(0,100);
	if (randomNum <= childSpawnChance == true) {
		for (i=1; i<=numChild; i++) {
			var parentScale = transform.localScale;
			var child = Instantiate(astroidChild, transform.position, transform.rotation);
			var temp = parentScale / numChild;
			var setVector = Vector3(temp[0]+childAdjustment, temp[1]+childAdjustment, temp[2]+childAdjustment);
			child.localScale = setVector;
		}
	}
	randomNum = Random.Range(0,100);
	if (randomNum <= pickupSpawnChance == true) {
		if (randomNum % 2 == 1) {
			pickupType = laserPickup;
		}
		else {
			pickupType = doubleShotPickup;
		}
		Instantiate(pickupType, transform.position, transform.rotation);
	}
	Respawn();
}
function OnTriggerEnter (other : Collider ) {
	if (other.gameObject.tag == "player") {	
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		if (hurtSound) {
			hurtSound.Play();
		}
		Respawn();
		sceneManager.lives -= 1;
	}
	if (other.gameObject.tag == "shield")
	{
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		other.GetComponent("shield").shieldStrength -= 1;
		Respawn();
	}
}
function WaitTime () {
	yield WaitForSeconds(waitTime);
	transform.Translate(Vector3.down * astroidSpeed * Time.deltaTime);
}