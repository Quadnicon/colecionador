// VARIÁVEIS GLOBAIS DE ESTADO
let categorias = ["Livros", "Jogos", "Filmes"]; // Sua lista inicial de categorias
let colecao = {
    itens: {}, // Estrutura para agrupar itens por categoria: { "Livros": [...], "Jogos": [...] }
    desejos: []
};

// --- FUNÇÕES DE INICIALIZAÇÃO ---

window.onload = () => {
    // Inicializa as categorias no <select> e na <ul>
    atualizarSelectECategorias(); 
};

// --- FUNÇÕES DE UTILIDADE E RENDERIZAÇÃO ---

/**
 * Atualiza o <select> de categorias (para adicionar itens) e a <ul> de lista de categorias.
 */
function atualizarSelectECategorias() {
    const select = document.getElementById("itemCategoria");
    const lista = document.getElementById("listaCategorias");
    
    // Limpa os elementos existentes
    select.innerHTML = "";
    lista.innerHTML = "";

    // Popula o <select> e a <ul> com as categorias atuais
    categorias.forEach(cat => {
        // Para o <select> de itemCategoria
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);

        // Para a <ul> da lista de Categorias (aba Categorias)
        const li = document.createElement("li");
        li.textContent = cat;
        lista.appendChild(li);
        
        // Garante que toda categoria exista no objeto de itens
        if (!colecao.itens[cat]) {
            colecao.itens[cat] = [];
        }
    });
    
    // Após atualizar as categorias, renderiza os itens da coleção
    renderizarItensColecao(); 
}

/**
 * Renderiza (desenha) todos os itens da coleção na aba "Minha Coleção", agrupando-os por categoria.
 */
function renderizarItensColecao() {
    const listaItens = document.getElementById("listaItens");
    listaItens.innerHTML = ""; // Limpa a lista antes de redesenhar

    // Itera sobre as categorias
    categorias.forEach(categoria => {
        const itensDaCategoria = colecao.itens[categoria];
        
        // Adiciona um cabeçalho para a categoria, se houver itens
        if (itensDaCategoria && itensDaCategoria.length > 0) {
            const h3 = document.createElement("h3");
            h3.textContent = `--- ${categoria} (${itensDaCategoria.length}) ---`;
            listaItens.appendChild(h3);
            
            // Itera sobre os itens dentro da categoria
            itensDaCategoria.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${item.nome}</strong> - <em>R$ ${item.valor}</em>`;
                
                // Adiciona a foto, se existir
                if (item.fotoUrl) {
                    const img = document.createElement("img");
                    img.src = item.fotoUrl;
                    li.appendChild(img);
                }
                
                listaItens.appendChild(li);
            });
        }
    });
}

/**
 * Renderiza (desenha) a lista de desejos.
 */
function renderizarListaDesejos() {
    const listaDesejos = document.getElementById("listaDesejos");
    listaDesejos.innerHTML = ""; // Limpa a lista

    colecao.desejos.forEach(desejo => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${desejo.nome}</strong> - <em>Valor estimado: R$ ${desejo.valor}</em>`;
        listaDesejos.appendChild(li);
    });
}

// --- FUNÇÕES DE AÇÃO DO USUÁRIO ---

/**
 * Troca a aba ativa na interface.
 */
function showTab(tabId) {
    // Remove a classe 'active' de todas as seções e botões
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
    
    // Adiciona a classe 'active' à seção e ao botão clicado
    document.getElementById(tabId).classList.add("active");
    // event.target é o botão que disparou a função, assumindo que foi chamada a partir de um clique no botão de navegação
    event.target.classList.add("active"); 
    
    // Apenas para garantir que a lista correta seja exibida após a troca de aba
    if (tabId === 'colecao') {
        renderizarItensColecao();
    } else if (tabId === 'desejos') {
        renderizarListaDesejos();
    }
}

/**
 * Adiciona uma nova categoria à lista global e atualiza a interface.
 */
function adicionarCategoria() {
    const nova = document.getElementById("novaCategoria").value.trim();
    if(nova && !categorias.includes(nova)) {
        // 1. Adiciona ao array de categorias
        categorias.push(nova);
        
        // 2. Cria o array para armazenar itens dessa nova categoria
        colecao.itens[nova] = []; 
        
        // 3. Atualiza a interface
        atualizarSelectECategorias();
        
        // 4. Limpa o input
        document.getElementById("novaCategoria").value = "";
    }
}

/**
 * Adiciona um novo item à coleção e o agrupa por categoria.
 */
function adicionarItem() {
    const nome = document.getElementById("itemNome").value.trim();
    const categoria = document.getElementById("itemCategoria").value;
    const valor = document.getElementById("itemValor").value.trim();
    const fotoInput = document.getElementById("itemFoto");
    let fotoUrl = null;

    if(nome && categoria) {
        // 1. Obtém o URL da foto, se houver
        if(fotoInput.files.length > 0) {
            fotoUrl = URL.createObjectURL(fotoInput.files[0]);
        }
        
        // 2. Cria o objeto do novo item
        const novoItem = { nome, categoria, valor, fotoUrl };
        
        // 3. Adiciona o item à estrutura de dados correta
        if (colecao.itens[categoria]) {
            colecao.itens[categoria].push(novoItem);
        } else {
            // Caso a categoria não exista (não deve ocorrer se 'atualizarSelectECategorias' rodar)
            colecao.itens[categoria] = [novoItem];
        }

        // 4. Renderiza a lista de itens novamente (com o novo item agrupado)
        renderizarItensColecao();
        
        // 5. Limpa os campos do formulário
        document.getElementById("itemNome").value = "";
        document.getElementById("itemValor").value = "";
        fotoInput.value = "";
    }
}

/**
 * Adiciona um novo item à lista de desejos.
 */
function adicionarDesejo() {
    const nome = document.getElementById("desejoNome").value.trim();
    const valor = document.getElementById("desejoValor").value.trim();
    
    if(nome) {
        // 1. Cria o objeto do novo desejo
        const novoDesejo = { nome, valor };
        
        // 2. Adiciona o desejo à estrutura de dados
        colecao.desejos.push(novoDesejo);
        
        // 3. Renderiza a lista de desejos novamente
        renderizarListaDesejos();
        
        // 4. Limpa os campos
        document.getElementById("desejoNome").value = "";
        document.getElementById("desejoValor").value = "";
    }
}
