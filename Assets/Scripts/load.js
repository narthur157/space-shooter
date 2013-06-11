var instructions:String = "Arrow Keys to Move\n\nSpacebar to Shoot\n\nE to Activate Shield";
var instructionsTwo:String = "\n\nCollect blue XP orbs to buy upgrades\n\nBoxes are good for you, running into them\n can give you lives or temporary upgrades";
var waitTime:int = 3;

function Update() {
	if (Input.GetKeyDown("space")) {
		Application.LoadLevel("Level 1");
	}
//	else {
//		WaitTime();
//	}
}

function OnGUI() {
	// Make a group on the center of the screen
	// Subtract the box group sizez divided by 2 from width/height
	GUI.BeginGroup (Rect(Screen.width/2 - 100, Screen.height / 2 - 200, 300, 700)); 
	GUI.Box(Rect(0,0,200,200), "Instructions");
	GUI.Label(Rect(30,50,300,500), instructions + instructionsTwo);		
	GUI.Label(Rect(30,400,300,500), "Press Spacebar to continue");	
	GUI.EndGroup();
}

//function WaitTime () {
//	yield WaitForSeconds(waitTime);
//	Application.LoadLevel("Level 1");
//}