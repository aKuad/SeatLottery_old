/* Page3 Event - Check box changed */
function memberCheckChange(blockNum, checkPlc) {
    // Set variable
    var blockNameConvert = ['A', 'B', 'C'];

    // Get checkdata or toggle checkbox
    if(checkPlc) {
        memberCheck[blockNum][checkPlc] = document.getElementsByName('memberCheck' + blockNameConvert[blockNum])[checkPlc].checked;
    }
    else {
        if(document.getElementsByName('memberCheck' + blockNameConvert[blockNum])[0].checked) {
            for(var i = 0; i <= memberList[blockNum].length; i++) {
                document.getElementsByName('memberCheck' + blockNameConvert[blockNum])[i].checked = true;
                memberCheck[blockNum][i] = true;
            }
        }
        else {
            for(var i = 0; i <= memberList[blockNum].length; i++) {
                document.getElementsByName('memberCheck' + blockNameConvert[blockNum])[i].checked = false;
                memberCheck[blockNum][i] = false;
            }
        }
    }
}

/* Page3 Event - Member list operation */
function memberListOpr(blockNum) {
    // Set variables
    var blockNameConvert = ['A', 'B', 'C'];
    var insertPos

    // Branch with operation type
    switch(document.getElementById('checkOprSelect' + blockNameConvert[blockNum]).selectedIndex) {
        // Operation - Member move to BlockA
        case 1:
            insertPos = memberList[0].length;
            for(var i = memberList[blockNum].length - 1; i >= 0; i--) {
                if(memberCheck[blockNum][i + 1]) {
                    memberList[0].splice(insertPos, 0, memberList[blockNum][i]);
                    memberList[blockNum].splice(i, 1);
                }
            }
            memberListUpdate(0);
            break;

        // Operation - Member move to BlockB
        case 2:
            insertPos = memberList[1].length;
            for(var i = memberList[blockNum].length - 1; i >= 0; i--) {
                if(memberCheck[blockNum][i + 1]) {
                    memberList[1].splice(insertPos, 0, memberList[blockNum][i]);
                    memberList[blockNum].splice(i, 1);
                }
            }
            memberListUpdate(1);
            break;

        // Operation - Member move to BlockC
        case 3:
            insertPos = memberList[2].length;
            for(var i = memberList[blockNum].length - 1; i >= 0; i--) {
                if(memberCheck[blockNum][i + 1]) {
                    memberList[2].splice(insertPos, 0, memberList[blockNum][i]);
                    memberList[blockNum].splice(i, 1);
                }
            }
            memberListUpdate(2);
            break;

        // Operation - Member delete
        case 4:
            for(var i = memberList[blockNum].length - 1; i >= 0; i--) {
                if(memberCheck[blockNum][i + 1]) {
                    memberList[blockNum].splice(i, 1);
                }
            }
            break;

        // Default - None
        default:
            break;
    }

    // Select clear
    document.getElementById('checkOprSelect' + blockNameConvert[blockNum]).selectedIndex = 0;

    // List update
    memberListUpdate(blockNum);
}

/* Page3 Event - Member list update */
function memberListUpdate(updateBlock) {
    // Get & Set variables
    var blockNameConvert = ['A', 'B', 'C'];
    var genderTextConvert = ['男', '女'];

    // Print - Updated member list
    if(memberList[updateBlock].length) {
        var changeHTML =
        '<tbody>' +
            '<tr>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"><input type="checkbox" name="memberCheck' + blockNameConvert[updateBlock] + '" onchange="memberCheckChange(' + updateBlock + ', 0)"></td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">出席番号</td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '" style="width: 200px;">名前</td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '" style="width: 200px;">読み</td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">性別</td>' +
            '</tr>';
        for(var i = 0; i < memberList[updateBlock].length; i++) {
            changeHTML +=
            '<tr>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"><input type="checkbox" name="memberCheck' + blockNameConvert[updateBlock] + '" onchange="memberCheckChange(' + updateBlock + ', ' + (i + 1) + ')"></td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">' + memberList[updateBlock][i].num + '</td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">' + memberList[updateBlock][i].name + '</td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">' + memberList[updateBlock][i].read + '</td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">' + genderTextConvert[memberList[updateBlock][i].gen] + '</td>' +
            '</tr>';
        }
        changeHTML +=
        '</tbody>';
    }
    else {
        var changeHTML =
        '<tbody>' +
            '<tr>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"><input type="checkbox" name="memberCheck' + blockNameConvert[updateBlock] + '" onchange="memberCheckChange(' + i + ', 0)" disabled></td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">出席番号</td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '" style="width: 200px;">名前</td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '" style="width: 200px;">読み</td>' +
                '<th class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">性別</td>' +
            '</tr>' +
            '<tr>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"><input type="checkbox" name="memberCheck' + blockNameConvert[updateBlock] + '" disabled></td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"></td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '">None</td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"></td>' +
                '<td class="memberList-cell memberList-cell-block' + blockNameConvert[updateBlock] + '"></td>' +
            '</tr>' +
        '</tbody>';
    }

    // Apply to HTML - List
    document.getElementById('memberList' + blockNameConvert[updateBlock]).innerHTML = changeHTML;

    // Apply to HTML - Member count
    document.getElementById('seatTypeCountA').innerHTML = 'BlockA:' + memberList[0].length + ' / ' + seatTypeCount[0];
    document.getElementById('seatTypeCountB').innerHTML = 'BlockB:' + memberList[1].length + ' / ' + seatTypeCount[1];
    document.getElementById('seatTypeCountC').innerHTML = 'BlockC:' + memberList[2].length + ' / ' + seatTypeCount[2];

    // Change button E/D - Shuffle run
    if(memberList[0].length == seatTypeCount[0] && memberList[1].length == seatTypeCount[1] && memberList[2].length == seatTypeCount[2]) {
        document.getElementById('shuffleRunButton').disabled = false;
    }
    else {
        document.getElementById('shuffleRunButton').disabled = true;
    }

    // Member check reset
    flag++;
    if(flag >= 3) {
        var blockNameConvert = ['A', 'B', 'C'];
        memberCheck = [[], [], []];
        for(var i = 0; i < 3; i++) {
            for(var j = 0; j <= memberList[i].length; j++) {
                document.getElementsByName('memberCheck' + blockNameConvert[i])[j].checked = false;
                memberCheck[i][j] = false;
            }
        }
    }
}
