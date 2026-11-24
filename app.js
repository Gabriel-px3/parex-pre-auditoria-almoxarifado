/* ==========================================================================
   PAREX ENGENHARIA S/A — PORTAL DE PRÉ-AUDITORIA DO ALMOXARIFADO & MATRIZ MR-03-001
   Padrão ABNT NBR ISO 9001:2015 | FO-08-031 Rev. 2 | PIT PI-1000KN-Q-500004
   - Início do Zero (opção de limpar todas as seleções a qualquer momento)
   - Seleção de Disciplinas no roteiro exato do auditor:
     1. Instrumentos Calibrados e Controle (com campos manuais de Nº de TAG)
     2. Treinamentos conforme Matriz MR-03-001 (selecionando colaboradores do efetivo)
     3. Máquinas de Solda (com campos manuais de TAG e RCI FO-08-018)
     4. Estufas e Consumíveis de Solda (com campos manuais de Nº de Lote e TAG de Estufa)
     5. Qualificação de Soldadores (com campos manuais de Sinetes de Soldadores)
     6. Recebimento, Preservação (RPE) e Controle de Estoque do Almoxarifado
   - Assinatura do Auditado em aberto
   - Salvamento automático a cada 3 minutos (180s) + salvamento instantâneo
   ========================================================================== */

