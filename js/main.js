var aside = document.querySelector(".aside");
var main = document.querySelector(".main");
var apps = {};
var entry;
var entries = [];
var stripe;
var stripes = [];
var stripeBlocks = [];


/*Извлечение данных из json file*/
function getContent() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "js/text.json", true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = xhr.responseText;
        } else {
        }
        apps = JSON.parse(data);
        createEntry();
        createRanges();
    }
}
getContent();


/*Формирование списка диапазонов*/
function createEntry() {
    for (var i = 0; i < apps.ranges.length; i++) {
        entry = aside.appendChild(document.createElement("div"));
        entry.classList.add("entry");
        entry.classList.add("no-active");
        var entryTitle = entry.appendChild(document.createElement("h4"));
        entryTitle.classList.add("entry__title");
        entryTitle.innerHTML = apps.ranges[i].title;

        var rangeBlock = entry.appendChild(document.createElement("div"));
        rangeBlock.classList.add("range-block");
        var startRangeLabel = rangeBlock.appendChild(document.createElement("p"));
        startRangeLabel.classList.add("entry__start-label");
        startRangeLabel.innerHTML = "start:";
        var startRange = rangeBlock.appendChild(document.createElement("p"));
        startRange.classList.add("entry__start-range");
        startRange.innerHTML = apps.ranges[i].start;
        var endRangeLabel = rangeBlock.appendChild(document.createElement("p"));
        endRangeLabel.classList.add("entry__end-label");
        endRangeLabel.innerHTML = "end:";
        var endRange = rangeBlock.appendChild(document.createElement("p"));
        endRange.classList.add("entry__end-range");
        endRange.innerHTML = apps.ranges[i].end;

        entries.push(entry);
        clickEntry();
    }
}

function createRanges() {
    for (var i = 0; i < apps.ranges.length; i++) {
        var startPos = apps.ranges[i].start;
        var endPos = apps.ranges[i].end;
        var stripe = apps.text.substring(startPos, endPos);
        stripes.push(stripe);

        var changedText = apps.text;
        stripes.forEach(function (stripe, n, stripes) {
            var replaceItem = new RegExp(stripe);
            changedText = changedText.replace(replaceItem, '<span class="gray no-active">' + stripe + '</span>');
        });
    }
    var mainText = main.appendChild(document.createElement("p"));
    mainText.classList.add("main__text");
    mainText.innerHTML = changedText;

    var stripeItems = document.querySelectorAll(".gray");
    stripeBlocks.push(stripeItems);
}


/*Click по элементу entry*/
function clickEntry() {
    entry.addEventListener("click", function () {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].classList.contains('active')) {
                entries[i].classList.remove('active');
                entries[i].classList.add('no-active');
            }

            console.log(stripeBlocks[i]);

           /* if (stripeBlocks[i].classList.contains('active')) {
             stripeBlocks[i].classList.remove('active');
             stripeBlocks[i].classList.add('no-active');
             }

             if (this == entries[i]) {
             stripeBlocks[i].classList.toggle('active');
             stripeBlocks[i].classList.toggle('no-active');
             }*/

        }
        this.classList.toggle('active');
        this.classList.toggle('no-active');
    });
}