function vecmath()
{
    this.Sum = function (a, b)
    {
        var res = new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
        return res;
    };

    this.Sub = function (a, b)
    {
        var res = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
        return res;
    };

    this.Mul = function (a, b)
    {
        var res = new THREE.Vector3(a.x * b, a.y * b, a.z * b);
        return res;
    };

    this.Dot = function (a, b)
    {
        var res = a.x * b.x + a.y * b.y + a.z * b.z;

        return res;
    };

    this.Cross = function (a, b)
    {
        var res = new THREE.Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

        return res;
    };
}
