import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "This is PROFILE page",
};

export default function ProfilePage() {
  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-2xl">This is profile page</h1>
    </div>
  );
  
}