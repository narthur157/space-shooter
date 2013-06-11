var moveSpeed = 5;
var explosion : Transform;
var hurtSound : AudioSource;

function Start () {
	var floatDirection = Random.Range(0,360);
	var derp = Vector3(0,0,floatDirection);
	transform.eulerAngles = derp;
}
function Update () {
	transform.Translate(Vector3.up * Time.deltaTime, Space.Self);
}
function OnTriggerEnter (other : Collider ) {
	if (other.gameObject.tag == "player") {	
	//other.GetComponent("player").lives -= 1;
	
		sceneManager.lives -= 1;
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		if (hurtSound) {
			hurtSound.Play();
		}
		Destroy(gameObject);
	}
	if (other.gameObject.tag == "shield")
	{
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		Destroy(gameObject);
	}
}
