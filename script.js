const categorias = ["Figuras", "Moedas", "Cartas"];

window.onload = () => {
  atualizarCategorias();
  criarListasPorCategoria();
};

function showTab(tabId) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}

function atualizarCategorias() {
  const select = document.getElementById("itemCategoria");
  const lista = document.getElementById("listaCategorias");
  select.innerHTML = "";
  lista.innerHTML = "";
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);

    const li = document.createElement("li");
    li.textContent = cat;
    lista.appendChild(li);
  });
}

function criarListasPorCategoria() {
  const container = document.getElementById("listaItens");
  container.innerHTML = "";
  categorias.forEach(cat => {
    const div = document.createElement("div");
    div.classList.add("categoria-bloco");

    const titulo = document.createElement("h3");
    titulo.textContent = cat;

    const ul = document.createElement("ul");
    ul.id = `itens-${cat}`;

    div.appendChild(titulo);
    div.appendChild(ul);
    container.appendChild(div);
  });
}

function adicionarCategoria() {
  const nova = document.getElementById("novaCategoria").value;
  if(nova && !categorias.includes(nova)) {
    categorias.push(nova);
    atualizarCategorias();
    criarListasPorCategoria();
    document.getElementById("novaCategoria").value = "";
  }
}

function adicionarItem() {
  const nome = document.getElementById("itemNome").value;
  const categoria = document.getElementById("itemCategoria").value;
  const valor = document.getElementById("itemValor").value;
  const fotoInput = document.getElementById("itemFoto");

  if(nome) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${nome}</strong> (${categoria}) - <em>R$ ${valor}</em>`;

    if(fotoInput.files.length > 0) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(fotoInput.files[0]);
      li.appendChild(img);
    }

    // Adiciona o item na lista da categoria correspondente
    const listaCategoria = document.getElementById(`itens-${categoria}`);
    if(listaCategoria) {
      listaCategoria.appendChild(li);
    }

    document.getElementById("itemNome").value = "";
    document.getElementById("itemValor").value = "";
    fotoInput.value = "";
  }
}

function adicionarDesejo() {
  const nome = document.getElementById("desejoNome").value;
  const valor = document.getElementById("desejoValor").value;

  if(nome) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${nome}</strong> - <em>Valor estimado: R$ ${valor}</em>`;
    document.getElementById("listaDesejos").appendChild(li);
    document.getElementById("desejoNome").value = "";
    document.getElementById("desejoValor").value = "";
  }
}
