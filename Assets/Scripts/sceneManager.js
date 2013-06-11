// Manage scenes

// Inspector Variables
//static var score:int = 0;
static var lives			:int   = 3;
static var lifeResetNumber	:int   = 3;
static var currentXP = 0;
static var doubleShotPurchased = false;
static var laserPurchased = false;
static var shieldsPurchased = 0;
var gameTime = 60;
var labelRight = 75;
var level = 1;
var nextLevelUp = 100;
var playerExp;
// Private Variables
//private var ExpUp = false;

function Start() {
	InvokeRepeating("CountDown", 1.0, 1.0);
	playerExp = PlayerPrefs.GetInt("totalExp");
	currentXP = playerExp;
	if (PlayerPrefs.HasKey("doublePurchased")) {
		doubleShotPurchased = true;
	}
	if (PlayerPrefs.HasKey("laserPurchased")) {
		laserPurchased = true;
	}
	shieldsPurchased = PlayerPrefs.GetInt("shieldsPurchased");
}
function Update() {
	if (lives <= 0) {
		GameOver();
	}
}


function OnGUI () {
	GUI.Label(Rect(10,10,100,20), "XP: " + currentXP.ToString());
	GUI.Label(Rect(10,25,100,20), "Lives: " + lives.ToString());
	if (shield.shieldStrength) {
		GUI.Label(Rect(10,40,100,20), "Shields: " + shield.shieldStrength.ToString());
	}
	GUI.Label(Rect(Screen.width-labelRight,10,100,20), "Time: " + gameTime.ToString());
	
}

function CountDown() {
	if (--gameTime == 0) {
		CancelInvoke("CountDown");
		GameOver();
	}
}
function GameOver () {
	
	if (lives <= 0) {
		Application.LoadLevel("Lose");
	}
	else {
		PlayerPrefs.SetInt("totalExp", currentXP);
		Application.LoadLevel("Win");
	}
}

function GetExp() {
    currentXP += 25;
}