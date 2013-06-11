var moveSpeed 		:int;
var travelDistance	:int = 10;
var explosion		:Transform;
var initialPos;

function Start() {
	initialPos = transform.position.y;
}
function Update () {
	transform.position += Vector3(0,moveSpeed,0) * Time.deltaTime;
	if (transform.position.y - initialPos >= travelDistance)
	{
		Destroy(gameObject);
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "astroidChild" || other.gameObject.tag == "astroid")
	{
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		else { print ("Load explosion into bullet script"); }
		
		if (other.gameObject.tag == "astroid") {
			var otherScript = other.transform.GetComponent("astroid");
			otherScript.Split();		// randomly relocates other
		}
		
		if (other.gameObject.tag == "astroidChild") {
			Destroy(other.gameObject);
		}
		Destroy(gameObject);  		// this has to be at the end
	}
	if (other.gameObject.tag == "block") {
		if (explosion) {
			Instantiate(explosion, transform.position, transform.rotation);
		}
		else { print ("Load explosion into bullet script"); }	
		other.gameObject.GetComponent("block").numHits -= 1;
		Destroy(gameObject);
	}
}