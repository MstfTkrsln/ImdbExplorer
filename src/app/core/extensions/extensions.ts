import * as moment from 'moment';

Date.prototype.toJSON = function () { return moment(this).format('YYYY-MM-DD'); }

declare global {
    interface Array<T> {
        move(from,to);
    }
}

declare global {
    interface Number {
        thousandFormat();
    }
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

Number.prototype.thousandFormat = function () {
    return  Math.round(this/1000) + 'K';
};

