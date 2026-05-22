//Parallelism

// Vitest corre los tests en paralelo, lo que significa que cada test se ejecuta en un proceso separado. Esto puede mejorar el rendimiento de los tests, especialmente si tienes muchos tests o si algunos de ellos son lentos.
// Sin embargo, también significa que los tests no pueden compartir estado entre sí, lo que puede ser un problema si tus tests dependen de un estado compartido.

import { describe, expect, test } from 'vitest';

const fetchUser = async () => {
    return new Promise<{ name: string }>((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Jose' });
        }, 100);
    });
};

const fetchPosts = async () => {
    return new Promise<Array<{ id: number; title: string }>>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Post 1' },
                { id: 2, title: 'Post 2' },
                { id: 3, title: 'Post 3' },
            ]);
        }, 1000);
    });
};

describe('test parallelism', () => {
    test('fetches user profile', async () => {
        const user = await fetchUser();
        expect(user.name).toBe('Jose');
    });
    test('fetches user posts', async () => {
        const posts = await fetchPosts();
        expect(posts).toHaveLength(3);
    });
});
