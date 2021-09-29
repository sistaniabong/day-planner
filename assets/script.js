
var currentDayEl = $('#currentDay');
var activitiesEl = $('.activities');
// console.log(activitiesEl.children().first().children('input').attr('id'));
// console.log(activitiesEl.children().children('input').eq(0));

function init(){
    renderActivities();
    renderCalender();
    clearStorage();
}



setInterval(function(){
    var rightNow = moment().format('dddd, MMMM Do YYYY');
    currentDayEl.text(rightNow);
},1000);


// var AmOrPm = moment().format('A');


// current time: select the id with the time and add color attribute to the current time
// timeNow = "10";


// changing the background color of the hour depending whether it is in the past, present or future
function renderCalender(){
    var timeNow = moment().format('k');
    console.log(timeNow);
    var childrens = activitiesEl.children().children('input')
    for (var i=0; i<childrens.length; i++){
        var timeID = childrens.eq(i).attr('id');

        if (parseInt(timeID) == parseInt(timeNow)){
            console.log('current')
            $("#"+timeID).css('background', 'red');
        }else if (parseInt(timeID) < parseInt(timeNow)){
            console.log('past')
            $("#"+timeID).css('background', 'gray');
        }else{
            console.log('future')
            $("#"+timeID).css('background', 'green');
        }
    }
}
    


function saveActivities(event){

    // get the hour window that is selected
    var timeEl = event.currentTarget.previousElementSibling.id
    console.log(timeEl)

    // get the activity that is being inputed
    var activity = $('#'+timeEl).val();
    console.log(activity);

    var dateNow = moment().format('dddd, MMMM Do YYYY');

    const activitiesData = (() => {
        const activities = localStorage.getItem('activities');
        return activities === null ? []: JSON.parse(activities);
      })();
    
    activitiesData.push({"time":timeEl,"activity":activity, "date": dateNow})

    localStorage.setItem("activities", JSON.stringify(activitiesData));
    renderActivities();

}

function renderActivities(){
    console.log('renderActivities');
    // get data from localstorage
    var activities = JSON.parse(localStorage.getItem('activities'));
    console.log(activities)

    // for loop to render each activity
    if (activities !== null){
        for (var i=0;i<activities.length;i++){
            console.log(activities[i].time);
            var time = activities[i].time;
            console.log(activities[i].activity);
            var activity = activities[i].activity;
            $('#'+time).val(activity);
        }
    }
}

// clear localStorage if not the same day
function clearStorage(){
    console.log('init clearStorage')
    var activities = JSON.parse(localStorage.getItem('activities'));
    console.log(activities)

    // for loop to remove activities that are not in today's date
    if (activities !== null){
        for (var i=0;i<activities.length;i++){
            var time = activities[i].time;
            console.log(time)
            var rightNow = moment().format('dddd, MMMM Do YYYY');
            console.log(rightNow)
            var storedDate = activities[i].date;
            console.log(storedDate)
            if (storedDate !== rightNow){
                console.log(activities[i])
                $('#'+time).val("");
                // activities.splice(i,1);
            }
            
            
        }
    }
}


activitiesEl.on('click','.saveBtn', saveActivities);

init()