(function () {
  const STORAGE_KEY = "PAREX_PRE_AUDITORIA_ALMOX_V2_ZERO";
  const AUTOSAVE_INTERVAL_MS = 3 * 60 * 1000; // 3 minutos (180.000 ms)

  // Sequential Disciplines matching the auditor's inspection flow
  const DISCIPLINES = [
    {
      key: "METROLOGIA",
      step: 1,
      title: "Instrumentos Calibrados e Controle",
      shortTitle: "1. Instrumentos Calibrados",
      code: "IT-03-001 R04 • TB-03-002 R14 • FO-03-022",
      tab: "pit"
    },
    {
      key: "TREINAMENTOS",
      step: 2,
      title: "Treinamentos (Matriz MR-03-001 × Efetivo)",
      shortTitle: "2. Matriz de Treinamentos",
      code: "MR-03-001 Rev. 8 • IT-03-002 R04",
      tab: "treinamentos"
    },
    {
      key: "MAQ_SOLDA",
      step: 3,
      title: "Máquinas de Solda (Calibração RCI)",
      shortTitle: "3. Máquinas de Solda",
      code: "IT-08-009 R05 • FO-08-018 (RCI)",
      tab: "pit"
    },
    {
      key: "CONSUMIVEIS",
      step: 4,
      title: "Estufas e Consumíveis de Solda (Lotes)",
      shortTitle: "4. Estufas & Consumíveis",
      code: "IT-08-002-PP R0 • FO-08-014 • FO-08-008",
      tab: "pit"
    },
    {
      key: "SOLDADORES",
      step: 5,
      title: "Qualificação de Soldadores e Sinetes",
      shortTitle: "5. Qualificação & Sinetes",
      code: "IT-08-001 • IT-08-005 • FO-08-005 (RQS)",
      tab: "pit"
    },
    {
      key: "ALMOX_GERAL",
      step: 6,
      title: "Recebimento, Preservação (RPE) e Estoque",
      shortTitle: "6. Recebimento, RPE & Estoque",
      code: "IT-12-001 R11 • IT-08-068 R03 • PIT §1.0",
      tab: "pit"
    }
  ];

  // Clean start-from-zero PIT & Discipline Checklist Items (status = "PEND")
  function getCleanPitItems() {
    return [
      // DISCIPLINA 1: INSTRUMENTOS CALIBRADOS E CONTROLE
      {
        id: "PIT-2.2",
        discipline: "METROLOGIA",
        code: "PIT 2.2 / DISC-01",
        iso: "ISO 9001: 7.1.5",
        proc: "IT-03-001 R04 • TB-03-002 R14",
        forms: "FO-03-022 Rev. 2",
        title: "Controle de Instrumentos de Medição Calibrados e Planilha Mestra FO-03-022",
        desc: "Verificação física das TAGs de instrumentos no almoxarifado/campo, validade dos certificados RBC, critérios de aceitação TB-03-002 R14 e status na FO-03-022.",
        status: "PEND",
        criteria: [
          { text: "Instrumentos inspecionados possuem etiqueta física de calibração legível (Nº TAG, Nº Certificado RBC e Data de Validade)", checked: false },
          { text: "TAGs verificadas constam cadastradas e atualizadas na planilha canônica FO-03-022 no Parex Hub", checked: false },
          { text: "Inexistência de instrumentos vencidos na FO-03-022 com a coluna Observação em branco (todos com baixa 'Recolhido' ou 'Retirado da obra')", checked: false },
          { text: "Análise crítica dos certificados RBC frente aos erros máximos da TB-03-002 Rev. 14 e baia trancada para segregação de vencidos", checked: false }
        ],
        evidence: "",
        action: ""
      },

      // DISCIPLINA 3: MÁQUINAS DE SOLDA
      {
        id: "DISC-MAQ-01",
        discipline: "MAQ_SOLDA",
        code: "IT-08-009 / DISC-03",
        iso: "ISO 9001: 7.1.5.1 / 8.5.1",
        proc: "IT-08-009 Rev. 05 • TB-03-002 Rev. 14",
        forms: "FO-08-018 (RCI) • Matriz RACI",
        title: "Calibração Semestral e Controle de Máquinas de Solda (FO-08-018 RCI)",
        desc: "Verificação das TAGs das máquinas de solda, selo físico de aferição, validade semestral (6 meses conforme TB-03-002 R14) e desvio máximo de 20%.",
        status: "PEND",
        criteria: [
          { text: "Máquinas de solda inspecionadas possuem selo físico e Relatório de Calibração Interna (FO-08-018 RCI) vigente (validade 6 meses)", checked: false },
          { text: "Desvio entre amperímetro/voltímetro da máquina e alicate padrão dentro do limite máximo de 20% (IT-08-009 R05)", checked: false },
          { text: "Alertas automáticos de vencimento (15 e 7 dias) e quadros de gestão à vista com a relação de máquinas atualizados nas frentes", checked: false },
          { text: "Bloqueio físico no almoxarifado/manutenção impedindo liberação de máquina de solda com calibração vencida", checked: false }
        ],
        evidence: "",
        action: ""
      },

      // DISCIPLINA 4: ESTUFAS E CONSUMÍVEIS DE SOLDA
      {
        id: "PIT-1.9",
        discipline: "CONSUMIVEIS",
        code: "PIT 1.9 / DISC-04A",
        iso: "ISO 9001: 8.5.1 / 8.5.2 / 8.5.4",
        proc: "IT-08-002-PP R0 (IT-08-002 R08)",
        forms: "FO-08-014 (RC) • FO-08-008 • FO-12-008",
        title: "Sala de Consumíveis, Rastreabilidade de Lotes e Estufas de Ressecagem / Manutenção",
        desc: "Inspeção da sala climatizada do almoxarifado, números de lote/corrida de eletrodos e arames, estufas estacionárias (FO-08-008) e requisição FO-08-014.",
        status: "PEND",
        criteria: [
          { text: "Sala de armazenamento climatizada com Umidade Relativa < 50% e Temperatura ≥ 20°C registradas diariamente (termohigrômetro calibrado)", checked: false },
          { text: "Lotes de consumíveis (eletrodos/varetas/bobinas) identificados com Certificado de Qualidade, RIR (FO-12-008) e segregados por especificação AWS/bitola", checked: false },
          { text: "Estufas de ressecagem (até 500°C) e estufas de manutenção (100°C a 150°C) com TAG calibrada e planilha/gráfico FO-08-008 preenchido", checked: false },
          { text: "Saída e distribuição de consumíveis realizada exclusivamente mediante Requisição de Consumível (FO-08-014 RC) assinada", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "DISC-ESTUFA-02",
        discipline: "CONSUMIVEIS",
        code: "IT-08-009 / DISC-04B",
        iso: "ISO 9001: 7.1.5 / 8.5.4",
        proc: "IT-08-009 R05 • IT-08-002-PP R0",
        forms: "FO-08-058 • FO-08-018 (RCI)",
        title: "Controle e Aferição de Estufas Portáteis (Cochichos) e Devolução de Consumíveis",
        desc: "Inspeção das TAGs das estufas portáteis (cochichos), aferição mensal de temperatura (80°C a 120°C) e retorno de eletrodos básicos ao final do turno.",
        status: "PEND",
        criteria: [
          { text: "Estufas portáteis (cochichos) identificadas por TAG individual e com aferição válida registrada no FO-08-058 / FO-08-018", checked: false },
          { text: "Cochichos utilizados pelos soldadores conectados à rede elétrica (aquecidos entre 80°C e 120°C) e contendo apenas um tipo/bitola de eletrodo", checked: false },
          { text: "Controle de devolução e descarte/re-ressecagem de eletrodos ao final da jornada conforme IT-08-002-PP R0", checked: false }
        ],
        evidence: "",
        action: ""
      },

      // DISCIPLINA 5: QUALIFICAÇÃO DE SOLDADORES E SINETES
      {
        id: "DISC-SOLD-01",
        discipline: "SOLDADORES",
        code: "IT-08-001 / DISC-05",
        iso: "ISO 9001: 7.2 / 8.5.1 / 8.5.2",
        proc: "IT-08-001 • IT-08-005 • IT-13-010",
        forms: "FO-08-005 (RQS) • Relação de Soldadores Qualificados",
        title: "Qualificação de Soldadores, Controle de Sinetes, Continuidade e Crachá de Liberação",
        desc: "Verificação nominal dos sinetes dos soldadores, RQS aprovada (ASME IX / AWS D1.1), controle semestral de continuidade e treinamentos obrigatórios.",
        status: "PEND",
        criteria: [
          { text: "Soldador possui Sinete único cadastrado na Relação de Soldadores Qualificados e RQS (FO-08-005) aprovada para o processo/posição/diâmetro", checked: false },
          { text: "Soldador porta crachá/carteirinha de qualificação atualizado indicando sinete, processos liberados (ER, TIG, MIG/MAG, FCAW) e validade", checked: false },
          { text: "Controle de continuidade de soldagem atualizado (sem interrupção superior a 6 meses no processo qualificado)", checked: false },
          { text: "Soldador possui evidência de treinamento na IT-08-002 (Consumíveis), IT-08-005 e IT-13-010 (Trabalho a Quente — exigido na RNC-03634/26)", checked: false }
        ],
        evidence: "",
        action: ""
      },

      // DISCIPLINA 6: RECEBIMENTO, PRESERVAÇÃO (RPE) E ESTOQUE DO ALMOXARIFADO
      {
        id: "PIT-1.2",
        discipline: "ALMOX_GERAL",
        code: "PIT 1.2 / 1.3",
        iso: "ISO 9001: 8.4 / 8.5.3 / 8.6",
        proc: "IT-12-001 R11 • IT-08-068 R03",
        forms: "FO-12-008 (RIR) • PG-12-001 R10",
        title: "Recebimento de Materiais Parex e Materiais Fornecidos pelo Cliente (Vale)",
        desc: "Conferência de Nota Fiscal × Pedido de Compra (com requisitos de qualidade), Certificado de Fabricação, Packing List Vale e emissão do FO-12-008 (RIR).",
        status: "PEND",
        criteria: [
          { text: "Conferência física NF × Pedido de Compra (com requisitos de qualidade, ex: subfornecedor INDEX) e emissão do FO-12-008 RIR no Parex Hub", checked: false },
          { text: "Certificados de qualidade de matéria-prima/fabricante anexados e rastreáveis ao lote recebido", checked: false },
          { text: "Inspeção conjunta no recebimento de materiais/equipamentos Vale (ISO 8.5.3) com abertura imediata de plano de preservação (FO-08-109 PP)", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "PIT-1.5",
        discipline: "ALMOX_GERAL",
        code: "PIT 1.4 a 1.7",
        iso: "ISO 9001: 8.5.4",
        proc: "IT-08-068 (PR-1000KN-Q-500018 R03)",
        forms: "FO-08-109 PP (RPE) • Etiqueta Padrão",
        title: "Armazenamento e Preservação de Equipamentos Mecânicos, Tubulação, Estruturas e Elétrica (RPE)",
        desc: "Verificação das etiquetas físicas de preservação (TAG, Data, Nº do RPE e Revisão) batendo com o sistema Parex Hub (ED-1310KN-01, TR-137 e pátios).",
        status: "PEND",
        criteria: [
          { text: "Etiqueta física padrão (TAG, Data, Nº do RPE e Revisão) afixada na peça batendo 100% com o último RPE emitido no Parex Hub (ex: ED-1310KN-01)", checked: false },
          { text: "Tambores revestidos de borracha (ex: TR-1310KN-137) e equipamentos rotativos protegidos contra intempéries, sol direto e contato com o solo", checked: false },
          { text: "Tubos, flanges, válvulas e estruturas sobre dormentes de madeira, com tampões nas extremidades e segregação inox × carbono", checked: false },
          { text: "Painéis elétricos e instrumentos armazenados em área fechada/coberta seca com controle de sílica gel e aquecimento", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "PIT-1.8",
        discipline: "ALMOX_GERAL",
        code: "PIT 1.8 / 2.1",
        iso: "ISO 9001: 8.5.2 / 8.5.4",
        proc: "IT-12-001 R11 • IT-13-048 R02 • IT-08-007 R03",
        forms: "FO-12-006 • FO-13-154 • FO-08-093 • FO-08-100",
        title: "Produtos Químicos (FISPQ / Validade FO-12-006) e Rastreabilidade de Materiais e Parafusos",
        desc: "Armazenamento de tintas/solventes/graxas com contenção, controle de validade FEFO, Kit de Mitigação e rastreabilidade de corrida/certificado.",
        status: "PEND",
        criteria: [
          { text: "Baia de produtos químicos com bacia de contenção, ventilação, etiqueta de validade FO-12-006 e 100% das FISPQs/FDS (FO-13-154)", checked: false },
          { text: "Kit de Mitigação Ambiental completo e conferido fisicamente (incluindo pás de plástico e mantas absorventes)", checked: false },
          { text: "Prateleiras, tubos e lotes de parafusos estruturais/estudados identificados por TAG, corrida e certificado de origem (FO-08-093 / FO-08-100)", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "CAN-11",
        discipline: "ALMOX_GERAL",
        code: "IT-12-001 §5.5",
        iso: "ISO 9001: 7.5.3 / 8.5.1 / 8.7",
        proc: "IT-12-001 R11 • PG-03-001 R12",
        forms: "FO-12-003 • FO-12-004 • FO-12-005 • CH-12-026",
        title: "Conciliação de Estoque (Físico × FO-12-004 × Romaneio FO-12-003), Quarentena e QR Code Central",
        desc: "Batimento entre saldo físico na prateleira, planilha de controle FO-12-004 e Romaneios de Saída FO-12-003 assinados, área de quarentena e acesso à IT-12-001 R11.",
        status: "PEND",
        criteria: [
          { text: "Batimento 100% entre o saldo físico na prateleira e a planilha de estoque FO-12-004, com todas as saídas respaldadas por Romaneio FO-12-003 assinado", checked: false },
          { text: "Área de Quarentena / Material Não Conforme (ISO 8.7) isolada, trancada e identificada, e checklist 5S (CH-12-026) atualizado", checked: false },
          { text: "QR Code da Central de Procedimentos Parex Hub afixado no almoxarifado (abrindo a IT-12-001 Rev. 11 sem login) e equipe ciente do procedimento", checked: false }
        ],
        evidence: "",
        action: ""
      }
    ];
  }

  // Clean start-from-zero Recurrence Items (status = "PEND")
  function getCleanRecItems() {
    return [
      {
        id: "REC-01",
        rnc: "RNC-03628/26 (Parte A)",
        history: "Reincidência Trienal: 09136/24 e 09138/24 (2024) → 07910/25 (2025) → 03628/26 (2026)",
        iso: "ISO 9001: 7.1.5 / 10.2",
        proc: "IT-03-001 R04 • TB-03-002 R14",
        forms: "FO-03-022 Rev. 2",
        title: "Inspeção Nominal dos 4 Instrumentos Auditados pela Vale (Paquímetro 18563, Trena 5080, Luxímetro PX14290, Pirômetro 14302)",
        desc: "Verificação pontual no Almoxarifado/Metrologia e na planilha canônica FO-03-022 dos 4 instrumentos citados nominalmente na RNC-03628/26.",
        status: "PEND",
        criteria: [
          { text: "1. Paquímetro 18563/26 (STARRETT, Cód. 18563, Item 3836 na FO-03-022): Calibrado em 23/02/2026, Venc. 23/02/2027 — certificado RBC anexado e selo físico OK", checked: false },
          { text: "2. Trena 5080 / TRN-5080/26 (LUFKÍN, Cód. TRN-5080, Item 4446 em obra): Calibrada em 03/04/2026, Venc. 03/04/2027 — duplicidade com Item 6612 baixada como 'Retirado da obra'", checked: false },
          { text: "3. Luxímetro PX14290 (MINIPA, Cód. PX14290, Item 1753, Cert. 1274224728999137680): Vencido desde 07/08/2026 — verificar lançamento da observação de baixa/recolhimento na FO-03-022", checked: false },
          { text: "4. Pirômetro / Termômetro Laser 14302/26 (MINIPA, Cód. 14302, Item 4123): Calibrado em 08/04/2026, Venc. 08/04/2027 — nota técnica esclarecendo erro de grafia '14002/26' para '14302/26'", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-02",
        rnc: "RNC-03628/26 (Parte B)",
        history: "Passivo Sistêmico da Planilha Canônica FO-03-022 (Corte 20/11/2026)",
        iso: "ISO 9001: 7.1.5.2",
        proc: "IT-03-001 R04",
        forms: "FO-03-022 (1.092 registros / 899 ativos)",
        title: "Saneamento dos 130 Instrumentos Vencidos Sem Observação na FO-03-022",
        desc: "Verificar se todas as linhas vencidas na FO-03-022 possuem observação preenchida ('Recolhido', 'Retirado da obra', 'Não localizado') e segregação física.",
        status: "PEND",
        criteria: [
          { text: "Conferência das linhas vencidas da FO-03-022 garantindo zero instrumento vencido com a coluna Observação em branco", checked: false },
          { text: "Inspeção física nas prateleiras do Almoxarifado/Ferramentaria garantindo que nenhum instrumento vencido esteja disponível para entrega", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-03",
        rnc: "RNC-03630/26",
        history: "Falha de Acesso e Conhecimento da IT-012-001 Rev. 11 no Almoxarifado",
        iso: "ISO 9001: 7.2 / 7.3 / 7.5.3",
        proc: "IT-12-001 Rev. 11 • PG-03-001 R12",
        forms: "4 Listas de Presença Almox. • QR Code Central",
        title: "Conhecimento da IT-12-001 Rev. 11 pelo Encarregado de Almoxarifado e Acesso via QR Code",
        desc: "Entrevistar encarregado e equipe do almoxarifado sobre a IT-012-001_r11 e testar abertura via QR Code da Central de Procedimentos sem login.",
        status: "PEND",
        criteria: [
          { text: "Banner e folha A4 plastificada com QR Code da Central de Procedimentos Parex Hub instalados no almoxarifado (acesso livre sem login)", checked: false },
          { text: "Validação das 4 listas de presença do almoxarifado confirmando citação expressa da IT-012-001 Rev. 11 e assinatura da liderança", checked: false },
          { text: "Sabatina prática com encarregado e almoxarifes abrindo a IT-12-001 R11 pelo celular e respondendo sobre o fluxo do procedimento", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-04",
        rnc: "RNC-03633/26",
        history: "Reincidência Direta: RNC-07917/25 (2025) → RNC-03633/26 (2026)",
        iso: "ISO 9001: 8.5.4 / 10.2",
        proc: "IT-08-068 (PR-1000KN-Q-500018 R03)",
        forms: "FO-08-109 PP (RPE 899 e RPE 561)",
        title: "Batimento Físico Etiqueta × RPE no ED-1310KN-01 (TR-1310KN-124 e TR-1310KN-128)",
        desc: "Inspecionar in loco no ED-1310KN-01 se as etiquetas físicas do TR-1310KN-124 e TR-1310KN-128 foram trocadas pelo modelo novo (TAG, Data, Nº RPE e Revisão).",
        status: "PEND",
        criteria: [
          { text: "Verificação in loco no ED-1310KN-01 do equipamento TR-1310KN-124 (etiqueta física com TAG, Data, Nº RPE e Revisão batendo com o último RPE do sistema)", checked: false },
          { text: "Verificação in loco no ED-1310KN-01 do equipamento TR-1310KN-128 (etiqueta física com TAG, Data, Nº RPE e Revisão batendo com o último RPE do sistema)", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-05",
        rnc: "RNC-00404/26 e RNC-00406/26",
        history: "Falha de Preservação de Tambores do TR-1310KN-137 (Planos 001719 e 001720)",
        iso: "ISO 9001: 8.5.4 / 8.7",
        proc: "IT-08-068 R03 • PIT PI-1000KN-Q-500004 §1.5",
        forms: "FO-08-109 PP (RPE) • DDS Equipe Preservação",
        title: "Preservação Física dos Tambores de Esticamento e Acionamento do TR-1310KN-137 (TR-137)",
        desc: "Inspecionar proteção das borrachas dos tambores do TR-137 (Planos 001719 e 001720), novo RPE emitido e DDS assinado pela equipe atual de preservação.",
        status: "PEND",
        criteria: [
          { text: "Proteção física das borrachas de revestimento dos tambores de esticamento e acionamento do TR-1310KN-137 e emissão de novo RPE atualizado", checked: false },
          { text: "Lista assinada do DDS específico com a equipe atual de preservação sobre os manuais do fabricante e PIT §1.5", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-06",
        rnc: "RNC-00807/26",
        history: "Máquinas de Solda com Calibração Vencida nas Frentes de Serviço",
        iso: "ISO 9001: 7.1.5.1 / 8.5.1",
        proc: "IT-08-009 Rev. 05 • TB-03-002 Rev. 14",
        forms: "FO-08-018 (RCI) • Matriz RACI",
        title: "Controle de Calibração Semestral de Máquinas de Solda (FO-08-018 RCI)",
        desc: "Conferir emissão de RCI no Parex Hub (validade 6 meses, erro máx. 20%), alertas de 15 e 7 dias, quadros nas frentes e treinamentos de 17/10, 28/10 e 29/10.",
        status: "PEND",
        criteria: [
          { text: "100% das máquinas de solda verificadas com RCI (FO-08-018) válido emitido pelo sistema e quadros de gestão à vista atualizados nas frentes", checked: false },
          { text: "Listas de presença assinadas dos treinamentos na IT-08-009 R05 (17/10, 28/10 e 29/10/2026) e Matriz RACI disponíveis", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-07",
        rnc: "RNC-03629/26 + NC 03 GQ (FO-128)",
        history: "Auditoria Vale (Suportes SPCI INDEX) + Auditoria Interna GQ 19/11/2026 (FO-128 págs. 15–16)",
        iso: "ISO 9001: 8.4.2 / 8.5.1 / 8.5.2",
        proc: "IT-12-001 Rev. 11 • PG-12-001 R10",
        forms: "FO-12-008 (RIR) • FO-12-003 • FO-12-004",
        title: "RIR do Subfornecedor INDEX (SPCI) e Conciliação dos 5 Itens Divergentes do Estoque (NC 03 GQ)",
        desc: "Conferir Pedido + RIR dos suportes SPCI (INDEX) e recontar fisicamente as Camisas 38 e 42, Regulador Argônio, Pá de Plástico do Kit Mitigação e Cinta nº 3743.",
        status: "PEND",
        criteria: [
          { text: "RNC-03629/26 (Subfornecedor INDEX — Suportes SPCI): Pedido/Contrato com requisitos de qualidade + RIR (FO-12-008) arquivados", checked: false },
          { text: "NC 03 GQ: Camisa Operacional Tam. 38 (Romaneios 5016, 4872, 4800, 4695) e Tam. 42 (Romaneio 22/10) conciliadas entre estoque físico e planilha FO-12-004", checked: false },
          { text: "NC 03 GQ: Regulador de Pressão Argônio (Romaneios 4899, 4862, 4850), Pá de Plástico do Kit Mitigação (Romaneio 4916) e Cinta nº 3743 regularizados", checked: false }
        ],
        evidence: "",
        action: ""
      },
      {
        id: "REC-08",
        rnc: "RNC-03625/26, RNC-03634/26 e DNV NC 6",
        history: "Reincidência Trienal: 09134/24 (2024) → 07909/25 (2025) → 03625/26, 03634/26 e DNV NC 6 (2026)",
        iso: "ISO 9001: 7.2 / 7.3 / 10.2",
        proc: "IT-03-002 R04 • MA-09-001 R24 • PG-03-003 R10",
        forms: "MR-03-001 Rev. 8 • Listas Assinadas",
        title: "Cruzamento Efetivo × Função × Matriz MR-03-001 (Amostra de Colaboradores, Inspetores e Soldadores)",
        desc: "Auditar colaboradores pela função na Aba 2 (Matriz de Treinamentos), incluindo equipe do Almoxarifado, Inspetor Jorge Mauricio (054623) e Soldador Juveci (038768).",
        status: "PEND",
        criteria: [
          { text: "Verificação por amostragem na Matriz MR-03-001 (Aba 2) comprovando treinamentos obrigatórios da função para a equipe do Almoxarifado", checked: false },
          { text: "Verificação nominal RNC-03634/26: Inspetor Jorge Mauricio Alves Franco (054623) em IT-08-005 e IT-03-001, e Soldadores em IT-08-002 e IT-13-010", checked: false }
        ],
        evidence: "",
        action: ""
      }
    ];
  }

  // Empty initial manual logs (1 blank row in each discipline table ready for manual typing)
  function getCleanManualLogs() {
    return {
      instruments: [
        { tag: "", description: "", certRbc: "", validity: "", inFo03022: "SIM", status: "PEND", notes: "" }
      ],
      weldingMachines: [
        { tag: "", modelLocation: "", rciNumber: "", validity: "", deviationPct: "", status: "PEND", notes: "" }
      ],
      consumablesOvens: [
        { lotNumber: "", awsSpec: "", ovenTag: "", tempHumidity: "", reqFo08014: "", status: "PEND", notes: "" }
      ],
      welderStamps: [
        { sinete: "", welderNameChapa: "", processRqs: "", continuityIt13010: "", status: "PEND", notes: "" }
      ]
    };
  }

  // Application State (Starts from Zero by default!)
  let state = {
    activeTab: "pit",
    disciplineView: "ALL",
    selectedDisciplines: {
      METROLOGIA: true,
      TREINAMENTOS: true,
      MAQ_SOLDA: true,
      CONSUMIVEIS: true,
      SOLDADORES: true,
      ALMOX_GERAL: true
    },
    pitFilter: "ALL",
    recFilter: "ALL",
    matrixSectorFilter: "ALL",
    matrixCargoFilter: "ALL",
    matrixStatusFilter: "ALL",
    matrixSearch: "",
    selectedChapa: "030282",
    auditedChapas: [], // Tracks which employees the auditor has inspected/selected in this session
    meta: {
      auditor: "Gabriel Pereira dos Santos",
      auditorRole: "Técnico em Qualidade • CRT - 5359772/2024",
      auditado: "", // Open by default as requested!
      area: "Operacional — Almoxarifado, Metrologia, Solda, Consumíveis e Preservação",
      local: "PABH 041 22 - Vale - Projeto de Adequação da Usina 1 - Parauapebas-PA (N1341)",
      data: "2026-11-24",
      hora: "10:15:00",
      objetivo: "Verificação preventiva de conformidade do Almoxarifado frente ao Plano FO-08-031 Rev. 2 (Requisitos ISO 9001: 5.1, 5.2, 7.1.5, 7.2, 7.3, 7.5.3, 8.1, 8.4, 8.5.1 a 8.5.6, 8.6, 8.7 e 10.2), PIT PI-1000KN-Q-500004 (Seções 1.0 e 2.0), Reincidências SGI 2024–2026 e Matriz MR-03-001 Rev. 8."
    },
    pitItems: getCleanPitItems(),
    recItems: getCleanRecItems(),
    manualLogs: getCleanManualLogs(),
    trainingRecords: {}, // Empty when starting from zero!
    auditeeSignatureDataUrl: null, // Blank canvas when starting from zero!
    lastSavedAt: null
  };

  let nextAutoSaveCountdownSec = 180;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.pitItems && parsed.recItems) {
          state.meta = Object.assign({}, state.meta, parsed.meta || {});
          state.selectedDisciplines = Object.assign({}, state.selectedDisciplines, parsed.selectedDisciplines || {});
          state.pitItems = parsed.pitItems;
          state.recItems = parsed.recItems;
          state.manualLogs = Object.assign(getCleanManualLogs(), parsed.manualLogs || {});
          state.trainingRecords = parsed.trainingRecords || {};
          state.auditedChapas = Array.isArray(parsed.auditedChapas) ? parsed.auditedChapas : [];
          state.auditeeSignatureDataUrl = parsed.auditeeSignatureDataUrl || null;
          state.lastSavedAt = parsed.lastSavedAt || null;
        }
      }
    } catch (e) {
      console.warn("Erro ao carregar estado salvo:", e);
    }
  }

  function saveState(isScheduledAutoSave) {
    try {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      state.lastSavedAt = `${hh}:${mm}:${ss}`;

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        meta: state.meta,
        selectedDisciplines: state.selectedDisciplines,
        pitItems: state.pitItems,
        recItems: state.recItems,
        manualLogs: state.manualLogs,
        trainingRecords: state.trainingRecords,
        auditedChapas: state.auditedChapas,
        auditeeSignatureDataUrl: state.auditeeSignatureDataUrl,
        lastSavedAt: state.lastSavedAt
      }));

      if (isScheduledAutoSave) {
        nextAutoSaveCountdownSec = 180;
      }
      updateAutoSaveBadge();
    } catch (e) {
      console.warn("Não foi possível salvar no localStorage:", e);
    }
  }

  function updateAutoSaveBadge() {
    const pill = document.getElementById("autoSaveStatusPill");
    if (!pill) return;
    const min = Math.floor(nextAutoSaveCountdownSec / 60);
    const sec = String(nextAutoSaveCountdownSec % 60).padStart(2, "0");
    const savedStr = state.lastSavedAt ? `Salvo às ${state.lastSavedAt}` : "Pronto";
    pill.textContent = `💾 Auto-Save (3 min): ${savedStr} • próx. ${min}:${sec}`;
  }

  function startAutoSaveTimer() {
    // Explicit 3-minute auto-save cycle + 1s countdown indicator
    setInterval(() => {
      saveState(true);
    }, AUTOSAVE_INTERVAL_MS);

    setInterval(() => {
      if (nextAutoSaveCountdownSec > 0) {
        nextAutoSaveCountdownSec--;
      } else {
        nextAutoSaveCountdownSec = 180;
      }
      updateAutoSaveBadge();
    }, 1000);

    window.addEventListener("beforeunload", () => saveState(false));
  }

  function formatDateBR(isoDate) {
    if (!isoDate) return "24/11/2026";
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  function formatPct(num) {
    return num.toFixed(1).replace(".", ",") + "%";
  }

  // Check if an employee has been audited (either in auditedChapas or has at least 1 training checked)
  function isEmployeeAudited(chapa) {
    if (state.auditedChapas.includes(chapa)) return true;
    const rec = state.trainingRecords[chapa];
    if (!rec) return false;
    return Object.values(rec).some((r) => r && (r.done || (r.note && r.note.trim())));
  }

  function getEmployeeTrainingStats(emp) {
    const prof = window.PAREX_DATA.profiles[emp.profileKey];
    if (!prof) return { mDone: 0, mTotal: 0, dDone: 0, dTotal: 0, pct: 0, audited: false };
    const rec = state.trainingRecords[emp.chapa] || {};
    let mDone = 0, mTotal = 0, dDone = 0, dTotal = 0;

    prof.trainings.forEach((t) => {
      const isDone = !!(rec[t.code] && rec[t.code].done);
      if (t.req === "M") {
        mTotal++;
        if (isDone) mDone++;
      } else {
        dTotal++;
        if (isDone) dDone++;
      }
    });

    const pct = mTotal > 0 ? (mDone / mTotal) * 100 : 0;
    return { mDone, mTotal, dDone, dTotal, pct, audited: isEmployeeAudited(emp.chapa) };
  }

  // Filter non-empty manual rows
  function getFilledManualRows() {
    const ml = state.manualLogs;
    const inst = (ml.instruments || []).filter((r) => r.tag.trim() || r.description.trim() || r.certRbc.trim() || r.status !== "PEND");
    const maq = (ml.weldingMachines || []).filter((r) => r.tag.trim() || r.modelLocation.trim() || r.rciNumber.trim() || r.status !== "PEND");
    const cons = (ml.consumablesOvens || []).filter((r) => r.lotNumber.trim() || r.ovenTag.trim() || r.awsSpec.trim() || r.status !== "PEND");
    const weld = (ml.welderStamps || []).filter((r) => r.sinete.trim() || r.welderNameChapa.trim() || r.processRqs.trim() || r.status !== "PEND");
    return { inst, maq, cons, weld, all: [...inst, ...maq, ...cons, ...weld] };
  }

  // Compute live compliance metrics across active disciplines, manual field logs, recurrences, and audited trainings
  function computeMetrics() {
    const activePit = state.pitItems.filter((i) => state.selectedDisciplines[i.discipline]);
    const pitC = activePit.filter((i) => i.status === "C").length;
    const pitNC = activePit.filter((i) => i.status === "NC").length;
    const pitNA = activePit.filter((i) => i.status === "NA").length;
    const pitPend = activePit.filter((i) => i.status === "PEND").length;
    const pitValid = pitC + pitNC;
    const pitPct = pitValid > 0 ? (pitC / pitValid) * 100 : 0;

    // Manual field logs (TAGs, Machines, Lots, Welder Stamps)
    const filledManual = getFilledManualRows();
    const manC = filledManual.all.filter((r) => r.status === "C").length;
    const manNC = filledManual.all.filter((r) => r.status === "NC").length;
    const manValid = manC + manNC;
    const manPct = manValid > 0 ? (manC / manValid) * 100 : 0;

    // Recurrences
    const recC = state.recItems.filter((i) => i.status === "C").length;
    const recNC = state.recItems.filter((i) => i.status === "NC").length;
    const recNA = state.recItems.filter((i) => i.status === "NA").length;
    const recPend = state.recItems.filter((i) => i.status === "PEND").length;
    const recValid = recC + recNC;
    const recPct = recValid > 0 ? (recC / recValid) * 100 : 0;

    // Audited employees in Training Matrix
    const auditedEmps = window.PAREX_DATA.employees.filter((e) => isEmployeeAudited(e.chapa));
    let trainMDone = 0, trainMTotal = 0;
    auditedEmps.forEach((e) => {
      const st = getEmployeeTrainingStats(e);
      trainMDone += st.mDone;
      trainMTotal += st.mTotal;
    });
    const trainPct = trainMTotal > 0 ? (trainMDone / trainMTotal) * 100 : 0;

    // Total Overall Compliance (Checklist + Manual Field Checks + Recurrences)
    const totalC = pitC + manC + recC;
    const totalNC = pitNC + manNC + recNC;
    const totalNA = pitNA + recNA;
    const totalPend = pitPend + recPend;
    const totalValid = totalC + totalNC;
    const overallPct = totalValid > 0 ? (totalC / totalValid) * 100 : 0;

    return {
      pitC, pitNC, pitNA, pitPend, pitPct,
      manC, manNC, manTotal: filledManual.all.length, manPct,
      recC, recNC, recNA, recPend, recPct,
      auditedEmpCount: auditedEmps.length, trainMDone, trainMTotal, trainPct,
      totalC, totalNC, totalNA, totalPend, totalValid, overallPct
    };
  }

  // Render Discipline Selector Pills
  function renderDisciplineSelector() {
    const container = document.getElementById("disciplinePillsContainer");
    if (!container) return;

    container.innerHTML = DISCIPLINES.map((d) => {
      const isChecked = !!state.selectedDisciplines[d.key];
      return `
        <div class="disc-pill ${isChecked ? 'active' : ''}" onclick="window.PAREX_APP.jumpToDiscipline('${d.key}')">
          <div class="disc-pill-left">
            <span class="disc-step-num">${d.step}</span>
            <div>
              <div>${d.title}</div>
              <div style="font-size:10.5px;font-weight:500;color:var(--parex-text-muted);">${d.code}</div>
            </div>
          </div>
          <input type="checkbox" ${isChecked ? "checked" : ""}
            title="Ativar/Desativar disciplina no escopo da auditoria"
            onclick="event.stopPropagation(); window.PAREX_APP.toggleDiscipline('${d.key}', this.checked)" />
        </div>
      `;
    }).join("");
  }

  // Render Manual Entry Table for a specific discipline
  function renderManualBlockForDiscipline(discKey) {
    if (discKey === "METROLOGIA") {
      const rows = state.manualLogs.instruments || [];
      return `
        <div class="manual-log-box">
          <div class="manual-log-header">
            <h4>📏 Registro Manual de Instrumentos Inspecionados (Nº de TAG, Certificado RBC e FO-03-022)</h4>
            <button type="button" class="btn btn-sm btn-primary" onclick="window.PAREX_APP.addManualRow('instruments')">
              + Adicionar TAG de Instrumento
            </button>
          </div>
          <div class="manual-table-wrap">
            <table class="manual-table">
              <thead>
                <tr>
                  <th style="width:16%;">Nº TAG / Código</th>
                  <th style="width:22%;">Instrumento / Fabricante</th>
                  <th style="width:17%;">Nº Certificado RBC</th>
                  <th style="width:12%;">Validade</th>
                  <th style="width:11%;">Na FO-03-022?</th>
                  <th style="width:13%;">Avaliação</th>
                  <th style="width:9%;">Ação</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((r, idx) => `
                  <tr>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: 18563/26, PX14290" value="${(r.tag || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('instruments', ${idx}, 'tag', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="Ex: Paquímetro Starrett" value="${(r.description || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('instruments', ${idx}, 'description', this.value)" /></td>
                    <td><input type="text" class="manual-input mono-input" placeholder="Nº Certificado" value="${(r.certRbc || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('instruments', ${idx}, 'certRbc', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="DD/MM/AAAA" value="${(r.validity || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('instruments', ${idx}, 'validity', this.value)" /></td>
                    <td>
                      <select class="manual-input" onchange="window.PAREX_APP.updateManualRow('instruments', ${idx}, 'inFo03022', this.value)">
                        <option value="SIM" ${r.inFo03022 === 'SIM' ? 'selected' : ''}>Sim (OK)</option>
                        <option value="VENC_SEM_OBS" ${r.inFo03022 === 'VENC_SEM_OBS' ? 'selected' : ''}>Vencido s/ Obs.</option>
                        <option value="NAO_CONSTA" ${r.inFo03022 === 'NAO_CONSTA' ? 'selected' : ''}>Não Consta</option>
                      </select>
                    </td>
                    <td>
                      <select class="manual-input" style="font-weight:700;color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};" onchange="window.PAREX_APP.updateManualRow('instruments', ${idx}, 'status', this.value)">
                        <option value="PEND" ${r.status === 'PEND' ? 'selected' : ''}>⏳ Pendente</option>
                        <option value="C" ${r.status === 'C' ? 'selected' : ''}>✓ Conforme</option>
                        <option value="NC" ${r.status === 'NC' ? 'selected' : ''}>✕ Não Conforme</option>
                      </select>
                    </td>
                    <td style="text-align:center;">
                      <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.removeManualRow('instruments', ${idx})" title="Remover linha">✕</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (discKey === "MAQ_SOLDA") {
      const rows = state.manualLogs.weldingMachines || [];
      return `
        <div class="manual-log-box">
          <div class="manual-log-header">
            <h4>⚡ Registro Manual de Máquinas de Solda Inspecionadas (Nº TAG e Certificado RCI FO-08-018)</h4>
            <button type="button" class="btn btn-sm btn-primary" onclick="window.PAREX_APP.addManualRow('weldingMachines')">
              + Adicionar Máquina de Solda
            </button>
          </div>
          <div class="manual-table-wrap">
            <table class="manual-table">
              <thead>
                <tr>
                  <th style="width:16%;">Nº TAG Máquina</th>
                  <th style="width:22%;">Modelo / Frente de Serviço</th>
                  <th style="width:17%;">Nº RCI (FO-08-018)</th>
                  <th style="width:13%;">Validade (6m)</th>
                  <th style="width:10%;">Desvio (%)</th>
                  <th style="width:13%;">Avaliação</th>
                  <th style="width:9%;">Ação</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((r, idx) => `
                  <tr>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: MS-014, INV-08" value="${(r.tag || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('weldingMachines', ${idx}, 'tag', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="Ex: Bambozzi / Prédio Moagem" value="${(r.modelLocation || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('weldingMachines', ${idx}, 'modelLocation', this.value)" /></td>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: RCI-2026-104" value="${(r.rciNumber || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('weldingMachines', ${idx}, 'rciNumber', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="DD/MM/AAAA" value="${(r.validity || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('weldingMachines', ${idx}, 'validity', this.value)" /></td>
                    <td><input type="text" class="manual-input mono-input" placeholder="Máx 20%" value="${(r.deviationPct || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('weldingMachines', ${idx}, 'deviationPct', this.value)" /></td>
                    <td>
                      <select class="manual-input" style="font-weight:700;color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};" onchange="window.PAREX_APP.updateManualRow('weldingMachines', ${idx}, 'status', this.value)">
                        <option value="PEND" ${r.status === 'PEND' ? 'selected' : ''}>⏳ Pendente</option>
                        <option value="C" ${r.status === 'C' ? 'selected' : ''}>✓ Conforme</option>
                        <option value="NC" ${r.status === 'NC' ? 'selected' : ''}>✕ Não Conforme</option>
                      </select>
                    </td>
                    <td style="text-align:center;">
                      <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.removeManualRow('weldingMachines', ${idx})" title="Remover linha">✕</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (discKey === "CONSUMIVEIS") {
      const rows = state.manualLogs.consumablesOvens || [];
      return `
        <div class="manual-log-box">
          <div class="manual-log-header">
            <h4>🔥 Registro Manual de Lotes de Consumíveis de Solda e TAGs de Estufas / Cochichos</h4>
            <button type="button" class="btn btn-sm btn-primary" onclick="window.PAREX_APP.addManualRow('consumablesOvens')">
              + Adicionar Lote de Consumível / Estufa
            </button>
          </div>
          <div class="manual-table-wrap">
            <table class="manual-table">
              <thead>
                <tr>
                  <th style="width:16%;">Nº Lote Consumível</th>
                  <th style="width:20%;">Especificação AWS / Bitola</th>
                  <th style="width:16%;">Nº TAG Estufa / Cochicho</th>
                  <th style="width:14%;">Temp. (°C) / UR (%)</th>
                  <th style="width:13%;">FO-08-014 / FO-08-008</th>
                  <th style="width:13%;">Avaliação</th>
                  <th style="width:8%;">Ação</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((r, idx) => `
                  <tr>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: LOTE-98412" value="${(r.lotNumber || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('consumablesOvens', ${idx}, 'lotNumber', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="Ex: AWS E7018 3,25mm ESAB" value="${(r.awsSpec || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('consumablesOvens', ${idx}, 'awsSpec', this.value)" /></td>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: EST-02 / COCH-19" value="${(r.ovenTag || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('consumablesOvens', ${idx}, 'ovenTag', this.value)" /></td>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: 125°C / 42%" value="${(r.tempHumidity || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('consumablesOvens', ${idx}, 'tempHumidity', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="Nº RC / Ficha" value="${(r.reqFo08014 || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('consumablesOvens', ${idx}, 'reqFo08014', this.value)" /></td>
                    <td>
                      <select class="manual-input" style="font-weight:700;color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};" onchange="window.PAREX_APP.updateManualRow('consumablesOvens', ${idx}, 'status', this.value)">
                        <option value="PEND" ${r.status === 'PEND' ? 'selected' : ''}>⏳ Pendente</option>
                        <option value="C" ${r.status === 'C' ? 'selected' : ''}>✓ Conforme</option>
                        <option value="NC" ${r.status === 'NC' ? 'selected' : ''}>✕ Não Conforme</option>
                      </select>
                    </td>
                    <td style="text-align:center;">
                      <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.removeManualRow('consumablesOvens', ${idx})" title="Remover linha">✕</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (discKey === "SOLDADORES") {
      const rows = state.manualLogs.welderStamps || [];
      return `
        <div class="manual-log-box">
          <div class="manual-log-header">
            <h4>👨‍🏭 Registro Manual de Qualificação de Soldadores e Sinetes (FO-08-005 RQS / IT-08-001)</h4>
            <button type="button" class="btn btn-sm btn-primary" onclick="window.PAREX_APP.addManualRow('welderStamps')">
              + Adicionar Sinete de Soldador
            </button>
          </div>
          <div class="manual-table-wrap">
            <table class="manual-table">
              <thead>
                <tr>
                  <th style="width:14%;">Nº do Sinete</th>
                  <th style="width:25%;">Nome / Chapa do Soldador</th>
                  <th style="width:20%;">Processo (ER/TIG/MIG) &amp; Nº RQS</th>
                  <th style="width:19%;">Continuidade / Crachá / IT-13-010</th>
                  <th style="width:14%;">Avaliação</th>
                  <th style="width:8%;">Ação</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((r, idx) => `
                  <tr>
                    <td><input type="text" class="manual-input mono-input" placeholder="Ex: S-014, PX-38" value="${(r.sinete || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('welderStamps', ${idx}, 'sinete', this.value)" /></td>
                    <td><input type="text" class="manual-input" list="weldersDatalist" placeholder="Digite nome/chapa ou selecione..." value="${(r.welderNameChapa || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('welderStamps', ${idx}, 'welderNameChapa', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="Ex: SMAW/GTAW 6G - RQS 042" value="${(r.processRqs || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('welderStamps', ${idx}, 'processRqs', this.value)" /></td>
                    <td><input type="text" class="manual-input" placeholder="Ex: Vigente / Treinado IT-13-010" value="${(r.continuityIt13010 || '').replace(/"/g, '&quot;')}" oninput="window.PAREX_APP.updateManualRow('welderStamps', ${idx}, 'continuityIt13010', this.value)" /></td>
                    <td>
                      <select class="manual-input" style="font-weight:700;color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};" onchange="window.PAREX_APP.updateManualRow('welderStamps', ${idx}, 'status', this.value)">
                        <option value="PEND" ${r.status === 'PEND' ? 'selected' : ''}>⏳ Pendente</option>
                        <option value="C" ${r.status === 'C' ? 'selected' : ''}>✓ Conforme</option>
                        <option value="NC" ${r.status === 'NC' ? 'selected' : ''}>✕ Não Conforme</option>
                      </select>
                    </td>
                    <td style="text-align:center;">
                      <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.removeManualRow('welderStamps', ${idx})" title="Remover linha">✕</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return "";
  }

  // Render 4-Photo Evidence Attachment Widget for any PIT or Recurrence Item
  function renderPhotoSlotsWidget(section, item) {
    const photos = Array.isArray(item.photos) ? item.photos : [];
    const count = photos.filter(Boolean).length;
    const slots = [0, 1, 2, 3];

    return `
      <div class="evidence-photos-bar">
        <div class="evidence-photos-header">
          <span>📷 Fotos da Evidência (${count}/4 anexadas)</span>
          <div style="display:flex;gap:6px;">
            <label class="btn btn-sm btn-outline" style="padding:3px 9px;font-size:11px;cursor:pointer;">
              + Anexar Fotos (até 4)
              <input type="file" accept="image/*" multiple style="display:none;"
                onchange="window.PAREX_APP.handleMultiPhotoUpload('${section}', '${item.id}', this.files); this.value='';" />
            </label>
            ${count > 0 ? `<button type="button" class="btn btn-sm btn-danger-outline" style="padding:3px 8px;font-size:11px;" onclick="window.PAREX_APP.clearItemPhotos('${section}', '${item.id}')">Limpar Fotos</button>` : ""}
          </div>
        </div>
        <div class="photo-slots-grid">
          ${slots.map((slotIdx) => {
            const p = photos[slotIdx];
            if (p && p.dataUrl) {
              return `
                <div class="photo-slot filled" title="${p.name || 'Foto ' + (slotIdx + 1)}">
                  <img src="${p.dataUrl}" alt="Foto ${slotIdx + 1}" onclick="window.PAREX_APP.previewPhoto('${section}', '${item.id}', ${slotIdx})" style="cursor:zoom-in;" />
                  <span class="photo-slot-badge">FOTO ${slotIdx + 1}/4</span>
                  <button type="button" class="photo-slot-remove" title="Remover Foto ${slotIdx + 1}"
                    onclick="window.PAREX_APP.removeItemPhoto('${section}', '${item.id}', ${slotIdx})">✕</button>
                </div>
              `;
            }
            return `
              <label class="photo-slot" title="Clique para anexar a Foto ${slotIdx + 1} de 4">
                <input type="file" accept="image/*" style="display:none;"
                  onchange="window.PAREX_APP.handleSlotPhotoUpload('${section}', '${item.id}', ${slotIdx}, this.files[0]); this.value='';" />
                <div class="photo-slot-placeholder">
                  <span style="font-size:16px;">📷</span>
                  <span>Foto ${slotIdx + 1}/4</span>
                </div>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  // Compress uploaded image via Canvas so 4 photos per item save fast in localStorage and render cleanly in PDF
  function compressImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 960;
          let w = img.width;
          let h = img.height;
          if (w > MAX_DIM || h > MAX_DIM) {
            if (w >= h) {
              h = Math.round((h * MAX_DIM) / w);
              w = MAX_DIM;
            } else {
              w = Math.round((w * MAX_DIM) / h);
              h = MAX_DIM;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
          resolve({
            dataUrl,
            name: file.name || "evidencia.jpg",
            addedAt: new Date().toLocaleTimeString("pt-BR")
          });
        };
        img.onerror = reject;
        img.src = ev.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Render Tab 1: Grouped by Active Disciplines with Manual Tables + Checklist Cards
  function renderPitCards() {
    const container = document.getElementById("pitCardsContainer");
    if (!container) return;

    const pitDisciplines = DISCIPLINES.filter((d) => d.tab === "pit");
    const visibleDisciplines = pitDisciplines.filter((d) => {
      if (state.disciplineView !== "ALL") return d.key === state.disciplineView;
      return state.selectedDisciplines[d.key];
    });

    if (visibleDisciplines.length === 0) {
      container.innerHTML = `<div style="padding:32px;text-align:center;background:#FFF;border-radius:12px;border:1px solid var(--parex-border);">Nenhuma disciplina selecionada para exibição. Marque as disciplinas desejadas no seletor acima.</div>`;
      return;
    }

    container.innerHTML = visibleDisciplines.map((disc) => {
      const discItems = state.pitItems.filter((i) => i.discipline === disc.key);
      const manualBlock = renderManualBlockForDiscipline(disc.key);

      return `
        <div style="margin-bottom: 24px;">
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;background:var(--parex-navy);color:#FFF;padding:12px 18px;border-radius:12px;margin-bottom:14px;border-left:6px solid var(--parex-orange);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="background:var(--parex-orange);color:#FFF;font-family:'Outfit',sans-serif;font-weight:800;font-size:13px;padding:3px 10px;border-radius:999px;">PASSO ${disc.step}</span>
              <h3 style="font-size:16px;font-weight:800;">${disc.title}</h3>
            </div>
            <span style="font-size:12px;color:var(--parex-sky);font-family:'JetBrains Mono',monospace;">${disc.code}</span>
          </div>

          ${manualBlock}

          <div class="inspection-grid">
            ${discItems.map((item) => {
              const checkedCount = item.criteria.filter((c) => c.checked).length;
              return `
                <article class="audit-card status-${item.status}" id="card-${item.id}">
                  <div class="audit-card-header">
                    <div style="flex: 1; min-width: 280px;">
                      <div class="audit-card-meta">
                        <span class="code-tag">${item.code}</span>
                        <span class="code-tag iso-tag">${item.iso}</span>
                        <span class="code-tag proc-tag">${item.proc}</span>
                        <span class="code-tag fo-tag">${item.forms}</span>
                      </div>
                      <h3 class="audit-card-title">${item.title}</h3>
                      <p class="audit-card-desc">${item.desc}</p>
                    </div>

                    <div class="decision-group" role="group" aria-label="Decisão de Conformidade">
                      <button type="button" class="decision-btn btn-c ${item.status === 'C' ? 'active' : ''}"
                        onclick="window.PAREX_APP.setItemStatus('pit', '${item.id}', 'C')">
                        ✓ Conforme
                      </button>
                      <button type="button" class="decision-btn btn-nc ${item.status === 'NC' ? 'active' : ''}"
                        onclick="window.PAREX_APP.setItemStatus('pit', '${item.id}', 'NC')">
                        ✕ Não Conforme
                      </button>
                      <button type="button" class="decision-btn btn-na ${item.status === 'NA' ? 'active' : ''}"
                        onclick="window.PAREX_APP.setItemStatus('pit', '${item.id}', 'NA')">
                        — N/A
                      </button>
                    </div>
                  </div>

                  <div class="criteria-box">
                    <div class="criteria-box-title">
                      <span>Checklist de Verificação em Campo (PIT &amp; Procedimento Canônico)</span>
                      <span>${checkedCount}/${item.criteria.length} critérios marcados</span>
                    </div>
                    <div class="criteria-list">
                      ${item.criteria.map((c, idx) => `
                        <label class="criteria-item ${c.checked ? 'checked' : ''}">
                          <input type="checkbox" ${c.checked ? 'checked' : ''}
                            onchange="window.PAREX_APP.toggleCriterion('pit', '${item.id}', ${idx}, this.checked)" />
                          <span>${c.text}</span>
                        </label>
                      `).join("")}
                    </div>
                  </div>

                  <div class="audit-inputs-row">
                    <div class="audit-input-col">
                      <label>Evidências Objetivas / Constatações de Auditoria (ISO 9001)</label>
                      <textarea class="audit-textarea" placeholder="Descreva as evidências constatadas em campo (TAGs, lotes, sinetes, documentos verificados)..."
                        oninput="window.PAREX_APP.updateItemText('pit', '${item.id}', 'evidence', this.value)">${item.evidence}</textarea>
                      ${renderPhotoSlotsWidget('pit', item)}
                    </div>
                    <div class="audit-input-col">
                      <label>Tratativa / Plano de Ação Corretiva Imediata</label>
                      <textarea class="audit-textarea" placeholder="Caso Não Conforme, registre a ação corretiva imediata e responsável..."
                        oninput="window.PAREX_APP.updateItemText('pit', '${item.id}', 'action', this.value)">${item.action}</textarea>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Tab 3: Recurrence Cards
  function renderRecCards() {
    const container = document.getElementById("recCardsContainer");
    if (!container) return;
    const filtered = state.recItems.filter((item) => state.recFilter === "ALL" || item.status === state.recFilter);

    container.innerHTML = filtered.map((item) => {
      const checkedCount = item.criteria.filter((c) => c.checked).length;
      return `
        <article class="audit-card recurrence-card status-${item.status}" id="card-${item.id}">
          <div class="audit-card-header">
            <div style="flex: 1; min-width: 280px;">
              <div class="audit-card-meta">
                <span class="code-tag rnc-tag">⚠️ ${item.rnc}</span>
                <span class="code-tag iso-tag">${item.iso}</span>
                <span class="code-tag proc-tag">${item.proc}</span>
                <span class="code-tag fo-tag">${item.forms}</span>
              </div>
              <div style="font-size: 11.5px; font-weight: 700; color: var(--parex-orange-dark); margin-bottom: 3px;">
                HISTÓRICO DE REINCIDÊNCIA: ${item.history}
              </div>
              <h3 class="audit-card-title">${item.title}</h3>
              <p class="audit-card-desc">${item.desc}</p>
            </div>

            <div class="decision-group" role="group" aria-label="Decisão de Conformidade da Reincidência">
              <button type="button" class="decision-btn btn-c ${item.status === 'C' ? 'active' : ''}"
                onclick="window.PAREX_APP.setItemStatus('rec', '${item.id}', 'C')">
                ✓ Conforme
              </button>
              <button type="button" class="decision-btn btn-nc ${item.status === 'NC' ? 'active' : ''}"
                onclick="window.PAREX_APP.setItemStatus('rec', '${item.id}', 'NC')">
                ✕ Não Conforme
              </button>
              <button type="button" class="decision-btn btn-na ${item.status === 'NA' ? 'active' : ''}"
                onclick="window.PAREX_APP.setItemStatus('rec', '${item.id}', 'NA')">
                — N/A
              </button>
            </div>
          </div>

          <div class="criteria-box">
            <div class="criteria-box-title">
              <span>Pontos de Inspeção Nominal exigidos no E-mail SGI (23/11/2026) &amp; FO-128</span>
              <span>${checkedCount}/${item.criteria.length} verificados</span>
            </div>
            <div class="criteria-list">
              ${item.criteria.map((c, idx) => `
                <label class="criteria-item ${c.checked ? 'checked' : ''}">
                  <input type="checkbox" ${c.checked ? 'checked' : ''}
                    onchange="window.PAREX_APP.toggleCriterion('rec', '${item.id}', ${idx}, this.checked)" />
                  <span>${c.text}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <div class="audit-inputs-row">
            <div class="audit-input-col">
              <label>Evidência Física e Documental Constatada na Pré-Auditoria</label>
              <textarea class="audit-textarea" placeholder="Registre a situação encontrada na verificação pontual desta reincidência..."
                oninput="window.PAREX_APP.updateItemText('rec', '${item.id}', 'evidence', this.value)">${item.evidence}</textarea>
              ${renderPhotoSlotsWidget('rec', item)}
            </div>
            <div class="audit-input-col">
              <label>Ação de Bloqueio / Saneamento Imediato</label>
              <textarea class="audit-textarea" placeholder="Registre a ação de bloqueio ou saneamento imediato..."
                oninput="window.PAREX_APP.updateItemText('rec', '${item.id}', 'action', this.value)">${item.action}</textarea>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Update Dashboard & Consolidated Report
  function updateDashboardAndReport() {
    const m = computeMetrics();

    document.getElementById("kpiOverallPct").textContent = formatPct(m.overallPct);
    document.getElementById("kpiOverallBar").style.width = `${m.overallPct}%`;
    document.getElementById("kpiOverallBar").style.backgroundColor =
      m.totalValid === 0 ? "#99D6EA" : m.overallPct >= 85 ? "#2ECC71" : m.overallPct >= 70 ? "#FF6900" : "#E74C3C";
    document.getElementById("kpiOverallC").textContent = `${m.totalC} Conforme`;
    document.getElementById("kpiOverallNC").textContent = `${m.totalNC} Não Conforme`;
    document.getElementById("kpiOverallPend").textContent = `${m.totalPend} Pendentes`;
    document.getElementById("kpiOverallNA").textContent = `${m.totalNA} N/A`;
    document.getElementById("kpiOverallSummaryText").textContent =
      m.totalValid === 0
        ? "Auditoria pronta para início • Marque Conforme ou Não Conforme nos itens inspecionados"
        : `${m.totalC} de ${m.totalValid} pontos avaliados estão Conformes (${m.totalNC} Não Conformes)`;

    document.getElementById("kpiPitPct").textContent = formatPct(m.pitPct);
    document.getElementById("kpiPitBar").style.width = `${m.pitPct}%`;
    document.getElementById("kpiPitC").textContent = `${m.pitC} C`;
    document.getElementById("kpiPitNC").textContent = `${m.pitNC} NC`;
    document.getElementById("kpiPitPend").textContent = `${m.pitPend} Pend.`;

    document.getElementById("kpiManualPct").textContent = formatPct(m.manPct);
    document.getElementById("kpiManualBar").style.width = `${m.manPct}%`;
    document.getElementById("kpiManualCount").textContent = `${m.manTotal} Registros (${m.manC} C / ${m.manNC} NC)`;

    document.getElementById("kpiRecPct").textContent = formatPct(m.recPct);
    document.getElementById("kpiRecBar").style.width = `${m.recPct}%`;
    document.getElementById("kpiRecC").textContent = `${m.recC} C`;
    document.getElementById("kpiRecNC").textContent = `${m.recNC} NC`;
    document.getElementById("kpiRecPend").textContent = `${m.recPend} Pend.`;

    document.getElementById("kpiAlmoxTrainPct").textContent = formatPct(m.trainPct);
    document.getElementById("kpiAlmoxTrainBar").style.width = `${m.trainPct}%`;
    document.getElementById("kpiAlmoxTrainDone").textContent =
      `${m.auditedEmpCount} Colaboradores Verificados (${m.trainMDone}/${m.trainMTotal} M)`;

    const chipEl = document.getElementById("auditedEmpCountChip");
    if (chipEl) chipEl.textContent = String(m.auditedEmpCount);

    document.getElementById("badgeTabPit").textContent = `${formatPct(m.pitPct)} (${m.pitC}/${m.pitC + m.pitNC})`;
    document.getElementById("badgeTabRec").textContent = `${formatPct(m.recPct)} (${m.recC}/${m.recC + m.recNC})`;
    document.getElementById("badgeTabTrain").textContent = `${m.auditedEmpCount} Auditados (${formatPct(m.trainPct)})`;

    // Sync metadata fields to Report & Open Auditee Signature Block
    const dateBR = formatDateBR(state.meta.data);
    const fullDateTime = `${dateBR} às ${state.meta.hora}`;
    const auditadoClean = (state.meta.auditado || "").trim();

    document.getElementById("liveTimestampBadge").textContent = `Data/Hora: ${fullDateTime}`;
    document.getElementById("reportHeaderTimestamp").textContent = `Emissão: ${fullDateTime}`;
    document.getElementById("repAuditor").textContent = `${state.meta.auditor} (${state.meta.auditorRole})`;
    document.getElementById("repDataHora").textContent = fullDateTime;
    document.getElementById("repAuditado").textContent = auditadoClean || "____________________________________________________ (Em aberto)";
    document.getElementById("repArea").textContent = state.meta.area;
    document.getElementById("repLocal").textContent = state.meta.local;

    const activeDiscNames = DISCIPLINES.filter((d) => state.selectedDisciplines[d.key]).map((d) => d.title);
    const repDiscEl = document.getElementById("repDisciplinas");
    if (repDiscEl) repDiscEl.textContent = activeDiscNames.join(" • ") || "Nenhuma disciplina selecionada";

    document.getElementById("sigAuditorName").textContent = state.meta.auditor;
    document.getElementById("sigAuditorRole").textContent = `${state.meta.auditorRole} • Parex Engenharia S/A`;
    document.getElementById("sigTimestampText").textContent = fullDateTime;

    // Leave Auditee signature line OPEN if metaAuditado is empty!
    document.getElementById("sigAuditadoName").textContent = auditadoClean || "__________________________________________________";
    document.getElementById("sigAuditadoArea").textContent = auditadoClean
      ? `Auditado(s) — ${state.meta.area}`
      : "Nome e Assinatura do Auditado (Em Aberto)";
    document.getElementById("sigAuditadoTimestampText").textContent = fullDateTime;

    document.getElementById("repOverallPct").textContent = formatPct(m.overallPct);
    document.getElementById("repOverallCounts").textContent = `${m.totalC} Conforme / ${m.totalNC} Não Conforme / ${m.totalPend} Pend.`;
    document.getElementById("repPitPct").textContent = formatPct(m.pitPct);
    document.getElementById("repPitCounts").textContent = `${m.pitC} C / ${m.pitNC} NC`;
    document.getElementById("repRecPct").textContent = formatPct(m.manPct);
    document.getElementById("repRecCounts").textContent = `${m.manTotal} Registros de Campo | ${m.recC}/${m.recC + m.recNC} RNCs`;
    document.getElementById("repTrainPct").textContent = formatPct(m.trainPct);
    document.getElementById("repTrainCounts").textContent = `${m.auditedEmpCount} Colaboradores Verificados (${m.trainMDone}/${m.trainMTotal} M)`;

    renderReportTables();
  }

  function renderReportTables() {
    // 1. Manual Field Logs Table in Report
    const manualContainer = document.getElementById("repManualLogsContainer");
    const filled = getFilledManualRows();
    if (manualContainer) {
      if (filled.all.length === 0) {
        manualContainer.innerHTML = `<div style="padding:10px 14px;background:#F8FAFC;border:1px solid var(--parex-border);border-radius:8px;font-size:12.5px;color:var(--parex-text-muted);">Nenhum registro manual de TAG de instrumento, máquina de solda, lote de consumível ou sinete de soldador preenchido até o momento.</div>`;
      } else {
        const allRowsHtml = [
          ...filled.inst.map((r) => `<tr><td><strong>Instrumento Calibrado</strong></td><td class="mono"><strong>TAG: ${r.tag || '-'}</strong></td><td>${r.description || '-'} | Cert: ${r.certRbc || '-'} | Val: ${r.validity || '-'} | FO-03-022: ${r.inFo03022}</td><td><strong style="color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};">${r.status === 'C' ? 'CONFORME' : r.status === 'NC' ? 'NÃO CONFORME' : 'PENDENTE'}</strong></td></tr>`),
          ...filled.maq.map((r) => `<tr><td><strong>Máquina de Solda</strong></td><td class="mono"><strong>TAG: ${r.tag || '-'}</strong></td><td>${r.modelLocation || '-'} | RCI: ${r.rciNumber || '-'} | Val: ${r.validity || '-'} | Desvio: ${r.deviationPct || '-'}</td><td><strong style="color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};">${r.status === 'C' ? 'CONFORME' : r.status === 'NC' ? 'NÃO CONFORME' : 'PENDENTE'}</strong></td></tr>`),
          ...filled.cons.map((r) => `<tr><td><strong>Consumível / Estufa</strong></td><td class="mono"><strong>Lote: ${r.lotNumber || '-'} / Estufa: ${r.ovenTag || '-'}</strong></td><td>${r.awsSpec || '-'} | Temp/UR: ${r.tempHumidity || '-'} | FO-08-014/008: ${r.reqFo08014 || '-'}</td><td><strong style="color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};">${r.status === 'C' ? 'CONFORME' : r.status === 'NC' ? 'NÃO CONFORME' : 'PENDENTE'}</strong></td></tr>`),
          ...filled.weld.map((r) => `<tr><td><strong>Qualif. Soldador</strong></td><td class="mono"><strong>Sinete: ${r.sinete || '-'}</strong></td><td>Soldador: ${r.welderNameChapa || '-'} | RQS: ${r.processRqs || '-'} | ${r.continuityIt13010 || '-'}</td><td><strong style="color:${r.status === 'C' ? 'var(--status-c)' : r.status === 'NC' ? 'var(--status-nc)' : 'var(--parex-navy)'};">${r.status === 'C' ? 'CONFORME' : r.status === 'NC' ? 'NÃO CONFORME' : 'PENDENTE'}</strong></td></tr>`)
        ].join("");

        manualContainer.innerHTML = `
          <table class="report-table">
            <thead>
              <tr>
                <th style="width:18%;">Disciplina</th>
                <th style="width:22%;">Nº TAG / Lote / Sinete</th>
                <th style="width:46%;">Detalhes Verificados em Campo</th>
                <th style="width:14%;">Status</th>
              </tr>
            </thead>
            <tbody>${allRowsHtml}</tbody>
          </table>
        `;
      }
    }

    // 2. PIT Table
    const pitTbody = document.querySelector("#repPitTable tbody");
    const activePit = state.pitItems.filter((i) => state.selectedDisciplines[i.discipline]);
    pitTbody.innerHTML = activePit.map((item) => {
      const badgeColor = item.status === "C" ? "var(--status-c)" : item.status === "NC" ? "var(--status-nc)" : "var(--status-na)";
      const statusLabel = item.status === "C" ? "CONFORME" : item.status === "NC" ? "NÃO CONFORME" : item.status === "NA" ? "N/A" : "PENDENTE";
      const validPhotos = (item.photos || []).filter((p) => p && p.dataUrl);
      const photosHtml = validPhotos.length > 0
        ? `<div class="report-photo-strip">${validPhotos.map((p, idx) => `<img src="${p.dataUrl}" class="report-photo-thumb" alt="Foto ${idx + 1}" />`).join("")}</div>`
        : "";
      return `
        <tr>
          <td><strong>${item.code}</strong><br/><span style="font-size:11px;color:var(--parex-text-muted);">${item.iso}</span></td>
          <td><strong>${item.title}</strong><br/><span style="font-size:11px;color:var(--parex-text-muted);">${item.proc} | ${item.forms}</span></td>
          <td><strong style="color:${badgeColor};">${statusLabel}</strong></td>
          <td>${item.evidence || "-"}${photosHtml}</td>
          <td>${item.action || "-"}</td>
        </tr>
      `;
    }).join("");

    // 3. Recurrences Table
    const recTbody = document.querySelector("#repRecTable tbody");
    recTbody.innerHTML = state.recItems.map((item) => {
      const badgeColor = item.status === "C" ? "var(--status-c)" : item.status === "NC" ? "var(--status-nc)" : "var(--status-na)";
      const statusLabel = item.status === "C" ? "CONFORME" : item.status === "NC" ? "NÃO CONFORME" : item.status === "NA" ? "N/A" : "PENDENTE";
      const validPhotos = (item.photos || []).filter((p) => p && p.dataUrl);
      const photosHtml = validPhotos.length > 0
        ? `<div class="report-photo-strip">${validPhotos.map((p, idx) => `<img src="${p.dataUrl}" class="report-photo-thumb" alt="Foto ${idx + 1}" />`).join("")}</div>`
        : "";
      return `
        <tr>
          <td><strong style="color:var(--status-nc);">${item.rnc}</strong><br/><span style="font-size:10.5px;color:var(--parex-text-muted);">${item.iso}</span></td>
          <td><strong>${item.title}</strong><br/><span style="font-size:11px;color:var(--parex-text-muted);">${item.proc} | ${item.forms}</span></td>
          <td><strong style="color:${badgeColor};">${statusLabel}</strong></td>
          <td>${item.evidence || "-"}${photosHtml}</td>
          <td>${item.action || "-"}</td>
        </tr>
      `;
    }).join("");

    // 4. Audited Employees in Training Matrix Table
    const trainTbody = document.querySelector("#repTrainTable tbody");
    const auditedEmps = window.PAREX_DATA.employees.filter((e) => isEmployeeAudited(e.chapa));
    if (auditedEmps.length === 0) {
      trainTbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--parex-text-muted);padding:14px;">Nenhum colaborador marcado na Matriz de Treinamentos ainda. Vá na Aba 2, selecione os colaboradores inspecionados e marque os treinamentos que possuem.</td></tr>`;
    } else {
      trainTbody.innerHTML = auditedEmps.map((emp) => {
        const st = getEmployeeTrainingStats(emp);
        const color = st.pct >= 100 ? "var(--status-c)" : st.pct >= 75 ? "var(--status-warn)" : "var(--status-nc)";
        return `
          <tr>
            <td class="mono"><strong>${emp.chapa}</strong></td>
            <td><strong>${emp.nome}</strong></td>
            <td>${emp.cargo}</td>
            <td>${emp.status}</td>
            <td>${st.mDone} de ${st.mTotal} Obrigatórios (M) (+${st.dDone} D)</td>
            <td><strong style="color:${color};">${formatPct(st.pct)}</strong></td>
          </tr>
        `;
      }).join("");
    }
  }

  // ==================== TAB 2: TRAINING MATRIX (MR-03-001 × 1,110 EMPLOYEES) ====================
  function initMatrixSelectors() {
    const sectorSelect = document.getElementById("matrixSectorSelect");
    const profiles = window.PAREX_DATA.profiles;

    let html = `<option value="ALL">Todas as Áreas / Disciplinas da Matriz (1.110 Efetivos)</option>`;
    html += `<option value="AUDITED_ONLY">✅ Colaboradores Verificados nesta Auditoria</option>`;

    Object.values(profiles).forEach((p) => {
      const count = window.PAREX_DATA.employees.filter((e) => e.profileKey === p.key).length;
      html += `<option value="${p.key}" ${p.key === state.matrixSectorFilter ? "selected" : ""}>${p.name} — ${p.group.split(" (")[0]} (${count})</option>`;
    });
    sectorSelect.innerHTML = html;

    // Populate welders datalist for manual Welder Stamps autocomplete
    const weldersDl = document.getElementById("weldersDatalist");
    if (weldersDl) {
      const welders = window.PAREX_DATA.employees.filter((e) => e.profileKey === "OP::Solda");
      weldersDl.innerHTML = welders.map((w) => `<option value="${w.nome} (Chapa ${w.chapa} - ${w.cargo})"></option>`).join("");
    }

    populateCargoDropdown();
  }

  function populateCargoDropdown() {
    const cargoSelect = document.getElementById("matrixCargoSelect");
    const sector = state.matrixSectorFilter;

    const cargos = window.PAREX_DATA.cargos.filter((c) => {
      if (sector === "ALL" || sector === "AUDITED_ONLY") return true;
      return c.profileKey === sector;
    });

    let html = `<option value="ALL">Todos os Cargos (${cargos.length} funções)</option>`;
    cargos.forEach((c) => {
      html += `<option value="${c.cargo}" ${c.cargo === state.matrixCargoFilter ? "selected" : ""}>${c.cargo} (${c.count})</option>`;
    });
    cargoSelect.innerHTML = html;
  }

  function getFilteredEmployees() {
    const sector = state.matrixSectorFilter;
    const cargo = state.matrixCargoFilter;
    const status = state.matrixStatusFilter;
    const q = (state.matrixSearch || "").trim().toUpperCase();

    return window.PAREX_DATA.employees.filter((e) => {
      if (sector === "AUDITED_ONLY") {
        if (!isEmployeeAudited(e.chapa)) return false;
      } else if (sector !== "ALL" && e.profileKey !== sector) {
        return false;
      }
      if (cargo !== "ALL" && e.cargo !== cargo) return false;
      if (status !== "ALL") {
        if (status === "PRESENTE" && !e.status.includes("PRESENTE")) return false;
        if (status !== "PRESENTE" && !e.status.includes(status)) return false;
      }
      if (q) {
        const hay = `${e.chapa} ${e.nome} ${e.cargo}`.toUpperCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderMatrixRoster() {
    const listEl = document.getElementById("employeeRosterList");
    const filtered = getFilteredEmployees();
    document.getElementById("rosterCountBadge").textContent = `${filtered.length} Colaboradores`;

    if (filtered.length === 0) {
      listEl.innerHTML = `<div style="padding:24px;text-align:center;color:var(--parex-text-muted);">Nenhum colaborador encontrado com os filtros atuais.</div>`;
      renderSelectedEmployeeDetail();
      return;
    }

    if (!filtered.some((e) => e.chapa === state.selectedChapa)) {
      state.selectedChapa = filtered[0].chapa;
    }

    const displayList = filtered.slice(0, 350);
    listEl.innerHTML = displayList.map((emp) => {
      const st = getEmployeeTrainingStats(emp);
      const pctClass = !st.audited ? "count-na" : st.pct >= 100 ? "pct-high" : st.pct >= 70 ? "pct-mid" : "pct-low";
      const isActive = emp.chapa === state.selectedChapa;
      return `
        <div class="emp-item ${isActive ? 'active' : ''}" onclick="window.PAREX_APP.selectEmployee('${emp.chapa}')">
          <div class="emp-info-main">
            <div class="emp-name">${st.audited ? "✅ " : ""}${emp.nome}</div>
            <div class="emp-sub">
              <span class="mono"><strong>Chapa ${emp.chapa}</strong></span>
              <span>• ${emp.cargo}</span>
              <span>• ${emp.status}</span>
            </div>
          </div>
          <span class="emp-pct-badge ${pctClass}">${Math.round(st.pct)}% (${st.mDone}/${st.mTotal})</span>
        </div>
      `;
    }).join("") + (filtered.length > 350 ? `<div style="padding:10px;text-align:center;font-size:12px;color:var(--parex-text-muted);">Exibindo 350 de ${filtered.length} colaboradores. Filtre por Cargo ou Busque por Nome/Chapa.</div>` : "");

    renderSelectedEmployeeDetail();
  }

  function renderSelectedEmployeeDetail() {
    const panel = document.getElementById("employeeDetailPanel");
    const emp = window.PAREX_DATA.employees.find((e) => e.chapa === state.selectedChapa);
    if (!emp) {
      panel.innerHTML = `<div style="padding:30px;text-align:center;">Selecione um colaborador na lista ao lado.</div>`;
      return;
    }

    const prof = window.PAREX_DATA.profiles[emp.profileKey];
    const st = getEmployeeTrainingStats(emp);
    const rec = state.trainingRecords[emp.chapa] || {};
    const sameCargoCount = window.PAREX_DATA.employees.filter((e) => e.cargo === emp.cargo).length;
    const inAuditedList = isEmployeeAudited(emp.chapa);

    panel.innerHTML = `
      <div class="emp-profile-banner">
        <div class="emp-profile-title">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="code-tag">CHAPA ${emp.chapa}</span>
            <span class="code-tag proc-tag">${emp.cargo}</span>
            <span class="code-tag iso-tag">MR-03-001: ${prof.name}</span>
            ${inAuditedList ? `<span class="badge-pill badge-orange">✓ INCLUÍDO NA AMOSTRA DA AUDITORIA</span>` : ""}
          </div>
          <h3>${emp.nome}</h3>
          <div class="emp-meta-grid">
            <span><strong>Admissão:</strong> ${emp.admissao}</span>
            <span><strong>Tipo M.O:</strong> ${emp.tipoMo} (${emp.modalidade})</span>
            <span><strong>Status 23/11/2026:</strong> ${emp.status} (${emp.turno})</span>
            <span><strong>Local Ponto:</strong> ${emp.local || "Obra Usina 1"}</span>
          </div>
        </div>

        <div style="text-align:right;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--parex-cool-gray-9);">CONFORMIDADE NA FUNÇÃO (MR-03-001)</div>
          <div style="font-family:'Outfit',sans-serif;font-size:34px;font-weight:800;color:${st.pct >= 100 ? 'var(--status-c)' : 'var(--parex-orange-dark)'};">
            ${formatPct(st.pct)}
          </div>
          <div style="font-size:12px;color:var(--parex-text-muted);">
            <strong>${st.mDone}/${st.mTotal}</strong> Mínimos Obrigatórios (M) • <strong>${st.dDone}/${st.dTotal}</strong> Desejáveis (D)
          </div>
        </div>
      </div>

      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn btn-sm ${inAuditedList ? 'btn-outline' : 'btn-primary'}"
            onclick="window.PAREX_APP.toggleAuditedEmployee('${emp.chapa}')">
            ${inAuditedList ? '✕ Remover da Amostra Auditada' : '➕ Incluir Colaborador na Amostra Auditada'}
          </button>
          <button type="button" class="btn btn-sm btn-navy" onclick="window.PAREX_APP.markEmployeeTrainings('${emp.chapa}', 'M')">
            ✓ Marcar Todos Obrigatórios (M)
          </button>
          <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.markEmployeeTrainings('${emp.chapa}', 'ALL')">
            ✓ Marcar Todos (M + D)
          </button>
          <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.markEmployeeTrainings('${emp.chapa}', 'NONE')">
            ↺ Limpar Colaborador
          </button>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.replicateCargoTrainings('${emp.chapa}')">
            ⚡ Aplicar Marcação aos ${sameCargoCount} do Cargo "${emp.cargo}"
          </button>
        </div>
      </div>

      <div class="training-table-wrap">
        <table class="training-table">
          <thead>
            <tr>
              <th style="width: 8%;">Possui?</th>
              <th style="width: 14%;">Código</th>
              <th style="width: 38%;">Procedimento / Treinamento Exigido na Matriz MR-03-001 R8</th>
              <th style="width: 12%;">Requisito</th>
              <th style="width: 28%;">Evidência / Nº Lista de Presença / Data</th>
            </tr>
          </thead>
          <tbody>
            ${prof.trainings.map((t) => {
              const itemRec = rec[t.code] || { done: false, note: "" };
              return `
                <tr class="${itemRec.done ? 'row-trained' : ''}">
                  <td style="text-align:center;">
                    <input type="checkbox" style="width:18px;height:18px;accent-color:var(--status-c);cursor:pointer;"
                      ${itemRec.done ? "checked" : ""}
                      onchange="window.PAREX_APP.toggleEmployeeTraining('${emp.chapa}', '${t.code}', this.checked)" />
                  </td>
                  <td class="mono"><strong>${t.code}</strong></td>
                  <td>
                    <strong>${t.title}</strong>
                    ${t.note ? `<div style="font-size:11px;color:var(--parex-orange-dark);font-weight:600;margin-top:2px;">⚠️ ${t.note}</div>` : ""}
                  </td>
                  <td>
                    <span class="req-badge req-${t.req}">${t.req === "M" ? "M — Obrigatório" : "D — Desejável"}</span>
                  </td>
                  <td>
                    <input type="text" class="form-control" style="padding:5px 9px;font-size:12px;"
                      placeholder="Digite nº da lista / data / obs..."
                      value="${(itemRec.note || "").replace(/"/g, "&quot;")}"
                      oninput="window.PAREX_APP.updateEmployeeTrainingNote('${emp.chapa}', '${t.code}', this.value)" />
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // ==================== AUDITEE SIGNATURE CANVAS (OPEN BY DEFAULT) ====================
  function initAuditeeCanvas() {
    const canvas = document.getElementById("auditeeSigCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let drawing = false;

    function drawSaved() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (state.auditeeSignatureDataUrl) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = state.auditeeSignatureDataUrl;
      }
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    function start(e) {
      drawing = true;
      const pos = getPos(e);
      ctx.strokeStyle = "#002D72";
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      e.preventDefault();
    }

    function move(e) {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      e.preventDefault();
    }

    function end() {
      if (!drawing) return;
      drawing = false;
      state.auditeeSignatureDataUrl = canvas.toDataURL("image/png");
      saveState(false);
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);

    drawSaved();
  }

  function bindHeaderInputs() {
    const map = [
      ["metaAuditor", "auditor"],
      ["metaAuditorRole", "auditorRole"],
      ["metaAuditado", "auditado"],
      ["metaArea", "area"],
      ["metaLocal", "local"],
      ["metaData", "data"],
      ["metaHora", "hora"],
      ["metaObjetivo", "objetivo"]
    ];

    map.forEach(([elId, key]) => {
      const el = document.getElementById(elId);
      if (!el) return;
      el.value = state.meta[key] !== undefined ? state.meta[key] : el.value;
      el.addEventListener("input", () => {
        state.meta[key] = el.value;
        saveState(false);
        updateDashboardAndReport();
      });
    });
  }

  // Public API on window.PAREX_APP
  window.PAREX_APP = {
    getState: () => state,
    getMetrics: computeMetrics,
    getEmployeeTrainingStats,
    getFilteredEmployees,
    getFilledManualRows,
    isEmployeeAudited,
    formatDateBR,
    formatPct,
    DISCIPLINES,

    manualSaveNow() {
      saveState(true);
    },

    clearAllAndStartFromZero() {
      state.pitItems = getCleanPitItems();
      state.recItems = getCleanRecItems();
      state.manualLogs = getCleanManualLogs();
      state.trainingRecords = {};
      state.auditedChapas = [];
      state.auditeeSignatureDataUrl = null;
      state.meta.auditado = "";
      state.selectedDisciplines = {
        METROLOGIA: true,
        TREINAMENTOS: true,
        MAQ_SOLDA: true,
        CONSUMIVEIS: true,
        SOLDADORES: true,
        ALMOX_GERAL: true
      };
      state.disciplineView = "ALL";

      const auditadoEl = document.getElementById("metaAuditado");
      if (auditadoEl) auditadoEl.value = "";

      const canvas = document.getElementById("auditeeSigCanvas");
      if (canvas) {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      }

      saveState(true);
      renderDisciplineSelector();
      renderPitCards();
      renderRecCards();
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    clearAllTrainings() {
      state.trainingRecords = {};
      state.auditedChapas = [];
      saveState(false);
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    toggleDiscipline(discKey, isChecked) {
      state.selectedDisciplines[discKey] = isChecked;
      saveState(false);
      renderDisciplineSelector();
      renderPitCards();
      updateDashboardAndReport();
    },

    toggleAllDisciplines(val) {
      DISCIPLINES.forEach((d) => (state.selectedDisciplines[d.key] = val));
      state.disciplineView = "ALL";
      saveState(false);
      renderDisciplineSelector();
      renderPitCards();
      updateDashboardAndReport();
    },

    jumpToDiscipline(discKey) {
      state.selectedDisciplines[discKey] = true;
      renderDisciplineSelector();
      if (discKey === "TREINAMENTOS") {
        this.switchTab("treinamentos");
      } else {
        this.switchTab("pit");
        this.setDisciplineView(discKey);
      }
    },

    setDisciplineView(viewKey) {
      state.disciplineView = viewKey;
      document.querySelectorAll("[data-disc-view]").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-disc-view") === viewKey);
      });
      renderPitCards();
    },

    addManualRow(category) {
      if (category === "instruments") {
        state.manualLogs.instruments.push({ tag: "", description: "", certRbc: "", validity: "", inFo03022: "SIM", status: "PEND", notes: "" });
      } else if (category === "weldingMachines") {
        state.manualLogs.weldingMachines.push({ tag: "", modelLocation: "", rciNumber: "", validity: "", deviationPct: "", status: "PEND", notes: "" });
      } else if (category === "consumablesOvens") {
        state.manualLogs.consumablesOvens.push({ lotNumber: "", awsSpec: "", ovenTag: "", tempHumidity: "", reqFo08014: "", status: "PEND", notes: "" });
      } else if (category === "welderStamps") {
        state.manualLogs.welderStamps.push({ sinete: "", welderNameChapa: "", processRqs: "", continuityIt13010: "", status: "PEND", notes: "" });
      }
      saveState(false);
      renderPitCards();
      updateDashboardAndReport();
    },

    removeManualRow(category, idx) {
      const arr = state.manualLogs[category];
      if (!arr) return;
      if (arr.length <= 1) {
        // Clear the single row instead of removing last row
        Object.keys(arr[0]).forEach((k) => (arr[0][k] = k === "status" ? "PEND" : k === "inFo03022" ? "SIM" : ""));
      } else {
        arr.splice(idx, 1);
      }
      saveState(false);
      renderPitCards();
      updateDashboardAndReport();
    },

    updateManualRow(category, idx, field, value) {
      const arr = state.manualLogs[category];
      if (!arr || !arr[idx]) return;
      arr[idx][field] = value;
      saveState(false);
      if (field === "status") {
        renderPitCards();
      }
      updateDashboardAndReport();
    },

    switchTab(tabName) {
      state.activeTab = tabName;
      document.querySelectorAll(".nav-tab").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === `panel-${tabName}`);
      });
      if (tabName === "relatorio") {
        updateDashboardAndReport();
      }
    },

    setItemStatus(section, itemId, newStatus) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item) return;
      // Clicking active button again toggles back to PEND (start from zero)
      item.status = item.status === newStatus ? "PEND" : newStatus;
      if (item.status === "C") {
        item.criteria.forEach((c) => (c.checked = true));
      } else if (item.status === "PEND") {
        item.criteria.forEach((c) => (c.checked = false));
      }
      saveState(false);
      if (section === "pit") renderPitCards();
      else renderRecCards();
      updateDashboardAndReport();
    },

    toggleCriterion(section, itemId, idx, checked) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item || !item.criteria[idx]) return;
      item.criteria[idx].checked = checked;
      const allChecked = item.criteria.every((c) => c.checked);
      const anyChecked = item.criteria.some((c) => c.checked);
      if (allChecked) {
        item.status = "C";
      } else if (anyChecked && item.status === "PEND") {
        item.status = "NC";
      }
      saveState(false);
      if (section === "pit") renderPitCards();
      else renderRecCards();
      updateDashboardAndReport();
    },

    updateItemText(section, itemId, field, value) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item) return;
      item[field] = value;
      saveState(false);
      renderReportTables();
    },

    async handleSlotPhotoUpload(section, itemId, slotIdx, file) {
      if (!file) return;
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item) return;
      if (!Array.isArray(item.photos)) item.photos = [null, null, null, null];
      try {
        const compressed = await compressImageFile(file);
        item.photos[slotIdx] = compressed;
        saveState(false);
        if (section === "pit") renderPitCards();
        else renderRecCards();
        renderReportTables();
      } catch (e) {
        console.warn("Erro ao processar foto:", e);
      }
    },

    async handleMultiPhotoUpload(section, itemId, fileList) {
      if (!fileList || !fileList.length) return;
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item) return;
      if (!Array.isArray(item.photos)) item.photos = [null, null, null, null];

      const files = Array.from(fileList).slice(0, 4);
      for (const file of files) {
        // Find first empty slot (0..3); if all full, overwrite starting at last slot
        let targetSlot = item.photos.findIndex((p) => !p || !p.dataUrl);
        if (targetSlot === -1 || targetSlot > 3) targetSlot = 3;
        try {
          item.photos[targetSlot] = await compressImageFile(file);
        } catch (e) {
          console.warn("Erro ao comprimir foto:", e);
        }
      }
      saveState(false);
      if (section === "pit") renderPitCards();
      else renderRecCards();
      renderReportTables();
    },

    removeItemPhoto(section, itemId, slotIdx) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item || !Array.isArray(item.photos)) return;
      item.photos[slotIdx] = null;
      saveState(false);
      if (section === "pit") renderPitCards();
      else renderRecCards();
      renderReportTables();
    },

    clearItemPhotos(section, itemId) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item) return;
      item.photos = [null, null, null, null];
      saveState(false);
      if (section === "pit") renderPitCards();
      else renderRecCards();
      renderReportTables();
    },

    previewPhoto(section, itemId, slotIdx) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item || !item.photos || !item.photos[slotIdx]) return;
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(`<html><head><title>Evidência Fotográfica ${slotIdx + 1}/4 — ${item.code || item.rnc}</title></head><body style="margin:0;background:#0F1E36;display:flex;align-items:center;justify-content:center;min-height:100vh;"><img src="${item.photos[slotIdx].dataUrl}" style="max-width:96vw;max-height:94vh;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,0.5);" /></body></html>`);
      }
    },

    filterRec(filterVal) {
      state.recFilter = filterVal;
      document.querySelectorAll("[data-rec-filter]").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-rec-filter") === filterVal);
      });
      renderRecCards();
    },

    loadDiagnosticSample() {
      // Optional helper to load the 4 instruments from RNC-03628/26 and sample welders if auditor wants a reference
      state.manualLogs.instruments = [
        { tag: "18563/26", description: "Paquímetro STARRETT (Item 3836)", certRbc: "RBC-18563", validity: "23/02/2027", inFo03022: "SIM", status: "C", notes: "" },
        { tag: "TRN-5080/26", description: "Trena LUFKÍN 5m (Item 4446)", certRbc: "RBC-5080", validity: "03/04/2027", inFo03022: "SIM", status: "C", notes: "" },
        { tag: "PX14290", description: "Luxímetro MINIPA (Item 1753)", certRbc: "1274224728999137680", validity: "07/08/2026", inFo03022: "VENC_SEM_OBS", status: "NC", notes: "" },
        { tag: "14302/26", description: "Termômetro Laser MINIPA (Item 4123)", certRbc: "RBC-14302", validity: "08/04/2027", inFo03022: "SIM", status: "C", notes: "" }
      ];
      saveState(false);
      renderPitCards();
      updateDashboardAndReport();
    },

    // Training Matrix methods
    setMatrixSectorFilter(sectorKey) {
      state.matrixSectorFilter = sectorKey;
      state.matrixCargoFilter = "ALL";
      document.getElementById("matrixSectorSelect").value = sectorKey;
      document.querySelectorAll("[data-sector-chip]").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-sector-chip") === sectorKey);
      });
      populateCargoDropdown();
      renderMatrixRoster();
    },

    onMatrixFilterChange() {
      const newSector = document.getElementById("matrixSectorSelect").value;
      if (newSector !== state.matrixSectorFilter) {
        state.matrixSectorFilter = newSector;
        state.matrixCargoFilter = "ALL";
        populateCargoDropdown();
      } else {
        state.matrixCargoFilter = document.getElementById("matrixCargoSelect").value;
      }
      state.matrixStatusFilter = document.getElementById("matrixStatusSelect").value;
      state.matrixSearch = document.getElementById("matrixSearchInput").value;

      document.querySelectorAll("[data-sector-chip]").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-sector-chip") === state.matrixSectorFilter);
      });
      renderMatrixRoster();
    },

    selectEmployee(chapa) {
      state.selectedChapa = chapa;
      renderMatrixRoster();
    },

    toggleAuditedEmployee(chapa) {
      const idx = state.auditedChapas.indexOf(chapa);
      if (idx >= 0) {
        state.auditedChapas.splice(idx, 1);
      } else {
        state.auditedChapas.push(chapa);
      }
      saveState(false);
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    toggleEmployeeTraining(chapa, procCode, isDone) {
      if (!state.auditedChapas.includes(chapa)) {
        state.auditedChapas.push(chapa);
      }
      if (!state.trainingRecords[chapa]) state.trainingRecords[chapa] = {};
      if (!state.trainingRecords[chapa][procCode]) {
        state.trainingRecords[chapa][procCode] = { done: false, note: "" };
      }
      state.trainingRecords[chapa][procCode].done = isDone;
      if (isDone && !state.trainingRecords[chapa][procCode].note) {
        state.trainingRecords[chapa][procCode].note = `Verificado em Pré-Auditoria (${formatDateBR(state.meta.data)})`;
      }
      saveState(false);
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    updateEmployeeTrainingNote(chapa, procCode, noteVal) {
      if (!state.auditedChapas.includes(chapa)) {
        state.auditedChapas.push(chapa);
      }
      if (!state.trainingRecords[chapa]) state.trainingRecords[chapa] = {};
      if (!state.trainingRecords[chapa][procCode]) {
        state.trainingRecords[chapa][procCode] = { done: true, note: "" };
      }
      state.trainingRecords[chapa][procCode].note = noteVal;
      saveState(false);
    },

    markEmployeeTrainings(chapa, mode) {
      const emp = window.PAREX_DATA.employees.find((e) => e.chapa === chapa);
      if (!emp) return;
      const prof = window.PAREX_DATA.profiles[emp.profileKey];
      if (!prof) return;

      if (mode === "NONE") {
        delete state.trainingRecords[chapa];
        const idx = state.auditedChapas.indexOf(chapa);
        if (idx >= 0) state.auditedChapas.splice(idx, 1);
      } else {
        if (!state.auditedChapas.includes(chapa)) state.auditedChapas.push(chapa);
        if (!state.trainingRecords[chapa]) state.trainingRecords[chapa] = {};
        prof.trainings.forEach((t) => {
          if (mode === "M" && t.req === "M") {
            state.trainingRecords[chapa][t.code] = {
              done: true,
              note: state.trainingRecords[chapa][t.code]?.note || `Lista Verificada (${formatDateBR(state.meta.data)})`
            };
          } else if (mode === "ALL") {
            state.trainingRecords[chapa][t.code] = {
              done: true,
              note: state.trainingRecords[chapa][t.code]?.note || `Lista Verificada (${formatDateBR(state.meta.data)})`
            };
          }
        });
      }

      saveState(false);
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    replicateCargoTrainings(sourceChapa) {
      const sourceEmp = window.PAREX_DATA.employees.find((e) => e.chapa === sourceChapa);
      if (!sourceEmp) return;
      const sourceRec = JSON.parse(JSON.stringify(state.trainingRecords[sourceChapa] || {}));

      window.PAREX_DATA.employees.forEach((e) => {
        if (e.cargo === sourceEmp.cargo) {
          state.trainingRecords[e.chapa] = JSON.parse(JSON.stringify(sourceRec));
          if (!state.auditedChapas.includes(e.chapa)) {
            state.auditedChapas.push(e.chapa);
          }
        }
      });

      saveState(false);
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    clearAuditeeSignature() {
      const canvas = document.getElementById("auditeeSigCanvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      state.auditeeSignatureDataUrl = null;
      saveState(false);
    },

    exportBackupJSON() {
      const payload = {
        exportedAt: new Date().toISOString(),
        meta: state.meta,
        selectedDisciplines: state.selectedDisciplines,
        metrics: computeMetrics(),
        manualLogs: state.manualLogs,
        pitItems: state.pitItems,
        recItems: state.recItems,
        auditedChapas: state.auditedChapas,
        trainingRecords: state.trainingRecords
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `PAREX-Pre-Auditoria-Almoxarifado-${state.meta.data}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },

    shareWhatsAppSummary() {
      const m = computeMetrics();
      const lines = [
        `*PAREX ENGENHARIA S/A — RELATÓRIO DE PRÉ-AUDITORIA DO ALMOXARIFADO (ISO 9001:2015)*`,
        `📍 *Projeto:* ${state.meta.local}`,
        `👤 *Auditor:* ${state.meta.auditor} (${state.meta.auditorRole})`,
        `👥 *Auditado(s):* ${(state.meta.auditado || "").trim() || "(Em aberto)"}`,
        `📅 *Data/Hora:* ${formatDateBR(state.meta.data)} às ${state.meta.hora}`,
        ``,
        `📊 *ÍNDICE DE CONFORMIDADE DO ALMOXARIFADO:* *${formatPct(m.overallPct)}*`,
        `• Checklist por Disciplinas (PIT): *${formatPct(m.pitPct)}* (${m.pitC} C / ${m.pitNC} NC)`,
        `• Registros Manuais (TAGs, Máquinas, Lotes, Sinetes): *${m.manTotal} itens* (*${formatPct(m.manPct)}*)`,
        `• Reincidências SGI: *${formatPct(m.recPct)}* (${m.recC} C / ${m.recNC} NC)`,
        `• Matriz de Treinamentos (MR-03-001 R8): *${m.auditedEmpCount} colaboradores verificados* (*${formatPct(m.trainPct)}*)`,
        ``,
        `🔏 *Assinado digitalmente com Carimbo e Rubrica:* Gabriel Pereira dos Santos — CRT 5359772/2024`
      ];
      const url = `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank");
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    loadState();
    state.meta.hora = `${hh}:${mm}:${ss}`;

    bindHeaderInputs();
    renderDisciplineSelector();
    renderPitCards();
    renderRecCards();
    initMatrixSelectors();
    renderMatrixRoster();
    initAuditeeCanvas();
    updateDashboardAndReport();
    startAutoSaveTimer();
  });
})();
