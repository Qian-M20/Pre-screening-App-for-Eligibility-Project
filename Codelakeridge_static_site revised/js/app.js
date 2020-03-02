/////// flowchart variables ///////
// variable to store Lung flowchart
let lung=[{
    "name":"Small Cell",
    "next":[{
        "name":"Limited",
        "next":null,
        'result': {
            "name":"Not Eligible", //eligible
            "type": "NE"
        }
    },
    {
        "name": "Extensive",
        "next":[{
            "name":"Maintenance",
            "next":null,
            "result":{
                "name":"(ABBVIE M16-298 / MERU RN: Marianna)", //eligible
                "type": "closed"
            }
        }]
    }]
},
{
    "name": "Non-Small Cell",
    "next":[{
        "name":"Resectable",
        "next":[{
            "name":"Adjuvant Therapy",
            'next':null,
            "result":{
                "name":"(CCTG0 BR.13 RN: Marianna)", //eligible
                "type": "open"
            }
        }]
    },
    {
        "name": "Unresectable",
        "next":[{
            "name":"First Line",
            "next":null,
            "result":{
                "name":"(ROCHE) BO2914 / BFAST) RN: Sam)", //eligible
                "type": "open"
            }
        },{
            "name":"Second Line",
            'next':null,
            "result":{
                "name":"BMS CA209-907", //eligible
                "type": "closed"
            }
        },{
            "name":"Third Line",
            "next":null,
            'result': {
                "name":"Not Eligible", //eligible
                "type": "NE"
            }
        }]
    }]
}];

//variable to store basket stydy
let basket={

};

$(document).foundation();


