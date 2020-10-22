export default function isIn(item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (item == arr[i]) {
            return true;
        }
    }
    return false;
}