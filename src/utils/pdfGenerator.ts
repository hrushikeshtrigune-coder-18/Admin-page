declare global { interface Window { html2pdf: any; } }

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

// ── CSV Export ────────────────────────────────────────────────────────────────

type CsvRow = (string | number)[];

const TAB_DATA: Record<string, { headers: string[]; rows: CsvRow[] }> = {
    'Overview Stats': {
        headers: ['Label', 'Value', 'Growth', 'Progress (%)'],
        rows: [
            ['Total Users', '12,450', '+12%', 78],
            ['Total Vendors', '3,820', '+5%', 65],
            ['Pending KYC Approvals', '145', '-2%', 30],
            ['Active Requests (User <> Vendor)', '890', '+18%', 85],
            ["Today's New Registrations", '64', '+24%', 92],
            ['Revenue / Commission Overview', 'Rs.4.2L', '+15%', 80],
        ],
    },
    'User Growth Reports': {
        headers: ['Month', 'New Users', 'Active Users', 'Churned'],
        rows: [
            ['Oct 2025', 820, 750, 40],
            ['Nov 2025', 1100, 980, 55],
            ['Dec 2025', 1450, 1300, 70],
            ['Jan 2026', 1900, 1700, 60],
            ['Feb 2026', 2200, 2050, 80],
            ['Mar 2026', 2600, 2400, 65],
        ],
    },
    'Vendor Growth Reports': {
        headers: ['Month', 'New Vendors', 'Active Vendors', 'Suspended'],
        rows: [
            ['Oct 2025', 120, 100, 5],
            ['Nov 2025', 180, 160, 8],
            ['Dec 2025', 230, 210, 10],
            ['Jan 2026', 310, 280, 12],
            ['Feb 2026', 370, 340, 9],
            ['Mar 2026', 420, 390, 11],
        ],
    },
    'Booking & Revenue': {
        headers: ['Month', 'Total Bookings', 'Gross Revenue (Rs)', 'Commission Earned (Rs)', 'Refunds (Rs)'],
        rows: [
            ['Oct 2025', 340, '12,40,000', '1,24,000', '22,000'],
            ['Nov 2025', 410, '15,60,000', '1,56,000', '28,000'],
            ['Dec 2025', 580, '22,80,000', '2,28,000', '35,000'],
            ['Jan 2026', 620, '25,50,000', '2,55,000', '31,000'],
            ['Feb 2026', 710, '29,40,000', '2,94,000', '40,000'],
            ['Mar 2026', 820, '34,20,000', '3,42,000', '45,000'],
        ],
    },
    'Commission Config': {
        headers: ['Category', 'Base Commission (%)', 'Premium Commission (%)', 'Last Updated'],
        rows: [
            ['Catering', 10, 8, '2026-02-01'],
            ['Photography', 12, 10, '2026-02-15'],
            ['Decoration', 9, 7, '2026-01-20'],
            ['Venue & Mandap', 8, 6, '2026-03-01'],
            ['Honeymoon Packages', 15, 12, '2026-02-28'],
        ],
    },
    'KYC Stats': {
        headers: ['Month', 'Total Submitted', 'Approved', 'Rejected', 'Pending', 'Avg Review Time (hrs)'],
        rows: [
            ['Oct 2025', 210, 185, 12, 13, 4.2],
            ['Nov 2025', 280, 245, 18, 17, 3.8],
            ['Dec 2025', 320, 290, 14, 16, 3.5],
            ['Jan 2026', 360, 330, 11, 19, 3.1],
            ['Feb 2026', 410, 371, 22, 17, 2.9],
            ['Mar 2026', 460, 420, 18, 22, 2.7],
        ],
    },
};

export const exportToCSV = (tabName: string): void => {
    const dataset = TAB_DATA[tabName];
    if (!dataset) {
        console.warn(`No CSV data mapped for tab: ${tabName}`);
        return;
    }

    const escape = (val: string | number): string => {
        const str = String(val);
        return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str.replace(/"/g, '""')}"`
            : str;
    };

    const csvContent = [
        dataset.headers.map(escape).join(','),
        ...dataset.rows.map(row => row.map(escape).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Admin_Analytics_${tabName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

