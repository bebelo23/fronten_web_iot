import { Box, Group } from "@mantine/core";
import websiteLogo from "../assets/website-logo.png";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Box>
        <header className="h-14 px-8 border border-t-0 border-x-0 border-solid border-neutral-200 bg-white">
          <div className="flex justify-between">
            <div>
              <img src={websiteLogo} alt="Logo" className="h-14 w-auto" />
            </div>

            <Group className="h-14 gap-0">
              <Link
                to={"/"}
                className="flex items-center h-14 px-1 no-underline text-neutral-600 font-semibold text-sm"
              >
                หน้าหลัก
              </Link>

              <Link
                to={"/books"}
                className="flex items-center h-14 px-1 no-underline text-neutral-600 font-semibold text-sm"
              >
                หนังสือ
              </Link>

              {/* <Link
                to={"/menu"}
                className="flex items-center h-14 px-1 no-underline text-neutral-600 font-semibold text-sm"
              >
                เมนู
              </Link> */}
            </Group>

            <div></div>
          </div>
        </header>
      </Box>

      <main>{children}</main>
    </>
  );
}
