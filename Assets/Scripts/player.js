// Player Script

// Inspector Variables

var fireRate				:float = .15;
var laserFireRate			:float = 1;
var playerSpeedVertical		:float = 10.0;  												// speeds
var playerSpeedHorizontal	:float = 10.0;
var wideBoundry				:int   = 25;			// boundries
var heightBoundry			:int   = 17;
var laserPickupDuration		:int   = 15;
var doubleShotDuration		:int   = 30;			
var laserSpawnAdjustment	:int   = 39;	// increases the y spawn position of the laser
var bullet					:Transform;
var bulletSpawn				:Transform;		// where the bullet spawns
var shieldMesh				:Transform;		// object for the shield
var doubleShotProjectile	:Transform; 	// object used for double shot
var doubleShotSocket		:Transform;		// location for second double shot bullet
var laser					:Transform;
var shieldKeyInput			:KeyCode;		// button to press for shield
var shieldUseRate			:int   = 10;  // how often we can activate shield
var doubleShot = false;
var laserOn = false;
var laserOnTime;
var doubleShotTime;
var shieldOn = false;
var lastShieldDeathTime:float = 0; // hack so that we can use shield right away
var curShieldWaitTime:int = 0;			   // to display time for shield to be availible

private var timeFired:float;
private var laserSpawnRotation = Quaternion.identity;
private var currentFireRate :int;
function Start() {
	currentFireRate=fireRate;
	if (sceneManager.laserPurchased == true) {
		laserOn = true;
	}
	if (sceneManager.doubleShotPurchased == true) {
		doubleShot = true;
	}
	//InvokeRepeating("CountDown", 1.0, 1.0);
}

function Update () {
	if (lastShieldDeathTime > 0) {
		curShieldWaitTime = shieldUseRate - (Time.time - lastShieldDeathTime);
	}
	Movement(); // Keep our update function clean for more stuff
	Shoot();
	Shield();
	PickupManager();
	transform.position.z = 0;
}
function PickupManager() {
	if (sceneManager.laserPurchased == false) {
		if (laserOn == true) {
			if (Time.time - laserOnTime >= laserPickupDuration) {
				currentFireRate = fireRate;
				laserOn = false;
			}
		}
	}
	if (sceneManager.doubleShotPurchased == false) {
		if (doubleShot == true) {
			if (Time.time - doubleShotTime >= doubleShotDuration) {
				doubleShot = false;
			}
		}
	}
}
function Movement () {
	
	
	var transV : float = Input.GetAxis("Vertical") * -playerSpeedVertical * Time.deltaTime;	// 0 if there's no input
	var transH : float = Input.GetAxis("Horizontal") * playerSpeedHorizontal * Time.deltaTime;
	transform.Translate(transH, transV, 0);													// moves based on values returned by axis
	
	// Create boundries
	// Clamp locks the value (the position) between the min and max parameters
	transform.position.x = Mathf.Clamp(transform.position.x, -wideBoundry, wideBoundry);
	transform.position.y = Mathf.Clamp(transform.position.y, -heightBoundry, heightBoundry);


}

function Shoot () {
	if (Input.GetKeyDown("space")) {

		if (laserOn == true) {
			currentFireRate = laserFireRate;
		}
		if (Time.time - timeFired >= currentFireRate)
		{
			if (laserOn == true) {
				var spawnPos = Vector3(bulletSpawn.position.x, bulletSpawn.position.y+laserSpawnAdjustment, bulletSpawn.position.z);
				var laserClone = Instantiate(laser, spawnPos, Quaternion.identity);
				laserClone.transform.parent = gameObject.transform;
			}
			else if (doubleShot == true) {
				// code to instantiate double shot
				Instantiate(doubleShotProjectile, doubleShotSocket.position, doubleShotSocket.rotation);
				Instantiate(bullet, bulletSpawn.position, bulletSpawn.rotation);
			}
			else {
				Instantiate(bullet, bulletSpawn.position, bulletSpawn.rotation);
				
			}
			timeFired = Time.time;
		}
	}

	
}
function Shield () {
	if (Input.GetKeyDown(shieldKeyInput)) {
		if (shieldOn == true) {
			lastShieldDeathTime = Time.time;
			Destroy(GameObject.Find("shield(Clone)"));
			shieldOn = false;
			print ("kill shield(clone)");
		}
		if (Time.time - lastShieldDeathTime > shieldUseRate || Time.time < shieldUseRate) {	
			if (!shieldOn) {
				var shieldPos = Vector3(transform.position.x, transform.position.y - .5, 0);
				var clone = Instantiate(shieldMesh, shieldPos, transform.rotation);
				clone.transform.parent = gameObject.transform;
				shield.shieldStrength = clone.GetComponent("shield").normalShieldStrength;
				shieldOn = true;
			}
		}
	}
}

function OnGUI () {		// this rightly belongs in scene manager but it's easier here
	//print ("Current wait " + curShieldWaitTime);
	//print ("Time" + Time.time);
	print ("lastdeath" + lastShieldDeathTime);
	//print ("shield rate" + shieldUseRate);
	if (curShieldWaitTime > 0) {
		GUI.Label(Rect(10,55, 150, 20), "Shields Availible in: " + curShieldWaitTime);
	}
	else {
		GUI.Label(Rect(10,55, 150, 20), "Shields Ready");
	}
	
}
//function CountDown() {
//	if (--curShieldWaitTime == 0) {
//		CancelInvoke("CountDown");
//	}
//}