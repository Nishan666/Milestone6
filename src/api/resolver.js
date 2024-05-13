const resolve = async (promise) => {
    const resolved = {
        data: null,
        error: null
    };

    try {
        resolved.data = await promise.products
    } catch (e) {
        resolved.error = e
    }
    return resolved
}

export { resolve };