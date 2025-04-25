import { HRISROIResults } from '../../../../types/roiCalculatorTypes';

export const useReportExport = () => {
  // Generate report using browser print function
  const generatePDFReport = (results: HRISROIResults | null) => {
    if (!results) return;
    
    const report = document.getElementById('hris-roi-report');
    if (!report) return;
    
    // Create print stylesheet
    const printStyle = document.createElement('style');
    printStyle.textContent = `
      @media print {
        /* Print styling */
        body {
          font-family: Arial, Helvetica, sans-serif;
          color: #333;
          background-color: white;
        }
        
        /* Fix page breaks */
        .MuiPaper-root, .MuiCard-root, table, tr {
          page-break-inside: avoid;
        }
        
        /* Force page breaks before major sections */
        h2, h3, .section-break {
          page-break-before: always;
        }
        
        /* Improved table styling */
        table {
          border-collapse: collapse;
          width: 100%;
        }
        
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
      }
    `;
    document.head.appendChild(printStyle);
    
    // Save original body styles
    const originalStyle = document.body.style.cssText;
    
    // Hide everything except the report
    const elementsToHide = document.querySelectorAll('body > *:not(script):not(link):not(style)');
    const hiddenElements = Array.from(elementsToHide).map(el => {
      const originalDisplay = (el as HTMLElement).style.display;
      (el as HTMLElement).style.display = 'none';
      return { el, originalDisplay };
    });
    
    // Clone the report and append to body
    const reportClone = report.cloneNode(true) as HTMLDivElement;
    reportClone.style.display = 'block';
    reportClone.style.width = '100%';
    reportClone.style.margin = '0';
    reportClone.style.padding = '20px';
    reportClone.style.backgroundColor = '#ffffff';
    document.body.appendChild(reportClone);
    
    // Fix header colors
    const headers = reportClone.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(header => {
      (header as HTMLElement).style.color = '#00796B';
    });
    
    // Fix colored banners
    const banners = reportClone.querySelectorAll('.MuiBox-root');
    banners.forEach(banner => {
      const bgColor = window.getComputedStyle(banner).backgroundColor;
      // If the banner has a non-transparent background color
      if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        (banner as HTMLElement).style.backgroundColor = '#FFFFFF';
        (banner as HTMLElement).style.color = '#00796B';
        (banner as HTMLElement).style.border = '2px solid #00796B';
        (banner as HTMLElement).style.borderRadius = '8px';
        (banner as HTMLElement).style.padding = '15px';
        
        // Also update child text elements
        const textElements = banner.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
        textElements.forEach(el => {
          (el as HTMLElement).style.color = '#00796B';
        });
      }
    });
    
    // Wait to ensure charts are fully rendered
    const chartCanvases = reportClone.querySelectorAll('canvas');
    if (chartCanvases.length > 0) {
      // Create hidden canvas elements to capture charts
      chartCanvases.forEach((canvas, index) => {
        try {
          // Create an image from each canvas
          const imageData = canvas.toDataURL('image/png');
          
          // Create an img element to replace the canvas
          const img = document.createElement('img');
          img.src = imageData;
          img.style.width = '100%';
          img.style.maxWidth = canvas.width + 'px';
          img.style.height = 'auto';
          
          // Replace canvas with the image
          canvas.parentNode?.replaceChild(img, canvas);
        } catch (err) {
          console.error(`Error converting chart ${index} to image:`, err);
        }
      });
      
      // Wait longer to ensure all chart images are processed
      setTimeout(() => {
        window.print();
        cleanUp();
      }, 1000);
    } else {
      window.print();
      cleanUp();
    }
    
    // Clean up function
    function cleanUp() {
      document.body.removeChild(reportClone);
      document.head.removeChild(printStyle);
      hiddenElements.forEach(({ el, originalDisplay }) => {
        (el as HTMLElement).style.display = originalDisplay;
      });
      document.body.style.cssText = originalStyle;
    }
  };

  return {
    generatePDFReport
  };
};