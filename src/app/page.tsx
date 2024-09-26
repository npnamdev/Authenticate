import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 bg-primary">
      <Link href="/manage" className={buttonVariants({ variant: "outline" })}>Manage</Link>
      <Link href="/login" className={buttonVariants({ variant: "outline" })}>Login</Link>
      <Link href="/register" className={buttonVariants({ variant: "outline" })}>Register</Link>
    </div>
  );
}
