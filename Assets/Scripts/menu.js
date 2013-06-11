// Main Menu for loadup

// Inspector variables

var temp1;
var temp2;
var temp3;
var temp4;
var deleteClicked = false;
var waitTime:	float = 3.0;
var requireClicks:int = 2;
// Private Variables

function OnGUI() {
	// Make a group on the center of the screen
	// Subtract the box group sizez divided by 2 from width/height
	GUI.BeginGroup (Rect(Screen.width/2 - 70, Screen.height / 2 - 105, 140, 410)); 
	GUI.Box(Rect(0,0,140,410), "SPACE SHOOTER");
	if (GUI.Button(Rect(10,30,120,30), "Continue Game")) {
		Application.LoadLevel("Level " + PlayerPrefs.GetInt("level"));
	}
	if (GUI.Button(Rect(10,65,120,30), "Level 1")) {
		PlayerPrefs.SetInt("level", 1);
		Application.LoadLevel("ScreenLoad");
	}
	if (GUI.Button(Rect(10,100,120,30), "Homepage")) {
		Application.OpenURL("http://click.net46.net/wordpress/");
	}
	if (GUI.Button(Rect(10,135,120,30), "Credits")) {
		Application.LoadLevel("credits");
	}
	if (GUI.Button(Rect(10,170,120,30), "Exit")) {
		Application.Quit();
	}
	if (GUI.Button(Rect(10,300,120,30), "Reset Game")) {
		
		requireClicks -= 1;				// warns the user about what they're doing
		if (requireClicks == 1) {
			deleteClicked = true;
		}
		if (requireClicks <= 0) {
			PlayerPrefs.DeleteAll();
		}
	}
	if (deleteClicked == true) {
		GUI.Label(Rect(10,250, 220,40), "WILL RESET ALL XP AND UPGRADES");
	}
	GUI.EndGroup();
}