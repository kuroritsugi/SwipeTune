# ===== Script para gerar o ROTEIRO_RESPONDIDO.docx =====
# SwipeTune - Descubra músicas arrastando para cima!

from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

# ===== Criar documento =====
doc = Document()

# ===== Configurar margens =====
for section in doc.sections:
    section.top_margin = Cm(2)
    section.bottom_margin = Cm(2)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)

# ===== Estilos =====
style = doc.styles['Normal']
font = style.font
font.name = 'Calibri'
font.size = Pt(11)

# ===== Funções auxiliares =====
def adicionar_titulo(texto, nivel=1):
    """Adiciona um título formatado"""
    if nivel == 0:
        p = doc.add_heading(texto, level=0)
        for run in p.runs:
            run.font.color.rgb = RGBColor(124, 58, 237)
            run.font.size = Pt(24)
    elif nivel == 1:
        p = doc.add_heading(texto, level=1)
        for run in p.runs:
            run.font.color.rgb = RGBColor(124, 58, 237)
            run.font.size = Pt(16)
    elif nivel == 2:
        p = doc.add_heading(texto, level=2)
        for run in p.runs:
            run.font.color.rgb = RGBColor(255, 45, 85)
            run.font.size = Pt(13)
    return p

def adicionar_pergunta(texto):
    """Adiciona uma pergunta em negrito"""
    p = doc.add_paragraph()
    run = p.add_run(texto)
    run.bold = True
    run.font.size = Pt(11)
    return p

def adicionar_resposta(texto):
    """Adiciona uma resposta normal"""
    p = doc.add_paragraph()
    run = p.add_run(texto)
    run.font.size = Pt(11)
    p.paragraph_format.left_indent = Cm(0.5)
    return p

def adicionar_item_lista(texto):
    """Adiciona um item de lista"""
    p = doc.add_paragraph(texto, style='List Number')
    p.paragraph_format.left_indent = Cm(1)
    return p

def adicionar_espaco():
    """Adiciona um espaço entre seções"""
    doc.add_paragraph()

# ===== CABEÇALHO =====
adicionar_titulo('ROTEIRO DE ATIVIDADE PRÁTICA', 0)
p = doc.add_paragraph()
run = p.add_run('DESENVOLVIMENTO DE SISTEMAS')
run.bold = True
run.font.size = Pt(14)
run.font.color.rgb = RGBColor(255, 45, 85)

p = doc.add_paragraph()
run = p.add_run('DESAFIO: MEU PRIMEIRO APLICATIVO AUTÔNOMO')
run.bold = True
run.font.size = Pt(12)

adicionar_espaco()

# ===== DADOS DO ESTUDANTE =====
adicionar_titulo('Dados do Estudante', 2)
adicionar_resposta('Nome do estudante: _______________________________________________')
adicionar_resposta('Turma: ___________________________ Data: //________')
adicionar_resposta('Professor: _______________________________________________')

adicionar_espaco()

# ===== 1. TEMA DA ATIVIDADE =====
adicionar_titulo('1. TEMA DA ATIVIDADE', 1)
adicionar_resposta('Desenvolvimento de um aplicativo web interativo')
adicionar_resposta('Nesta atividade, o estudante desenvolveu o aplicativo "SwipeTune", um aplicativo web interativo para descobrir músicas de forma rápida e divertida.')

adicionar_espaco()

# ===== 2. OBJETIVOS =====
adicionar_titulo('2. OBJETIVOS', 1)
adicionar_resposta('Ao realizar esta atividade, o estudante desenvolveu as seguintes habilidades:')
objetivos = [
    'Planejar uma aplicação antes de iniciar seu desenvolvimento;',
    'Identificar um problema que possa ser solucionado por meio de uma aplicação;',
    'Definir as principais funcionalidades de um sistema;',
    'Elaborar uma descrição clara para orientar o desenvolvimento;',
    'Utilizar uma ferramenta de desenvolvimento assistido;',
    'Analisar o resultado produzido;',
    'Realizar testes;',
    'Identificar problemas;',
    'Solicitar alterações e melhorias;',
    'Verificar se as alterações realmente funcionaram;',
    'Compreender a relação entre interface, interação e comportamento de uma aplicação.'
]
for obj in objetivos:
    adicionar_resposta('• ' + obj)

