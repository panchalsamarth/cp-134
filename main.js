status = "";
objects = [];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    object_detection = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        object_detection.detect(video, gotResult);
        for(i = 0; i <objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: object detected";

            fill(r, g, b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person")
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            }
        }
        if(objects.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        }

    }
}

function modelloaded()
{
    console.log("Model is loaded!")
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}