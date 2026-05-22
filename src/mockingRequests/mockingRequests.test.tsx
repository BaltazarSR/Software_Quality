import { describe, expect, test } from 'vitest';

describe('Mocking http requests', () => {
    test('responds with the user', async () => {
        const response = await fetch('https://api.example.com/user');
        await expect(response.json()).resolves.toEqual({
            id: 'abc-123',
            firstName: 'Juan de Dios',
            lastName: 'de la Torre Gonzalez',
        });
        expect(response.status).toBe(200);
    });

    test('fetches the list of movies', async () => {
        const response = await fetch('https://api.example.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query ListMovies {
                        movies {
                            title
                        }
                    }
                        `,
            }),
        });

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            data: {
                movies: [
                    {
                        title: 'Harry Potter',
                    },
                    {
                        title: 'Star Wars: The Empire Strikes Back',
                    },
                ],
            },
        });
    });
});
