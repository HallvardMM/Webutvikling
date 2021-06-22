/* File used for drawing the canvas picture and adding interactivity in canvas.html */

/*Code used to draw picture when loading canvas.html*/
window.onload = function paint() {

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    let sunSize = 135;      /* The radius of the sun*/
    let inSun = false;     /* true if cursor in sun*/
    let cloudHidden = false;     /* true if cloud is not showing*/
    let inCloud = false;     /* true if cursor in cloud*/
    let houseColor1 = "Crimson" /*Color of left house */
    let houseColor2 = "DarkSlateBlue" /*Color of right house */
    let houseRoof1Lime = false /*Is left house's roof lime color? */
    let houseRoof2Lime = false /*Is right house's roof lime color? */
    let colorFlowers = "rgb(255,0,255)" /*Colors of flowers */

    /*Background*/
    ctx.fillStyle = "rgb(20, 173, 200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /*Sun*/
    let grdSun = ctx.createRadialGradient(0, 0, 25, 0, 0, 120);
    grdSun.addColorStop(0, 'rgb(255, 136, 0)');
    grdSun.addColorStop(1, 'rgb(255, 238, 0)');
    let sun = new Path2D();
    sun.arc(0, 0, sunSize, 0, 2 * Math.PI);
    ctx.fillStyle = grdSun;
    ctx.fill(sun);

    /*Cloud*/
    let grdCloud = ctx.createLinearGradient(220, 0, 420, 0);
    grdCloud.addColorStop(0, 'rgb(248, 248, 248)');
    grdCloud.addColorStop(1, 'rgb(170, 170, 170)');
    let cloud = new Path2D();
    cloud.ellipse(325, 80, 65, 140, Math.PI / 2, 0, 2 * Math.PI);
    ctx.fillStyle = grdCloud;
    ctx.fill(cloud);

    /*Red house */
    const redHouse = new Path2D();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillStyle = "Crimson";
    ctx.fillRect(80, 375, 100, 80);
    redHouse.rect(80, 375, 100, 80);
    ctx.stroke(redHouse);

    /*Roof for red house */
    const redHouseRoof = new Path2D();
    redHouseRoof.moveTo(80, 375);
    redHouseRoof.lineTo(130, 300);
    redHouseRoof.lineTo(180, 375);
    ctx.fillStyle = "DimGray";
    ctx.fill(redHouseRoof);
    ctx.closePath();
    ctx.stroke(redHouseRoof);


    /*Purple house */
    const purpleHouse = new Path2D();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillStyle = "DarkSlateBlue";
    ctx.fillRect(280, 375, 100, 80);
    purpleHouse.rect(280, 375, 100, 80);
    ctx.stroke(purpleHouse);

    /*Roof for purple house */
    const purpleHouseRoof = new Path2D();
    purpleHouseRoof.moveTo(280, 375);
    purpleHouseRoof.lineTo(330, 300);
    purpleHouseRoof.lineTo(380, 375);
    ctx.fillStyle = "DimGray";
    ctx.fill(purpleHouseRoof);
    ctx.closePath();
    ctx.stroke(purpleHouseRoof);


    /*Hill 1 on the left side*/
    let grdHills1 = ctx.createLinearGradient(50, 0, 200, 0);
    grdHills1.addColorStop(0, 'rgb(20, 163, 27)');
    grdHills1.addColorStop(1, 'rgb(8, 107, 8)');
    const hill1 = new Path2D();
    hill1.ellipse(115, 600, 250, 155, 0, 0, 2 * Math.PI);
    ctx.fillStyle = grdHills1;
    ctx.fill(hill1);

    /*Hill 2 on the right side*/
    let grdHills2 = ctx.createLinearGradient(220, 0, 420, 0);
    grdHills2.addColorStop(0, 'rgb(20, 163, 27)');
    grdHills2.addColorStop(1, 'rgb(8, 107, 8)');
    const hill2 = new Path2D();
    hill2.ellipse(350, 600, 250, 155, 0, 0, 2 * Math.PI);
    ctx.fillStyle = grdHills2;
    ctx.fill(hill2);

    /*Flowers*/
    let flower1 = new Path2D();
    flower1.arc(90, 490, 5, 0, 2 * Math.PI);
    ctx.fillStyle = colorFlowers;
    ctx.fill(flower1);

    let flower2 = new Path2D();
    flower2.arc(50, 540, 5, 0, 2 * Math.PI);
    ctx.fill(flower2);

    let flower3 = new Path2D();
    flower3.arc(190, 540, 5, 0, 2 * Math.PI);
    ctx.fill(flower3);

    let flower4 = new Path2D();
    flower4.arc(370, 475, 5, 0, 2 * Math.PI);
    ctx.fill(flower4);

    let flower5 = new Path2D();
    flower5.arc(300, 580, 5, 0, 2 * Math.PI);
    ctx.fill(flower5);

    let flower6 = new Path2D();
    flower6.arc(250, 475, 5, 0, 2 * Math.PI);
    ctx.fill(flower6);

    let flower7 = new Path2D();
    flower7.arc(390, 540, 5, 0, 2 * Math.PI);
    ctx.fill(flower7);

    /* When mouse enters the sun the sun changes size*/
    $("#myCanvas").mousemove(function (event) {
        if (ctx.isPointInPath(sun, event.offsetX, event.offsetY) && sunSize === 135 && !inSun) {
            /*Changes size of sun object and redraws it */
            inSun = true;
            sun = new Path2D()
            sunSize = 190;
            sun.arc(0, 0, sunSize, 0, 2 * Math.PI);
            ctx.fillStyle = grdSun;
            ctx.fill(sun);
        }
        else if (ctx.isPointInPath(sun, event.offsetX, event.offsetY) && sunSize === 190 && !inSun) {
            /*Colors old sun area blue, changes size of sun and redraws it*/
            inSun = true;
            sun.arc(0, 0, sunSize + 1, 0, 2 * Math.PI);
            ctx.fillStyle = "rgb(20, 173, 200)";
            ctx.fill(sun);
            sun = new Path2D();
            sunSize = 135;
            sun.arc(0, 0, sunSize, 0, 2 * Math.PI);
            ctx.fillStyle = grdSun;
            ctx.fill(sun);
        }
        else if (!ctx.isPointInPath(sun, event.offsetX, event.offsetY)) {
            /*If cursor leaves sun change boolean. 
            This is for simulating mouseenter behaviour in svg picture */
            inSun = false;
        }
    });


    /* When mouse enters the cloud the cloud is hidden by coloring over it with background color
    and when mouse reenter it is redrawn*/
    $("#myCanvas").mousemove(function (event) {
        if (ctx.isPointInPath(cloud, event.offsetX, event.offsetY) && !cloudHidden && !inCloud) {
            ctx.fillStyle = "rgb(20, 173, 200)";
            cloud = new Path2D();
            cloud.ellipse(325, 80, 66, 141, Math.PI / 2, 0, 2 * Math.PI);
            ctx.fill(cloud);
            inCloud = true;
            cloudHidden = true;
        }
        else if (ctx.isPointInPath(cloud, event.offsetX, event.offsetY) && cloudHidden && !inCloud) {
            ctx.fillStyle = grdCloud;
            cloud = new Path2D();
            cloud.ellipse(325, 80, 65, 140, Math.PI / 2, 0, 2 * Math.PI);
            ctx.fill(cloud);
            inCloud = true;
            cloudHidden = false;

        }
        else if (!ctx.isPointInPath(cloud, event.offsetX, event.offsetY)) {
            /*If cursor leaves cloud change boolean. 
            This is for simulating mouseenter behaviour in svg picture */
            inCloud = false;
        }

    });

    /*Helper function so that courser leaving canvas object will trigger leaving sun and cloud*/
    $("#border").mouseenter(function (event) {
        inSun = false;
        inCloud = false;
    });

    /* When clicked house on left turn purple and house on right red and back again on next click*/
    $("#myCanvas").click(function (event) {
        if (ctx.isPointInPath(redHouse, event.offsetX, event.offsetY) && houseColor1 === "Crimson") {
            drawLeftHouse("DarkSlateBlue");
        }
        else if (ctx.isPointInPath(redHouse, event.offsetX, event.offsetY) && houseColor1 === "DarkSlateBlue") {
            drawLeftHouse("Crimson");
        }
        else if (ctx.isPointInPath(purpleHouse, event.offsetX, event.offsetY) && houseColor2 === "DarkSlateBlue") {
            drawRightHouse("Crimson");
        }
        else if (ctx.isPointInPath(purpleHouse, event.offsetX, event.offsetY) && houseColor2 === "Crimson") {
            drawRightHouse("DarkSlateBlue");
        }
    });

    function drawLeftHouse(color) {
        /* helper function redraw house and bout hills to have correct overlapping in picture
            and redraw all the flowers*/
        ctx.lineWidth = "2";
        ctx.strokeStyle = "rgb(0,0,0)";
        houseColor1 = color;
        ctx.fillStyle = houseColor1;
        ctx.fillRect(80, 375, 100, 80);
        redHouse.rect(80, 375, 100, 80);
        ctx.stroke(redHouse);
        ctx.fillStyle = grdHills1;
        ctx.fill(hill1);
        ctx.fillStyle = grdHills2;
        ctx.fill(hill2);
        colorTheFlowers(colorFlowers);
    }

    function drawRightHouse(color) {
        /* helper function redraw house and left hill to have correct overlapping in picture
        and redraw flowers over hill on the left side*/
        ctx.lineWidth = "2";
        ctx.strokeStyle = "rgb(0,0,0)";
        houseColor2 = color;
        ctx.fillStyle = houseColor2;
        ctx.fillRect(280, 375, 100, 80);
        purpleHouse.rect(280, 375, 100, 80);
        ctx.stroke(purpleHouse);
        ctx.fillStyle = grdHills2;
        ctx.fill(hill2);
        ctx.fillStyle = colorFlowers;
        ctx.fill(flower3);
        ctx.fill(flower4);
        ctx.fill(flower5);
        ctx.fill(flower6);
        ctx.fill(flower7);
    }

    /* Doubleclick on roofs to have them change color to Lime and doubleclick again to have them change back*/
    $("#myCanvas").dblclick(function (event) {
        if (ctx.isPointInPath(redHouseRoof, event.offsetX, event.offsetY) && !houseRoof1Lime) {
            houseRoof1Lime = true;
            drawRoof("Lime", "Lime", redHouseRoof);
        }
        else if (ctx.isPointInPath(purpleHouseRoof, event.offsetX, event.offsetY) && !houseRoof2Lime) {
            houseRoof2Lime = true;
            drawRoof("Lime", "Lime", purpleHouseRoof);
        }
        else if (ctx.isPointInPath(redHouseRoof, event.offsetX, event.offsetY) && houseRoof1Lime) {
            houseRoof1Lime = false;
            drawRoof("DimGray", "Black", redHouseRoof);
        }
        else if (ctx.isPointInPath(purpleHouseRoof, event.offsetX, event.offsetY) && houseRoof2Lime) {
            houseRoof2Lime = false;
            drawRoof("DimGray", "Black", purpleHouseRoof);
        }
    });

    /*Helper function to redraw correct roof with correct color */
    function drawRoof(color, strokeColor, roof) {
        ctx.fillStyle = color;
        ctx.fill(roof);
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.stroke(roof);
    }

    /* Blinking flowers on the ground*/
    $(document).ready(function () {
        setInterval(function () {
            if (colorFlowers === "rgb(127, 255, 212)") {
                colorFlowers = "rgb(255, 0, 255)";
                colorTheFlowers(colorFlowers);
            }
            else {
                colorFlowers = "rgb(127, 255, 212)";
                colorTheFlowers(colorFlowers);
            }
        }, 1000);
    });

    /* Helper function to redraw all the flowers*/
    function colorTheFlowers(color) {
        ctx.fillStyle = color;
        ctx.fill(flower1);
        ctx.fill(flower2);
        ctx.fill(flower3);
        ctx.fill(flower4);
        ctx.fill(flower5);
        ctx.fill(flower6);
        ctx.fill(flower7);
    }

}


