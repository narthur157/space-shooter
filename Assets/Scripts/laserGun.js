var explosion		:Transform;
var hitsOnBlock		:int;
var laserDuration	:float = 0.1;

function Start() {
	LaserTime(); // laser shouldn't last forever
				 // make the laser fade in slowly, then out quickly
	for (i=0.8; i<=1; i+=0.1) {
		transform.renderer.material.color.a = i; // changes the transparency
		yield WaitForSeconds(laserDuration*.07);
	}
	for (i=1; i>=.5; i-=0.05) {
		transform.renderer.material.color.a = i;
		yield WaitForSeconds(laserDuration*.07);
	}
	Destroy(gameObject);
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.tag == "astroidChild" || other.gameObject.tag == "astroid")
	{
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		
		if (other.gameObject.tag == "astroid") {
			var otherScript = other.transform.GetComponent("astroid");
			otherScript.Split();		// break up the astroid
		}
		
		if (other.gameObject.tag == "astroidChild") {
			Destroy(other.gameObject);
		}
			// this has to be at the end
	}
	if (other.gameObject.tag == "block") {
		if (explosion) {
			Instantiate(explosion, other.transform.position, other.transform.rotation);
		}
		else { print ("Load explosion into bullet script"); }	
		other.gameObject.GetComponent("block").numHits -= hitsOnBlock;
	}
}
function LaserTime () {
	// cleans up the laser
	yield WaitForSeconds(laserDuration);
	Destroy(gameObject);
}