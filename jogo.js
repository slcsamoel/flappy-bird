console.log('Flappy-bird');

const sprites = new Image();

sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');

const contexto = canvas.getContext('2d');

const son_HIT = new Audio();
son_HIT.src = './efeitos/hit.wav';

let frames = 0 ;

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
function criaChao(){
     const chao = {
          spriteX :0,
          spriteY:610,
          largura:224,
          altura:112,
          x:0,
          y:canvas.height - 112,
     
          atualiza(){
               const movimentoDoChao = 1 ;
               const repeteEm = chao.largura / 2;
               const movimentacao = chao.x - movimentoDoChao;
               chao.x = movimentacao % repeteEm;
          },
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
     return chao;
}




function fazColisao(flappyBird , chao){
     const flappyBirdY = flappyBird.y + flappyBird.altura;
     const chaoY = chao.y;
     if(flappyBirdY >= chaoY){
          return true;
     }
     return false;
}



// FlappyBird
function criarFlappyBird(){
     const flappyBird = {
          largura:33,
          altura:24,
          x:10,
          y:50,
          pulo:4.6,
          gravidade: 0.25,
          velocidade: 0, 
           atualiza(){
                if(fazColisao(flappyBird , globais.chao)){ //verificar si o bird bateu no chão
                     son_HIT.play();
                     setTimeout(() => {
                         mudaParaTela(Telas.INICIO);   
                     }, 500);
                }
                flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
                flappyBird.y = flappyBird.y + flappyBird.velocidade;
           },

           movimentos:[
               {spriteX: 0, spriteY: 0,}, // asa pra cima 
               {spriteX: 0, spriteY: 26,},// asa pra cima 
               {spriteX: 0, spriteY: 52,} // asa pra cima
           ],
           frameAtual:0,
           atualizarOFrameAtual(){
               const intervaloDeFrame = 10 ;
               const passouOIntervalo = frames % intervaloDeFrame === 0;
               if(passouOIntervalo){
                    const baseDoIncremento = 1 ;
                    const incremento = baseDoIncremento + flappyBird.frameAtual;
                    const baseRepeticao = flappyBird.movimentos.length;
                    flappyBird.frameAtual = incremento % baseRepeticao;
                    
               }
           },
           desenha(){
               flappyBird.atualizarOFrameAtual();
               const {spriteX , spriteY} = this.movimentos[flappyBird.frameAtual];
                contexto.drawImage(
                     sprites,
                     spriteX, spriteY,  // sprite X , sprite y
                     flappyBird.largura, flappyBird.altura, // tamanho do recorte na sprite
                     flappyBird.x, flappyBird.y,
                     flappyBird.largura, flappyBird.altura   
                );
           },
           pula(){
               console.log(flappyBird.velocidade); 
               flappyBird.velocidade =  -flappyBird.pulo; 
           }
         }

       return flappyBird; 
}


function criaCanos(){
     const canos = {
          largura:52,
          altura:400,
          
          chao:{
              spriteX: 0 ,
              spriteY: 169, 
          },
          ceu: {
               spriteX: 52 ,
               spriteY: 169
          },
          espaco: 80 ,
          desenha(){
             
              canos.pares.forEach(function(par){
               const yRandon = par.y; 
               const espacamentoEntreCanos = 100; 
 
               const canoCeuX = par.x; 
               const canoCeuY = yRandon; 

                // [Cano do ceu] 
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,  // sprite X , sprite y
                    canos.largura, canos.altura, // tamanho do recorte na sprite
                    canoCeuX , canoCeuY,
                    canos.largura, canos.altura,   
               )

               const canoChaoX = par.x;
               const canoChaoY = canos.altura + espacamentoEntreCanos + yRandon;
               
                // [Cano do chão] 
               contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,  // sprite X , sprite y
                    canos.largura, canos.altura, // tamanho do recorte na sprite
                    canoChaoX , canoChaoY,
                    canos.largura, canos.altura,   
               )

               par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY 
               }
 
               par.canoChao ={
                    x: canoChaoX,
                    y: canoChaoY
               }

              })

          },

          temColisaoComFlappyBird(par){

              const cabecaDoFlappy = globais.flappyBird.y;
              const peDoFlappy = globais.flappyBird + globais.flappyBird.altura; 

             if(globais.flappyBird.x >= par.x){

               if(cabecaDoFlappy <= par.canoCeu.y){
                   return true; 
               }     
               if(peDoFlappy <= par.canoChao.y){
                  return true ; 
               }

             }   

             return false;  
          },
          pares: [],
          atualiza(){
             const passou100Frames = frames % 100 === 0;
             if(passou100Frames){
                 canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),  
                 });   
             }

             canos.pares.forEach(function(par){
                  par.x = par.x - 2;  

                  if(canos.temColisaoComFlappyBird(par)){
                         mudaParaTela(Telas.INICIO);
                  }  

                  if(par.x + canos.largura <= 0){
                       canos.pares.shift();
                  }

             });

          }

     }

     return canos;
}


 //monta a tela inicial do jogo   
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

 //
 // Telas
 //
 const globais = {};
 let telaAtiva = {};
 function mudaParaTela(novaTela){
      telaAtiva = novaTela;

      if(telaAtiva.incializa){
          telaAtiva.incializa();
      }
 }

 const Telas = {

   INICIO:{
     incializa(){
         globais.flappyBird = criarFlappyBird();
         globais.chao = criaChao();
         globais.canos = criaCanos();
      },    
     desenha(){
          planoDeFundo.desenha();
          globais.flappyBird.desenha();
          globais.chao.desenha();
          mensagemGetReady.desenha();
     },
     click(){
          mudaParaTela(Telas.JOGO);
     },
     atualiza(){
          globais.chao.atualiza(); 
     }
   }
 };

 Telas.JOGO = {
     desenha(){
          planoDeFundo.desenha();
          globais.flappyBird.desenha();
          globais.canos.desenha();
          globais.chao.desenha();
     },
      click(){
          globais.flappyBird.pula();
      },    
      atualiza(){
          globais.canos.atualiza();
          globais.chao.atualiza(); 
          globais.flappyBird.atualiza();
     }
 }

 
function loop(){
     telaAtiva.desenha();
     telaAtiva.atualiza();

     frames = frames + 1 ;
     requestAnimationFrame(loop);
}

//captura o click na tela 
window.addEventListener('click',function(){
        if(telaAtiva.click){
             telaAtiva.click();
        }  
     
});    

mudaParaTela(Telas.INICIO);
loop();