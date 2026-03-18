const btn = document.getElementById("downloadPDF");

btn.addEventListener("click", function () {
  const element = document.querySelector(".cv-container");
  const originalContent = this.innerHTML;

  this.disabled = true;
  this.innerHTML =
    '<i class="mdi mdi-loading mdi-spin me-2"></i>Generazione PDF...';

  const opt = {
    margin: 0,
    filename: "CV_Luca_Di_Pietro.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  btn.style.visibility = "hidden";

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      this.disabled = false;
      this.innerHTML = originalContent;
      btn.style.visibility = "visible";
    })
    .catch((err) => {
      console.error("Qualcosa è andato storto:", err);
      this.disabled = false;
      this.innerHTML = "Errore";
    });
});
