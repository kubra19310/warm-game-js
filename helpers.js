function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomHealt(){
    const healts = [80,10,120];
    return healts[getRandomInt(3)]
}



module.exports = {
    getRandomHealt,
    getRandomInt
}