export async function wait(ms: number): Promise<void> {
    return await new Promise((resolve, reject) => {
        window.setTimeout(resolve, ms);
    });
}

export async function waitUntil(returnsTrueEventually: Function, maxMs?: number): Promise<void> {
    let startTime: number = Date.now();
    if (!maxMs) {
        maxMs = 0;
    }
    return await new Promise(async (resolve, reject) => {
        let success: boolean = false;
        let attempt: number = 0;
        do {
            attempt++;
            try {
                success = await new Promise(returnsTrueEventually());
            } catch (e) {

            }
            if (!success) {
                await wait(100);
            }
        } while (!success && maxMs > Date.now() - startTime);
        
        if (success) {
            resolve();
        } else {
            reject(`maximum wait of ${maxMs}ms and ${attempt} attempts elapsed without success`);
        }
    });
}