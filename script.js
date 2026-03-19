document.addEventListener("DOMContentLoaded", function () {
  const btnDownloadPDF = document.getElementById("downloadPDF");
  const btnGoToLinkedin = document.getElementById("goToLinkedin");

  if (btnDownloadPDF) {
    btnDownloadPDF.addEventListener("click", function () {
      const element = document.querySelector(".cv-container");

      if (!element) {
        console.error(".cv-container not found");
        return;
      }

      const originalContent = this.innerHTML;
      this.disabled = true;
      this.innerHTML =
        '<i class="mdi mdi-loading mdi-spin me-2"></i>Generazione PDF...';

      const opt = {
        margin: [5, 5, 5, 5],
        filename: "CV_Luca_Di_Pietro.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      };

      btnDownloadPDF.style.visibility = "hidden";

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          this.disabled = false;
          this.innerHTML = originalContent;
          btnDownloadPDF.style.visibility = "visible";
        })
        .catch((err) => {
          console.error("Error html2pdf:", err);
          this.disabled = false;
          this.innerHTML = "Something whent worng";
          btnDownloadPDF.style.visibility = "visible";
        });
    });
  }

  if (btnGoToLinkedin) {
    btnGoToLinkedin.addEventListener("click", function () {
      window.open(
        "https://www.linkedin.com/in/luca-di-pietro-764a63165",
        "_blank",
      );
    });
  }
});
