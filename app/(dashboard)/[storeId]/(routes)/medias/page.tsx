import prismadb from "@/lib/prismadb";
import { MediasClient } from "./components/client";
import { MediaColumn } from "./components/columns";
import { format } from "date-fns";

const MediasPage = async ({ params }: { params: { storeId: string } }) => {
  const medias = await prismadb.media.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMedias: MediaColumn[] = medias.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MediasClient data={formattedMedias} />
      </div>
    </div>
  );
};

export default MediasPage;
