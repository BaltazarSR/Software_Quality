import {
    afterEach,
    beforeEach,
    describe,
    expect,
    test,
    beforeAll,
    afterAll,
} from 'vitest';

let db: String;

const connectToDatabase = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Connected to database');
        }, 1000);
    });
};

describe.todo('Test after all and before all', () => {
    beforeAll(async () => {
        db = await connectToDatabase();
    });

    afterAll(async () => {
        await db.close();
    });

    test('can query users', async () => {
        const users = await db.query('SELECT * FROM users');
        expect(users.length).toBeGreaterThan(0);
    });

    test('can query products', async () => {
        const products = await db.query('SELECT * FROM products');
        expect(products.length).toBeGreaterThan(0);
    });
});

describe('setupTearDown', () => {
    let items: String[];

    beforeEach(() => {
        items = ['item1', 'item2', 'item3'];
    });

    afterEach(() => {
        items = [];
    });

    test('Should run before each test', () => {
        expect(items).toHaveLength(3);
    });

    test('Should run after each test', () => {
        items.push('item4');
        expect(items).toHaveLength(4);
    });
});
