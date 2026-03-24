import { PrismaClient } from './src/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        console.log("Connecting to:", process.env.DATABASE_URL?.split('@')[1]); // Log part of URL for privacy
        const newPage = await prisma.page.create({
            data: {
                title: 'Test Adapter ' + new Date().toISOString(),
                slug: 'test-adapter-' + Date.now(),
                content: 'Test content with adapter'
            }
        });
        console.log("Created successfully:", newPage);
        
        const count = await prisma.page.count();
        console.log("Total pages:", count);
    } catch (e) {
        console.error("DEBUG ERROR:", e);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

main();
