
/////// flowchart variables ///////
// variable to store Lung flowchart
    let lung=[{
        "name":"Small Cell",
        "next":[{
            "name":"Limited",
            "next":null,
            'result': "NE" // not eligible
        },
        {
            "name": "Extencive",
            "next":[{
                "name":"Maintenance",
                "next":null,
                "result":[{
                    "name":"(ABBVIE M16-298 / MERU RN: Marianna)" //eligible
                }]
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
                "result":[{
                    "name":"(CCTG0 BR.13 RN: Marianna)" //eligible
                }]
            }]
        },
        {
            "name": "Unresectable",
            "next":[{
                "name":"First Line",
                "next":null,
                "result":[{
                    "name":"(ROCHE) BO2914 / BFAST) RN: Sam)" //eligible
                }]
            },{
                "name":"Second Line",
                'next':null,
                "result":[{
                    "name":"BMS CA209-907" //eligible
                }]
            },{
                "name":"Third Line",
                "next":null,
                'result': "NE" // not eligible
            }]
        }]
    }];

//variable to store basket stydy
let basket={

};

$(document).foundation();

$(document).ready(function () {

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
    });

    // landing page screen appears
    $('.landingPage').show();
    TweenMax.from(".landingPage",1,{
        delay:0,
        opacity: 0
    });

    $(".button_startResearch").click(function (e) { 
        e.preventDefault();
        $('.landingPage').hide();
        $('.mainPage').show();
        TweenMax.to(".splashPage",1,{
            delay:1,
            x: 1500,
            display: "none",
            ease: Power1.easeOut,
        });
        
    });



    //STUDY selection
    let selectedStudyValue;// to store the value of selected study from the study options
    let selectedStudy;// to store variable correspoinding type of study selected

    //on STUDY dropdown change 
    $(".studyClass").change(function (e) { 
        e.preventDefault();

        selectedStudyValue= $(".studyClass").val();//getting the value of selected option and assign to selectedStudyValue
                                                        console.log(selectedStudyValue);
        var $el = $(".conditionClass");
        $el.empty(); // remove old options
        switch(selectedStudyValue) {
            case "lung":
                selectedStudy= lung;
                break;
            default:
              // code block
            }
        $.each(selectedStudy, function(key,value) {
            $el.append($("<option></option>")
                .attr("value", key).text(value.name));
        });
    });


    //on  CONDITION dropdown change 
    let selectedConditionIndex;
    $(".conditionClass").change(function (e) { 

        selectedStudyValue= $(".conditionClass").val();
        selectedConditionIndex= $(".conditionClass").prop('selectedIndex');
        console.log(selectedConditionIndex);


        var $el = $(".otherClass");
        $el.empty(); // remove old options
        $.each(selectedStudy[selectedConditionIndex].next, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(value.name));
        });
    });


    //on  OTHER TERM dropdown change 
    let selectedOtherClassIndex;
    $(".otherClass").change(function (e) { 

        selectedOtherClassIndex= $(".otherClass").prop('selectedIndex');
        console.log(selectedOtherClassIndex);


        var $el = $(".otherClass_level4");
        $el.empty(); // remove old options
                                                        console.log(lung[0].next);
        $.each(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(value.name));
        });
    });


});
