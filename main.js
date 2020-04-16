loadCampanhas();
loadInstituicoes();

document.getElementById('side-menu-button').addEventListener('click', showSideMenu);
document.getElementById('menu-close-button').addEventListener('click', hideSideMenu);

function showSideMenu() {
    document.getElementById('side-menu').style.width = '200px';
}

function hideSideMenu() {
    document.getElementById('side-menu').style.width = '0px';
}

function showModal() {
	let modalHtml = `
		<div id="modal" class="modal">
			<div class="modal-content">
				<a class="close-button" onclick="hideModal()"></a>
			</div>
		</div>`
	document.body.innerHTML += modalHtml;
}

function hideModal() {
	let modal = document.getElementById('modal');
	document.body.removeChild(modal);
}

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
            let nome_entidade = entidade.nome;
            if(nome_entidade.length > 40){
                let nome_entidade_cut = nome_entidade.substring(0, 40);
                nome_entidade = nome_entidade_cut + nome_entidade.substring(40, nome_entidade.length).split(' ')[0];
                nome_entidade = nome_entidade + '...';
            }
            html += 
            `<div class="card-instituicao">
                <img src="./images/campanha_lauduz.jpg"/>
                <p>${nome_entidade}</p>
                <p>Santa Maria</p>
            </div>`
        }
        grid.innerHTML = html;
    } catch(e) {
        console.log(e);
    }
}