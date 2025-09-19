import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { resumeData } from '../data/resume';

export interface PDFGenerationOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
}

export const generatePDF = async (
  elementId: string,
  options: PDFGenerationOptions = {}
): Promise<void> => {
  const {
    filename = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`,
    quality = 1,
    format = 'a4'
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: quality,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#1a1a2e', // Match the dark background
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', format);
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const generateResumeFromData = (): jsPDF => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const { personalInfo, experience, education, skills } = resumeData;
  
  let yPosition = 20;
  const leftMargin = 20;
  const rightMargin = 190;
  const lineHeight = 7;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth?: number): number => {
    if (maxWidth) {
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * lineHeight);
    } else {
      pdf.text(text, x, y);
      return y + lineHeight;
    }
  };

  // Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText(personalInfo.name, leftMargin, yPosition);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(personalInfo.title, leftMargin, yPosition);
  
  pdf.setFontSize(10);
  yPosition = addText(`${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`, leftMargin, yPosition + 5);
  
  // Summary
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Professional Summary', leftMargin, yPosition);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(personalInfo.summary, leftMargin, yPosition + 3, rightMargin - leftMargin) + 5;

  // Experience
  yPosition += 5;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Professional Experience', leftMargin, yPosition);

  experience.forEach((exp) => {
    yPosition += 5;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(exp.title, leftMargin, yPosition);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`${exp.company} | ${exp.location}`, leftMargin, yPosition);
    yPosition = addText(`${exp.startDate} - ${exp.endDate || 'Present'}`, leftMargin, yPosition);
    
    exp.description.forEach((desc) => {
      yPosition = addText(`• ${desc}`, leftMargin + 5, yPosition + 2, rightMargin - leftMargin - 5);
    });
    
    if (exp.technologies) {
      yPosition = addText(`Technologies: ${exp.technologies.join(', ')}`, leftMargin, yPosition + 2, rightMargin - leftMargin);
    }
  });

  // Education
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Education', leftMargin, yPosition);

  education.forEach((edu) => {
    yPosition += 5;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(edu.degree, leftMargin, yPosition);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(`${edu.institution} | ${edu.location}`, leftMargin, yPosition);
    yPosition = addText(edu.graduationDate, leftMargin, yPosition);
    
    if (edu.gpa) {
      yPosition = addText(`GPA: ${edu.gpa}`, leftMargin, yPosition);
    }
    
    if (edu.honors) {
      yPosition = addText(`Honors: ${edu.honors.join(', ')}`, leftMargin, yPosition, rightMargin - leftMargin);
    }
  });

  // Skills
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  yPosition = addText('Technical Skills', leftMargin, yPosition);

  skills.forEach((skillCategory) => {
    yPosition += 5;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(`${skillCategory.category}:`, leftMargin, yPosition);
    
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(skillCategory.skills.join(', '), leftMargin + 5, yPosition, rightMargin - leftMargin - 5);
  });

  return pdf;
};

export const downloadResumeAsPDF = async (filename?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const pdf = generateResumeFromData();
      const finalFilename = filename || `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
      pdf.save(finalFilename);
      
      // Small delay to ensure download starts
      setTimeout(() => {
        resolve();
      }, 100);
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      reject(new Error('Failed to generate resume PDF. Please try again.'));
    }
  });
};