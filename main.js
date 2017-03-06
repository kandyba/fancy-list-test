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
        option_lists = {
            pets: ['dog', 'cat', 'fish', 'monkey', 'rat'],
            fruits: ['apple', 'orange', 'banana', 'apricot']
        },
        middleClass = 'middle-state';

    function createNewList(array_list) {
        var section = document.createElement('div');
        var ul = document.createElement('ul');
        var toggle_all = document.createElement('input');
        var checkboxes;
        var toggle_all_label = document.createElement('label');
        var checkbox_area = document.createElement('div');
        var toggleAllId = 'toggle_all_' + parseInt(Date.now() * Math.random(), 10);

        section.className = 'section-list';
        section.style.padding = '30px';
        section.style.backgroundColor = '#eee';

        toggle_all.setAttribute('type', 'checkbox');
        toggle_all.setAttribute('id', toggleAllId);

        toggle_all_label.setAttribute('for', toggleAllId);
        toggle_all_label.innerText = 'All/None';

        checkbox_area.setAttribute('class', 'select-area');
        checkbox_area.appendChild(toggle_all);
        checkbox_area.appendChild(toggle_all_label);

        array_list.forEach(function(item, i) {
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

        section.appendChild(checkbox_area);
        section.appendChild(ul);

        checkboxes = ul.querySelectorAll('input[type="checkbox"]');
        wrapper.appendChild(section);

        function toggleAllHandler(e) {
            if (e.isTrusted) {
                getNodeList(checkboxes).forEach(function(checkbox) {
                    checkbox.checked = toggle_all.checked;
                    fireEvent(checkbox, 'change');
                });

                toggle_all.parentNode.classList.remove(middleClass);
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
                        toggle_all.checked = false;
                        toggle_all.parentNode.classList.remove(middleClass);
                        break;
                    case checkboxes.length:
                        toggle_all.checked = true;
                        toggle_all.parentNode.classList.remove(middleClass);
                      break;
                    default:
                        toggle_all.checked = false;
                        toggle_all.parentNode.classList.add(middleClass);
                     break;
                }

                fireEvent(toggle_all, 'change');
            }
        }

        checkState();

        // attach events
        toggle_all.addEventListener('change', toggleAllHandler);
        getNodeList(checkboxes).forEach(function(checkbox) {
            checkbox.addEventListener('change', checkState);
        });
    }

    createNewList(option_lists.pets);
    createNewList(option_lists.fruits);
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