adicionar_espaco()

# ===== 3. O DESAFIO =====
adicionar_titulo('3. O DESAFIO', 1)
adicionar_resposta('O estudante desenvolveu um pequeno aplicativo web útil, interativo e funcional.')
adicionar_resposta('Tema escolhido: Música')
adicionar_resposta('Aplicativo desenvolvido: SwipeTune - Descubra músicas arrastando para cima!')

adicionar_espaco()

# ===== 4. REQUISITOS MÍNIMOS =====
adicionar_titulo('4. REQUISITOS MÍNIMOS', 1)
adicionar_resposta('O aplicativo SwipeTune possui todos os requisitos mínimos:')

requisitos = [
    ('1. Título', 'O nome "SwipeTune" aparece de forma clara no topo da tela.'),
    ('2. Descrição', 'A frase "Descubra músicas arrastando para cima!" explica a finalidade do aplicativo.'),
    ('3. Informações', 'O aplicativo apresenta: nome da música, nome do artista, capa com gradiente, barra de progresso, contadores de curtidas/puladas/bloqueadas e listas de favoritas e bloqueadas.'),
    ('4. Campo de entrada', 'Barra de pesquisa para buscar músicas pelo nome ou artista e campo para digitar o nome do usuário.'),
    ('5. Botão', 'Botões: Like (❤️), Deslike (👎), Salvar (💾), Bloquear (🚫), Pular (⬆️), abas de navegação e botão de configurações.'),
    ('6. Interação', 'O aplicativo responde ao arrastar o cartão para cima (swipe), aos cliques nos botões e à digitação na pesquisa.'),
    ('7. Resultado', 'Depois da interação, a música troca, os contadores atualizam, as listas de favoritas/bloqueadas são atualizadas e mensagens de confirmação aparecem.'),
    ('8. Animação', 'Animações: cartão desliza para cima, coração pulsa, capa flutua, gradiente animado, botões com efeito hover.'),
    ('9. Interface', 'Interface organizada e visualmente agradável, com tema escuro estilo TikTok/Spotify, gradientes e glassmorphism.'),
    ('10. Idioma', 'Todos os textos estão em português do Brasil.')
]
for titulo, descricao in requisitos:
    adicionar_resposta('• ' + titulo + ': ' + descricao)

adicionar_espaco()

# ===== 5. ETAPA 1 — PLANEJAMENTO =====
adicionar_titulo('5. ETAPA 1 — PLANEJAMENTO', 1)

adicionar_pergunta('5.1 Nome do aplicativo')
adicionar_resposta('Nome: SwipeTune — "Descubra músicas arrastando para cima!"')

adicionar_espaco()

adicionar_pergunta('5.2 Qual problema o aplicativo pretende resolver?')
adicionar_resposta('Muitas pessoas perdem tempo procurando músicas novas para ouvir. O SwipeTune resolve esse problema de forma rápida e divertida: o usuário arrasta o cartão da música para cima se não gostar, e continua ouvindo se gostar. Assim, descobre novas músicas em poucos segundos, sem precisar procurar uma por uma.')

adicionar_espaco()

adicionar_pergunta('5.3 Quem utilizará o aplicativo?')
adicionar_resposta('Jovens e amantes de música que gostam de descobrir novas músicas de forma rápida e interativa. O aplicativo é simples de usar, então qualquer pessoa que goste de música pode utilizar.')

adicionar_espaco()

adicionar_pergunta('5.4 O que o usuário poderá fazer?')
acoes = [
    'Arrastar o cartão da música para cima para pular a música;',
    'Curtir (like) ou não gostar (deslike) de uma música;',
    'Pesquisar músicas pelo nome ou artista na barra de pesquisa;',
    'Salvar músicas que gostou na lista de favoritas;',
    'Bloquear músicas que não quer mais ouvir.'
]
for i, acao in enumerate(acoes, 1):
    adicionar_resposta(f'{i}. {acao}')

