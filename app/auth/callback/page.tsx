import { useEffect } from "react";
import { useRouter } from "next/router";

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchGoogleCallback = async () => {
      try {
        // Fetch the JSON response from Laravel callback route
        const response = await fetch("http://127.0.0.1:8000/auth/google/callback", {
          credentials: "include", // Include cookies/session info
        });

        const data = await response.json();

        if (data.status === "success") {
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log("User logged in:", data.user);

          // Redirect to dashboard or the specified URL
          router.push(data.redirect || "/dashboard");
        } else {
          console.error("Error during login:", data.message);
          router.push("/"); // Redirect to home if there's an error
        }
      } catch (error) {
        console.error("Error fetching Google callback:", error);
        router.push("/"); // Redirect to home on failure
      }
    };

    fetchGoogleCallback();
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default GoogleCallback;
