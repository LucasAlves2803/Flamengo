var nomes_para_exclusao = [];
var cont = 0;
var cont2 = 0;
var qt_especifica =0
var pergunta = document.querySelector('.pergunta');
window.onload = pergunta.innerHTML = perguntas_iniciais[cont][0];


function resposta(resp){  // essa função é chamada quando o usuário escolhe uma resposta
    // o primeiro if tem dois propositos, primeiro: analisar a resposta da pergunta anterior; segundo: escrever
    // a próxima pergunta 
    // além de que ordena a lista e exclui jogadores
    // um detalhe importante: este if escreve todas as perguntas, porém não analisa todas as respostas da primeira fase de perguntas
    if (cont < perguntas_iniciais.length -1){ // Primeira fase de pergunta, perguntas gerais.
        analisa(resp,perguntas_iniciais[cont][1]); // analisa a resposta da pergunta anterior
        console.log(perguntas_iniciais[cont][1]);
        jogadores.sort(ordena_por_nome); // ordena a lista de jogadores
        exclui_jogadores(nomes_para_exclusao); // exclui os jogadores que têm caracteristas opostas ao que o usúario descreve
        cont++; // soma o contador
        pergunta.innerHTML = perguntas_iniciais[cont][0]; // escreve a nova pergunta
    }else {  
        if (cont == perguntas_iniciais.length-1){ // este if analisa a resposta da última pergunta geral
            analisa(resp,perguntas_iniciais[cont][1]);
            cont++;
        }else{ // analisa as respostas das perguntas específicas
                analisa(resp,jogadores[cont2]['perguntas'][qt_especifica][1]);
                qt_especifica++;            
        }
        jogadores.sort(ordena_por_nome);
        exclui_jogadores(nomes_para_exclusao);
        if (jogadores.length == 1){ // caso só haja um jogador na lista, então posso terminar o programa
            let body = document.querySelector('.main');
            body.innerHTML = '';
            let img = document.createElement('IMG');
            img.src = jogadores[0]['foto'];
            img.style.width = '200px';
            img.style.height = '200px';
            body.appendChild(img);
            body.style.color = 'white';
            body.innerHTML += jogadores[0]['nome'];
        }else{ // caso contrário escrevo uma pergunta específica
            if (qt_especifica < jogadores[cont2]['perguntas'].length){
                pergunta.innerHTML = jogadores[cont2]['perguntas'][qt_especifica][0];
            }else{ // caso a pegunta específica do jogador atual tenha acabado, passo para o próximo jogador
                cont2++;
                console.log("Quantidade de jogadores que restam " + cont2);
                if (cont2 < jogadores.length){
                    qt_especifica = 0;
                    pergunta.innerHTML = jogadores[cont2]['perguntas'][qt_especifica][0];
                }else{
                    let body = document.querySelector('.main');
                    body.innerHTML = '';
                    let img = document.createElement('IMG');
                    img.src = jogadores[0]['foto'];
                    img.style.width = '200px';
                    img.style.height = '200px';
                    body.appendChild(img);
                    body.style.color = 'white';
                    body.innerHTML += jogadores[0]['nome'];
                }
                
            }
        
        }
        
    }
    
}


// window.onload = function perguntas_genericas(){
//     for (let i=0; i < perguntas_iniciais.length;i++){
//         let resposta = prompt(perguntas_iniciais[i][0]);
//         analisa(resposta,perguntas_iniciais[i][1]);
//         jogadores.sort(ordena_por_nome);
//         exclui_jogadores(nomes_para_exclusao);
//     }

//     percorre_perguntas();
//     if (jogadores.length == 1){
//         let body = document.querySelector('.jogador');
//         let img = document.createElement('IMG');
//         img.src = jogadores[0]['foto'];
//         img.style.width = '200px';
//         img.style.height = '200px';
//         body.appendChild(img);
//         body.innerHTML += jogadores[0]['nome'];


//     }
//     // let body = document.querySelector('.jogador');
//     //  console.log(jogadores[0]['nome']);
     
// }

function percorre_perguntas(){
    let cont=0;
    const tam = jogadores.length;
    while (jogadores.length > 1 && cont < tam){
        
        for (let i=0; i < jogadores[cont]['perguntas'].length; i++){
            let resp = prompt(jogadores[cont]['perguntas'][i][0]);
            analisa(resp,jogadores[cont]['perguntas'][i][1]);
        }
        jogadores.sort(ordena_por_nome);
        exclui_jogadores(nomes_para_exclusao);
        cont++;
    }
}






function ordena_por_pontos(a,b){
    if (a.pontos < b.pontos){
        return 1;
    }else if (a.pontos > b.pontos){
        return -1;
    }else{
        return 0;
    }
}


function ordena_por_nome(nome1, nome2){
    return nome1['nome'].localeCompare(nome2['nome']);
}


function analisa(resp, prop){
    for (let i =0; i < jogadores.length; i++){
        console.log("Propriedade " + prop + "valor : " + jogadores[i][prop]);
        if (jogadores[i][prop]){
            if (resp == 0){
                jogadores[i]['pontos'] += 10;
            }else if (resp == 1){
                jogadores[i]['pontos'] += 5;
            }else if (resp == 3){
                jogadores[i]['pontos'] -= 5;
            }else if (resp == 2){
                console.log(resp);
                if (!nomes_para_exclusao.includes(jogadores[i]['nome'])){
                    nomes_para_exclusao.push(jogadores[i]['nome']);
                }
                
            }
        }else{
            console.log(typeof resp + " " + resp);
            if (resp == 0){
                console.log(jogadores[i]['nome'] + ' deve ser excluído por causa da propriedade' + jogadores[i][prop]);
                if (!nomes_para_exclusao.includes(jogadores[i]['nome'])){
                    nomes_para_exclusao.push(jogadores[i]['nome']);
                }
            }else if (resp == 1){
                jogadores[i]['pontos'] -= 5;
            }else if (resp == 2){
                jogadores[i]['pontos'] += 10;
            }else if (resp == 3){
                console.log(resp);
                jogadores[i]['pontos'] += 5;
            }
        }
    }
    
}

function exclui_jogadores(nomes_exclusao){ // exclui os jogadores que não combinam com a resposta
    let ini =0;
    let fim = jogadores.length;
    let i=0;
    let med = parseInt(jogadores.length/2);
    while ( i < nomes_exclusao.length){
        if (nomes_exclusao[i].localeCompare(jogadores[med]['nome']) == 1){
            console.log(nomes_exclusao[i] + " é maior que " + jogadores[med]['nome']);
            ini = med;
            med = parseInt((med + fim)/2);
        }else if (nomes_exclusao[i].localeCompare(jogadores[med]['nome']) == -1){
            console.log(nomes_exclusao[i] + " é menor que " + jogadores[med]['nome']);
            fim = med;
            med = parseInt((ini + med)/2);
        }else{
            console.log(nomes_exclusao[i] + " é igual a " + jogadores[med]['nome']);
            console.log("Excluindo " + nomes_exclusao[i]);
            jogadores.splice(med,1);
            i++;
            ini =0;
            fim = jogadores.length;
            med = parseInt(jogadores.length/2);
        }
    }
    nomes_para_exclusao = [];
}

