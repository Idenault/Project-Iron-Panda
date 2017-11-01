module.exports = {attack: function generateAttack(){
    var randomAttack = Math.floor((Math.random()*10)+1);
    return randomAttack;},

hp: function generateHp(){
    var randomHP = Math.floor((Math.random()*25)+1);
    return randomHP;},

battle: function battle(playerObj1,playerObj2){
    var p1Att =playerObj1.att;
    var p1HP =playerObj1.hp;
    var p2Att =playerObj2.att;
    var p2HP =playerObj2.hp;
    var winner = 'none';

    if((p1HP>p2Att)&&(p2HP<p1Att))
    {
       return winner ='Player 1 Wins by TKO'
    }
    else if((p1HP<p2Att)&&(p2HP>p1Att))
    {
       return winner ='Player 2 Wins by TKO'
    }
    else if((p1HP===p2Att)&&(p2HP===p1Att))
    {
       return winner ='Everyone Loses by epic Rocky II double Knock Out'
    }
    else
        {
           return winner = "continue"
        }



}};








