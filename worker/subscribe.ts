import { D1Database } from "@cloudflare/workers-types";

export interface Env {
    DB: D1Database;
}

interface EmailRequest {
    email: string;
    timestamp: string;
}



// CORS configuration
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'http://localhost:5173', // 'https://movieque.com' for production
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json'
};

function createResponse(data: any, status: number): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: CORS_HEADERS
    });
}

function isValidEmail(email: unknown): email is string {
    return typeof email === 'string' &&
        email.trim().length > 0 &&
        email.includes('@') &&
        email.includes('.');
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: CORS_HEADERS });
        }

        // Only allow POST
        if (request.method !== 'POST') {
            return createResponse('Method not allowed', 405);
        }

        try {
            const { email } = await request.json();

            // Validate email
            if (!isValidEmail(email)) {
                return createResponse('Invalid email address', 400);
            }

            const normalizedEmail = email.trim().toLowerCase();
            const timestamp = new Date().toISOString();

            // Check for existing email
            const existing = await env.DB
                .prepare(`SELECT email, timestamp FROM leads WHERE email = ?`)
                .bind(normalizedEmail)
                .first<EmailRequest>();

            // Return existing or create new
            if (existing) {
                return createResponse(existing, 200);
            }

            await env.DB
                .prepare(`INSERT INTO leads (email, timestamp) VALUES (?, ?)`)
                .bind(normalizedEmail, timestamp)
                .run();

            return createResponse({ email: normalizedEmail, timestamp }, 201);

        } catch (error) {
            console.error('Error:', error);

            if (error instanceof SyntaxError) {
                return createResponse('Invalid JSON', 400);
            }

            return createResponse('Server error', 500);
        }
    }
};