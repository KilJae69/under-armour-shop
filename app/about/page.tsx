import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "This is about page",
};

export default function AboutPage() {
  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-2xl">This is about page</h1>
    </div>
  );
}