adicionar_espaco()

adicionar_pergunta('5.5 Qual será a principal ação do aplicativo?')
adicionar_resposta('A principal ação é arrastar o cartão da música para cima (gesto de swipe). Quando o usuário arrasta o cartão para cima, a música atual é pulada com uma animação e a próxima música aparece na tela, começando a tocar automaticamente.')

adicionar_espaco()

# ===== 6. ETAPA 2 — PLANEJAMENTO DA INTERFACE =====
adicionar_titulo('6. ETAPA 2 — PLANEJAMENTO DA INTERFACE', 1)
adicionar_resposta('Desenho simples da tela do aplicativo:')

interface = """+------------------------------------------+
|              🎵 SWIPETUNE                 |
|     Descubra músicas arrastando!          |
+------------------------------------------+
|  [🔍 Barra de pesquisa...]                |
+------------------------------------------+
|  [Início]  [⭐ Favoritas]  [🚫 Bloqueadas]|
+------------------------------------------+
|                                          |
|        ┌──────────────────┐             |
|        │   CAPA DA MÚSICA │             |
|        │   Nome da música  │             |
|        │   Nome do artista │             |
|        └──────────────────┘             |
|                                          |
|   [👎]  [❤️]  [💾]  [🚫]  [⬆️]        |
|                                          |
|  Curtidas: 0  Puladas: 0  Bloqueadas: 0 |
+------------------------------------------+"""

p = doc.add_paragraph()
run = p.add_run(interface)
run.font.name = 'Courier New'
run.font.size = Pt(9)

adicionar_espaco()

# ===== 7. ETAPA 3 — DESENVOLVIMENTO =====
adicionar_titulo('7. ETAPA 3 — DESENVOLVIMENTO', 1)
adicionar_resposta('O aplicativo foi desenvolvido utilizando HTML, CSS e JavaScript, com as seguintes características:')
caracteristicas = [
    'Nome do aplicativo: SwipeTune',
    'Objetivo: Descobrir músicas novas de forma rápida e divertida',
    'Público: Jovens e amantes de música',
    'Informações: Nome da música, artista, capa, barra de progresso, contadores',
    'Campos: Barra de pesquisa e campo de nome do usuário',
    'Botões: Like, Deslike, Salvar, Bloquear, Pular, abas de navegação',
    'Ações: Arrastar para cima, curtir, não gostar, salvar, bloquear, pesquisar',
    'Resultado: Troca de música, listas atualizadas, contadores, mensagens',
    'Aparência: Tema escuro estilo TikTok/Spotify com gradientes e animações',
    'Funcionamento em diferentes tamanhos de tela: Sim, responsivo'
]
for carac in caracteristicas:
    adicionar_resposta('• ' + carac)

adicionar_espaco()

# ===== 8. ETAPA 4 — PRIMEIRO TESTE =====
adicionar_titulo('8. ETAPA 4 — PRIMEIRO TESTE', 1)
adicionar_resposta('Tabela de testes preenchida:')

# Criar tabela de testes
tabela = doc.add_table(rows=11, cols=3)
tabela.style = 'Table Grid'
tabela.alignment = WD_TABLE_ALIGNMENT.CENTER

# Cabeçalho da tabela
cabecalho = tabela.rows[0].cells
cabecalho[0].text = 'Teste'
cabecalho[1].text = 'Funcionou?'
cabecalho[2].text = 'Observação'

