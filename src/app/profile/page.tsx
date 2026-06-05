"use client";

import { useRouter } from "next/navigation";
// components
import { LoadingSpinnerWithText } from "@/src/components/molecules";
import { Button } from "@/components/ui/button";
//hooks
import useCurrentUser from "@/src/hooks/useCurrentUser";
import useLogout from "@/src/hooks/useLogout";

function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  if (isLoading) return <LoadingSpinnerWithText />;
  if (!user) return <p>not logged in</p>;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <>
      <div className="p-5 mt-10">
        <section className="p-5 shadow-2xl rounded flex flex-col gap-5">
          <h3 className="border-b border-custom-blue">Profile</h3>
          <section className="flex flex-col gap-2 text-lg">
            <p>Email: {user.email}</p>
            {user.username && <p>Username: {user.username}</p>}
            <p>
              Account Created: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </section>
          <Button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            variant="outline"
            className="w-fit"
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </section>
      </div>
    </>
  );
}

export default ProfilePage;
