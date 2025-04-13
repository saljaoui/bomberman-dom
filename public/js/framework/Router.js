export function createRouter() {
    // return the hash in the path
    function getHashPath () {
        return window.location.hash
    }
    return { getHashPath };
}
