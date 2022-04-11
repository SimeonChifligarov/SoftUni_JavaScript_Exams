const companyAdministration = {

    hiringEmployee(name, position, yearsExperience) {
        if (position == "Programmer") {
            if (yearsExperience >= 3) {
                return `${name} was successfully hired for the position ${position}.`;
            } else {
                return `${name} is not approved for this position.`;
            }
        }
        throw new Error(`We are not looking for workers for this position.`);
    },
    calculateSalary(hours) {

        let payPerHour = 15;
        let totalAmount = payPerHour * hours;

        if (typeof hours !== "number" || hours < 0) {
            throw new Error("Invalid hours");
        } else if (hours > 160) {
            totalAmount += 1000;
        }
        return totalAmount;
    },
    firedEmployee(employees, index) {

        let result = [];

        if (!Array.isArray(employees) || !Number.isInteger(index) || index < 0 || index >= employees.length) {
            throw new Error("Invalid input");
        }
        for (let i = 0; i < employees.length; i++) {
            if (i !== index) {
                result.push(employees[i]);
            }
        }
        return result.join(", ");
    }

}



const { expect } = require('chai');

describe("Tests for companyAdministration.js …", function () {
    describe("hiringEmployee func", function () {
        it("Should throw when position is not 'Programmer'", function () {
            expect(() => companyAdministration.hiringEmployee('Pesho', 'batkata', 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee('Pesho', '4i4kata', 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee('A', 'shefa', 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee('Pesho', 2, 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee('Pesho', null, 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee('Pesho', {}, 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee('Pesho', undefined, 12)).to.throw(Error, "We are not looking for workers for this position.");
            expect(() => companyAdministration.hiringEmployee()).to.throw(Error, "We are not looking for workers for this position.");
        });
        it("Should return correct result when position is 'Programmer'", function () {
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 1)).to.equal("Pesho is not approved for this position.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 2)).to.equal("Pesho is not approved for this position.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 2.35)).to.equal("Pesho is not approved for this position.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 2.01)).to.equal("Pesho is not approved for this position.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 0)).to.equal("Pesho is not approved for this position.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', -13)).to.equal("Pesho is not approved for this position.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 3)).to.equal("Pesho was successfully hired for the position Programmer.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 13)).to.equal("Pesho was successfully hired for the position Programmer.");
            expect(companyAdministration.hiringEmployee('Pesho', 'Programmer', 103)).to.equal("Pesho was successfully hired for the position Programmer.");
        });
    });
    describe("calculateSalary func", function () {
        it("Should throw when invalid hours", function () {
            expect(() => companyAdministration.calculateSalary('')).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary('13')).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary('abc')).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary(undefined)).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary({})).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary(null)).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary(-11)).to.throw(Error, "Invalid hours");
            expect(() => companyAdministration.calculateSalary(-0.1)).to.throw(Error, "Invalid hours");
        });
        it("Should return correct result with valid hours", function () {
            expect(companyAdministration.calculateSalary(1)).to.equal(15);
            expect(companyAdministration.calculateSalary(2.5)).to.equal(37.5);
            expect(companyAdministration.calculateSalary(100)).to.equal(1500);
            expect(companyAdministration.calculateSalary(160)).to.equal(2400);
            expect(companyAdministration.calculateSalary(1000)).to.equal(16000);
            expect(companyAdministration.calculateSalary(0)).to.equal(0);
        });
    });
    describe("firedEmployee func", function () {
        it("Should throw when invalid inputs", function () {
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], 20)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], -1)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], 20.22)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], '2.1')).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee([], 1)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], -5)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], -11)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], '2')).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], 'abc')).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], undefined)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], {})).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(undefined, 2)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(null, 2)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(505, 2)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee('lalalq la', 2)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee(12.3, 2)).to.throw(Error, "Invalid input");
            expect(() => companyAdministration.firedEmployee({}, 2)).to.throw(Error, "Invalid input");
        });
        it("Should return correct result with valid inputs", function () {
            expect(companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], 1)).to.equal('Anna, 4i4ak');
            expect(companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak', 3], 1)).to.equal('Anna, 4i4ak, 3');
            expect(companyAdministration.firedEmployee(['Anna', 'Babba', '4i4ak'], 0)).to.equal('Babba, 4i4ak');
            expect(companyAdministration.firedEmployee(['Anna'], 0)).to.equal('');
        });
    });
});

