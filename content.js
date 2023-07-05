let tableHeaders = getTableHeaders();
let tableData = getTableData();
let path = location.href.replace('file://', '').split('/');
let currentDir = path.length == 2 ? 'root' : decodeURI(path[path.length - 2]);
let parentDir = location.href + '..';

const EXPECTED_COLS = 3;
if(tableHeaders.length !== EXPECTED_COLS) {
    console.warn('Files extension expects the table to have 3 colummns ["Name, "Size", "Date modified"]');
} else {

    $('body').empty(); // hide original content

    console.log(tableHeaders);
    console.log(tableData);
    console.log(currentDir);
    
    $('head').append('<link href="https://fonts.cdnfonts.com/css/mona-sans?styles=144345,144349,144357,144361,144333,144337,144339,144343,144351,144355,144321,144325,144327,144331,144315,144319" rel="stylesheet">')
    $('body').append(`<h1>${currentDir}</h1>`)
    if(currentDir !== 'root') $('body').append(`<a href=${parentDir}>parent dir</a>`)
    $('body').append(createTable(tableData))
}
