/* This file is for Jquery which makes the svg picture interactive it is only loaded in svg.html*/

let showCloud = true; /* Changes to show or hide cloud*/
let houseColor1 = "Crimson"; /* Color of left house*/
let houseColor2 = "DarkSlateBlue"; /* Color of Right house*/

/* When mouse enters the sun a pop up appears*/
$(document).ready(function () {
    $("#sun").mouseenter(function () {
        $(this).attr("r") === "135" ? $(this).attr("r", "190") : $(this).attr("r", "135");
    });
});

/* When mouse enters the cloud the cloud is hidden and reenter shows it again*/
$(document).ready(function () {
    $("#cloud").mouseenter(function () {
        if (showCloud) {
            $("#cloud").css({ fill: "rgba(0, 0, 0, 0)" });
            showCloud = false;
        }
        else {
            $("#cloud").css({ fill: "url(#cloudColor)" });
            showCloud = true;
        }
    });
});


/* The house on the left changes color when clicked and changes color back on next click*/
$(document).ready(function () {
    $("#House1").click(function () {
        houseColor1 === "Crimson" ? houseColor1 = "DarkSlateBlue" : houseColor1 = "Crimson";
        $(this).css("fill", houseColor1);
    });
});

/* The house on the right changes color when clicked and changes color back on next click*/
$(document).ready(function () {
    $("#House2").click(function () {
        houseColor2 === "DarkSlateBlue" ? houseColor2 = "Crimson" : houseColor2 = "DarkSlateBlue";
        $(this).css("fill", houseColor2);
    });
});

/* Doubleclick on roofs to have them change color to Lime and back*/
$(document).ready(function () {
    $("polygon").dblclick(function () {
        if ($(this).css("fill") === "rgb(0, 255, 0)") {
            $(this).css("fill", "DimGray");
            $(this).css("stroke", "Black");
        }
        else {
            $(this).css("fill", "Lime");
            $(this).css("stroke", "Lime");
        }
    });
});


/* Blinking flowers on the ground*/
$(document).ready(function () {
    $(".smallFlower").each(function () {
        let flower = $(this);
        setInterval(function () {
            if (flower.css("fill") === "rgb(127, 255, 212)") {
                flower.css("fill", "rgb(255, 0, 255)");
            }
            else {
                flower.css("fill", "rgb(127, 255, 212)");
            }
            console.log(flower.css("fill"))
        }, 1000);
    });
});