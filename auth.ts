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
    callbacks: {
        async signIn({ user }) {
            try {
                const existRes = await fetch(`${API_URL}/user/${user.email}`);
                const exist = await existRes.json();
                console.log("exist", exist);
                if (exist) {
                    return true;
                }
                await fetch(`${API_URL}/user/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name || "",
                        email: user.email || "",
                        google_id: "",
                        image: user.image || "",
                    }),
                });
                // console.log(success.json())
                return true; // Allow sign in
            } catch (error) {
                console.log("error", error);
                return false;
            }
        },
    },
});
