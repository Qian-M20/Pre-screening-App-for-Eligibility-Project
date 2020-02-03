
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
        });
        
    });

    $(".button_findEligibleStudy").css({opacity:0.2});



    let option = document.getElementsByClassName("options");
    //initialy hiding all the droplown list
    $(option).hide();
    //STUDY selection
    let selectedStudyValue;// to store the value of selected study from the study options
    let selectedStudy;// to store variable correspoinding type of study selected

    //on STUDY dropdown change 

    //showing the first dropdown list : Type of study
    $(option[0]).show();
    //function to show next level [conditions list] options when type of stydy is selected
    $(".studyClass").change(function (e) { 
        $(option[1]).hide();
        $(option[2]).hide();
        $(option[3]).hide();
        e.preventDefault();

        selectedStudyValue= $(".studyClass").val();//getting the value of selected option and assign to selectedStudyValue

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
        if(selectedStudy[0].next!=null){
            $(option[1]).show();
        }
    });


    //on  CONDITION dropdown change 
    let selectedConditionIndex;

    //function to show next level [other term options] options when type of condition is selected
    $(".conditionClass").change(function (e) { 
        $(option[2]).hide();
        $(option[3]).hide();

        selectedStudyValue= $(".conditionClass").val();
        selectedConditionIndex= $(".conditionClass").prop('selectedIndex');
        console.log(selectedConditionIndex);

        var $el = $(".otherClass");
        $el.empty(); // remove old options
        $.each(selectedStudy[selectedConditionIndex].next, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(value.name));
        });

        if(selectedStudy[selectedConditionIndex].next!=null){
            $(option[2]).show();
        }
        if(selectedStudy[selectedConditionIndex]==null){
            $(".button_findEligibleStudy").css({opacity:1});
        }
    });


    //on  OTHER TERM dropdown change 
    let selectedOtherClassIndex;
    $(".otherClass").change(function (e) { 
        $(option[3]).hide();

        selectedOtherClassIndex= $(".otherClass").prop('selectedIndex');
        console.log(selectedOtherClassIndex);


        var $el = $(".otherClass_level4");
        $el.empty(); // remove old options
                                                        console.log(lung[0].next);
        $.each(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next, function(key,value) {
        $el.append($("<option></option>")
            .attr("value", value).text(value.name));
        });

        if(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next!=null){
            $(option[3]).show();
        }
        if(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next){
            $(".button_findEligibleStudy").css({opacity:0.5});
        }
        if(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next==null){
            $(".button_findEligibleStudy").css({opacity:1});
            console.log(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex])
        }
    });


    let selectedlevel4Index;
    $(".otherClass_level4").click(function (e) { 
        $(option[4]).hide();

        selectedlevel4Index= $(".otherClass_level4").prop('selectedIndex');
        console.log(selectedlevel4Index);

        if(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next[selectedlevel4Index].next==null){
            $(".button_findEligibleStudy").css({opacity:1});

            $(".button_findEligibleStudy").click(function (e) { 
                e.preventDefault();
                resultName= selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next[selectedlevel4Index].result.name;
                $(".resultName h2").html(resultName);
                console.log(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next[selectedlevel4Index].result);
                if(selectedStudy[selectedConditionIndex].next[selectedOtherClassIndex].next[selectedlevel4Index].result.type == "open"){
                    $(".resultName").addClass("greenHeader");
                    $(".resultDetails").addClass("greenDetails");
                }
                else{
                    $(".resultName").addClass("orangeHeader");
                    $(".resultDetails").addClass("orangeDetails");
                }
                $('.mainPage').hide();
                $('.resultsPage').show();
                TweenMax.to(".mainPage",1,{
                    delay:1,
                    x: 1500,
                    display: "none",
                    ease: Power1.easeOut,
                });
                
            });
        }
    });

    


});