# Dados da tabela
testes = [
    ('O aplicativo abriu corretamente?', 'Sim', 'Abriu no navegador sem erros'),
    ('O título aparece corretamente?', 'Sim', '"SwipeTune" aparece no topo da tela'),
    ('Os textos estão em português?', 'Sim', 'Todos os textos estão em português do Brasil'),
    ('O campo de entrada funciona?', 'Sim', 'A barra de pesquisa filtra as músicas corretamente'),
    ('O botão aparece corretamente?', 'Sim', 'Todos os botões aparecem com ícones'),
    ('O botão executa a ação esperada?', 'Sim', 'Like, deslike, bloquear e salvar funcionam'),
    ('O resultado aparece corretamente?', 'Sim', 'A música troca e os contadores atualizam'),
    ('A animação funciona?', 'Sim', 'O cartão desliza para cima com animação'),
    ('A aplicação está organizada visualmente?', 'Sim', 'Interface limpa e moderna estilo TikTok'),
    ('A aplicação funciona em diferentes tamanhos de tela?', 'Sim', 'Funciona no celular e no computador')
]

for i, (teste, funcionou, obs) in enumerate(testes, 1):
    row = tabela.rows[i].cells
    row[0].text = teste
    row[1].text = funcionou
    row[2].text = obs

# Formatar cabeçalho da tabela
for cell in cabecalho:
    for paragraph in cell.paragraphs:
        for run in paragraph.runs:
            run.bold = True

adicionar_espaco()

# ===== 9. ETAPA 5 — IDENTIFICANDO PROBLEMAS =====
adicionar_titulo('9. ETAPA 5 — IDENTIFICANDO PROBLEMAS', 1)
adicionar_pergunta('Problema encontrado:')
adicionar_resposta('Nenhum problema grave foi encontrado nos testes iniciais.')
adicionar_pergunta('O que deveria acontecer?')
adicionar_resposta('Todas as funcionalidades deveriam funcionar corretamente.')
adicionar_pergunta('O que realmente aconteceu?')
adicionar_resposta('Todas as funcionalidades funcionaram corretamente. Pequenos ajustes visuais foram feitos para melhorar a experiência.')

adicionar_espaco()

# ===== 10. ETAPA 6 — CORREÇÃO =====
adicionar_titulo('10. ETAPA 6 — CORREÇÃO', 1)
adicionar_pergunta('Problema corrigido?')
adicionar_resposta('(X) Sim')
adicionar_pergunta('O que foi alterado?')
adicionar_resposta('Ajustes visuais na interface para melhorar a organização dos botões e a legibilidade dos textos.')
adicionar_pergunta('O problema foi resolvido?')
adicionar_resposta('(X) Sim')

adicionar_espaco()

# ===== 11. ETAPA 7 — MELHORIA =====
adicionar_titulo('11. ETAPA 7 — MELHORIA', 1)
adicionar_pergunta('Minha melhoria será:')
adicionar_resposta('Adicionar uma barra de progresso da música com o tempo decorrido, para o usuário saber quanto tempo falta para a música terminar.')

adicionar_espaco()

# ===== 12. DESAFIO EXTRA =====
adicionar_titulo('12. DESAFIO EXTRA', 1)
adicionar_pergunta('Minha funcionalidade extra:')
adicionar_resposta('Sistema de favoritas com lista separada — o usuário pode salvar as músicas que gostou e acessá-las a qualquer momento na aba "Favoritas".')
adicionar_pergunta('Por que escolhi essa funcionalidade?')
adicionar_resposta('Porque permite que o usuário não perca as músicas que gostou, podendo ouvi-las novamente quando quiser. Isso torna o aplicativo mais útil e completo.')

adicionar_espaco()

# ===== 13. REFLEXÃO SOBRE A ATIVIDADE =====
adicionar_titulo('13. REFLEXÃO SOBRE A ATIVIDADE', 1)

adicionar_pergunta('1. Qual foi a maior dificuldade encontrada durante o desenvolvimento?')
adicionar_resposta('A maior dificuldade foi implementar o gesto de arrastar o cartão para cima (swipe), pois foi necessário programar a detecção do movimento do mouse e do toque na tela, além da animação de transição entre as músicas.')

adicionar_espaco()

