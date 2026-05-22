export function compileCode(code: string): string | Error {
    if (code === '') {
        throw new Error('Cannot compile empty string');
    }
    return code;
}
