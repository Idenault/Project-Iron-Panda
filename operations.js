

function generateAttack(){
    var randomAttack = math.floor((math.random()*10)+1);
    return randomAttack;}

function generateHp(){
    var randomHP = math.floor((math.random()*25)+1);
    return randomAttack;}

function battle(playerObj1,playerObj2){
    var p1Att =playerObj1.att;
    var p1HP =playerObj1.hp;
    var p2Att =playerObj2.att;
    var p2HP =playerObj2.hp;

    if((p1HP>p2Att)&&(p2HP<p1Att))
    {
        //player 1 wins
    }
    else if((p1HP<p2Att)&&(p2HP>p1Att))
    {
        // player 2 wins
    }
    else if((p1HP===p2Att)&&(p2HP===p1Att))
    {
        // tie i win
    }
    else
        {
            // battle continues
        }




}








