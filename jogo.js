console.log('Flappy-bird');

const sprites = new Image();

sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');

const contexto = canvas.getContext('2d');

// Plano de fundo
const planoDeFundo = {
     spriteX :390,
     spriteY:0,
     largura:275,
     altura:204,
     x:0,
     y:canvas.height - 204,
     desenha(){
          contexto.fillStyle = '#70c5ce';
          contexto.fillRect(0,0 , canvas.width , canvas.height);

          contexto.drawImage(
               sprites,
               planoDeFundo.spriteX, planoDeFundo.spriteY,  // sprite X , sprite y
               planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
               planoDeFundo.x, planoDeFundo.y,
               planoDeFundo.largura, planoDeFundo.altura   
          );

          contexto.drawImage(
               sprites,
               planoDeFundo.spriteX, planoDeFundo.spriteY,  // sprite X , sprite y
               planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte na sprite
              (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
               planoDeFundo.largura, planoDeFundo.altura   
          );
     }
}



// Chão
const chao = {
     spriteX :0,
     spriteY:610,
     largura:224,
     altura:112,
     x:0,
     y:canvas.height - 112,
     desenha(){
          contexto.drawImage(
               sprites,
               chao.spriteX, chao.spriteY,  // sprite X , sprite y
               chao.largura, chao.altura, // tamanho do recorte na sprite
               chao.x, chao.y,
               chao.largura, chao.altura   
          );

          // para completar o quadro canvas 
          contexto.drawImage(
               sprites,
               chao.spriteX, chao.spriteY,  // sprite X , sprite y
               chao.largura, chao.altura, // tamanho do recorte na sprite
               (chao.x + chao.largura), chao.y,
               chao.largura, chao.altura   
          );
     }
}

// Flappy Bird
const flappyBird ={
    spriteX :0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    gravidade: 0.25,
    velocidade: 0 , 
     atualiza(){
          flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
          flappyBird.y = flappyBird.y + flappyBird.velocidade;
     },
     desenha(){
          contexto.drawImage(
               sprites,
               flappyBird.spriteX, flappyBird.spriteY,  // sprite X , sprite y
               flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
               flappyBird.x, flappyBird.y,
               flappyBird.largura, flappyBird.altura   
          );
     }

   }

 const mensagemGetReady = {
     sX :134,
     sY:0,
     w:174,
     h:152,
     x:(canvas.width/2)-174/2,
     y:50, 
      desenha(){
           contexto.drawImage(
                sprites,
                mensagemGetReady.sX, mensagemGetReady.sY,  // sprite X , sprite y
                mensagemGetReady.w, mensagemGetReady.h, // tamanho do recorte na sprite
                mensagemGetReady.x, mensagemGetReady.y,
                mensagemGetReady.w, mensagemGetReady.h   
           );
      }
 } 

function loop(){
     flappyBird.atualiza();
     planoDeFundo.desenha();
     chao.desenha();
     flappyBird.desenha();
  

     requestAnimationFrame(loop);
}

loop();