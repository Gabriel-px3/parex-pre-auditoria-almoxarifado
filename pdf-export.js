/* ==========================================================================
   PAREX ENGENHARIA S/A — MOTOR DE EXPORTAÇÃO PDF A4 (ABNT NBR ISO 9001:2015)
   Inclui Carimbo Oficial + Rubrica Azul de Gabriel Pereira dos Santos (CRT 5359772/2024),
   Assinatura do Auditado, Data e Horário em TODOS os relatórios exportados.
   ========================================================================== */

(function () {
  const NAVY = [0, 45, 114];       // #002D72 Pantone 288 C
  const ORANGE = [255, 105, 0];    // #FF6900 Pantone 1505 C
  const CYAN = [60, 203, 218];     // #3CCBDA Pantone 2226 C
  const GREEN = [13, 138, 78];     // Conforme
  const RED = [201, 42, 42];       // Não Conforme
  const GRAY = [117, 120, 123];    // Cool Grey 9 C
  const LIGHT_BG = [243, 244, 244];

  function drawBrandHeader(doc, title, subtitle, codeRef) {
    const state = window.PAREX_APP.getState();
    const dateBR = window.PAREX_APP.formatDateBR(state.meta.data);
    const fullDateTime = `${dateBR} ${state.meta.hora}`;

    // Top Navy Banner
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, 210, 28, "F");
    // Bottom Orange Stripe
    doc.setFillColor(...ORANGE);
    doc.rect(0, 28, 210, 1.8, "F");

    // Parex Negative Logo
    if (window.PAREX_ASSETS && window.PAREX_ASSETS.logoNegativa) {
      try {
        doc.addImage(window.PAREX_ASSETS.logoNegativa, "PNG", 12, 5.5, 36, 15);
      } catch (e) {}
    }

    // 3x2 Orange Dots Motif
    doc.setFillColor(...ORANGE);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        doc.circle(52 + c * 3, 11 + r * 3, 0.9, "F");
      }
    }

    // Titles
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text(title, 63, 11.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(153, 214, 234);
    doc.text(subtitle, 63, 16.5);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.text(`${codeRef}  |  ABNT NBR ISO 9001:2015  |  Emissão: ${fullDateTime}`, 63, 21.8);
  }

  function drawIsoMetadataBox(doc, startY) {
    const state = window.PAREX_APP.getState();
    const dateBR = window.PAREX_APP.formatDateBR(state.meta.data);
    const fullDateTime = `${dateBR} às ${state.meta.hora}`;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(210, 218, 226);
    doc.setLineWidth(0.3);
    doc.roundedRect(12, startY, 186, 28, 2, 2, "FD");

    // Left accent stripe
    doc.setFillColor(...NAVY);
    doc.rect(12, startY, 2.2, 28, "F");

    doc.setFontSize(7.5);
    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.text("AUDITOR RESPONSÁVEL:", 17, startY + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 30, 45);
    doc.text(`${state.meta.auditor} (${state.meta.auditorRole})`, 53, startY + 5.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("DATA E HORÁRIO:", 140, startY + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 30, 45);
    doc.text(fullDateTime, 166, startY + 5.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("AUDITADO(S):", 17, startY + 11.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 30, 45);
    doc.text(doc.splitTextToSize(state.meta.auditado, 155)[0], 40, startY + 11.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("ÁREA / PROCESSO:", 17, startY + 17.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 30, 45);
    doc.text(doc.splitTextToSize(state.meta.area, 148)[0], 46, startY + 17.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("LOCAL / ESCOPO:", 17, startY + 23.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 30, 45);
    doc.text(doc.splitTextToSize(state.meta.local, 150)[0], 44, startY + 23.5);

    return startY + 32;
  }

  // MANDATORY SIGNATURE, STAMP & RUBRIC BLOCK AT THE BOTTOM OF ALL REPORTS
  function drawMandatorySignatureBlock(doc, y) {
    const state = window.PAREX_APP.getState();
    const dateBR = window.PAREX_APP.formatDateBR(state.meta.data);
    const fullDateTime = `${dateBR} às ${state.meta.hora}`;

    if (y > 222) {
      doc.addPage();
      drawBrandHeader(
        doc,
        "TERMO DE ENCERRAMENTO E ASSINATURA DIGITAL — ISO 9001:2015",
        "PABH 041 22 • Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA (Obra N1341)",
        "FO-08-031 REV. 2"
      );
      y = 36;
    }

    // Outer Signature Frame
    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.5);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(12, y, 186, 54, 2, 2, "FD");

    // Header pill on frame
    doc.setFillColor(...NAVY);
    doc.roundedRect(16, y - 3, 126, 6, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("VALIDAÇÃO, CARIMBO E ASSINATURA DIGITAL — PADRÃO ABNT NBR ISO 9001:2015", 20, y + 1);

    // Left Box: Auditor Stamp + Blue Ink Rubric (from IMG_20261124_090047.jpg)
    doc.setDrawColor(210, 218, 226);
    doc.setLineWidth(0.25);
    doc.roundedRect(16, y + 5, 88, 45, 1.5, 1.5, "S");

    if (window.PAREX_ASSETS && window.PAREX_ASSETS.carimboPreview) {
      try {
        // High-contrast white-backed stamp + blue rubric
        doc.addImage(window.PAREX_ASSETS.carimboPreview, "PNG", 31, y + 6.5, 58, 27);
      } catch (e) {}
    }

    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.35);
    doc.line(22, y + 35, 98, y + 35);

    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(state.meta.auditor, 60, y + 39, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(70, 80, 95);
    doc.text(`${state.meta.auditorRole} • Parex Engenharia S/A`, 60, y + 42.8, { align: "center" });

    doc.setFillColor(...NAVY);
    doc.roundedRect(24, y + 44.2, 72, 4.5, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.text(`ASSINADO EM: ${fullDateTime}`, 60, y + 47.3, { align: "center" });

    // Right Box: Auditee Signature + Date & Time
    doc.setDrawColor(210, 218, 226);
    doc.setLineWidth(0.25);
    doc.roundedRect(106, y + 5, 88, 45, 1.5, 1.5, "S");

    if (state.auditeeSignatureDataUrl) {
      try {
        doc.addImage(state.auditeeSignatureDataUrl, "PNG", 118, y + 8, 64, 24);
      } catch (e) {}
    }

    doc.setDrawColor(...NAVY);
    doc.setLineWidth(0.35);
    doc.line(112, y + 35, 188, y + 35);

    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const shortAuditado = doc.splitTextToSize(state.meta.auditado, 74)[0];
    doc.text(shortAuditado, 150, y + 39, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(70, 80, 95);
    doc.text("Responsável pela Área Auditada (Almoxarifado / Suprimentos)", 150, y + 42.8, { align: "center" });

    doc.setFillColor(...GRAY);
    doc.roundedRect(114, y + 44.2, 72, 4.5, 1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.text(`DATA / HORÁRIO: ${fullDateTime}`, 150, y + 47.3, { align: "center" });

    return y + 56;
  }

  function addPageFooters(doc, docLabel) {
    const state = window.PAREX_APP.getState();
    const dateBR = window.PAREX_APP.formatDateBR(state.meta.data);
    const fullDateTime = `${dateBR} ${state.meta.hora}`;
    const totalPages = doc.internal.getNumberOfPages();

    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setDrawColor(215, 220, 228);
      doc.setLineWidth(0.25);
      doc.line(12, 285, 198, 285);

      // Tiny rubric + stamp reference on every page footer
      if (window.PAREX_ASSETS && window.PAREX_ASSETS.rubricaGabriel) {
        try {
          doc.addImage(window.PAREX_ASSETS.rubricaGabriel, "PNG", 12, 285.4, 10, 6);
        } catch (e) {}
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.8);
      doc.setTextColor(...NAVY);
      doc.text(
        `PAREX ENGENHARIA S/A • ${docLabel} • Assinado por: ${state.meta.auditor} (CRT 5359772/2024) em ${fullDateTime}`,
        24,
        289.2
      );

      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 110, 120);
      doc.text(`Página ${p} de ${totalPages}`, 198, 289.2, { align: "right" });
    }
  }

  // 1. EXPORT FULL ISO 9001 PRE-AUDIT REPORT PDF
  function exportFullAuditPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      window.print();
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const state = window.PAREX_APP.getState();
    const m = window.PAREX_APP.getMetrics();

    drawBrandHeader(
      doc,
      "RELATÓRIO DE PRÉ-AUDITORIA DO ALMOXARIFADO & MATRIZ DE TREINAMENTOS",
      "PABH 041 22 • Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA (Contrato 5900110079 / Obra N1341)",
      "FO-08-031 REV. 2 / PIT PI-1000KN-Q-500004"
    );

    let y = drawIsoMetadataBox(doc, 33);

    // Executive Scorecard Bar
    const boxes = [
      { label: "CONFORMIDADE ALMOX.", val: window.PAREX_APP.formatPct(m.overallPct), sub: `${m.totalC} C / ${m.totalNC} NC / ${m.totalNA} NA`, color: NAVY },
      { label: "PLANO INSPEÇÃO (PIT)", val: window.PAREX_APP.formatPct(m.pitPct), sub: `${m.pitC} C / ${m.pitNC} NC (12 Itens)`, color: NAVY },
      { label: "REINCIDÊNCIAS E-MAIL", val: window.PAREX_APP.formatPct(m.recPct), sub: `${m.recC} C / ${m.recNC} NC (8 Itens)`, color: ORANGE },
      { label: "TREINAMENTOS ALMOX.", val: window.PAREX_APP.formatPct(m.almoxTrainPct), sub: `${m.almoxMDone}/${m.almoxMTotal} Obrigatórios (M)`, color: GREEN }
    ];

    boxes.forEach((b, idx) => {
      const bx = 12 + idx * 47.2;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...b.color);
      doc.setLineWidth(0.4);
      doc.roundedRect(bx, y, 44.4, 17, 1.5, 1.5, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(...b.color);
      doc.text(b.label, bx + 22.2, y + 4.5, { align: "center" });

      doc.setFontSize(13);
      doc.text(b.val, bx + 22.2, y + 11, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.3);
      doc.setTextColor(90, 100, 110);
      doc.text(b.sub, bx + 22.2, y + 15, { align: "center" });
    });

    y += 22;

    // Section 1: PIT Items
    doc.setFillColor(...NAVY);
    doc.rect(12, y, 186, 6.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("1. PONTOS DO PLANO DE INSPEÇÃO (PIT PI-1000KN-Q-500004 & PROCEDIMENTOS CANÔNICOS PAREX HUB)", 15, y + 4.5);
    y += 8.5;

    function renderItemsList(items, sectionTitle) {
      items.forEach((item) => {
        const evLines = doc.splitTextToSize(`Evidência: ${item.evidence}`, 152);
        const acLines = doc.splitTextToSize(`Tratativa: ${item.action}`, 152);
        const cardH = 12 + (evLines.length + acLines.length) * 3.4;

        if (y + cardH > 272) {
          doc.addPage();
          drawBrandHeader(
            doc,
            "RELATÓRIO DE PRÉ-AUDITORIA DO ALMOXARIFADO (CONTINUAÇÃO)",
            "PABH 041 22 • Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA (Obra N1341)",
            "FO-08-031 REV. 2"
          );
          y = 35;
        }

        const stColor = item.status === "C" ? GREEN : item.status === "NC" ? RED : GRAY;
        const stText = item.status === "C" ? "CONFORME" : item.status === "NC" ? "NÃO CONFORME" : "N/A";

        doc.setDrawColor(215, 222, 230);
        doc.setFillColor(252, 253, 255);
        doc.roundedRect(12, y, 186, cardH, 1.2, 1.2, "FD");

        // Status left bar
        doc.setFillColor(...stColor);
        doc.rect(12, y, 2.2, cardH, "F");

        // Status badge
        doc.setFillColor(...stColor);
        doc.roundedRect(168, y + 2, 28, 5, 1, 1, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.text(stText, 182, y + 5.4, { align: "center" });

        // Title & Codes
        doc.setTextColor(...NAVY);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        const codePrefix = item.code || item.rnc;
        doc.text(`${codePrefix} — ${doc.splitTextToSize(item.title, 125)[0]}`, 16, y + 5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.6);
        doc.setTextColor(...ORANGE);
        doc.text(`${item.iso}  |  ${item.proc}  |  ${item.forms}`, 16, y + 8.8);

        doc.setTextColor(30, 40, 55);
        doc.setFontSize(6.8);
        let ty = y + 12.6;
        evLines.forEach((l) => {
          doc.text(l, 16, ty);
          ty += 3.3;
        });
        doc.setTextColor(80, 90, 105);
        acLines.forEach((l) => {
          doc.text(l, 16, ty);
          ty += 3.3;
        });

        y += cardH + 2.2;
      });
    }

    renderItemsList(state.pitItems);

    // Section 2: Recurrences
    if (y + 25 > 270) {
      doc.addPage();
      drawBrandHeader(
        doc,
        "INSPEÇÃO PONTUAL DE REINCIDÊNCIAS DO ALMOXARIFADO (E-MAIL SGI 23/11/2026)",
        "PABH 041 22 • Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA (Obra N1341)",
        "FO-08-031 REV. 2"
      );
      y = 35;
    } else {
      y += 3;
    }

    doc.setFillColor(...ORANGE);
    doc.rect(12, y, 186, 6.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("2. INSPEÇÃO PONTUAL DE REINCIDÊNCIAS DO ALMOXARIFADO (E-MAIL SGI 23/11/2026 & FO-128)", 15, y + 4.5);
    y += 8.5;

    renderItemsList(state.recItems);

    // Section 3: Almoxarifado Training Matrix Summary
    if (y + 45 > 265) {
      doc.addPage();
      drawBrandHeader(
        doc,
        "MATRIZ DE TREINAMENTOS DO EFETIVO DO ALMOXARIFADO (MR-03-001 REV. 8)",
        "PABH 041 22 • Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA (Obra N1341)",
        "MR-03-001 REV. 8"
      );
      y = 35;
    } else {
      y += 3;
    }

    doc.setFillColor(...NAVY);
    doc.rect(12, y, 186, 6.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("3. MATRIZ DE TREINAMENTOS — EQUIPE DO ALMOXARIFADO & DESTAQUES DA AUDITORIA (MR-03-001 R8)", 15, y + 4.5);
    y += 8;

    const almoxEmps = window.PAREX_DATA.employees.filter(
      (e) => e.profileKey === "ADM::Almoxarifado" || window.PAREX_APP.HIGHLIGHTED_CHAPAS.has(e.chapa)
    );

    // Table Header
    doc.setFillColor(235, 240, 248);
    doc.rect(12, y, 186, 5.5, "F");
    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.text("CHAPA", 14, y + 3.8);
    doc.text("COLABORADOR", 30, y + 3.8);
    doc.text("CARGO / FUNÇÃO", 98, y + 3.8);
    doc.text("STATUS", 145, y + 3.8);
    doc.text("OBRIG. (M)", 165, y + 3.8);
    doc.text("% ADERÊNCIA", 183, y + 3.8);
    y += 5.8;

    almoxEmps.forEach((emp, idx) => {
      if (y > 268) {
        doc.addPage();
        drawBrandHeader(doc, "MATRIZ DE TREINAMENTOS (CONTINUAÇÃO)", "Obra N1341 — Parauapebas-PA", "MR-03-001 REV. 8");
        y = 35;
      }
      const st = window.PAREX_APP.getEmployeeTrainingStats(emp);
      if (idx % 2 === 0) {
        doc.setFillColor(250, 251, 253);
        doc.rect(12, y, 186, 5, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.6);
      doc.setTextColor(25, 35, 45);
      doc.text(emp.chapa, 14, y + 3.5);
      doc.text(doc.splitTextToSize(emp.nome, 65)[0], 30, y + 3.5);
      doc.text(doc.splitTextToSize(emp.cargo, 44)[0], 98, y + 3.5);
      doc.text(emp.status, 145, y + 3.5);
      doc.text(`${st.mDone}/${st.mTotal}`, 168, y + 3.5);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...(st.pct >= 100 ? GREEN : ORANGE));
      doc.text(window.PAREX_APP.formatPct(st.pct), 185, y + 3.5);
      y += 5;
    });

    y += 6;
    drawMandatorySignatureBlock(doc, y);
    addPageFooters(doc, "FO-08-031 Pré-Auditoria Almoxarifado");

    doc.save(`PAREX-Pre-Auditoria-Almoxarifado-ISO9001-${state.meta.data}.pdf`);
  }

  // 2. EXPORT PUNCTUAL RECURRENCES REPORT PDF
  function exportRecurrencesPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      window.print();
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const state = window.PAREX_APP.getState();

    drawBrandHeader(
      doc,
      "RELATÓRIO DE INSPEÇÃO PONTUAL DE REINCIDÊNCIAS DO ALMOXARIFADO",
      "E-mail SGI 23/11/2026 (Gleidson Mesquita & Edson Batista) + Auditoria Interna FO-128 • Obra N1341",
      "FO-08-031 / PG-03-003 R10"
    );

    let y = drawIsoMetadataBox(doc, 33);

    state.recItems.forEach((item) => {
      const critLines = item.criteria.map((c) => `${c.checked ? "[OK]" : "[PENDENTE]"} ${c.text}`);
      const wrappedCrit = critLines.flatMap((cl) => doc.splitTextToSize(cl, 178));
      const evLines = doc.splitTextToSize(`Constatado: ${item.evidence}`, 178);
      const acLines = doc.splitTextToSize(`Bloqueio/Ação: ${item.action}`, 178);
      const cardH = 15 + (wrappedCrit.length + evLines.length + acLines.length) * 3.3;

      if (y + cardH > 268) {
        doc.addPage();
        drawBrandHeader(
          doc,
          "RELATÓRIO PONTUAL DE REINCIDÊNCIAS DO ALMOXARIFADO (CONTINUAÇÃO)",
          "PABH 041 22 • Vale — Projeto de Adequação da Usina 1 — Parauapebas-PA",
          "FO-08-031 REV. 2"
        );
        y = 35;
      }

      const stColor = item.status === "C" ? GREEN : RED;
      const stText = item.status === "C" ? "CONFORME" : "NÃO CONFORME";

      doc.setDrawColor(215, 220, 228);
      doc.setFillColor(253, 254, 255);
      doc.roundedRect(12, y, 186, cardH, 1.5, 1.5, "FD");
      doc.setFillColor(...stColor);
      doc.rect(12, y, 2.5, cardH, "F");

      doc.setFillColor(...stColor);
      doc.roundedRect(166, y + 2.5, 29, 5, 1, 1, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text(stText, 180.5, y + 5.8, { align: "center" });

      doc.setTextColor(...RED);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(`${item.rnc} — ${doc.splitTextToSize(item.title, 120)[0]}`, 16.5, y + 5.2);

      doc.setTextColor(...NAVY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.text(`${item.history}  |  ${item.iso}  |  ${item.forms}`, 16.5, y + 9);

      let ty = y + 13;
      doc.setTextColor(25, 35, 45);
      doc.setFontSize(6.7);
      wrappedCrit.forEach((l) => {
        doc.text(l, 16.5, ty);
        ty += 3.2;
      });

      ty += 1;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      evLines.forEach((l) => {
        doc.text(l, 16.5, ty);
        ty += 3.2;
      });

      doc.setFont("helvetica", "normal");
      doc.setTextColor(...ORANGE);
      acLines.forEach((l) => {
        doc.text(l, 16.5, ty);
        ty += 3.2;
      });

      y += cardH + 3;
    });

    drawMandatorySignatureBlock(doc, y + 2);
    addPageFooters(doc, "Inspeção Pontual de Reincidências do Almoxarifado");

    doc.save(`PAREX-Reincidencias-Almoxarifado-ISO9001-${state.meta.data}.pdf`);
  }

  // 3. EXPORT TRAINING MATRIX REPORT PDF (SELECTED EMPLOYEE + FILTERED ROSTER)
  function exportTrainingMatrixPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      window.print();
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const state = window.PAREX_APP.getState();

    drawBrandHeader(
      doc,
      "RELATÓRIO DE QUALIFICAÇÃO E MATRIZ DE TREINAMENTOS DO EFETIVO (MR-03-001 R8)",
      "Cruzamento Efetivo Presente (1.110 Colaboradores / 140 Cargos) × Matriz MR-03-001 Rev. 8 • Obra N1341",
      "MR-03-001 REV. 8 / ISO 9001 7.2"
    );

    let y = drawIsoMetadataBox(doc, 33);

    // Part A: Selected Employee Qualification Sheet
    const emp = window.PAREX_DATA.employees.find((e) => e.chapa === state.selectedChapa) || window.PAREX_DATA.employees[0];
    const prof = window.PAREX_DATA.profiles[emp.profileKey];
    const st = window.PAREX_APP.getEmployeeTrainingStats(emp);
    const rec = state.trainingRecords[emp.chapa] || {};

    doc.setFillColor(...NAVY);
    doc.rect(12, y, 186, 6.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(
      `1. FICHA INDIVIDUAL AUDITADA: CHAPA ${emp.chapa} — ${emp.nome} (${emp.cargo}) — ADERÊNCIA: ${window.PAREX_APP.formatPct(st.pct)}`,
      15,
      y + 4.5
    );
    y += 8;

    doc.setFillColor(235, 240, 248);
    doc.rect(12, y, 186, 5.5, "F");
    doc.setTextColor(...NAVY);
    doc.setFontSize(6.8);
    doc.text("CÓDIGO", 14, y + 3.8);
    doc.text("PROCEDIMENTO / TREINAMENTO (MR-03-001 REV. 8)", 34, y + 3.8);
    doc.text("REQ.", 122, y + 3.8);
    doc.text("STATUS", 135, y + 3.8);
    doc.text("EVIDÊNCIA / LISTA DE PRESENÇA", 154, y + 3.8);
    y += 5.8;

    prof.trainings.forEach((t, idx) => {
      if (y > 268) {
        doc.addPage();
        drawBrandHeader(doc, "MATRIZ DE TREINAMENTOS (CONTINUAÇÃO)", "Obra N1341 — Parauapebas-PA", "MR-03-001 REV. 8");
        y = 35;
      }
      const itemRec = rec[t.code] || { done: false, note: "" };
      if (idx % 2 === 0) {
        doc.setFillColor(250, 251, 253);
        doc.rect(12, y, 186, 5.2, "F");
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.6);
      doc.setTextColor(...NAVY);
      doc.text(t.code, 14, y + 3.6);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(25, 35, 45);
      doc.text(doc.splitTextToSize(t.title, 85)[0], 34, y + 3.6);
      doc.text(t.req, 124, y + 3.6);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...(itemRec.done ? GREEN : RED));
      doc.text(itemRec.done ? "TREINADO" : "PENDENTE", 135, y + 3.6);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 80, 95);
      doc.text(doc.splitTextToSize(itemRec.note || "-", 42)[0], 154, y + 3.6);
      y += 5.2;
    });

    y += 5;

    // Part B: Filtered Roster Summary
    const filtered = window.PAREX_APP.getFilteredEmployees().slice(0, 60);
    if (y + 30 > 265) {
      doc.addPage();
      drawBrandHeader(doc, "RESUMO DO EFETIVO FILTRADO NA MATRIZ MR-03-001", "Obra N1341 — Parauapebas-PA", "MR-03-001 REV. 8");
      y = 35;
    }

    doc.setFillColor(...ORANGE);
    doc.rect(12, y, 186, 6.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(`2. RELATÓRIO DE ADERÊNCIA DO EFETIVO FILTRADO (${filtered.length} COLABORADORES LISTADOS)`, 15, y + 4.5);
    y += 8;

    filtered.forEach((e, idx) => {
      if (y > 268) {
        doc.addPage();
        drawBrandHeader(doc, "EFETIVO AUDITADO NA MATRIZ MR-03-001 (CONTINUAÇÃO)", "Obra N1341", "MR-03-001 REV. 8");
        y = 35;
      }
      const est = window.PAREX_APP.getEmployeeTrainingStats(e);
      if (idx % 2 === 0) {
        doc.setFillColor(250, 251, 253);
        doc.rect(12, y, 186, 4.8, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(25, 35, 45);
      doc.text(e.chapa, 14, y + 3.4);
      doc.text(doc.splitTextToSize(e.nome, 68)[0], 28, y + 3.4);
      doc.text(doc.splitTextToSize(e.cargo, 48)[0], 98, y + 3.4);
      doc.text(e.status, 148, y + 3.4);
      doc.text(`${est.mDone}/${est.mTotal} M`, 169, y + 3.4);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(...(est.pct >= 100 ? GREEN : ORANGE));
      doc.text(window.PAREX_APP.formatPct(est.pct), 185, y + 3.4);
      y += 4.8;
    });

    y += 6;
    drawMandatorySignatureBlock(doc, y);
    addPageFooters(doc, "MR-03-001 Matriz de Treinamentos do Efetivo");

    doc.save(`PAREX-Matriz-Treinamentos-MR-03-001-${emp.chapa}-${state.meta.data}.pdf`);
  }

  window.PAREX_PDF = {
    exportFullAuditPDF,
    exportRecurrencesPDF,
    exportTrainingMatrixPDF
  };
})();
