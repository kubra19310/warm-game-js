const {getRandomHealt,getRandomInt} = require('./helpers');
const teamA = [];
const teamB = [];
let warStats= {
    isFinish:false,
    winTeam:null 
}
class Soldier{
    id;
    healt;
    damage;
    level;
    isDead;
    constructor(id){
        this.id = id;
        this.level = getRandomInt(2) + 1;
        this.damage = this.level * 20;
        this.healt = getRandomHealt();
        this.isDead = false;
    }

    subtractHealt(damage){ // canı azalat
        this.healt = this.healt - damage;
        if(this.healt < 0) {
            this.healt = 0;
            this.isDead = true;
            console.log(this.id + ' elendi');
        }
    }
}

for(let i = 0; i < 10; i++){
    teamA.push(new Soldier(i+1));
    teamB.push(new Soldier(i+11));
}

function fire(){
    return new Promise((resolve,reject) => {
        const firstFire =  getRandomInt(100) % 2;
        const teamA_ = teamA.filter(item => item.isDead === false);
        const teamB_ = teamB.filter(item => item.isDead === false);
        const randomASoldier = teamA_[getRandomInt(teamA_.length)];
        const randomBSoldier = teamB_[getRandomInt(teamB_.length)];
        if(!teamA_.length || !teamB_.length){
            warStats.isFinish = true;
            warStats.winTeam = teamA_.length === 0 ? 'teamB' : 'teamA'
            console.log(warStats);
            return;
        }
        if(firstFire === 0){
            randomBSoldier.subtractHealt(randomASoldier.damage);
            console.log(randomASoldier.id + ' Ateş etti ' + randomBSoldier.id);
            teamB.map(item => {
                if(item.id === randomBSoldier.id ){
                    item.healt = randomBSoldier.healt;
                }
            });
        }else {
            randomASoldier.subtractHealt(randomBSoldier.damage);
            console.log(randomBSoldier.id + ' Ateş etti ' + randomASoldier.id);
            teamA.map(item => {
                if(item.id === randomASoldier.id ){
                    item.healt = randomASoldier.healt;
                }
            });
        }
        setTimeout(() => {
            resolve(1);
        },500)
    })
}

async function runWar(){
    while(!warStats.isFinish){
        await fire();
    }
}

runWar();