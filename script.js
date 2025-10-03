  document.addEventListener('DOMContentLoaded', () => {
    // --- elementos principais (curtos) ---
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnVoltar = document.getElementById('btn-voltar');
    const telaInicial = document.getElementById('tela-inicial');
    const telaSimulacao = document.getElementById('tela-simulacao');
    const telaResultado = document.getElementById('tela-resultado');
    const btnVoltarResultado = document.getElementById('btn-voltar-resultado');
    const btnRepetir = document.getElementById('btn-repetir');
    const btnSair = document.getElementById('btn-sair');

    // --- abrir tela de simulação ---
    if (btnIniciar) {
      btnIniciar.addEventListener('click', () => {
        telaInicial.style.display = 'none';
        telaSimulacao.style.display = 'flex';
      });
    }

    // --- voltar para a tela inicial ---
    if (btnVoltar) {
      btnVoltar.addEventListener('click', () => {
        telaSimulacao.style.display = 'none';
        telaInicial.style.display = 'flex';
      });
    }

    // --- navegação da tela de resultado ---
    if (btnVoltarResultado) {
      btnVoltarResultado.addEventListener('click', () => {
        telaResultado.style.display = 'none';
        telaSimulacao.style.display = 'flex';
      });
    }
    if (btnRepetir) {
      btnRepetir.addEventListener('click', () => {
        telaResultado.style.display = 'none';
        telaInicial.style.display = 'flex';
      });
    }
    if (btnSair) {
      btnSair.addEventListener('click', () => {
        telaResultado.style.display = 'none';
        telaInicial.style.display = 'flex';
      });
    }

    // --- função para abrir modal simples ---
    function abrirModal({ titulo, conteudoHtml, tipo = 'info' }) {
      const overlay = document.createElement('div');
      overlay.className = 'sim-modal-overlay';

      const dialog = document.createElement('div');
      // aqui adicionamos a classe do tipo (legit | phishing | info)
      dialog.className = 'sim-modal-dialog ' + (tipo === 'phishing' ? 'phishing' : (tipo === 'legit' ? 'legit' : '') );
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');

      const h = document.createElement('h2');
      h.className = 'sim-modal-title';
      h.textContent = titulo;
      dialog.appendChild(h);

      const content = document.createElement('div');
      content.className = 'sim-modal-content';
      content.innerHTML = conteudoHtml;
      dialog.appendChild(content);

      const actions = document.createElement('div');
      actions.className = 'sim-modal-actions';

      const btnFechar = document.createElement('button');
      btnFechar.className = 'sim-btn sim-btn-secondary';
      btnFechar.textContent = 'Fechar';

      const btnVoltar = document.createElement('button');
      btnVoltar.className = 'sim-btn sim-btn-primary';
      btnVoltar.textContent = (tipo === 'legit') ? 'Voltar à simulação' : 'Entendi';

      actions.appendChild(btnFechar);
      actions.appendChild(btnVoltar);
      dialog.appendChild(actions);

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
      dialog.focus();

      function fechar() { if (document.body.contains(overlay)) document.body.removeChild(overlay); }
      btnFechar.addEventListener('click', fechar);
      btnVoltar.addEventListener('click', fechar);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });

      document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') { fechar(); document.removeEventListener('keydown', onEsc); }
      });
    }

    // --- conteúdo do modal: phishing (malicioso) ---
    function gerarConteudoPhishing() {
      return `
        <p class="sim-strong sim-danger">O e-mail selecionado é malicioso — você caiu no phishing.</p>

        <h3>O que aconteceu</h3>
        <ol>
          <li>Remetente usou domínio falso ou parecido para enganar.</li>
          <li>Havia erros de ortografia e links suspeitos.</li>
        </ol>

        <h3>Práticas que você deve checar antes de clicar</h3>
        <ol>
          <li>Verifique o domínio do remetente</li>
          <li>Passe o mouse sobre links para ver o endereço real antes de clicar.</li>
          <li>Desconfie de pedidos urgentes ou ameaça de suspensão de conta.</li>
          <li>Não baixe anexos de remetentes desconhecidos sem verificar.</li>
        </ol>

        <h3>Ação e treinamento</h3>
        <p>Você foi convidado(a) a participar de um <strong>treinamento obrigatório de 3 horas</strong> sobre boas práticas de segurança da informação.</p>

        <p class="sim-note sim-danger"><strong>Atenção:</strong> sua ação foi registrada para fins educativos.</p>
      `;
    }

    // --- conteúdo do modal: legítimo (sucesso) ---
    function gerarConteudoLegitimo() {
      return `
        <p class="sim-strong sim-success">Parabéns — você identificou corretamente um e-mail legítimo!</p>

        <h3>O que você fez certo</h3>
        <ol>
          <li>Verificou o domínio do remetente antes de interagir.</li>
          <li>Não clicou impulsivamente e checou o conteúdo.</li>
        </ol>

        <h3>Como se manter seguro</h3>
        <ol>
          <li>Ative autenticação em duas etapas (2FA).</li>
          <li>Use senhas fortes e diferentes por serviço.</li>
          <li>Verifique links e confirme remetente em caso de dúvida.</li>
        </ol>

        <p class="sim-note sim-success"><strong>Continue assim!</strong></p>
      `;
    }

    // --- evento de clique nas opções de e-mail ---
    document.querySelectorAll('.email-opcao').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);

        // destaque visual da caixa escolhida
        document.querySelectorAll('.email-box').forEach(box => box.style.outline = 'none');
        const caixa = btn.closest('.email-box');
        if (caixa) caixa.style.outline = '3px solid rgba(60,209,194,0.45)';

        // idx 1 => legítimo; outros => phishing
        if (idx === 1) {
          abrirModal({
            titulo: 'Parabéns — boa decisão! 🎉',
            conteudoHtml: gerarConteudoLegitimo(),
            tipo: 'legit'
          });
        } else {
          abrirModal({
            titulo: 'Você caiu no PHISHING! ⚠️',
            conteudoHtml: gerarConteudoPhishing(),
            tipo: 'phishing'
          });
        }
      });
    });
  });
