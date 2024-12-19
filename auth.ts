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
        async signIn({ user, account, profile, email, credentials }) {
            try {
                // const raw = JSON.stringify({
                //     name: "user.name" || "",
                //     email: "john.doe@example.com" || "",
                //     google_id: "",
                //     image: user.image || "",
                // });

                // const data = await fetch(`${API_URL}/user/update`, {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         name: user.name || "",
                //         email: user.email || "",
                //         google_id: "",
                //         image: user.image || "",
                //     }),
                // });
                // console.log(await data.text());
                return true; // Allow sign in
            } catch (error) {
                console.log("error", error);
                return false;
            }
        },
        // async session({ session, token }) {
        //     // console.log(token);
        // {
        //     "name": "John Doe",
        //     "email": "john.doe@example.com",
        //     "google_id": "123456789",
        //     "image": "https://example.com/avatar.jpg"
        // }

        //     // {
        //     //     name: "Shirshen Shuvro",
        //     //     email: "official.shirshen@gmail.com",
        //     //     picture: "https://lh3.googleusercontent.com/a/ACg8ocLe9zVX1Sz08NnLzg1GWivcMKKItmUzhgC73r4rDUHIf_rqKg=s96-c",
        //     //     sub: "2b19a6b6-3e33-4893-b803-6de4b25b58e2",
        //     //     iat: 1734631225,
        //     //     exp: 1737223225,
        //     //     jti: "d082ae9b-e253-4065-84da-ce80321a1bd7",
        //     //   }
        //     await fetch(`${API_URL}/user/update`, {
        //         method: "POST",
        //         body: JSON.stringify({
        //             name: token.name || "",
        //             email: token.email || "",
        //             google_id: token.sub || "",
        //             image: token.picture || "",
        //         }),
        //     });
        //     return session;
        // },
    },
});
