class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      player.getCount();
      var playerCountRef=await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount=playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    textSize(50);
    text("GAME STARTS",120,100);
    Player.getPlayerinfo();
    if(allplayers!==undefined){
      var position=130;
      for(var tlr in allplayers){
        if(tlr==="player"+player.index){
          fill("red")
        }else{
          fill("black")
        }

        position=position+20;
        textSize(15);
        text(allplayers[tlr].name+"= "+allplayers[tlr].distance,120,position)
      }

     

    }
    if(keyIsDown(UP_ARROW)&&player.index!==null){
      player.distance=player.distance+50;
      player.update();
    }

  }
}
