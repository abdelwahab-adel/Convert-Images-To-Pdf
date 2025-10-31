

const { jsPDF } = window.jspdf;

const imageUpload = document.getElementById('imageUpload');
const imagesPreview = document.getElementById('imagesPreview');
const convertBtn = document.getElementById('convertBtn');

let selectedImages = [];

// Preview images when selected
imageUpload.addEventListener('change', () => {
  imagesPreview.innerHTML = '';
  selectedImages = [];
  const files = Array.from(imageUpload.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      imagesPreview.appendChild(img);
      selectedImages.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
});

// Convert images to PDF
convertBtn.addEventListener('click', () => {
  if (selectedImages.length === 0) {
    alert('Please select some images first.');
    return;
  }

  const pdf = new jsPDF();

  // Function to add images sequentially
  const addImagesToPDF = async () => {
    for (let i = 0; i < selectedImages.length; i++) {
      const imgData = selectedImages[i];

      // Load image to get dimensions
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgWidth = img.width;
      const imgHeight = img.height;

      // Convert pixel dimensions to mm (assuming 96 dpi)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      let width = pdfWidth;
      let height = (imgHeight / imgWidth) * width;

      if (height > pdfHeight) {
        height = pdfHeight;
        width = (imgWidth / imgHeight) * height;
      }

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    }

    // Save the PDF
    pdf.save('images.pdf');
  };

  addImagesToPDF();
});


  const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = 'Light Mode';
  } else {
    themeToggleBtn.textContent = 'Dark Mode';
  }
});
