'use strict';

function donReadyInit() {
    toggleAll();
    customCheckbox();
}

function customCheckbox() {
    var checkboxes = document.querySelectorAll('[type="checkbox"]');

    getNodeList(checkboxes).forEach(function(checkbox) {
        var checkboxParent = checkbox.parentNode;
        var checkboxWrap = document.createElement('span');
        var img = new Image(20, 20);

        checkboxParent.insertBefore(checkboxWrap, checkbox);
        checkboxWrap.classList.add('checkbox-wrap');
        checkboxWrap.appendChild(checkbox);

        img.src = 'checkbox.png';
        img.setAttribute('alt', 'checked');

        checkboxWrap.appendChild(img);

        function toggleHandler() {
            checkboxWrap.classList.toggle('checked', checkbox.checked);
        }

        checkbox.addEventListener('change', toggleHandler);
    });
}

function toggleAll() {
    var wrapper = document.getElementById('wrapper'),
      optionLists = {
          pets: ['dog', 'cat', 'fish', 'monkey', 'rat'],
          fruits: ['apple', 'orange', 'banana', 'apricot']
      },
      middleClass = 'middle-state';

    function createNewList(arrayList) {
        var section = document.createElement('div');
        var ul = document.createElement('ul');
        var toggleAll = document.createElement('input');
        var checkboxes;
        var toggleAllLabel = document.createElement('label');
        var checkboxArea = document.createElement('div');
        var toggleAllId = 'toggleAll_' + parseInt(Date.now() * Math.random(), 10);

        section.className = 'section-list';
        section.style.padding = '30px';
        section.style.backgroundColor = '#eee';

        toggleAll.setAttribute('type', 'checkbox');
        toggleAll.setAttribute('id', toggleAllId);

        toggleAllLabel.setAttribute('for', toggleAllId);
        toggleAllLabel.innerText = 'All/None';

        checkboxArea.setAttribute('class', 'select-area');
        checkboxArea.appendChild(toggleAll);
        checkboxArea.appendChild(toggleAllLabel);

        arrayList.forEach(function(item, i) {
            var li = document.createElement('li');
            var checkbox = document.createElement('input');
            var label = document.createElement('label');

            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('id', item);
            checkbox.setAttribute('name', item);

            label.setAttribute('for', item);
            label.innerText = item;

            li.appendChild(checkbox);
            li.appendChild(label);

            ul.appendChild(li);
        });

        section.appendChild(checkboxArea);
        section.appendChild(ul);

        checkboxes = ul.querySelectorAll('input[type="checkbox"]');
        wrapper.appendChild(section);

        function toggleAllHandler(e) {
            if (e.isTrusted) {
                getNodeList(checkboxes).forEach(function(checkbox) {
                    checkbox.checked = toggleAll.checked;
                    fireEvent(checkbox, 'change');
                });

                toggleAll.parentNode.classList.remove(middleClass);
            }
        }

        function getCheckedLength() {
            var checkboxLength = 0;

            getNodeList(checkboxes).forEach(function(checkbox) {
                checkboxLength += checkbox.checked;
            });

            return checkboxLength;
        }

        function checkState(e) {
            if (!e || e.isTrusted) {
                switch(getCheckedLength()) {
                    case 0:
                        toggleAll.checked = false;
                        toggleAll.parentNode.classList.remove(middleClass);
                        break;
                    case checkboxes.length:
                        toggleAll.checked = true;
                        toggleAll.parentNode.classList.remove(middleClass);
                        break;
                    default:
                        toggleAll.checked = false;
                        toggleAll.parentNode.classList.add(middleClass);
                        break;
                }

                fireEvent(toggleAll, 'change');
            }
        }

        checkState();

        // attach events
        toggleAll.addEventListener('change', toggleAllHandler);
        getNodeList(checkboxes).forEach(function(checkbox) {
            checkbox.addEventListener('change', checkState);
        });
    }

    createNewList(optionLists.pets);
    createNewList(optionLists.fruits);
}

function fireEvent(element, event) {
    if (element.dispatchEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    } else if (document.createEventObject) {
        var evt = document.createEventObject();
        return element.fireEvent('on' + event, evt);
    }
}

function getNodeList(domList) {
    return Array.prototype.slice.call(domList);
}

document.addEventListener('DOMContentLoaded', donReadyInit);
