/* ==========================================================================
   PAREX ENGENHARIA S/A — PORTAL DE PRÉ-AUDITORIA DO ALMOXARIFADO & MATRIZ MR-03-001
   Padrão ABNT NBR ISO 9001:2015 | FO-08-031 Rev. 2 | PIT PI-1000KN-Q-500004
   ========================================================================== */

(function () {
  const STORAGE_KEY = "PAREX_PRE_AUDITORIA_ALMOX_V1";

  // 1. BASELINE PIT & CANONICAL PAREX HUB INSPECTION ITEMS (12 ITEMS)
  const DEFAULT_PIT_ITEMS = [
    {
      id: "PIT-1.2",
      code: "PIT 1.2",
      iso: "ISO 9001: 8.4 / 8.6",
      proc: "IT-12-001 Rev. 11",
      forms: "FO-12-008 (RIR) • PG-12-001 R10",
      title: "Recebimento de Materiais de Aplicação e Consumíveis Parex",
      desc: "Inspeção física, documental e de certificados no recebimento de materiais adquiridos pela Parex (tubos, conexões, chapas, consumíveis, EPIs e químicos).",
      status: "C",
      criteria: [
        { text: "Conferência física Nota Fiscal × Pedido de Compra (com requisitos de qualidade aplicáveis) × Material entregue", checked: true },
        { text: "Emissão sistemática do Relatório de Inspeção de Recebimento (FO-12-008 RIR) no Parex Hub com assinatura do inspetor/almoxarife", checked: true },
        { text: "Anexação e rastreabilidade do Certificado de Qualidade do Fabricante / Lote / Corrida no sistema", checked: true },
        { text: "Segregação imediata em Área de Quarentena quando houver divergência dimensional ou documental", checked: true }
      ],
      evidence: "Verificados RIRs (FO-12-008) emitidos no Parex Hub com certificados de fabricação anexados e conferência contra pedidos de compra.",
      action: "Manter 100% dos recebimentos de materiais de aplicação vinculados ao pedido com requisitos de qualidade (atenção especial a subfornecedores como INDEX)."
    },
    {
      id: "PIT-1.3",
      code: "PIT 1.3",
      iso: "ISO 9001: 8.5.3 / 8.6",
      proc: "IT-08-068 (PR-1000KN-Q-500018 R03)",
      forms: "FO-12-008 (RIR) • Romaneio Vale",
      title: "Recebimento de Materiais e Equipamentos Fornecidos pelo Cliente (Vale)",
      desc: "Controle de propriedade do cliente (Vale): inspeção conjunta no recebimento de estruturas, equipamentos mecânicos, elétricos, instrumentação e tubulação.",
      status: "C",
      criteria: [
        { text: "Inspeção visual e dimensional no descarregamento com participação do Controle da Qualidade e Almoxarifado", checked: true },
        { text: "Conferência de Packing List / Romaneio Vale × TAG / Desenho × Estado físico de pintura e embalagens", checked: true },
        { text: "Registro fotográfico no ato do recebimento e abertura imediata de plano de preservação (FO-08-109 PP)", checked: true },
        { text: "Notificação formal ao Cliente (ISO 9001 8.5.3) caso qualquer item fornecido apresente dano, extravio ou inadequação", checked: true }
      ],
      evidence: "Inspeções de recebimento Vale registradas com relatório fotográfico e abertura dos planos de preservação no Parex Hub (432 RPEs no acervo).",
      action: "Garantir que todo item recebido da Vale já receba etiqueta física vinculada ao nº do RPE no mesmo dia do descarregamento."
    },
    {
      id: "PIT-1.4",
      code: "PIT 1.4",
      iso: "ISO 9001: 8.5.4",
      proc: "IT-12-001 R11 • IT-08-068 R03",
      forms: "FO-08-109 PP (RPE)",
      title: "Armazenamento e Preservação de Materiais de Tubulação, Flanges, Válvulas e Suportes",
      desc: "Condições físicas de estocagem em pátio e galpão para tubos, acessórios, válvulas e suportes de tubulação (incluindo linhas de SPCI).",
      status: "C",
      criteria: [
        { text: "Tubos e suportes apoiados sobre dormentes/estrados de madeira, isentos de contato direto com o solo ou vegetação", checked: true },
        { text: "Extremidades biseladas e flanges protegidos com tampões plásticos/madeira e verniz protetivo nas faces usinadas", checked: true },
        { text: "Segregação física rigorosa entre aço carbono, aço inoxidável e ligas especiais (evitando contaminação férrica)", checked: true },
        { text: "Válvulas armazenadas em local coberto com obturador protegido e registro periódico no FO-08-109 PP", checked: true }
      ],
      evidence: "Pátio de tubulação organizado sobre dormentes com separação por diâmetro/material e proteção de biséis.",
      action: "Manter inspeção quinzenal de tampões de extremidade após períodos de chuva intensa."
    },
    {
      id: "PIT-1.5",
      code: "PIT 1.5",
      iso: "ISO 9001: 8.5.4",
      proc: "IT-08-068 (PR-1000KN-Q-500018 R03)",
      forms: "FO-08-109 PP (RPE) • Etiqueta Padrão",
      title: "Manuseio, Armazenamento e Preservação de Equipamentos Mecânicos (Tambores, Redutores, TRs)",
      desc: "Preservação sistemática de equipamentos mecânicos estáticos e rotativos (tambores de transportadores TR-1310KN-*, redutores, mancais e bombas).",
      status: "NC",
      criteria: [
        { text: "Etiqueta física afixada na peça contendo TAG, Data, Nº do RPE e Revisão batendo 100% com o último RPE do sistema", checked: false },
        { text: "Tambores revestidos de borracha (ex: TR-1310KN-137) armazenados em local coberto/protegido de radiação solar direta e umidade", checked: false },
        { text: "Execução periódica de giro de eixo em rotativos/redutores e verificação de nível de óleo protetivo", checked: true },
        { text: "Conformidade entre o checklist físico em campo (ED-1310KN-01) e os 432 RPEs gerados pelo Parex Hub", checked: false }
      ],
      evidence: "Constatadas pendências históricas nos equipamentos do ED-1310KN-01 (TR-1310KN-124 e TR-1310KN-128 — RNC-03633/26) e nos tambores de esticamento/acionamento do TR-1310KN-137 (RNC-00404/26 e RNC-00406/26).",
      action: "Substituir imediatamente etiquetas antigas pelo novo modelo padrão Parex Hub (TAG + Data + Nº RPE + Rev) no ED-1310KN-01 e concluir proteção física e novo RPE dos tambores do TR-137."
    },
    {
      id: "PIT-1.6",
      code: "PIT 1.6",
      iso: "ISO 9001: 8.5.4",
      proc: "IT-12-001 R11 • IT-08-068 R03",
      forms: "FO-08-109 PP (RPE)",
      title: "Manuseio, Armazenamento e Preservação de Estruturas Metálicas",
      desc: "Organização dos pátios de estruturas metálicas, vigas, perfis, grades de piso e chumbadores fornecidos pela Vale ou fabricados.",
      status: "C",
      criteria: [
        { text: "Peças estruturais apoiadas sobre calços de madeira nivelados e com leve inclinação para evitar acúmulo de água", checked: true },
        { text: "Espaçadores de madeira entre camadas empilhadas para não danificar o esquema de pintura", checked: true },
        { text: "Corredores de inspeção e acesso livres para movimentação segura de carga (Rigging)", checked: true },
        { text: "Identificação visível por TAG de peça / prédio (ex: ED-1310KN-01) e lote de recebimento", checked: true }
      ],
      evidence: "Pátio de estruturas com peças calçadas sobre dormentes, identificadas por TAG e sem contato com o solo.",
      action: "Manter roçagem e drenagem das baias de estocagem no período chuvoso."
    },
    {
      id: "PIT-1.7",
      code: "PIT 1.7",
      iso: "ISO 9001: 8.5.4",
      proc: "IT-08-068 (PR-1000KN-Q-500018 R03)",
      forms: "FO-08-109 PP (RPE)",
      title: "Armazenamento e Preservação de Materiais e Equipamentos de Elétrica e Instrumentação",
      desc: "Preservação de painéis elétricos, motores, transformadores, instrumentos de campo, cabos e luminárias em ambiente controlado.",
      status: "C",
      criteria: [
        { text: "Painéis e instrumentos armazenados em área fechada, seca e protegida contra poeira de minério e umidade", checked: true },
        { text: "Sachês de sílica gel ativos no interior dos painéis/caixas e termostatos/resistências de aquecimento monitorados", checked: true },
        { text: "Bobinas de cabos armazenadas na vertical com pontas vedadas (capuz termocontrátil) sobre piso firme", checked: true },
        { text: "Registros quinzenais/mensais de medição de isolamento (megômetro) e inspeção no FO-08-109 PP", checked: true }
      ],
      evidence: "Materiais de elétrica e instrumentação abrigados em área coberta/fechada com controle de sílica gel e RPEs ativos.",
      action: "Conferir etiquetas de RPE nos painéis antes da auditoria externa de 07/12/2026."
    },
    {
      id: "PIT-1.8",
      code: "PIT 1.8",
      iso: "ISO 9001: 8.5.4",
      proc: "IT-12-001 R11 • IT-13-048 R02 • IT-13-017",
      forms: "FO-12-006 • FO-13-154",
      title: "Armazenamento e Preservação de Tintas, Solventes, Graxas e Produtos Químicos",
      desc: "Controle de inflamáveis e químicos: validade FEFO/PEPS, bacia de contenção, ventilação, FISPQ/FDS e Kit de Mitigação Ambiental.",
      status: "C",
      criteria: [
        { text: "Armazenamento em baia específica ventilada, com bacia de contenção impermeável, gaiola e sinalização de segurança", checked: true },
        { text: "Etiqueta de controle de validade (FO-12-006) em todas as latas de tinta/catalisador/solvente (sistema PEPS/FEFO)", checked: true },
        { text: "Pasta física e QR Code com 100% das FISPQs / FDS atualizadas (FO-13-154) no local de armazenamento", checked: true },
        { text: "Kit de Mitigação Ambiental completo e conferido contra o saldo da planilha FO-12-004 (incluindo pás de plástico)", checked: true }
      ],
      evidence: "Baia de produtos químicos sinalizada, com contenção, controle de validade FO-12-006 e FISPQs disponíveis.",
      action: "Garantir reposição e conciliação física das Pás de Plástico do Kit de Mitigação apontadas na NC 03 da Auditoria Interna GQ."
    },
    {
      id: "PIT-1.9",
      code: "PIT 1.9",
      iso: "ISO 9001: 8.5.1 / 8.5.2 / 8.5.4",
      proc: "IT-08-002-PP R0 (IT-08-002 R08)",
      forms: "FO-08-014 (RC) • FO-08-008 • FO-08-058",
      title: "Armazenamento, Tratamento (Ressecagem/Manutenção) e Distribuição de Consumíveis de Solda",
      desc: "Sala de consumíveis do almoxarifado: controle termo-higrométrico, estufas de ressecagem e manutenção, estufas portáteis (cochichos) e requisição FO-08-014.",
      status: "C",
      criteria: [
        { text: "Sala climatizada com Umidade Relativa < 50% e Temperatura ≥ 20°C registradas diariamente (termohigrômetro calibrado)", checked: true },
        { text: "Estufas de ressecagem (até 500°C) e manutenção (100°C a 150°C) calibradas e com gráfico/planilha FO-08-008 preenchida", checked: true },
        { text: "Distribuição aos soldadores exclusivamente mediante Requisição de Consumível (FO-08-014 RC) preenchida pelo inspetor/encarregado", checked: true },
        { text: "Estufas portáteis (cochichos) identificadas por TAG, testadas mensalmente (FO-08-058 / IT-08-009) e energizadas em campo", checked: true }
      ],
      evidence: "Sala de consumíveis com controle de temperatura/umidade, estufas identificadas e requisições FO-08-014 arquivadas.",
      action: "Manter verificação diária do termohigrômetro da sala de consumíveis e assinatura nas fichas FO-08-008."
    },
    {
      id: "PIT-2.1",
      code: "PIT 2.1",
      iso: "ISO 9001: 8.5.2",
      proc: "IT-12-001 R11 • IT-08-007 R03 • IT-08-003-PP R0",
      forms: "FO-08-093 (RRLP) • FO-08-100",
      title: "Identificação e Rastreabilidade de Materiais, Tubos, Acessórios e Parafusos Estudados",
      desc: "Manutenção da identificação física (TAG, corrida, certificado, código de cores) desde o almoxarifado até a liberação para aplicação na obra.",
      status: "C",
      criteria: [
        { text: "Identificação por etiquetas/placas resistentes às intempéries em todas as prateleiras, baias e lotes de materiais", checked: true },
        { text: "Transferência de marcação (corrida/certificado) antes do fracionamento ou corte de tubos e chapas", checked: true },
        { text: "Controle de lotes de parafusos estruturais/estudados (ASTM A325 / A193 B7) vinculados ao certificado para torque (FO-08-100)", checked: true },
        { text: "Ausência de materiais sem identificação nas prateleiras de itens liberados do almoxarifado", checked: true }
      ],
      evidence: "Prateleiras e baias endereçadas e lotes de parafusos/conexões identificados com número de certificado/RIR.",
      action: "Conferir diariamente se etiquetas de prateleira não sofreram desgaste ou descolamento."
    },
    {
      id: "PIT-2.2",
      code: "PIT 2.2",
      iso: "ISO 9001: 7.1.5",
      proc: "IT-03-001 R04 • TB-03-002 R14 • IT-08-009 R05",
      forms: "FO-03-022 R2 • FO-08-018 (RCI)",
      title: "Controle de Dispositivos de Medição e Monitoramento (Metrologia), Máquinas de Solda e Estufas",
      desc: "Gestão da planilha mestra FO-03-022 no Parex Hub, validade de calibração RBC, critérios de aceitação TB-03-002 R14 e segregação física de vencidos.",
      status: "NC",
      criteria: [
        { text: "100% dos instrumentos disponíveis para empréstimo/uso no almoxarifado com calibração válida e selo físico legível", checked: true },
        { text: "Planilha canônica FO-03-022 sem nenhum instrumento vencido em branco (todos com status Recolhido / Retirado da obra / Calibrado)", checked: false },
        { text: "Análise crítica dos certificados de calibração frente aos erros máximos admissíveis da TB-03-002 Rev. 14", checked: true },
        { text: "Baia/armário trancado e identificado no almoxarifado exclusivo para segregação de instrumentos vencidos ou danificados", checked: true }
      ],
      evidence: "Auditoria da planilha FO-03-022 apontou o Luxímetro PX14290 (Item 1753, vencido em 07/08/2026) e mais 130 instrumentos vencidos sem observação de recolhimento/baixa na coluna de observações (RNC-03628/26).",
      action: "Sanear imediatamente os 130 registros vencidos sem observação na FO-03-022 (incluindo o Luxímetro PX14290) antes da auditoria de 07/12/2026."
    },
    {
      id: "CAN-11",
      code: "IT-12-001 §5.5",
      iso: "ISO 9001: 8.5.1 / 8.5.2 / 8.7",
      proc: "IT-12-001 Rev. 11 • PG-03-003 R10",
      forms: "FO-12-003 • FO-12-004 • FO-12-005 • CH-12-026",
      title: "Controle de Estoque (Físico × Sistema), Expedição (Romaneio FO-12-003), Quarentena e 5S",
      desc: "Conciliação entre saldo físico nas prateleiras, Planilha de Controle de Estoque (FO-12-004) e Romaneios de Saída (FO-12-003), cautela de ferramentas e 5S.",
      status: "NC",
      criteria: [
        { text: "Toda saída de material consumível ou EPI respaldada por Romaneio de Saída de Materiais (FO-12-003) numerado e assinado", checked: false },
        { text: "Batimento exato (100%) entre o saldo físico na prateleira e o saldo da planilha FO-12-004 (Sistema Consumível)", checked: false },
        { text: "Área de Material Não Conforme / Quarentena (ISO 9001 8.7) isolada, trancada e com placa de identificação vermelha", checked: true },
        { text: "Checklist mensal de 5S e Organização do Almoxarifado (CH-12-026) aplicado e afixado no quadro de gestão à vista", checked: true }
      ],
      evidence: "Na Auditoria Interna GQ (FO-128, NC 03) foram constatadas divergências de saldo físico × planilha FO-12-004 × Romaneios FO-12-003 em 5 itens amostrais (Camisas Tam. 38 e 42, Regulador Argônio, Pá de Plástico do Kit Mitigação e Cinta de Segurança nº 3743).",
      action: "Realizar inventário rotativo nos itens apontados na NC 03, vincular o nº do Romaneio FO-12-003 na Cinta nº 3743 e instituir conferência dupla diária nos lançamentos da FO-12-004."
    },
    {
      id: "CAN-12",
      code: "PG-03-001 / 7.5.3",
      iso: "ISO 9001: 5.1 / 5.2 / 7.3 / 7.5.3",
      proc: "PG-03-001 R12 • PG-03-002 R10 • IT-10-004",
      forms: "QR Code Central Parex Hub • Política SGI",
      title: "Controle de Informação Documentada, QR Code Central de Procedimentos e Conscientização SGI",
      desc: "Disponibilidade e domínio dos procedimentos vigentes (Book Rev. 10 / IT-12-001 R11) pela liderança e equipe do almoxarifado sem documentos obsoletos.",
      status: "C",
      criteria: [
        { text: "Banner e Folha A4 plastificada com QR Code da Central de Procedimentos Parex Hub afixados na entrada e balcão do almoxarifado", checked: true },
        { text: "Acesso imediato pelo celular (sem exigir login/senha) à revisão vigente da IT-12-001 Rev. 11 e IT-08-068 Rev. 03 aprovadas no SDx", checked: true },
        { text: "Encarregado e almoxarifes demonstram conhecimento prático da Política da Qualidade Parex e dos formulários da IT-12-001 R11", checked: true },
        { text: "Inexistência de cópias físicas obsoletas ou rascunhos não controlados nas bancadas do almoxarifado", checked: true }
      ],
      evidence: "Central de Procedimentos Parex Hub ativa via QR Code sem login, servindo as revisões vigentes do Book Rev. 10 (GRD-104 de 16/11/2026), com banners instalados e 4 listas de presença do almoxarifado registradas.",
      action: "Realizar simulação rápida de entrevista com o encarregado e auxiliares escaneando o QR Code da IT-12-001 Rev. 11 antes do dia 07/12/2026."
    }
  ];

  // 2. BASELINE PUNCTUAL RECURRENCES FROM EMAIL (23/11/2026 — GLEIDSON MESQUITA & EDSON BATISTA + FO-128) (8 ITEMS)
  const DEFAULT_REC_ITEMS = [
    {
      id: "REC-01",
      rnc: "RNC-03628/26 (Parte A)",
      history: "Reincidência Trienal: 09136/24 e 09138/24 (2024) → 07910/25 (2025) → 03628/26 (2026)",
      iso: "ISO 9001: 7.1.5 / 10.2",
      proc: "IT-03-001 R04 • TB-03-002 R14",
      forms: "FO-03-022 Rev. 2",
      title: "Inspeção Nominal dos 4 Instrumentos Auditados pela Vale (Alessandra Caetano)",
      desc: "Verificação pontual no Almoxarifado/Metrologia e na planilha canônica FO-03-022 dos 4 instrumentos citados nominalmente na RNC-03628/26.",
      status: "NC",
      criteria: [
        { text: "1. Paquímetro 18563/26 (STARRETT, Cód. 18563, Item 3836 na FO-03-022): Calibrado em 23/02/2026, Venc. 23/02/2027 — certificado RBC anexado e selo físico OK", checked: true },
        { text: "2. Trena 5080 / TRN-5080/26 (LUFKÍN, Cód. TRN-5080, Item 4446 em obra): Calibrada em 03/04/2026, Venc. 03/04/2027 — duplicidade com Item 6612 baixada como 'Retirado da obra'", checked: true },
        { text: "3. Luxímetro PX14290 (MINIPA, Cód. PX14290, Item 1753, Cert. 1274224728999137680): VENCIDO desde 07/08/2026 e SEM observação na FO-03-022 — lançar baixa/recolhimento imediato", checked: false },
        { text: "4. Pirômetro / Termômetro Laser 14302/26 (MINIPA, Cód. 14302, Item 4123): Calibrado em 08/04/2026, Venc. 08/04/2027 — evidenciar nota técnica esclarecendo que o nº '14002/26' citado na RNC foi erro de grafia para 14302/26", checked: true }
      ],
      evidence: "Paquímetro 18563 (Item 3836), Trena TRN-5080 (Item 4446) e Termômetro Laser 14302 (Item 4123) estão vigentes e com certificado RBC. Porém, o Luxímetro PX14290 (Item 1753) permanece vencido desde 07/08/2026 e com a coluna Observação em branco na FO-03-022.",
      action: "Preencher imediatamente a coluna Observação do Item 1753 (Luxímetro PX14290) na FO-03-022 como 'Recolhido / Retirado da obra' (ou anexar novo certificado RBC) e confirmar segregação física."
    },
    {
      id: "REC-02",
      rnc: "RNC-03628/26 (Parte B)",
      history: "Passivo Sistêmico da Planilha Canônica FO-03-022 (Corte 20/11/2026)",
      iso: "ISO 9001: 7.1.5.2",
      proc: "IT-03-001 R04",
      forms: "FO-03-022 (1.092 registros / 899 ativos)",
      title: "Saneamento dos 130 Instrumentos Vencidos Sem Observação na FO-03-022",
      desc: "Como o auditor da Vale pede a FO-03-022 inteira, qualquer linha vencida sem observação ('Recolhido', 'Retirado da obra', 'Não localizado') configura reincidência imediata.",
      status: "NC",
      criteria: [
        { text: "Auditoria das 1.092 linhas da FO-03-022 da obra (899 instrumentos ativos no corte de 20/11/2026)", checked: true },
        { text: "Tratativa concluída para 100% dos 130 instrumentos vencidos que estavam sem observação na planilha", checked: false },
        { text: "Verificação física nas prateleiras do Almoxarifado e Ferramentaria garantindo zero instrumento vencido disponível para cautela", checked: true },
        { text: "Exportação da FO-03-022 saneada pelo Parex Hub pronta para apresentação à auditoria SGI de 07/12/2026", checked: false }
      ],
      evidence: "Dos 200 instrumentos com data de validade ultrapassada na FO-03-022, 70 já possuem justificativa/baixa lançada, restando 130 registros vencidos com campo de observação em branco.",
      action: "Executar mutirão Metrologia + Almoxarifado para classificar os 130 itens na FO-03-022 ('Recolhido ao almoxarifado', 'Devolvido/Retirado da obra' ou 'Em calibração externa') até 28/11/2026."
    },
    {
      id: "REC-03",
      rnc: "RNC-03630/26",
      history: "Falha de Acesso e Conhecimento da IT-012-001 Rev. 11 no Almoxarifado",
      iso: "ISO 9001: 7.2 / 7.3 / 7.5.3",
      proc: "IT-12-001 Rev. 11 • PG-03-001 R12",
      forms: "4 Listas de Presença Almox. • QR Code Central",
      title: "Conhecimento da IT-12-001 Rev. 11 pelo Encarregado de Almoxarifado e Acesso via QR Code",
      desc: "Na auditoria da Vale, o encarregado de almoxarifado não demonstrou conhecimento nem acesso à IT-012-001_r11 (Recebimento, Armazenamento, Preservação, Manuseio e Expedição).",
      status: "C",
      criteria: [
        { text: "Banner e folha A4 plastificada com QR Code da Central de Procedimentos Parex Hub instalados no almoxarifado (acesso livre sem login)", checked: true },
        { text: "Validação das 4 listas de presença do almoxarifado no sistema confirmando citação expressa da IT-012-001 Rev. 11 e assinatura dos encarregados", checked: true },
        { text: "Exibição do vídeo institucional de conscientização sobre consulta à Central de Procedimentos pelo celular", checked: true },
        { text: "Sabatinas práticas com os Encarregados (Francisco Adevaldo / Miqueias Monteiro) e Técnicos de Materiais abrindo a IT-12-001 R11 em menos de 15 segundos", checked: true }
      ],
      evidence: "Banners e placas A4 com QR Code instalados no Almoxarifado; Central de Procedimentos Parex Hub abrindo a revisão aprovada no SDx sem login; 4 listas de treinamento do almoxarifado verificadas e equipe sabatinada.",
      action: "Manter placa QR Code limpa e visível no balcão de atendimento e na sala do encarregado."
    },
    {
      id: "REC-04",
      rnc: "RNC-03633/26",
      history: "Reincidência Direta: RNC-07917/25 (2025) → RNC-03633/26 (2026)",
      iso: "ISO 9001: 8.5.4 / 10.2",
      proc: "IT-08-068 (PR-1000KN-Q-500018 R03)",
      forms: "FO-08-109 PP (RPE 899 e RPE 561)",
      title: "Batimento Físico Etiqueta × RPE no ED-1310KN-01 (TR-1310KN-124 e TR-1310KN-128)",
      desc: "Alerta do e-mail SGI: 'O ED-1310KN-01 é o primeiro lugar a que o auditor volta'. Etiquetas físicas apresentavam datas divergentes dos RPEs emitidos.",
      status: "NC",
      criteria: [
        { text: "Conferência dos 432 RPEs (FO-08-109 PP) emitidos pelo Parex Hub e sincronizados no NAS da obra", checked: true },
        { text: "Implantação do novo modelo de etiqueta física contendo obrigatoriamente: TAG, Data, Nº do RPE e Revisão", checked: true },
        { text: "Inspeção in loco com foto no ED-1310KN-01 do equipamento TR-1310KN-124 (conciliando RPE 899 de 25/02/26 × etiqueta física atualizada)", checked: false },
        { text: "Inspeção in loco com foto no ED-1310KN-01 do equipamento TR-1310KN-128 (conciliando RPE 561 de 12/12/25 × etiqueta física atualizada)", checked: false }
      ],
      evidence: "O sistema Parex Hub já emitiu os 432 RPEs e o novo padrão de etiqueta com nº do RPE, porém ainda falta anexar o registro fotográfico de campo no ED-1310KN-01 comprovando a nova etiqueta afixada no TR-1310KN-124 e TR-1310KN-128.",
      action: "Ir a campo no ED-1310KN-01 hoje, afixar/conferir a nova etiqueta plastificada no TR-1310KN-124 e TR-1310KN-128 batendo com o último RPE do sistema e fotografar para o dossiê da auditoria."
    },
    {
      id: "REC-05",
      rnc: "RNC-00404/26 e RNC-00406/26",
      history: "Falha de Preservação de Tambores do TR-1310KN-137 (Planos 001719 e 001720)",
      iso: "ISO 9001: 8.5.4 / 8.7",
      proc: "IT-08-068 R03 • PIT PI-1000KN-Q-500004 §1.5",
      forms: "FO-08-109 PP (RPE) • DDS Equipe Preservação",
      title: "Preservação Física dos Tambores de Esticamento e Acionamento do TR-1310KN-137 (TR-137)",
      desc: "RNC-00404/26 (tambor de esticamento, plano 001719) e RNC-00406/26 (tambor de acionamento, plano 001720) paradas na Etapa 8 sem movimento desde ago/set.",
      status: "NC",
      criteria: [
        { text: "Verificação física da proteção das borrachas de revestimento dos tambores do TR-1310KN-137 (protegidos de sol, chuva e contato com piso)", checked: true },
        { text: "Emissão de novo RPE atualizado (FO-08-109 PP) no Parex Hub para os Planos 001719 e 001720 com fotos atuais", checked: true },
        { text: "Realização e assinatura do DDS específico com a equipe atual de preservação sobre os manuais do fabricante e PIT §1.5", checked: false },
        { text: "Registro da auditoria interna por amostragem de preservação para destravar a Etapa 8 das RNCs 00404/26 e 00406/26", checked: false }
      ],
      evidence: "Preservação física e RPEs atualizados, mas pendente a lista assinada do DDS específico com a equipe atual de preservação nos manuais/PIT para encerramento formal da Etapa 8.",
      action: "Coletar assinaturas do DDS de preservação nos manuais dos tambores TR-137 e anexar este relatório de pré-auditoria como evidência da auditoria interna amostral."
    },
    {
      id: "REC-06",
      rnc: "RNC-00807/26",
      history: "Máquinas de Solda com Calibração Vencida nas Frentes de Serviço",
      iso: "ISO 9001: 7.1.5.1 / 8.5.1",
      proc: "IT-08-009 Rev. 05 • TB-03-002 Rev. 14",
      forms: "FO-08-018 (RCI) • Matriz RACI",
      title: "Controle de Calibração Semestral de Máquinas de Solda e Estufas (FO-08-018 RCI)",
      desc: "Verificação da validade de 6 meses (TB-03-002 R14), desvio máximo de 20%, alertas automáticos de 15 e 7 dias e quadros de gestão à vista.",
      status: "C",
      criteria: [
        { text: "Emissão do Relatório de Calibração Interna (FO-08-018 RCI) pelo Parex Hub para todas as máquinas de solda ativas", checked: true },
        { text: "Alertas automáticos por e-mail configurados para 15 dias e 7 dias antes do vencimento semestral", checked: true },
        { text: "Quadros de gestão à vista instalados nas frentes de serviço e Matriz RACI divulgada entre Solda, Manutenção, Almoxarifado e CQ", checked: true },
        { text: "Evidências dos treinamentos na IT-08-009 R05 realizados em 17/10/2026, 28/10/2026 e 29/10/2026 arquivadas", checked: true }
      ],
      evidence: "RCIs (FO-08-018) emitidos pelo sistema, alertas de 15 e 7 dias operacionais, quadros nas frentes e listas de presença de 17/10, 28/10 e 29/10 comprovadas.",
      action: "Manter bloqueio no almoxarifado/manutenção impedindo liberação de máquina de solda sem selo RCI vigente."
    },
    {
      id: "REC-07",
      rnc: "RNC-03629/26 + NC 03 GQ (FO-128)",
      history: "Auditoria Vale (Suportes SPCI INDEX) + Auditoria Interna GQ 19/11/2026 (FO-128 págs. 15–16)",
      iso: "ISO 9001: 8.4.2 / 8.5.1 / 8.5.2",
      proc: "IT-12-001 Rev. 11 • PG-12-001 R10",
      forms: "FO-12-008 (RIR) • FO-12-003 • FO-12-004",
      title: "RIR do Subfornecedor INDEX (SPCI) e Conciliação dos 5 Itens Divergentes do Estoque (NC 03 GQ)",
      desc: "Inspeção documental dos suportes de tubulação SPCI (INDEX) e recontagem física dos 5 itens apontados na NC 03 da Auditoria Interna GQ.",
      status: "NC",
      criteria: [
        { text: "RNC-03629/26 (Subfornecedor INDEX — Suportes SPCI): Pedido/Contrato com requisitos de qualidade + RIR (FO-12-008) e inspeção de recebimento arquivados", checked: false },
        { text: "Item 1 e 2 (NC 03 GQ): Camisa Operacional Tam. 38 (Romaneios 5016, 4872, 4800, 4695: sist. 7 × fís. 10) e Tam. 42 (Romaneio 22/10: sist. 12 × fís. 14) conciliados na FO-12-004", checked: false },
        { text: "Item 3 e 4 (NC 03 GQ): Regulador de Pressão Argônio (Romaneios 4899, 4862, 4850: sist. 4 × fís. 5) e Pá de Plástico do Kit Mitigação (Romaneio 4916: sist. 4 × fís. 2) ajustados", checked: false },
        { text: "Item 5 (NC 03 GQ): Cinta de Segurança nº 3743 (saída de 02/11 na planilha FO-12-004 sem nº de Romaneio FO-12-003) regularizada com romaneio assinado", checked: false }
      ],
      evidence: "Pendência de juntada do Pedido/Contrato + FO-12-008 dos suportes SPCI do subfornecedor INDEX com Suprimentos/CQ, e necessidade de baixa/ajuste no sistema FO-12-004 das 5 divergências de romaneio FO-12-003 detectadas na auditoria interna de 19/11/2026.",
      action: "Emitir romaneios complementares FO-12-003 para zerar as divergências das Camisas 38/42, Regulador de Argônio, Pá de Plástico e Cinta nº 3743, e anexar dossiê INDEX (Pedido + FO-12-008)."
    },
    {
      id: "REC-08",
      rnc: "RNC-03625/26, RNC-03634/26 e DNV NC 6",
      history: "Reincidência Trienal: 09134/24 (2024) → 07909/25 (2025) → 03625/26, 03634/26 e DNV NC 6 (2026)",
      iso: "ISO 9001: 7.2 / 7.3 / 10.2",
      proc: "IT-03-002 R04 • MA-09-001 R24 •PG-03-003 R10",
      forms: "MR-03-001 Rev. 8 • Listas Assinadas no Parex Hub",
      title: "Cruzamento Sistêmico Efetivo × Função × Matriz MR-03-001 e Eficácia de Tratamento de Causa Raiz",
      desc: "Verificação da qualificação na função para toda a equipe do Almoxarifado (20 efetivos) e casos nominais da RNC-03634/26 (Inspetor Jorge Mauricio e Soldadores).",
      status: "C",
      criteria: [
        { text: "Módulo de Cruzamento Efetivo (1.110 colaboradores) × Cargo (140 cargos) × Matriz MR-03-001 Rev. 8 implantado e auditável (mudança de método exigida pela DNV NC 6)", checked: true },
        { text: "Equipe do Almoxarifado (20 colaboradores) com treinamentos obrigatórios da matriz (IT-12-001 R11, IT-03-001 R04, PG-03-001 R12, IT-08-068 R03) mapeados e verificados", checked: true },
        { text: "Verificação nominal RNC-03634/26: Jorge Mauricio Alves Franco (Chapa 054623, Inspetor Solda N1) com evidência em IT-08-005 e IT-03-001", checked: true },
        { text: "Verificação nominal RNC-03634/26: Juveci de Souza Goveia (Chapa 038768, Soldador MIG) e equipe de solda com evidência em IT-08-002 e IT-13-010 (Trabalho a Quente)", checked: true }
      ],
      evidence: "Matriz de Treinamentos digitalizada e integrada ao efetivo presente de 1.110 colaboradores (Aba 3 deste Portal), permitindo auditoria instantânea por cargo e colaborador.",
      action: "Utilizar a Aba 3 (Matriz de Treinamentos) durante a auditoria SGI de 07 a 09/12/2026 para demonstrar o controle sistêmico por função."
    }
  ];

  // Employees highlighted in the audit email for quick filter
  const HIGHLIGHTED_CHAPAS = new Set([
    "030282", // FRANCISCO ADEVALDO DA SILVA (Encarregado Almoxarifado)
    "036989", // MIQUEIAS DE SOUSA MONTEIRO (Encarregado Almoxarifado)
    "043828", // WEMERSON MARCELO FERREIRA LEMOS (Almoxarife I)
    "049615", // GABRIEL PEREIRA DOS SANTOS (Técnico Qualidade II - Auditor)
    "057660", // GLEIDSON MACEDO DE MESQUITA (Técnico Qualidade III)
    "053601", // EDSON BATISTA FILHO (Engenheiro Qualidade PL)
    "054623", // JORGE MAURICIO ALVES FRANCO (Inspetor Solda N1 - RNC-03634/26)
    "038768"  // JUVECI DE SOUZA GOVEIA (Soldador MIG - RNC-03634/26)
  ]);

  // Build initial realistic training records so Almoxarifado and key employees have pre-populated audit records
  function buildDefaultTrainingRecords() {
    const records = {};
    if (!window.PAREX_DATA || !window.PAREX_DATA.employees) return records;

    const profiles = window.PAREX_DATA.profiles;
    window.PAREX_DATA.employees.forEach((emp) => {
      const prof = profiles[emp.profileKey];
      if (!prof) return;

      // Default baseline:
      // - Almoxarifado employees who are PRESENTE have all mandatory (M) trainings completed from the 4 Almoxarifado lists (except 1-2 desirable D items or FALTA employees needing 1 check)
      // - Highlighted employees have specific records matching the email
      // - Other employees have baseline onboarding/core SGI procedures (AP-09-001, PG-03-001, IT-13-005, IT-13-013, IT-13-025) pre-checked
      const empRec = {};
      const isAlmox = emp.profileKey === "ADM::Almoxarifado";
      const isCQ = emp.profileKey === "ADM::Controle da qualidade";

      prof.trainings.forEach((t) => {
        let done = false;
        let note = "";

        if (isAlmox) {
          if (t.req === "M") {
            if (emp.status === "PRESENTE" || emp.chapa === "036989") {
              done = true;
              note = t.code === "IT-12-001"
                ? "Lista Presença Almox. #04/2026 (IT-12-001 R11 + QR Code)"
                : "Treinamento SGI Almoxarifado (Nov/2026)";
            } else {
              // Employees on FALTA/FÉRIAS have core integration + main ITs, leaving 2 items to verify on return
              done = !["IT-08-068", "IT-13-048"].includes(t.code);
              note = done ? "Integração SGI / Lista Almoxarifado" : "Agendado retorno de Falta/Férias";
            }
          } else {
            done = ["IT-10-004"].includes(t.code);
            note = done ? "Vídeo + QR Code Central de Procedimentos" : "";
          }
        } else if (isCQ) {
          if (t.req === "M") {
            done = true;
            note = "Qualificação Equipe SGI / CQ Parex Hub";
          } else {
            done = ["IT-10-004", "IT-08-009"].includes(t.code);
            note = done ? "Treinamento Parex Hub" : "";
          }
        } else if (emp.chapa === "038768") {
          // Juveci de Souza Goveia (Soldador MIG cited in RNC-03634/26)
          if (t.req === "M") {
            done = true;
            note = t.code === "IT-13-010"
              ? "Lista Trabalho a Quente (Saneamento RNC-03634/26)"
              : t.code === "IT-08-002"
              ? "Lista Consumíveis de Solda (IT-08-002 R08)"
              : "Treinamento Disciplina Solda";
          }
        } else {
          // General 1,110 roster baseline: core mandatory integration & SSMA procedures completed
          const coreCodes = ["AP-09-001", "PG-03-001", "PG-03-005", "IT-03-002", "IT-13-005", "IT-13-013", "IT-13-025", "IT-13-001", "IT-13-002", "IT-13-006", "IT-08-002", "IT-08-001"];
          if (coreCodes.includes(t.code)) {
            done = true;
            note = "Integração Obra N1341 / DDS SGI";
          }
        }

        if (done || note) {
          empRec[t.code] = { done, note };
        }
      });

      records[emp.chapa] = empRec;
    });

    return records;
  }

  // Application State
  let state = {
    activeTab: "pit",
    pitFilter: "ALL",
    recFilter: "ALL",
    matrixSectorFilter: "ADM::Almoxarifado",
    matrixCargoFilter: "ALL",
    matrixStatusFilter: "ALL",
    matrixSearch: "",
    selectedChapa: "030282", // Francisco Adevaldo da Silva (Encarregado Almoxarifado)
    meta: {
      auditor: "Gabriel Pereira dos Santos",
      auditorRole: "Técnico em Qualidade • CRT - 5359772/2024",
      auditado: "Francisco Adevaldo da Silva / Miqueias de Sousa Monteiro / Maycon Jader P. Muniz",
      area: "Operacional — Almoxarifado, Recebimento, Preservação e Metrologia",
      local: "PABH 041 22 - Vale - Projeto de Adequação da Usina 1 - Parauapebas-PA (N1341)",
      data: "2026-11-24",
      hora: "09:30:00",
      objetivo: "Verificação preventiva de conformidade do Almoxarifado frente ao Plano FO-08-031 Rev. 2 (Requisitos ISO 9001: 5.1, 5.2, 7.1.5, 7.2, 7.3, 7.5.3, 8.1, 8.4, 8.5.1 a 8.5.6, 8.6, 8.7 e 10.2), PIT PI-1000KN-Q-500004 (Seções 1.0 e 2.0), Reincidências SGI 2024–2026 e Matriz MR-03-001 Rev. 8."
    },
    pitItems: JSON.parse(JSON.stringify(DEFAULT_PIT_ITEMS)),
    recItems: JSON.parse(JSON.stringify(DEFAULT_REC_ITEMS)),
    trainingRecords: {},
    auditeeSignatureDataUrl: null
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.pitItems && parsed.recItems) {
          state.meta = Object.assign({}, state.meta, parsed.meta || {});
          state.pitItems = parsed.pitItems;
          state.recItems = parsed.recItems;
          state.trainingRecords = parsed.trainingRecords || buildDefaultTrainingRecords();
          state.auditeeSignatureDataUrl = parsed.auditeeSignatureDataUrl || null;
          return;
        }
      }
    } catch (e) {
      console.warn("Erro ao carregar estado salvo:", e);
    }
    state.trainingRecords = buildDefaultTrainingRecords();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        meta: state.meta,
        pitItems: state.pitItems,
        recItems: state.recItems,
        trainingRecords: state.trainingRecords,
        auditeeSignatureDataUrl: state.auditeeSignatureDataUrl
      }));
    } catch (e) {
      console.warn("Não foi possível salvar no localStorage:", e);
    }
  }

  // Format YYYY-MM-DD to DD/MM/YYYY
  function formatDateBR(isoDate) {
    if (!isoDate) return "24/11/2026";
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  // Calculate employee training compliance stats
  function getEmployeeTrainingStats(emp) {
    const prof = window.PAREX_DATA.profiles[emp.profileKey];
    if (!prof) return { mDone: 0, mTotal: 0, dDone: 0, dTotal: 0, pct: 100 };
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

    const pct = mTotal > 0 ? (mDone / mTotal) * 100 : 100;
    return { mDone, mTotal, dDone, dTotal, pct };
  }

  // Calculate aggregate KPI metrics
  function computeMetrics() {
    const pitC = state.pitItems.filter((i) => i.status === "C").length;
    const pitNC = state.pitItems.filter((i) => i.status === "NC").length;
    const pitNA = state.pitItems.filter((i) => i.status === "NA").length;
    const pitValid = pitC + pitNC;
    const pitPct = pitValid > 0 ? (pitC / pitValid) * 100 : 0;

    const recC = state.recItems.filter((i) => i.status === "C").length;
    const recNC = state.recItems.filter((i) => i.status === "NC").length;
    const recNA = state.recItems.filter((i) => i.status === "NA").length;
    const recValid = recC + recNC;
    const recPct = recValid > 0 ? (recC / recValid) * 100 : 0;

    const totalC = pitC + recC;
    const totalNC = pitNC + recNC;
    const totalNA = pitNA + recNA;
    const totalValid = totalC + totalNC;
    const overallPct = totalValid > 0 ? (totalC / totalValid) * 100 : 0;

    // Almoxarifado training adherence (20 employees)
    const almoxEmps = window.PAREX_DATA.employees.filter((e) => e.profileKey === "ADM::Almoxarifado");
    let almoxMDone = 0, almoxMTotal = 0;
    almoxEmps.forEach((e) => {
      const st = getEmployeeTrainingStats(e);
      almoxMDone += st.mDone;
      almoxMTotal += st.mTotal;
    });
    const almoxTrainPct = almoxMTotal > 0 ? (almoxMDone / almoxMTotal) * 100 : 0;

    // Global 1,110 roster training stats
    let globalMDone = 0, globalMTotal = 0, globalFullCount = 0;
    window.PAREX_DATA.employees.forEach((e) => {
      const st = getEmployeeTrainingStats(e);
      globalMDone += st.mDone;
      globalMTotal += st.mTotal;
      if (st.pct >= 100) globalFullCount++;
    });
    const globalTrainPct = globalMTotal > 0 ? (globalMDone / globalMTotal) * 100 : 0;

    return {
      pitC, pitNC, pitNA, pitPct,
      recC, recNC, recNA, recPct,
      totalC, totalNC, totalNA, overallPct,
      almoxMDone, almoxMTotal, almoxTrainPct,
      globalMDone, globalMTotal, globalFullCount, globalTrainPct
    };
  }

  function formatPct(num) {
    return num.toFixed(1).replace(".", ",") + "%";
  }

  // Update KPI Scorecard & Report Header
  function updateDashboardAndReport() {
    const m = computeMetrics();

    document.getElementById("kpiOverallPct").textContent = formatPct(m.overallPct);
    document.getElementById("kpiOverallBar").style.width = `${m.overallPct}%`;
    document.getElementById("kpiOverallBar").style.backgroundColor =
      m.overallPct >= 85 ? "#2ECC71" : m.overallPct >= 70 ? "#FF6900" : "#E74C3C";
    document.getElementById("kpiOverallC").textContent = `${m.totalC} Conforme`;
    document.getElementById("kpiOverallNC").textContent = `${m.totalNC} Não Conforme`;
    document.getElementById("kpiOverallNA").textContent = `${m.totalNA} N/A`;
    document.getElementById("kpiOverallSummaryText").textContent =
      `${m.totalC} de ${m.totalC + m.totalNC} pontos aplicáveis conformes (${m.totalNC} pendências bloqueantes para 07/12/2026)`;

    document.getElementById("kpiPitPct").textContent = formatPct(m.pitPct);
    document.getElementById("kpiPitBar").style.width = `${m.pitPct}%`;
    document.getElementById("kpiPitC").textContent = `${m.pitC} C`;
    document.getElementById("kpiPitNC").textContent = `${m.pitNC} NC`;
    document.getElementById("kpiPitNA").textContent = `${m.pitNA} NA`;

    document.getElementById("kpiRecPct").textContent = formatPct(m.recPct);
    document.getElementById("kpiRecBar").style.width = `${m.recPct}%`;
    document.getElementById("kpiRecC").textContent = `${m.recC} C`;
    document.getElementById("kpiRecNC").textContent = `${m.recNC} NC`;
    document.getElementById("kpiRecNA").textContent = `${m.recNA} NA`;

    document.getElementById("kpiAlmoxTrainPct").textContent = formatPct(m.almoxTrainPct);
    document.getElementById("kpiAlmoxTrainBar").style.width = `${m.almoxTrainPct}%`;
    document.getElementById("kpiAlmoxTrainDone").textContent = `${m.almoxMDone}/${m.almoxMTotal} Treinamentos Obrigatórios (M)`;

    document.getElementById("kpiGlobalTrainPct").textContent = formatPct(m.globalTrainPct);
    document.getElementById("kpiGlobalTrainBar").style.width = `${m.globalTrainPct}%`;
    document.getElementById("kpiGlobalTrainCount").textContent = `${m.globalFullCount} com 100% Matriz | ${m.globalMDone} Treinamentos`;

    document.getElementById("badgeTabPit").textContent = `${formatPct(m.pitPct)} (${m.pitC}/${m.pitC + m.pitNC})`;
    document.getElementById("badgeTabRec").textContent = `${formatPct(m.recPct)} (${m.recC}/${m.recC + m.recNC})`;
    document.getElementById("badgeTabTrain").textContent = `Almox: ${formatPct(m.almoxTrainPct)}`;

    // Sync metadata fields to Report & Signature block
    const dateBR = formatDateBR(state.meta.data);
    const fullDateTime = `${dateBR} às ${state.meta.hora}`;

    document.getElementById("liveTimestampBadge").textContent = `Data/Hora: ${fullDateTime}`;
    document.getElementById("reportHeaderTimestamp").textContent = `Emissão: ${fullDateTime}`;
    document.getElementById("repAuditor").textContent = `${state.meta.auditor} (${state.meta.auditorRole})`;
    document.getElementById("repDataHora").textContent = fullDateTime;
    document.getElementById("repAuditado").textContent = state.meta.auditado;
    document.getElementById("repArea").textContent = state.meta.area;
    document.getElementById("repLocal").textContent = state.meta.local;
    document.getElementById("repObjetivo").textContent = state.meta.objetivo;

    document.getElementById("sigAuditorName").textContent = state.meta.auditor;
    document.getElementById("sigAuditorRole").textContent = `${state.meta.auditorRole} • Parex Engenharia S/A`;
    document.getElementById("sigTimestampText").textContent = fullDateTime;
    document.getElementById("sigAuditadoName").textContent = state.meta.auditado;
    document.getElementById("sigAuditadoArea").textContent = state.meta.area;
    document.getElementById("sigAuditadoTimestampText").textContent = fullDateTime;

    // Report scorecard boxes
    document.getElementById("repOverallPct").textContent = formatPct(m.overallPct);
    document.getElementById("repOverallCounts").textContent = `${m.totalC} Conforme / ${m.totalNC} Não Conforme / ${m.totalNA} N/A`;
    document.getElementById("repPitPct").textContent = formatPct(m.pitPct);
    document.getElementById("repPitCounts").textContent = `${m.pitC} C / ${m.pitNC} NC`;
    document.getElementById("repRecPct").textContent = formatPct(m.recPct);
    document.getElementById("repRecCounts").textContent = `${m.recC} Saneadas / ${m.recNC} Pendentes`;
    document.getElementById("repTrainPct").textContent = formatPct(m.almoxTrainPct);
    document.getElementById("repTrainCounts").textContent = `${m.almoxMDone}/${m.almoxMTotal} Treinamentos Obrigatórios`;

    renderReportTables();
  }

  // Render Tab 1: PIT Cards
  function renderPitCards() {
    const container = document.getElementById("pitCardsContainer");
    const filtered = state.pitItems.filter((item) => state.pitFilter === "ALL" || item.status === state.pitFilter);

    container.innerHTML = filtered.map((item) => {
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
              <span>${checkedCount}/${item.criteria.length} critérios atendidos</span>
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
              <textarea class="audit-textarea"
                oninput="window.PAREX_APP.updateItemText('pit', '${item.id}', 'evidence', this.value)">${item.evidence}</textarea>
            </div>
            <div class="audit-input-col">
              <label>Tratativa / Plano de Ação Corretiva Imediata</label>
              <textarea class="audit-textarea"
                oninput="window.PAREX_APP.updateItemText('pit', '${item.id}', 'action', this.value)">${item.action}</textarea>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Render Tab 2: Recurrence Cards
  function renderRecCards() {
    const container = document.getElementById("recCardsContainer");
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
                ✓ Conforme (Saneado)
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
              <textarea class="audit-textarea"
                oninput="window.PAREX_APP.updateItemText('rec', '${item.id}', 'evidence', this.value)">${item.evidence}</textarea>
            </div>
            <div class="audit-input-col">
              <label>Ação de Bloqueio / Saneamento antes de 07/12/2026</label>
              <textarea class="audit-textarea"
                oninput="window.PAREX_APP.updateItemText('rec', '${item.id}', 'action', this.value)">${item.action}</textarea>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Render Tab 4: Consolidated Report Tables
  function renderReportTables() {
    const pitTbody = document.querySelector("#repPitTable tbody");
    pitTbody.innerHTML = state.pitItems.map((item) => {
      const badgeColor = item.status === "C" ? "var(--status-c)" : item.status === "NC" ? "var(--status-nc)" : "var(--status-na)";
      const statusLabel = item.status === "C" ? "CONFORME" : item.status === "NC" ? "NÃO CONFORME" : "N/A";
      return `
        <tr>
          <td><strong>${item.code}</strong><br/><span style="font-size:11px;color:var(--parex-text-muted);">${item.iso}</span></td>
          <td><strong>${item.title}</strong><br/><span style="font-size:11px;color:var(--parex-text-muted);">${item.proc} | ${item.forms}</span></td>
          <td><strong style="color:${badgeColor};">${statusLabel}</strong></td>
          <td>${item.evidence}</td>
          <td>${item.action}</td>
        </tr>
      `;
    }).join("");

    const recTbody = document.querySelector("#repRecTable tbody");
    recTbody.innerHTML = state.recItems.map((item) => {
      const badgeColor = item.status === "C" ? "var(--status-c)" : item.status === "NC" ? "var(--status-nc)" : "var(--status-na)";
      const statusLabel = item.status === "C" ? "CONFORME" : item.status === "NC" ? "NÃO CONFORME" : "N/A";
      return `
        <tr>
          <td><strong style="color:var(--status-nc);">${item.rnc}</strong><br/><span style="font-size:10.5px;color:var(--parex-text-muted);">${item.iso}</span></td>
          <td><strong>${item.title}</strong><br/><span style="font-size:11px;color:var(--parex-text-muted);">${item.proc} | ${item.forms}</span></td>
          <td><strong style="color:${badgeColor};">${statusLabel}</strong></td>
          <td>${item.evidence}</td>
          <td>${item.action}</td>
        </tr>
      `;
    }).join("");

    // Render Almoxarifado + Highlighted Employees in Report Table 3
    const trainTbody = document.querySelector("#repTrainTable tbody");
    const reportEmps = window.PAREX_DATA.employees.filter(
      (e) => e.profileKey === "ADM::Almoxarifado" || HIGHLIGHTED_CHAPAS.has(e.chapa)
    );
    trainTbody.innerHTML = reportEmps.map((emp) => {
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

  // ==================== TAB 3: TRAINING MATRIX (MR-03-001 × 1,110 EMPLOYEES) ====================
  function initMatrixSelectors() {
    const sectorSelect = document.getElementById("matrixSectorSelect");
    const profiles = window.PAREX_DATA.profiles;

    let html = `<option value="ALL">Todas as Áreas / Disciplinas da Matriz (1.110 Efetivos)</option>`;
    html += `<option value="AUDIT_HIGHLIGHTS">⚠️ Citados Nominalmente no E-mail / Auditoria (8)</option>`;

    Object.values(profiles).forEach((p) => {
      const count = window.PAREX_DATA.employees.filter((e) => e.profileKey === p.key).length;
      html += `<option value="${p.key}" ${p.key === state.matrixSectorFilter ? "selected" : ""}>${p.name} — ${p.group.split(" (")[0]} (${count})</option>`;
    });
    sectorSelect.innerHTML = html;

    populateCargoDropdown();
  }

  function populateCargoDropdown() {
    const cargoSelect = document.getElementById("matrixCargoSelect");
    const sector = state.matrixSectorFilter;

    const cargos = window.PAREX_DATA.cargos.filter((c) => {
      if (sector === "ALL" || sector === "AUDIT_HIGHLIGHTS") return true;
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
      if (sector === "AUDIT_HIGHLIGHTS") {
        if (!HIGHLIGHTED_CHAPAS.has(e.chapa)) return false;
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
      return;
    }

    // If current selectedChapa is not in filtered list, select the first one
    if (!filtered.some((e) => e.chapa === state.selectedChapa)) {
      state.selectedChapa = filtered[0].chapa;
    }

    // Render up to 300 in DOM for instant performance (with note if more)
    const displayList = filtered.slice(0, 350);
    listEl.innerHTML = displayList.map((emp) => {
      const st = getEmployeeTrainingStats(emp);
      const pctClass = st.pct >= 100 ? "pct-high" : st.pct >= 70 ? "pct-mid" : "pct-low";
      const isActive = emp.chapa === state.selectedChapa;
      return `
        <div class="emp-item ${isActive ? 'active' : ''}" onclick="window.PAREX_APP.selectEmployee('${emp.chapa}')">
          <div class="emp-info-main">
            <div class="emp-name">${emp.nome}</div>
            <div class="emp-sub">
              <span class="mono"><strong>Chapa ${emp.chapa}</strong></span>
              <span>• ${emp.cargo}</span>
              <span>• ${emp.status}</span>
            </div>
          </div>
          <span class="emp-pct-badge ${pctClass}">${Math.round(st.pct)}% (${st.mDone}/${st.mTotal})</span>
        </div>
      `;
    }).join("") + (filtered.length > 350 ? `<div style="padding:10px;text-align:center;font-size:12px;color:var(--parex-text-muted);">Exibindo 350 de ${filtered.length} colaboradores. Use o filtro de Cargo ou Busca por Nome/Chapa para refinar.</div>` : "");

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

    panel.innerHTML = `
      <div class="emp-profile-banner">
        <div class="emp-profile-title">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="code-tag">CHAPA ${emp.chapa}</span>
            <span class="code-tag proc-tag">${emp.cargo}</span>
            <span class="code-tag iso-tag">MR-03-001: ${prof.name}</span>
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
          <button type="button" class="btn btn-sm btn-navy" onclick="window.PAREX_APP.markEmployeeTrainings('${emp.chapa}', 'M')">
            ✓ Marcar Todos Obrigatórios (M)
          </button>
          <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.markEmployeeTrainings('${emp.chapa}', 'ALL')">
            ✓ Marcar Todos (M + D)
          </button>
          <button type="button" class="btn btn-sm btn-outline" onclick="window.PAREX_APP.markEmployeeTrainings('${emp.chapa}', 'NONE')">
            ↺ Desmarcar Todos
          </button>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button type="button" class="btn btn-sm btn-primary" onclick="window.PAREX_APP.replicateCargoTrainings('${emp.chapa}')">
            ⚡ Aplicar Marcação aos ${sameCargoCount} Efetivos do Cargo "${emp.cargo}"
          </button>
        </div>
      </div>

      <div class="training-table-wrap">
        <table class="training-table">
          <thead>
            <tr>
              <th style="width: 8%;">Check</th>
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
                      placeholder="Ex: Lista Presença #04 - 20/11/2026"
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

  // ==================== AUDITEE SIGNATURE CANVAS ====================
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
      } else {
        stampDefaultAuditeeAck(ctx, canvas);
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
      saveState();
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);

    drawSaved();
  }

  function stampDefaultAuditeeAck(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#002D72";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 16, canvas.width - 36, canvas.height - 32);

    ctx.fillStyle = "#002D72";
    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CIÊNCIA DIGITAL DO AUDITADO — ALMOXARIFADO", canvas.width / 2, 38);

    ctx.font = "italic 16px Georgia, serif";
    ctx.fillStyle = "#0A4194";
    const firstAuditee = (state.meta.auditado || "Encarregado Almoxarifado").split("/")[0].trim();
    ctx.fillText(firstAuditee, canvas.width / 2, 64);

    ctx.font = "11px JetBrains Mono, monospace";
    ctx.fillStyle = "#526071";
    ctx.fillText(`Obra N1341 • ${formatDateBR(state.meta.data)} ${state.meta.hora}`, canvas.width / 2, 86);
    state.auditeeSignatureDataUrl = canvas.toDataURL("image/png");
  }

  // Bind ISO Form Header inputs
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
      el.value = state.meta[key] || el.value;
      el.addEventListener("input", () => {
        state.meta[key] = el.value;
        saveState();
        updateDashboardAndReport();
      });
    });
  }

  // Public API exposed on window.PAREX_APP
  window.PAREX_APP = {
    getState: () => state,
    getMetrics: computeMetrics,
    getEmployeeTrainingStats,
    getFilteredEmployees,
    formatDateBR,
    formatPct,
    HIGHLIGHTED_CHAPAS,

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
      item.status = newStatus;
      if (newStatus === "C") {
        item.criteria.forEach((c) => (c.checked = true));
      }
      saveState();
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
      if (allChecked && item.status === "NC") {
        item.status = "C";
      } else if (!allChecked && item.status === "C") {
        item.status = "NC";
      }
      saveState();
      if (section === "pit") renderPitCards();
      else renderRecCards();
      updateDashboardAndReport();
    },

    updateItemText(section, itemId, field, value) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      const item = list.find((i) => i.id === itemId);
      if (!item) return;
      item[field] = value;
      saveState();
      renderReportTables();
    },

    filterPit(filterVal) {
      state.pitFilter = filterVal;
      document.querySelectorAll("[data-pit-filter]").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-pit-filter") === filterVal);
      });
      renderPitCards();
    },

    filterRec(filterVal) {
      state.recFilter = filterVal;
      document.querySelectorAll("[data-rec-filter]").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-rec-filter") === filterVal);
      });
      renderRecCards();
    },

    markAllSection(section, statusVal) {
      const list = section === "pit" ? state.pitItems : state.recItems;
      list.forEach((item) => {
        item.status = statusVal;
        if (statusVal === "C") item.criteria.forEach((c) => (c.checked = true));
      });
      saveState();
      renderPitCards();
      renderRecCards();
      updateDashboardAndReport();
    },

    resetToBaseline() {
      state.pitItems = JSON.parse(JSON.stringify(DEFAULT_PIT_ITEMS));
      state.recItems = JSON.parse(JSON.stringify(DEFAULT_REC_ITEMS));
      state.trainingRecords = buildDefaultTrainingRecords();
      saveState();
      renderPitCards();
      renderRecCards();
      renderMatrixRoster();
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

    toggleEmployeeTraining(chapa, procCode, isDone) {
      if (!state.trainingRecords[chapa]) state.trainingRecords[chapa] = {};
      if (!state.trainingRecords[chapa][procCode]) {
        state.trainingRecords[chapa][procCode] = { done: false, note: "" };
      }
      state.trainingRecords[chapa][procCode].done = isDone;
      if (isDone && !state.trainingRecords[chapa][procCode].note) {
        state.trainingRecords[chapa][procCode].note = `Verificado em Pré-Auditoria (${formatDateBR(state.meta.data)})`;
      }
      saveState();
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    updateEmployeeTrainingNote(chapa, procCode, noteVal) {
      if (!state.trainingRecords[chapa]) state.trainingRecords[chapa] = {};
      if (!state.trainingRecords[chapa][procCode]) {
        state.trainingRecords[chapa][procCode] = { done: true, note: "" };
      }
      state.trainingRecords[chapa][procCode].note = noteVal;
      saveState();
    },

    markEmployeeTrainings(chapa, mode) {
      const emp = window.PAREX_DATA.employees.find((e) => e.chapa === chapa);
      if (!emp) return;
      const prof = window.PAREX_DATA.profiles[emp.profileKey];
      if (!prof) return;
      if (!state.trainingRecords[chapa]) state.trainingRecords[chapa] = {};

      prof.trainings.forEach((t) => {
        if (mode === "NONE") {
          state.trainingRecords[chapa][t.code] = { done: false, note: "" };
        } else if (mode === "M" && t.req === "M") {
          state.trainingRecords[chapa][t.code] = {
            done: true,
            note: state.trainingRecords[chapa][t.code]?.note || `Lista de Presença Verificada (${formatDateBR(state.meta.data)})`
          };
        } else if (mode === "ALL") {
          state.trainingRecords[chapa][t.code] = {
            done: true,
            note: state.trainingRecords[chapa][t.code]?.note || `Lista de Presença Verificada (${formatDateBR(state.meta.data)})`
          };
        }
      });

      saveState();
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
        }
      });

      saveState();
      renderMatrixRoster();
      updateDashboardAndReport();
    },

    clearAuditeeSignature() {
      const canvas = document.getElementById("auditeeSigCanvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      state.auditeeSignatureDataUrl = null;
      saveState();
    },

    stampAuditeeAck() {
      const canvas = document.getElementById("auditeeSigCanvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      stampDefaultAuditeeAck(ctx, canvas);
      saveState();
    },

    exportBackupJSON() {
      const payload = {
        exportedAt: new Date().toISOString(),
        meta: state.meta,
        metrics: computeMetrics(),
        pitItems: state.pitItems,
        recItems: state.recItems,
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
        `👥 *Auditado(s):* ${state.meta.auditado}`,
        `📅 *Data/Hora:* ${formatDateBR(state.meta.data)} às ${state.meta.hora}`,
        ``,
        `📊 *ÍNDICE GERAL DE CONFORMIDADE DO ALMOXARIFADO:* *${formatPct(m.overallPct)}*`,
        `• Plano de Inspeção (PIT §1.0/§2.0): *${formatPct(m.pitPct)}* (${m.pitC} C / ${m.pitNC} NC)`,
        `• Reincidências SGI (E-mail 23/11): *${formatPct(m.recPct)}* (${m.recC} C / ${m.recNC} NC)`,
        `• Matriz de Treinamentos Almoxarifado (MR-03-001 R8): *${formatPct(m.almoxTrainPct)}* (${m.almoxMDone}/${m.almoxMTotal} obrigatórios)`,
        ``,
        `🔏 *Assinado digitalmente com Carimbo e Rubrica:* Gabriel Pereira dos Santos — CRT 5359772/2024`
      ];
      const url = `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank");
    }
  };

  // Initialize on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    // Set default live date/time if today
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    loadState();
    state.meta.hora = `${hh}:${mm}:${ss}`;

    bindHeaderInputs();
    renderPitCards();
    renderRecCards();
    initMatrixSelectors();
    renderMatrixRoster();
    initAuditeeCanvas();
    updateDashboardAndReport();
  });
})();