$(document).ready(function () {
//set up hamburger menu to reveal main menu
const MENU_SCREEN = document.querySelector('#hamburgerMenu');
const CLOSE_BUTTON = document.querySelector('#closeBtn');
const MENU_BUTTON1 = document.querySelector('#hamburger1');
const MENU_BUTTON2 = document.querySelector('#hamburger2');
const MENU_BUTTON3 = document.querySelector('#hamburger3');

// links variables
let about =  document.querySelector('#about');
let findTrials =  document.querySelector('#findTrials');
let contact =  document.querySelector('#contact');

//function open the hamburger menu screen
function openMenu(){
    TweenMax.to(".page",1,{
        opacity:0.4
    })
    TweenMax.fromTo(MENU_SCREEN,1,{
        display: "block",
        opacity:0,
        x:350
    },{
        x:0,
        opacity:1,
        ease:Sine.easeOut
    })
}
//on click menu button on landing screen
MENU_BUTTON1.addEventListener('click', function(){
    openMenu();
});
//on click menu button on options/main screen
MENU_BUTTON2.addEventListener('click', function(){
    openMenu();
});
//on click menu button on result screen
MENU_BUTTON3.addEventListener('click', function(){
    openMenu();
});
//function close the menu screen
CLOSE_BUTTON.addEventListener('click', function(){
    TweenMax.fromTo(MENU_SCREEN,1,{
        x:0,
        opacity:1,
    },{
        display: "none",
        opacity:0,
        x:350,
        ease:Sine.easeIn
    })
    TweenMax.to(".page",1,{
        opacity:1
    })
});
// menu links
//function back to to landing screen or options screen
function backToLanding(){
    TweenMax.fromTo('.page',0.5,{
        opacity:0.2
    },{
        opacity:1,
        ease: Sine.easeOut
    });
    TweenMax.to('#hamburgerMenu',1,{
        opacity:0,
        x:350,
        display:'none'
    });
    $('.landingPage').show();
}
function backToOptionsScreen(){
    TweenMax.fromTo('.page',0.5,{
        opacity:0.2
    },{
        opacity:1,
        ease: Sine.easeOut
    });
    TweenMax.to('#hamburgerMenu',1,{
        opacity:0,
        x:350,
        display:'none'
    });
    $('.landingPage').hide();
    $('.mainPage').show();
}
function backToContact(){
    TweenMax.fromTo('.page',0.5,{
        opacity:0.2
    },{
        opacity:1,
        ease: Sine.easeOut
    });
    TweenMax.to('#hamburgerMenu',1,{
        opacity:0,
        x:350,
        display:'none'
    });
    $('.landingPage, .mainPage').hide();
    $('.resultsPage').show();
}
//on click go back to landing screen
about.addEventListener('click',function(){
    backToLanding();
})
//on click go back to options/main screen
findTrials.addEventListener('click',function(){
    backToOptionsScreen();
})
//on click go back to result page where it has contact information
//*NOTE: I also think this screen could be made as a pop up screen where it only show the contact info, not include the result but we will leave it like this for now.
contact.addEventListener('click',function(){
    backToContact();
})

//hide all main sections
$('main').hide();
// splash screen appears
$('.splashPage').show();
// splash screen disappers after 1s
TweenMax.to(".splashPage",1,{
    delay:1,
    x: 1500,
    display: "none",
    ease: Power1.easeOut,
    onComplete:function()
    {	
        // landing page screen appears
        $('.landingPage').show();
        TweenMax.from(".landingPage",1,{
            delay:0,
            opacity: 0
        });
    }
});

//setup back arrow button to go to the previous page
$("#arrowDivLand").click(function(){
    $('.landingPage').show();
    $('.mainPage').hide();
    $('.resultsPage').hide();
});

//setup back arrow button to go to the previous page
$("#arrowDivResults").click(function(){
    $('.mainPage').show();
    $('.resultsPage').hide();
});

//function to show main page when start research is clicked
$(".button_startResearch").click(function (e) { 
    e.preventDefault();
    $('.landingPage').hide();
    $('.mainPage').show();
    TweenMax.to(".splashPage",1,{
        delay:1,
        x: 1500,
        display: "none",
        ease: Power1.easeOut,
        // onComplete:function()
		// {	
		// 	// landing page screen appears
        //     $('.landingPage').show();
        //     TweenMax.from(".landingPage",1,{
        //         delay:0,
        //         opacity: 0
        //     });
		// }
    });
    
});

$(".button_findEligibleStudy").css({opacity:0.2});

///////////////////////////
//// Test page STARTS  ////
///////////////////////////

    $(".page").hide();
    $(".mainPage").show();

    $(".radioOptions").hide();
    //Condition
    let Current;
    $(".condition").show();

    $('.conditions').click(function() {
        console.log("conditions clicked");
        content='';
        $(".lvl1").show();
        if ($(this).val() === '0') {
            Current=lung;
            lung.forEach((element,i) => {
                content+=`<label>
                <input class="lvl1s" type="radio" name="lvl1" value="${i}"/>
                <i>${element.name}</i>
            </label>`;
            });
        } else if ($(this).val() === '1') {
        } 
        $(".lvl1").html(content);
        lvl1();
    });

    //LEVEL 1
    function lvl1(){
    $('.lvl1s').click(function() {
        let currentCondition;
        console.log("lvl1s clicked");
        content='';
        $(".lvl2").show();
        if ($(this).val() === '0') {
            currentCondition= lung[0];
            currentCondition.next.forEach((element,i) => {
                content+=`<label>
                <input class="lvl2s" type="radio"  name="lvl2" value="${i}"/>
                <i>${element.name}</i>
            </label>`;
            });
        }
        else if ($(this).val() === '1') {
            currentCondition= lung[1];
            currentCondition.next.forEach((element,i) => {
                content+=`<label>
                <input type="radio"  name="lvl2" value="${i}"/>
                <i>${element.name}</i>
            </label>`;
            });
        }
        else if ($(this).val() === '2') {
            currentCondition= lung[2];
            currentCondition.next.forEach((element,i) => {
                content+=`<label>
                <input type="radio"  name="lvl2" value="${i}"/>
                <i>${element.name}</i>
            </label>`;
            });
        }
        else if ($(this).val() === '3') {
            currentCondition= lung[3];
            currentCondition.next.forEach((element,i) => {
                content+=`<label>
                <input type="radio"  name="lvl2" value="${i}"/>
                <i>${element.name}</i>
            </label>`;
            });
        }
        console.log(content);
        $(".lvl2").html(content);
        lvl2(currentCondition);
    });

    //LEVEL 2
    function lvl2(currentCondition){
        console.log(currentCondition)
        $('.lvl2s').click(function() {
            content='';
            $(".lvl3").show();
            if ($(this).val() === '0') {
                 currentCondition= currentCondition.next[0].next
                currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input class="lvl2s" type="radio"  name="lvl3" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            else if ($(this).val() === '1') {
                currentCondition= currentCondition.next[1].next
               currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input type="radio"  name="lvl3" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            else if ($(this).val() === '2') {
                currentCondition= currentCondition.next[2].next
               currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input type="radio"  name="lvl3" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            else if ($(this).val() === '3') {
                currentCondition= currentCondition.next[3].next
               currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input type="radio"  name="lvl3" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            console.log(content);
            $(".lvl3").html(content);
            lvl3(currentCondition);
        });
    }

    //LEVEL 3
    function lvl3(currentCondition){
        console.log(currentCondition)
        $('.lvl3s').click(function() {
            content='';
            $(".lvl4").show();
            if ($(this).val() === '0') {
                 currentCondition= currentCondition.next[0].next
                currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input class="lvl2s" type="radio"  name="lvl4" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            else if ($(this).val() === '1') {
                currentCondition= currentCondition.next[1].next
               currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input type="radio"  name="lvl4" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            else if ($(this).val() === '2') {
                currentCondition= currentCondition.next[2].next
               currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input type="radio"  name="lvl4" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            else if ($(this).val() === '3') {
                currentCondition= currentCondition.next[3].next
               currentCondition.forEach((element,i) => {
                    content+=`<label>
                    <input type="radio"  name="lvl4" value="${i}"/>
                    <i>${element.name}</i>
                </label>`;
                });
            }
            console.log(content);
            //$(".lvl4").html(content);
        });
            
    }
}
//== Test page ENDS  ==//
});
