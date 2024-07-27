import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full my-4">
      <Loader size="md" />

      <div className="text-xs text-neutral-500">กำลังโหลด...</div>
    </div>
  );
}
