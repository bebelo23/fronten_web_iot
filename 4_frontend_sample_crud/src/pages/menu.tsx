import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Coffee } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const { data: Coffee, error } = useSWR<Coffee[]>("/coffees");

  return (
    <>
      <Layout>
        <section
          className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
          style={{
            backgroundImage: `url(${cafeBackgroundImage})`,
          }}
        >
          <h1 className="text-5xl mb-2">เมนู</h1>
          <h2>รายการเครื่องดื่มทั้งหมด</h2>
        </section>

        <section className="container mx-auto py-8">
          <div className="flex justify-between pb-16">
            <h1>รายการเครื่องดื่ม</h1>

            <Button
              component={Link}
              leftSection={<IconPlus />}
              to="/menu/create"
              size="xs"
              variant="primary"
              className="flex items-center space-x-2"
            >
              เพิ่มเครื่องดื่ม
            </Button>
          </div>

          {!Coffee && !error && <Loading />}
          {error && (
            <Alert
              color="red"
              title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
              icon={<IconAlertTriangleFilled />}
            >
              {error.message}
            </Alert>
          )}

          {Coffee?.length === 0 && <p>No coffee Now</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Coffee?.map((coffee) => (
                <div key={coffee.id} className="border border-solid border-neutral-200 rounded-lg overflow-hidden">
                <img
                    src="https://placehold.co/150x200"
                    alt={coffee.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{coffee.name}</h2>                  
                    <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">{coffee.price} Baht</div>
                    <Button
                        component={Link}
                        to={`/coffee/${coffee.id}`}
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 self-end text-white px-4 py-2 rounded-md"
                    >
                        สั่งเครื่องดื่ม
                    </Button>
                    </div>
                </div>
                </div>
            ))}
            </div>

        </section>
      </Layout>
    </>
  );
}
