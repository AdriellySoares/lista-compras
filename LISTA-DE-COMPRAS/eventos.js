const API_URL = "http://localhost:8001";

function buscarParaEditar(id) {

    fetch(API_URL+'/compras/'+id)
    .then(res => res.json())
    .then(dados => {
        input_editar_id.value = id;
        input_editar_item.value = dados.item,
        input_editar_quantidade.value = dados.quantidade;
});
}


async function editar() {
    event.preventDefault();

    let dados = {
        item: input_editar_item.value,
        quantidade: input_editar_quantidade.value,
    };

    await fetch(API_URL+'/compras/'+input_editar_id.value, {
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'content-type': 'application/json',
     }
})
        .then(res => res.json())
        .then(() => atualizarlista());

  let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
  x.dispatchEvent(new Event('click'));

}

function inserir() {
    event.preventDefault();

    let dados = {
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),
    };

    fetch(API_URL+'/compras', {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: {
        'content-Type': 'application/json',
    }
    }) 

    .then(resposta => resposta.json())
    .then(resposta => atualizarlista());

    form_add.reset();

}

async function excluir(id){
let resposta = confirm('Você tem certeza?');

if (resposta !== true)
    return;
    
  await  fetch(API_URL+'/compras/'+id,{
    method: 'DELETE'
    
});

atualizarlista();
}

function atualizarlista(){
fetch(API_URL+'/compras')
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(lista){
        tabela_compras.innerHTML ='';
        lista.forEach(function (cadaItem){
           tabela_compras.innerHTML +=`
           <tr>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.item}</td>
                <td>${cadaItem.quantidade}</td>
                <td>
                    <button onclick="buscarParaEditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning btn-sm">

                    Editar

                    </button>

                    <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">

                    Excluir

                    </button>
                </td>    
            </tr>    
           `; 
        });
    })
}

atualizarlista();