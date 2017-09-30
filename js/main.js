var aside = document.querySelector(".aside");
var mainText = document.querySelector(".main__text");
var apps = {};
var entry;
var entries = [];
var stripe;
var stripes = [];

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
        createText();
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
        stripe = document.createElement("div");
        stripe.classList.add("range-stripe");
        stripe.classList.add("no-active");
        mainText.appendChild(stripe);
        var startPos = apps.ranges[i].start;
        var endPos = apps.ranges[i].end;
        var entryStripeWidth = stripe.style.width = (endPos - startPos) + "px";
        var startRangeBlock = (/*stripe.offsetLeft +*/ startPos) + "px";
        stripe.style.left = startRangeBlock;
        stripes.push(stripe);
    }
}

/*Добавление текста в правой стороне*/
function createText() {
    mainText.innerHTML = apps.text;
    var textLength = apps.text.length;
    console.log(textLength);
    mainText.style.width = textLength;

}

/*Click по элементу entry*/
function clickEntry() {
    entry.addEventListener("click", function () {
        for (var k = 0; k < entries.length; k++) {
            if (entries[k].classList.contains('active')) {
                entries[k].classList.remove('active');
                entries[k].classList.add('no-active');
            }

            if (stripes[k].classList.contains('active')) {
                stripes[k].classList.remove('active');
                stripes[k].classList.add('no-active');
            }

            if (this == entries[k]) {
                stripes[k].classList.toggle('active');
                stripes[k].classList.toggle('no-active');
            }
        }
        this.classList.toggle('active');
        this.classList.toggle('no-active');
    });
}