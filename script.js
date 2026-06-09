
  <script>
    // Função de login
    function login() {
      const usuario = document.getElementById("usuario").value;
      const senha = document.getElementById("senha").value;

      if (usuario === "admin" && senha === "1234") {
        localStorage.setItem("logado", "true");
        alert("Login realizado com sucesso!");
        window.location.href = "#"; // redirecionar para sistema principal
      } else {
        alert("Usuário ou senha incorretos!");
      }
    }

    // Bloqueia acesso sem login
    if (localStorage.getItem("logado") !== "true") {
      console.log("Usuário não logado. Exibindo tela de login.");
    }

    // Logout
    function logout() {
      localStorage.removeItem("logado");
      window.location.href = "#";
    }

    // Adicionar tópico ao fórum
    function adicionarTopico(forumId) {
      const forum = document.getElementById(forumId);

      const novoTopico = document.createElement('div');
      novoTopico.classList.add('topico');
      novoTopico.innerHTML = `
        <h4>Título do Tópico</h4>
        <textarea placeholder="Escreva seu comentário..." rows="4"></textarea>
        <button>Postar Comentário</button>
      `;

      forum.appendChild(novoTopico);
    }
  </script>
  