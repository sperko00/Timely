export function convertMS(ms)
{
   
    var minutes = Math.floor(ms / 60000);
    
    var hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;

    if(hours < 10)
    hours = '0' + hours;
    if(minutes<10)
    minutes = '0' + minutes;

    return hours + ':' + minutes;
}