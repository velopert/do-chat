/**
 * Converts firebase database snapshot to an array
 * @export
 * @param {object} snapshot 
 * @returns {Array} array form of the data
 */
export function convertSnapshotToArray(snapshot) {
    const array = [];
    
    snapshot.forEach(item => {
        array.push({
            key: item.key,
            ...item.val()
        })
    });

    return array;
}