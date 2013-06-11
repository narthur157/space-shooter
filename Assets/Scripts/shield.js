static var shieldStrength: int = 3;
var normalShieldStrength = 3;

function Start() {
	shieldStrength += sceneManager.shieldsPurchased;
	normalShieldStrength = shieldStrength;
}
function OnTriggerEnter( other : Collider )
{
	// this all stopped working for some reason..not sure why
//	print (other.gameObject.tag);
//	if (other.gameObject.tag == "astroid" || other.gameObject.tag == "astroidChild")
//	{
//		shieldStrength-=1;
//	}
	if (other.tag == "block")
	{
		shieldStrength = 0;
	}
}

function Update () {
	if (shieldStrength <= 0) {
		shieldStrength = 0;
		//shieldStrength = normalShieldStrength;
		var shieldParent = GameObject.Find("spaceship");
		var parentComponent = shieldParent.GetComponent("player");
		parentComponent.shieldOn=false;
		parentComponent.lastShieldDeathTime = Time.time;
//		gameObject.parent.GetComponent("player").shieldOn = false;
//		gameObject.parent.GetComponent("player").lastShieldDeathTime = Time.time;
		Destroy(gameObject);

	}
}