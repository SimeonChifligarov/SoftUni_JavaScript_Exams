window.addEventListener('load', solve);

function solve() {
    // console.log('it works!');

    const receivedOrdersSection = document.getElementById('received-orders');
    const completedOrdersSection = document.getElementById('completed-orders');

    const sendFormBtn = document.querySelector('#right button');
    sendFormBtn.addEventListener('click', onSend);
    // console.log(sendFormBtn);

    const clearBtn = document.querySelector('#completed-orders button');
    clearBtn.addEventListener('click', onClear);
    // console.log(clearBtn);


    function onSend(ev) {
        ev.preventDefault();

        const productType = document.getElementById('type-product').value;
        // console.log(productType);
        const description = document.getElementById('description').value;
        const clientName = document.getElementById('client-name').value;
        const clientPhone = document.getElementById('client-phone').value;

        if (productType == '' || description == '' || clientName == '' || clientPhone == '') {
            return;
        }

        const startBtn = e('button', { className: 'start-btn' }, 'Start repair');
        startBtn.addEventListener('click', (ev) => onStart(ev, finishBtn));

        const finishBtn = e('button', { className: 'finish-btn' }, 'Finish repair');
        finishBtn.disabled = true;
        finishBtn.addEventListener('click', (ev) => onFinish(ev, newDiv));


        const newDiv = e('div', { className: 'container' },
            e('h2', {}, `Product type for repair: ${productType}`),
            e('h3', {}, `Client information: ${clientName}, ${clientPhone}`),
            e('h4', {}, `Description of the problem: ${description}`),
            startBtn,
            finishBtn
        );

        receivedOrdersSection.appendChild(newDiv);

        document.getElementById('type-product').value = '';
        document.getElementById('description').value = '';
        document.getElementById('client-name').value = '';
        document.getElementById('client-phone').value = '';

    }

    function onStart(ev, finishBtn) {
        // console.log(ev.target);
        // console.log(finishBtn);
        ev.target.disabled = true;
        finishBtn.disabled = false;

    }

    function onFinish(ev, newDiv) {
        // console.log(ev.target);
        // console.log(newDiv);

        newDiv.lastChild.remove();
        newDiv.lastChild.remove();

        completedOrdersSection.appendChild(newDiv);

    }

    function onClear(ev) {
        Array.from(completedOrdersSection.children).slice(3).forEach(c => c.remove());
    }



    function e(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(el => {
            if (typeof el == 'string' || typeof el == 'number') {
                const node = document.createTextNode(el);
                result.appendChild(node);
            } else {
                result.appendChild(el);
            }
        });

        return result;
    }

}