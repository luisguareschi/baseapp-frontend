"use client";
import useCurrentUser from "@/queries/auth/useCurrentUser";
import useLogout from "@/queries/auth/useLogout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const { user } = useCurrentUser();
  const { logout } = useLogout();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="flex flex-col items-center justify-center p-5 w-fit gap-2">
        <h1>Home</h1>
        <p>Welcome, {user?.username}</p>
        <Button onClick={logout} className="w-full">
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Home;
