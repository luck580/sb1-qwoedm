import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'knhra25l',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-13',
  token: 'your-write-token' // You'll get this from Sanity dashboard
});

export async function getMenu() {
  return client.fetch(`
    *[_type == "category"] {
      name,
      items[] {
        name,
        price,
        description
      }
    }
  `);
}

export async function createReservation(reservation: {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}) {
  return client.create({
    _type: 'reservation',
    ...reservation,
    status: 'pending',
    createdAt: new Date().toISOString()
  });
}