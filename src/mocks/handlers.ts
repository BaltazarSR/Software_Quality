import { http, HttpResponse, graphql, passthrough } from 'msw';

// Request handler
export const handlers = [
    http.get('https://api.example.com/user', ({}) => {
        return HttpResponse.json({
            id: 'abc-123',
            firstName: 'Juan de Dios',
            lastName: 'de la Torre Gonzalez',
        });
    }),

    http.get('https://api.example.com/hello', ({ request }) => {
        console.log('hello request: ', request);
    }),

    http.get<{ id?: string }>('/books/:id', ({ params }) => {
        if (params.id === 'abc-123') {
            return new HttpResponse(
                { error: 'Unauthorized Access' },
                { status: 404 },
            );
        }
        return HttpResponse.json({
            id: params.id,
            title: 'The Lord of the Rings',
        });
    }),

    http.get('/resource', async ({ request }) => {
        const data = (await request.clone().json()) as { id?: string }; // Clonando el body del request

        if (data?.id === 'abc-123') {
            // Comparando si regresa lo que queremos, si si la mockea
            return HttpResponse.json({ id: 'abc-123' });
        }
        return passthrough(); // Si no, regresa la original
    }),

    http.get('/api/user', ({ cookies }) => {
        if (!cookies.authToken) {
            return new HttpResponse(null, { status: 403 });
        }
        return HttpResponse.json({ name: 'John' });
    }),

    graphql.query('ListMovies', () => {
        return HttpResponse.json({
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
    }),
];
