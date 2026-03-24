import { PrismaClient } from './src/generated/prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL
});

async function main() {
    try {
        console.log("Connecting to:", process.env.DATABASE_URL);
        const newPage = await prisma.page.create({
            data: {
                title: 'Test persistence ' + new Date().toISOString(),
                slug: 'test-' + Date.now(),
                content: 'Test content'
            }
        });
        console.log("Created successfully:", newPage);
        
        const count = await prisma.page.count();
        console.log("Total pages:", count);
    } catch (e) {
        console.error("DEBUG ERROR:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
