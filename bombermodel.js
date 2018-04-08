
//function to change the model selection in main screen and transfer value of bombermodel selected to bomber.js
function f1()
{
var obj1= document.getElementById("img");
var obj2= document.getElementById("s1");
obj1.src=obj2.value;
    
    
//transfer selected bombermodel to bomber.js
if(s1.value == 'res/images/bomberman2.png')
    {
    sessionStorage.setItem("bombermod", "2");
    }
    else if (s1.value == 'res/images/bomberman3.png')
        {
        sessionStorage.setItem("bombermod", "3");
        }
    else 
        {
        sessionStorage.setItem("bombermod", "1");
        }
}

