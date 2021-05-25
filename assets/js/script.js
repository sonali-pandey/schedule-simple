var now = dayjs();

var containerEl = $(".container");

// display current day
$("#currentDay").text(now.format("dddd, MMMM Do"));

// Creating an array with the hours of the day
var dayHour = Array.from(new Array(9)).map(function (v,i){
    var hr12 = dayjs().hour(i+9).format("h:00 A");
    var hr24 = dayjs().hour(i+9).format("H");
    return {hr12,hr24};
});

// time-block: hour of the day, text, save button
dayHour.forEach(function(hour){
    var timeBlock = $("<form>")
        .addClass("row time-block");

    var hourTab = $("<div>")
        .addClass("hour col-2");
    
    var hourText = $("<p>")
        .addClass("m-4")
        .text(hour.hr12);
        
    var task = $("<textarea>")
        .addClass("col-9 description form-control")
        .attr("id",hour.hr24);
    
    var saveBtn = $("<button>")
        .addClass("saveBtn col-1")
        .attr("id",hour.hr24)
        .html("<i class='fas fa-save'></i>");

    containerEl.append(timeBlock);
    timeBlock.append(hourTab);
    timeBlock.append(task);
    timeBlock.append(saveBtn); 
    hourTab.append(hourText)

    colorCode();
});

// Color Coding Time-Blocks
function colorCode(){
    $(".description").each(function(){
        var block = parseInt($(this).attr("id"));
        var time = parseInt(now.format("H"));
    
        if(block===time){
            $(this).addClass("present");
        }
        else if(block<time){
            $(this).addClass("past");
        }
        else{
            $(this).addClass("future");
        }
 
        // loading the saved data from local storage
        var value = window.localStorage.getItem(block);
        if(value!=null){
            $(this).text(value);
        }
        else{
            $(this).text("");
        }
    });
};

// Save Tasks/Events to Local Storage
$(".saveBtn").on("click",function(event){
    event.preventDefault();
    var btnId = parseInt($(this).attr("id"));
    window.localStorage.setItem(btnId,($(this).siblings(".description").val()));
});

// Periodically check the time-block to update the color coding
 setInterval(function(){
    colorCode();
   }, (1000*60)*30);