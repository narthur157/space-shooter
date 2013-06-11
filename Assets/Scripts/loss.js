//var endExp;
//function Start () {
//	endExp = sceneManager.currentExp.ToString();
//}
function OnGUI() {
	
	GUI.BeginGroup (Rect(Screen.width/2 - 100, Screen.height / 2 - 50, 200, 100)); 
	GUI.Box(Rect(0,0,200,100), "YOU DIED");	

	if (GUI.Button(Rect(10, 60,80,30), "Restart")) {
		sceneManager.lives = sceneManager.lifeResetNumber;
		Application.LoadLevel("Level " + PlayerPrefs.GetInt("level").ToString());
	}
	if (GUI.Button(Rect(110, 60,80,30), "Main Menu")) {
		sceneManager.lives = sceneManager.lifeResetNumber;
		Application.LoadLevel("MainMenu");
	}
	GUI.EndGroup();
}