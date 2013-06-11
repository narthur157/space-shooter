function OnTriggerEnter (other : Collider)
{
    if(other.gameObject.tag == "player"){
    	GameObject.Find("sceneManager").GetComponent("sceneManager").GetExp ();
     	Destroy(gameObject);
    }
}
     