import { D1Database } from "@cloudflare/workers-types";

export interface Env {
    DB: D1Database;
}

interface EmailRequest {
    email: string;
    timestamp: string;
}

// Add your allowed origins here
const ALLOWED_ORIGINS = [
    'https://movieque.com',
    'http://localhost:5173',
    'http://localhost:4173'
];

function getCorsHeaders(origin: string | null): HeadersInit {
    const headers: HeadersInit = {
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
    };

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        headers['Access-Control-Allow-Origin'] = origin;
    }

    return headers;
}

function createResponse(data: any, status: number, origin: string | null): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: getCorsHeaders(origin)
    });
}

function isValidEmail(email: unknown): email is string {
    return typeof email === 'string' &&
        email.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const origin = request.headers.get('Origin');

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
        }

        // Only allow POST
        if (request.method !== 'POST') {
            return createResponse('Method not allowed', 405, origin);
        }

        try {
            const { email } = await request.json();

            // Validate email
            if (!isValidEmail(email)) {
                return createResponse('Invalid email address', 400, origin);
            }

            const normalizedEmail = email.trim().toLowerCase();
            const timestamp = new Date().toISOString();

            // Check for existing email
            const existing = await env.DB
                .prepare('SELECT email, timestamp FROM leads WHERE email = ?')
                .bind(normalizedEmail)
                .first<EmailRequest>();

            // Return existing or create new
            if (existing) {
                return createResponse(existing, 200, origin);
            }

            await env.DB
                .prepare('INSERT INTO leads (email, timestamp) VALUES (?, ?)')
                .bind(normalizedEmail, timestamp)
                .run();

            return createResponse({ email: normalizedEmail, timestamp }, 201, origin);

        } catch (error) {
            console.error('Error:', error);

            if (error instanceof SyntaxError) {
                return createResponse('Invalid JSON', 400, origin);
            }

            return createResponse('Server error', 500, origin);
        }
    }
};