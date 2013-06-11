// Block Script

// Inspector Variable

var blockSpeed : float = 0.0;
var speedRandomness :float;
var sizeRandomness :float;
var screenBottom : int	 = -6;
var screenTop	 : int	 = 8;
var screenLeft	 : int	 = -8;
var screenRight	 : int	 = 8;
var explosion 	 : Transform;
var hurtSound	 : AudioSource;
var numHits		 : int = 10;
//Private Variables
private var numHitsReset = numHits;
function Start () {
	Respawn();

}
function Update () {
	transform.Translate(Vector3.down * blockSpeed * Time.deltaTime);
	if (transform.position.y <= screenBottom) {
		Respawn();
	}
	if (numHits <= 0) {
		Respawn();
		numHits = numHitsReset;
	}
}

function Respawn () {
	transform.position.x = Random.Range(screenLeft, screenRight);
	transform.position.y = screenTop;
	if (blockSpeed > 5.0) {	
		blockSpeed+=Random.Range(-speedRandomness,speedRandomness);
	}
	else {
		blockSpeed += Random.Range(0,speedRandomness);
	}
	var randomNum = Random.Range(-sizeRandomness, sizeRandomness); // for the random scale
	transform.localScale += Vector3(randomNum, 0, 0);
	
}

function OnTriggerEnter (other : Collider ) {
	if (other.gameObject.tag == "player") {	
	
		sceneManager.lives = 0;
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		if (hurtSound) {
			hurtSound.Play();
		}
		Respawn();
	}
	if (other.gameObject.tag == "shield")
	{
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		other.GetComponent("shield").shieldStrength = 0;
		Respawn();
	}
}
