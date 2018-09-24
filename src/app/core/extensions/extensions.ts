import * as moment from 'moment';

Date.prototype.toJSON = function () { return moment(this).format('YYYY-MM-DD'); }

declare global {
    interface Array<T> {
        move(from,to);
    }
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};


