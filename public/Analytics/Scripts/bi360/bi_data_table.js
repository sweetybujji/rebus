
function gettable(tblname, data, $scope) {

  //  alert(JSON.stringify(data));

    var colIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    // find the max column count
    var nRows = data.length;
    var _this = $("#" + tblname + "");
    maxCols = 0;
    startingCell = 0;
    lastSelectedCell = 0;
    previousCell = 0;
    isDragging = false;
    while (--nRows > -1) {
        maxCols = Math.max(maxCols, data[nRows].length)
    }
    var table = $('<table>').addClass("data-vis-table").addClass("unselectable");
    var th = $("<thead>");
    var tr = $("<tr>").addClass("row-header-index");
    th.append(tr);
    tr.append($("<th>").addClass("dead-space"));
    //create header        

    var headerRow = data[0];
    var th = $("<thead>");
    var tr = $("<tr>").addClass("row-header-index");
    th.append(tr);
    tr.append($("<th>").addClass("dead-space"));
    var i = -1;
    while (++i < maxCols) {
        var colId = getColdId(i, maxCols, colIds);
        var pointer = colId + ":" + colId;
        var col = headerRow[i];
        var cell = $("<th>").html(colId).attr("p", pointer);
        tr.append(cell);
    }
    table.append(th);
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        renderRow(table, data[i], i, maxCols, colIds);
        if (i == 199) break;
    }

    $(_this).append(table);
    //enaable draging selection
    var SELECTION_START = 0;
    var SELECTION_END = 1;

    var selection = [getCellPos(), getCellPos()];

    $tbl = table;

    function startSelection(event) {
        if (event.button === 2) { return false; }

        clearSelectionBorders();
        if (this !== $tbl.find('td.highlighted').last()[0]) {
            setSelection(this, SELECTION_START);
        }
        setSelection(this, SELECTION_END);

        // $tbl.find("tr > *").mouseenter(moveSelection);
    }

    function stopSelection() {
        // applySelectionHighlight();
        // applySelectionBorders();

        $tbl.find("tr > *").off('mouseenter');
    }


    function moveSelection() {
        setSelection(this, SELECTION_END);
    }

    function setSelection(element, position) {
        element = $(element);
        if ($(element).attr("p") != null) {
            var cellPos = getCellPos(element);
            selection[position] = cellPos;
            applySelectionHighlight();
        }
        else {
            clearSelectionHighlight();
        }
    }

    $(table).find("th").click(function (i, val) {
        var range = $(this).attr("p");
        var columnname = $("td[p='" + range.split(":")[0] + "0']").html();
        //alert(columnname);
        $scope.changedatapoint(columnname, range);       
    });

    $(table).find("tbody tr td:not(:first)").click(function (i, val) {
        var range = $(this).attr("p");
        var index=$(this).index();
        var columnname = $("td[p='" + range.split("")[0] + "0']").html() + "@" + range.split("")[1];
        
        $scope.changedatapoint(columnname, range);
    });

    function getCellPos(element) {
        element = $(element);        
        if (element.length) return {
            col: element.index(),
            row: element.parent().parent().is($tbl.find('thead')) ? 0 : element.parent().index() + 1

        };
        return {
            row: -1,
            col: -1
        };
    }

    function getSelectionRect() {
        var rect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        rect.x = Math.min(selection[SELECTION_START].col, selection[SELECTION_END].col);
        rect.y = Math.min(selection[SELECTION_START].row, selection[SELECTION_END].row);
        rect.width = Math.max(selection[SELECTION_START].col, selection[SELECTION_END].col) + 1;
        rect.height = Math.max(selection[SELECTION_START].row, selection[SELECTION_END].row) + 1;

        if (rect.x === 0 && rect.width === 1) rect.width = $tbl.find('tr:first-child > *').length;
        if (rect.y === 0 && rect.height === 1) rect.height = $tbl.find('tr').length;
        return rect;
    }

    function applySelectionHighlight() {
        clearSelectionHighlight();
        var selectionRect = getSelectionRect();       
        $tbl.find('thead tr > *').slice(selectionRect.x, selectionRect.width).addClass('highlighted');
        $tbl.find('tr').slice(selectionRect.y, selectionRect.height).each(function () {
            $(this).find('> th:first-child').addClass('highlighted');
            $(this).find('> *').slice(selectionRect.x, selectionRect.width).addClass('highlighted');
        });
    }


    function clearSelectionHighlight() {
        $tbl.find('tr > *').removeClass('highlighted');
    }
    function clearSelectionBorders() {
        $tbl.find('td').removeClass('top bottom left right');
    }
    function clearAll() {
        selection = [getCellPos(), getCellPos()];
        clearSelectionHighlight()
        clearSelectionBorders();
    }
    $tbl.find("tr > *").mousedown(startSelection);
    $(window).mouseup(stopSelection);
    $(document).mousedown(function (event) {
        if ($(event.target).parents($tbl).length === 0) clearAll();
    });
    //end of creating header
}
function getColdId(idx, length, colIds) {
    var col = "";
    if (idx > (length - 1)) {
        var firstLetterIdx = Math.floor(idx / length) - 1;
        var secondLetterIdx = idx % length;
        return colIds[firstLetterIdx] + colIds[secondLetterIdx]
    }
    else {
        return colIds[idx];
    }
}
//render row
function renderRow(table, rowModel, rowIdx, maxCols, colIds) {
    var row = $('<tr>');
    if (rowIdx == 0) {
        row.append($("<td>").text(""));
    }
    else {
        row.append($("<td>").text(rowIdx).attr("p", (rowIdx) + ":" + (rowIdx)));
    }   // append row id
    var i = -1;
    while (++i < maxCols) {
        var pointer = getColdId(i, maxCols, colIds) + (rowIdx);
        var col = rowModel[i];
        var text = "";
        if (!col) text = "";
        else
            text = col;
        // else if (isString(col)) text = col;
        // else text = col.v;
        var cell = null;
        if (rowIdx == 0)
            cell = $('<td>').text(text).attr("p", getColdId(i, maxCols, colIds) + (rowIdx)).attr("data-columnname", text).css({ "font-weight": "bold" });
        else
            cell = $('<td>').text(text).attr("p", getColdId(i, maxCols, colIds) + (rowIdx));

        row.append(cell);
    }
    table.append(row);
}
function isString(v) {
    return typeof v == "string";
}