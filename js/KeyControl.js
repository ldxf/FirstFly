var keyCode={
	keyUp:38,
    keyDown:40,
    keyLeft:37,
    keyRight:39,
    keySpace:32,
    keyEsc:27
}

var keyStatus={
    keyUpStatus:false,
    keyUpStatus:false,
    keyDownStatus:false,
    keyLeftStatus:false,
    keyRightStatus:false,
    keySpaceStatus:false,
    keyEscStatus:false
}

function Event()
{	
		$(document).keydown(function(e){
		switch(e.which)
		{
			case keyCode.keyLeft:
				keyStatus.keyLeftStatus=true;
				break;
			case keyCode.keyRight:
				keyStatus.keyRightStatus=true;
				break;
			case keyCode.keySpace:
				keyStatus.keySpaceStatus=true;
				break;
				
		}
	}).keyup(function(e){
		switch(e.which)
		{
			case keyCode.keyLeft:
				keyStatus.keyLeftStatus=false;
				break;
			case keyCode.keyRight:
				keyStatus.keyRightStatus=false;
				break;
			case keyCode.keySpace:
				keyStatus.keySpaceStatus=false;
				break;	
		}
	});
}
