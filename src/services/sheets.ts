import Papa from 'papaparse';
import type { Product } from '../types/product';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0EBbiMNmo3ZkFFkSo87IYynIL8AqlMy3YKCMps26-fBuIGjHL04o9I8Ac0Y1w30JTV2a2it-0_c6K/pub?output=csv';

export const getProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(SHEET_CSV_URL, {
            download: true,
            header: true,
            complete: (results) => {
                const products: Product[] = results.data
                    .filter((row: any) => row.id && row.name) // Filtramos filas vacías
                    .map((row: any) => ({
                        id: row.id,
                        brand: row.brand,
                        name: row.name,
                        price: parseFloat(row.price || '0'),
                        image: row.image,
                        isAvailable: String(row.isAvailable).toUpperCase() === 'TRUE',
                        gender: row.gender,
                        bestTime: row.bestTime,
                        intensity: row.intensity,
                        olfactoryFamily: row.olfactoryFamily ? row.olfactoryFamily.split(',').map((f: string) => f.trim()) : [],
                        notes: row.notes,
                        description: row.description,
                        collection: row.collection
                    }));
                resolve(products);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};
