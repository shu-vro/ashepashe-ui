import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { API_URL } from "./lib/var";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    useSecureCookies: process.env.NODE_ENV === "production", // Key for production!
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "strict", // Or 'none' if you have cross-site needs (with secure: true)
                path: "/",
                secure: process.env.NODE_ENV === "production", // Very important!
            },
        },
        // ... other cookies if needed
    },
    callbacks: {
        async signIn({ user }) {
            try {
                const existRes = await fetch(`${API_URL}/user/${user.email}`);
                const exist = await existRes.json();
                if (exist.status === "success") {
                    return true;
                }
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const payload = {
                    name: user.name || "",
                    email: user.email || "",
                    google_id: "abcd",
                    image: user.image || "",
                };
                const res = await fetch(`${API_URL}/user/update`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(payload),
                    redirect: "follow",
                });
                const json = await res.json();
                return Boolean(json?.success); // Allow sign in
            } catch (error) {
                console.log("error", error);
                return false;
            }
        },
    },
});
