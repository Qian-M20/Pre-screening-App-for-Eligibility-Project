$(document).foundation();

//set up hamburger menu to reveal main menu
$(".hamburger").click(function(){
    if ($(this).attr("data-click-state")=="1")
    {
        $(this).attr("data-click-state", 0);
        
        $(this).attr("src","images/hamburger2close.gif");
        
        TweenMax.to(".pageBody", 1, { 
            opacity:0.2,
            ease: Power2.easeOut
        });
        TweenMax.to("#menu", 1, { 
            display:"flex",
            opacity:1,
            x:"0%",
            ease: Sine.easeInOut
        });
    }
    else{
        $(this).attr("data-click-state", 1);
        
        $(this).attr("src","images/close2hamburger.gif");

        TweenMax.to(".pageBody", 1, { 
            opacity:1,
            ease: Power2.easeIn
        });
        TweenMax.to("#menu", 1, { 
            display:"none",
            opacity:0,
            x:"100%",
            ease: Sine.easeInOut
        });
    }
});
