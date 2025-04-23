let branchesData = null;
let url = '';
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 4.0,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');
let pagesRead = new Set();
let readAllPages = false;
let pageStartTime = Date.now();
let minPageTime = 10000; // 10 seconds in milliseconds
let canChangePage = true;
let startTime = Date.now();

// Function to load branches data
async function loadBranches() {
    const response = await fetch('Branches.json');
    branchesData = await response.json();
    populateSearch();
}

// Function to populate search suggestions
function populateSearch() {
    const searchInput = document.getElementById('search');
    const datalist = document.getElementById('branch-list');
    
    branchesData.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch.name;
        option.dataset.url = branch.pdfUrl;
        datalist.appendChild(option);
    });

    searchInput.addEventListener('change', function() {
        const selected = branchesData.find(b => b.name === this.value);
        if (selected) {
            url = selected.pdfUrl;
            loadNewPdf();
        }
    });
}

// Function to load new PDF
function loadNewPdf() {
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;
        pageNum = 1;
        pagesRead.clear();
        readAllPages = false;
        document.getElementById('read-btn').disabled = true;
        renderPage(pageNum);
    });
}

// Load branches data when the page loads
loadBranches();

// ... rest of the existing JavaScript functions ...
// (Include all the remaining functions from the original script)
