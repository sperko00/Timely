export function convertMIN(min)
{
    
    var hours = Math.floor(min / 60);
    var minutes = min - hours * 60;

    if(hours < 10)
    hours = '0' + hours;
    if(minutes<10)
    minutes = '0' + minutes;

    return hours + ':' + minutes;
}