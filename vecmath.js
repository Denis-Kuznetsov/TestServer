/**
 * Created by DK6 on 13.06.2016.
 */

function vec (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

function vecmath()
{
    this.Sum = function (a, b)
    {
        var res = new vec(a.x + b.x, a.y + b.y, a.z + b.z);
        return res;
    };

    this.Sub = function (a, b)
    {
        var res = new vec(a.x - b.x, a.y - b.y, a.z - b.z);
        return res;
    };

    this.Mul = function (a, b)
    {
        var res = new vec(a.x * b, a.y * b, a.z * b);
        return res;
    };

    this.Dot = function (a, b)
    {
        var res = a.x * b.x + a.y * b.y + a.z * b.z;

        return res;
    };

    this.Cross = function (a, b)
    {
        var res = new vec(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

        return res;
    };
}

exports.vec = vec;
exports.vecmath = vecmath;
