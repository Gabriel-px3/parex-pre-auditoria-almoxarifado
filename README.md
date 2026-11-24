# PAREX ENGENHARIA S/A — Portal de Pré-Auditoria do Almoxarifado & Matriz de Treinamentos (ABNT NBR ISO 9001:2015)

Aplicação web interativa desenvolvida segundo o **Brandbook Parex 2024** e os procedimentos canônicos do **Parex Hub (`Book PR-1000KN-Q-500012` Rev. 10)** para condução e emissão de relatórios assinados da **Pré-Auditoria do Almoxarifado** e **Matriz de Treinamentos do Efetivo (`MR-03-001` Rev. 8)** do projeto **PABH 041 22 — Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA (Contrato 5900110079 / Obra N1341)**.

## Escopo Implementado
1. **Cabeçalho e Formulário Padrão ISO 9001:2015 (`FO-08-031` Rev. 2 / `PG-03-002` R10)**:
   - Campos editáveis para **Nome do Auditor**, **Cargo/CRT**, **Nome do(s) Auditado(s)**, **Área**, **Local**, **Data** e **Horário**.
2. **Plano de Inspeção do Almoxarifado (`PIT PI-1000KN-Q-500004` Seções 1.0 e 2.0 + Procedimentos Canônicos)**:
   - 12 pontos de inspeção (`PIT 1.2` a `1.9`, `PIT 2.1`, `PIT 2.2`, `IT-12-001` R11, `IT-08-068` R03, `IT-08-002-PP` R0, `IT-03-001` R04 + `TB-03-002` R14, `IT-08-009` R05, `PG-03-001` R12) com marcação **Conforme (`C`) / Não Conforme (`NC`) / N/A**, subcritérios, evidências objetivas e plano de ação.
3. **Inspeção Pontual das Reincidências do Almoxarifado (E-mail SGI 23/11/2026 & `FO-128`)**:
   - `RNC-03628/26` (Os 4 instrumentos auditados pela Vale: Paquímetro `18563/26`, Trena `5080 / TRN-5080/26`, Luxímetro `PX14290` vencido sem observação, Pirômetro `14302/26` + passivo dos 130 instrumentos vencidos sem observação na `FO-03-022`).
   - `RNC-03630/26` (Acesso e conhecimento da `IT-12-001` Rev. 11 pelo encarregado de almoxarifado, QR Code da Central de Procedimentos sem login e 4 listas de presença).
   - `RNC-03633/26` (`ED-1310KN-01`: batimento físico de etiqueta padrão nova [TAG, Data, Nº RPE e Revisão] × RPE no `TR-1310KN-124` e `TR-1310KN-128`).
   - `RNC-00404/26` e `RNC-00406/26` (Preservação dos tambores de esticamento e acionamento do `TR-1310KN-137`, DDS nos manuais/PIT e auditoria amostral).
   - `RNC-00807/26` (Máquinas de solda com calibração semestral `FO-08-018 RCI`, alertas de 15 e 7 dias e quadros de gestão à vista).
   - `RNC-03629/26` e `NC 03 GQ (FO-128)` (RIR do subfornecedor `INDEX` para suportes SPCI e conciliação física × planilha `FO-12-004` × romaneios `FO-12-003` das Camisas 38/42, Regulador de Argônio, Pá de Plástico do Kit Mitigação e Cinta nº 3743).
   - `RNC-03625/26`, `RNC-03634/26` e `DNV NC 6` (Cruzamento Efetivo × Função × Matriz `MR-03-001`).
4. **Matriz de Treinamentos do Efetivo (`MR-03-001` Rev. 8 × 1.110 Colaboradores / 140 Cargos)**:
   - Filtro por Área/Disciplina da Matriz (`Almoxarifado`, `Controle da Qualidade`, `Solda`, etc.), filtro por Cargo (140 cargos), Status de Ponto e busca por Nome ou Chapa.
   - Marcação individual ou coletiva por cargo dos treinamentos obrigatórios (`M`) e desejáveis (`D`).
5. **Relatórios Exportáveis com Assinatura Digital, Carimbo, Rubrica Azul, Data e Horário**:
   - Todos os relatórios (em tela, impressão A4 e exportação PDF via `jsPDF`) contêm o carimbo oficial e a rubrica de **Gabriel Pereira dos Santos — Técnico em Qualidade — CRT - 5359772/2024 — Parex Engenharia S/A**, com data e horário.
