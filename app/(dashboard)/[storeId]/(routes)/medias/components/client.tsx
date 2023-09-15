"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import { MediaColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface MediasClientProps {
  data: MediaColumn[];
}

export const MediasClient: React.FC<MediasClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Medias (${data.length})`}
          description="Manage medias for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/medias/new`)}>
          <LuPlus className="mr-2 w-4 h-4" /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Medias" />
      <Separator />
      <ApiList entityName="medias" entityIdName="mediaId" />
    </>
  );
};
