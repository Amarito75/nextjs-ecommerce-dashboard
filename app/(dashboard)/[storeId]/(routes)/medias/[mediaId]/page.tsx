import prismadb from "@/lib/prismadb";
import { MediaForm } from "../../medias/[mediaId]/components/media-form";

const MediaPage = async ({ params }: { params: { mediaId: string } }) => {
  const media = await prismadb.media.findUnique({
    where: {
      id: params.mediaId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MediaForm initialData={media} />
      </div>
    </div>
  );
};

export default MediaPage;
