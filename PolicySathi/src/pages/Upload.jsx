import AppLayout from "../layout/AppLayout";
import UploadZone from "../components/UploadZone";
import Loader from "../components/Loader";

export default function Upload() {
  return (
    <AppLayout>

      <h1 className="text-3xl font-bold mb-6">
        Upload Claims Document
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <UploadZone />

        <Loader />

      </div>

    </AppLayout>
  );
}