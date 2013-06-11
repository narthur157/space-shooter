
private var instructions:String = "Designer - Nick Arthur\n\nArtist - Nick Arthur\n\nProgrammer - Nick Arthur\n\nLevel Designer - Nick Arthur";

function OnGUI() {
	
	GUI.BeginGroup (Rect(Screen.width/2 - 100, Screen.height / 2 - 100, 200, 200)); 
	GUI.Box(Rect(0,0,200,200), "Credits");
	GUI.Label(Rect(10,40,200,200), instructions);	
	
	if (GUI.Button(Rect(60, 165,80,30), "Back")) {
		Application.LoadLevel("ScreenLoad");
	}
	GUI.EndGroup();
}