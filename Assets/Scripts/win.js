//var endScore;
var endExp;
var nextLevel;
var levelName;
var levelCounter:int = 2;
var doubleShotCost:int = 500;
var shieldCost	:int = 300;
var laserCost:int = 1000;
var dblText;
var laserText;
var	shieldText = "Purchase";
function Start () {
	if (PlayerPrefs.HasKey("level")) {
		if (PlayerPrefs.GetInt("level") < 5) {	
			levelCounter = PlayerPrefs.GetInt("level") + 1;
		}
		else {
			levelCounter = 5;
		}
	}
	PlayerPrefs.SetInt("level", levelCounter);
	levelName = "Level " + levelCounter.ToString();
	endExp = PlayerPrefs.GetInt("totalExp");
	if (PlayerPrefs.HasKey("shieldsPurchased")) {		// discover number of shields purchased
		sceneManager.shieldsPurchased = PlayerPrefs.GetInt("shieldsPurchased");
	shieldCost += sceneManager.shieldsPurchased * 100;
	}
}
function OnGUI() {
	
	GUI.BeginGroup (Rect(Screen.width/2 - 100, Screen.height / 2 -200, 200, 100)); 
	GUI.Box(Rect(0,0,200,100), "Success");
	GUI.Label(Rect(50,30,100,20), "XP Gained: " + endExp.ToString());
	

	if (GUI.Button(Rect(10, 60,80,30), levelName)) {
		sceneManager.lives = sceneManager.lifeResetNumber;
		Application.LoadLevel(levelName);
	}
	if (GUI.Button(Rect(110, 60,80,30), "Main Menu")) {
		sceneManager.lives = sceneManager.lifeResetNumber;
		Application.LoadLevel("MainMenu");
	}
	GUI.EndGroup();
	
	// DOUBLE SHOT UPGRADE
	GUI.BeginGroup (Rect(Screen.width/2 - 300, Screen.height / 2 + 100, 200, 200));
	
	if (sceneManager.doubleShotPurchased == false) {	
		dblText = "Purchase";
	}
	else {
		dblText = "PURCHASED";
	}
	GUI.Label(Rect(0,0,200,40), "Double shot upgrade\n	   Cost: " + doubleShotCost.ToString());
	if (GUI.Button(Rect(0, 40, 120, 30), dblText)) {
		if (sceneManager.doubleShotPurchased == false) {
			if (endExp >= doubleShotCost) {
				endExp -= doubleShotCost;
				sceneManager.doubleShotPurchased = true;
				PlayerPrefs.SetInt("totalExp", endExp);
				PlayerPrefs.SetString("doublePurchased", "true");
			}
		}
		else {
			//GUI.Label(Rect(
		}
	}
	GUI.EndGroup();
	
	// LASER SHOT UPGRADE
	GUI.BeginGroup (Rect(Screen.width/2 - 60, Screen.height / 2 + 100, 200, 200));
	
	if (sceneManager.laserPurchased == false) {	
		laserText = "Purchase";
	}
	else {
		laserText = "PURCHASED";
	}
	GUI.Label(Rect(0,0,200,40), "	Laser upgrade\n	   Cost: " + laserCost.ToString());
	if (GUI.Button(Rect(0, 40, 120, 30), laserText)) {
		if (sceneManager.laserPurchased == false) {
			if (endExp >= laserCost) {
				endExp -= laserCost;
				sceneManager.laserPurchased = true;
				PlayerPrefs.SetInt("totalExp", endExp);
				PlayerPrefs.SetString("laserPurchased", "true");
			}
		}
	}
	GUI.EndGroup();
	
	// SHIELD STRENGTH UPGRADE
	GUI.BeginGroup (Rect(Screen.width/2 + 180, Screen.height / 2 + 100, 200, 200));
	
	GUI.Label(Rect(0,0,200,40), "	Shield Strength\n	   Cost: " + shieldCost.ToString());
	if (GUI.Button(Rect(0, 40, 120, 30), shieldText)) {
		if (endExp >= shieldCost) {
			endExp -= shieldCost;

			sceneManager.shieldsPurchased += 1;
		
			PlayerPrefs.SetInt("totalExp", endExp);
			PlayerPrefs.SetInt("shieldsPurchased", sceneManager.shieldsPurchased);

		}


	}
	GUI.EndGroup();
}