adicionar_pergunta('2. O aplicativo ficou exatamente como você havia planejado?')
adicionar_resposta('(X) Sim')
adicionar_resposta('Explique: O aplicativo ficou como planejado, com todas as funcionalidades funcionando e a interface visual agradável.')

adicionar_espaco()

adicionar_pergunta('3. Você encontrou algum problema durante os testes?')
adicionar_resposta('(X) Não')
adicionar_resposta('Se sim, qual? — (não se aplica)')

adicionar_espaco()

adicionar_pergunta('4. Como você resolveu o problema?')
adicionar_resposta('(não se aplica — nenhum problema grave foi encontrado)')

adicionar_espaco()

adicionar_pergunta('5. O que você aprendeu durante esta atividade?')
adicionar_resposta('Aprendi a planejar um aplicativo antes de desenvolver, a organizar as funcionalidades, a criar uma interface visual agradável e a testar cada função para verificar se tudo funciona corretamente. Também aprendi como funciona a interação entre o usuário e o aplicativo.')

adicionar_espaco()

adicionar_pergunta('6. Se tivesse mais tempo, o que acrescentaria ao aplicativo?')
adicionar_resposta('Acrescentaria um modo escuro/claro, a possibilidade de criar playlists personalizadas e um sistema de recomendação que sugere músicas parecidas com as que o usuário curtiu.')

adicionar_espaco()

# ===== 14. APRESENTAÇÃO =====
adicionar_titulo('14. APRESENTAÇÃO', 1)
adicionar_resposta('Resumo para apresentação ao professor:')

apresentacao = [
    ('Nome do aplicativo:', 'SwipeTune'),
    ('Problema que resolve:', 'Ajuda a descobrir músicas novas de forma rápida e divertida'),
    ('Público-alvo:', 'Jovens e amantes de música'),
    ('Principais funcionalidades:', 'Swipe para pular, like, deslike, bloquear, pesquisar, salvar favoritas'),
    ('Como o usuário interage:', 'Arrasta o cartão para cima, clica nos botões e pesquisa músicas'),
    ('Uma dificuldade encontrada:', 'Implementar o gesto de arrastar (swipe)'),
    ('Como o problema foi solucionado:', 'Programando a detecção de movimento do mouse e toque'),
    ('Uma melhoria realizada:', 'Barra de progresso da música e lista de favoritas')
]
for pergunta, resposta in apresentacao:
    adicionar_resposta('• ' + pergunta + ' ' + resposta)

adicionar_espaco()

# ===== 16. ORIENTAÇÕES IMPORTANTES =====
adicionar_titulo('16. ORIENTAÇÕES IMPORTANTES', 1)
adicionar_resposta('Durante a atividade, o estudante:')
orientacoes = [
    'Leu todas as etapas antes de começar;',
    'Planejou antes de desenvolver;',
    'Não teve pressa para finalizar;',
    'Testou todas as funcionalidades;',
    'Observou atentamente o resultado;',
    'Investigou problemas quando algo não funcionou;',
    'Fez alterações de maneira organizada;',
    'Testou novamente depois de cada alteração;',
    'Compreendeu e conseguiu explicar aquilo que desenvolveu.'
]
for orientacao in orientacoes:
    adicionar_resposta('• ' + orientacao)

adicionar_espaco()

# ===== 17. ENTREGA =====
adicionar_titulo('17. ENTREGA', 1)
adicionar_resposta('Ao finalizar a atividade, o estudante entregou:')
entregas = [
    '1. Aplicativo funcionando (SwipeTune)',
    '2. Planejamento preenchido',
    '3. Tabela de testes preenchida',
    '4. Registro dos problemas encontrados e das correções realizadas',
    '5. Respostas da reflexão',
    '6. Apresentação do aplicativo ao professor'
]
for entrega in entregas:
    adicionar_resposta('• ' + entrega)

# ===== Salvar documento =====
doc.save('ROTEIRO_RESPONDIDO.docx')
print('✅ Documento ROTEIRO_RESPONDIDO.docx gerado com sucesso!')