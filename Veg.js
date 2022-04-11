class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
        this._productsTypes = [];
    }

    loadingVegetables(vegetables) {

        for (let currentV of vegetables) {
            let [type, quantity, price] = currentV.split(' ');
            quantity = Number(quantity);
            price = Number(price);

            if (this._productsTypes.includes(type)) {
                let currPr = this.availableProducts.filter(p => p.type == type)[0];
                currPr.quantity += quantity;
                if (price > currPr.price) {
                    currPr.price = price;
                }
            } else {
                let newV = { type, quantity, price }
                this.availableProducts.push(newV);
                this._productsTypes.push(type);
            }
        }

        let result = [];
        this._productsTypes.forEach(p => result.push(p))
        return `Successfully added ` + result.join(', ');

    }

    buyingVegetables(selectedProducts) {
        let totalPrice = 0;
        for (let currSelectedP of selectedProducts) {
            let [type, quantity] = currSelectedP.split(' ');
            if (!this._productsTypes.includes(type)) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            } else if (quantity > this.availableProducts.filter(p => p.type == type)[0].quantity) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            } else {
                let currentPrice = quantity * this.availableProducts.filter(p => p.type == type)[0].price;
                totalPrice += currentPrice;

                this.availableProducts.filter(p => p.type == type)[0].quantity -= quantity;
            }
        }

        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
    }

    rottingVegetable(type, quantity) {
        if (!this._productsTypes.includes(type)) {
            throw new Error(`${type} is not available in the store.`);
        }

        if (quantity > this.availableProducts.filter(p => p.type == type)[0].quantity) {
            this.availableProducts.filter(p => p.type == type)[0].quantity = 0;
            return `The entire quantity of the ${type} has been removed.`;
        } else {
            this.availableProducts.filter(p => p.type == type)[0].quantity -= quantity;
            return `Some quantity of the ${type} has been removed.`;
        }
    }

    revision() {
        let result = ["Available vegetables:"];

        this.availableProducts.sort((a, b) => a.price - b.price);
        for (let pr of this.availableProducts) {
            result.push(`${pr.type}-${pr.quantity}-$${pr.price}`)
        }

        result.push(`The owner of the store is ${this.owner}, and the location is ${this.location}.`);

        return result.join('\n');
    }

}