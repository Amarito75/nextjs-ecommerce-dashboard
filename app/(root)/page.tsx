import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <Button size={"default"} variant={"outline"}>
        Press
      </Button>
    </div>
  );
}
