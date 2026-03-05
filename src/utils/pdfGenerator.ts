export const exportToPDF = (componentName) => {
    // Select the element to capture (main content wrapper)
    const element = document.querySelector('.content-wrapper');

    if (!element) {
        console.error('Content wrapper not found for PDF export');
        return;
    }

    // Set a specialized class on body to let CSS know we are in export mode (for hiding sidebars etc)
    document.body.classList.add('exporting-pdf');

    const opt = {
        margin: [10, 10, 10, 10],
        filename: `Shubh_Vivah_Report_${componentName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf (via window since it's from CDN)
    if (window.html2pdf) {
        window.html2pdf().set(opt).from(element).save().then(() => {
            document.body.classList.remove('exporting-pdf');
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            document.body.classList.remove('exporting-pdf');
        });
    } else {
        // Fallback to print if library fails to load
        console.warn('html2pdf not found, falling back to print');
        window.print();
        document.body.classList.remove('exporting-pdf');
    }
};

