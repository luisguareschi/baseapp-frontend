"use client";
import useCurrentUser from "@/queries/auth/useCurrentUser";

const Home = () => {
  const { user } = useCurrentUser();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user?.username}</p>
    </div>
  );
};

export default Home;
