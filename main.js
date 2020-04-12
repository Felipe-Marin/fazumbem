loadCampanhas();
loadInstituicoes();

async function loadCampanhas() {
    const url = 'https://fazumbem.herokuapp.com/acao?tipo_request=all';
    const options = {
        method: 'GET',
        mode: 'cors'
    }
    try {   
        const acoes_json = await fetch(url, options);
        const acoes_response = await acoes_json.json();
        const acoes = acoes_response['data'];
        let grid = document.getElementById('grid-campanha');
        let html = '';
        for (acao of acoes) {
            html += 
            `<div class="card-campanha">
                <img src="./images/campanha_lauduz.jpg" />
                <div>
                    <p>Instituição promotora</p>
                    <p class="instituicao-nome">${acao.nome_entidade}</p>
                    <p>Benefeciado:</p>
                    <button class="button-doar">Doar</button>
                </div>
            </div>`
        }
        grid.innerHTML = html;
    } catch(e) {
        console.log(e);
    }
}

async function loadInstituicoes() {
    const url = 'https://fazumbem.herokuapp.com/entidade?tipo_request=all';
    const options = {
        method: 'GET',
        mode: 'cors'
    }
    try {   
        const entidades_json = await fetch(url, options);
        const entidades_response = await entidades_json.json();
        const entidades = entidades_response['data'];
        let grid = document.getElementById('grid-instituicoes');
        let html = '';
        for (entidade of entidades) {
            html += 
            `<div class="card-instituicao">
                <img src="./images/campanha_lauduz.jpg"/>
                <p>${entidade.nome}</p>
                <p>Santa Maria</p>
            </div>`
        }
        grid.innerHTML = html;
    } catch(e) {
        console.log(e);
    }
}