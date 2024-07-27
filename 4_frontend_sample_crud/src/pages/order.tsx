import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-2.jpg";
import useSWR from "swr";
import { Coffee, Order } from "../lib/models";
import Loading from "../components/loading";
import { Alert, Button } from "@mantine/core";
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import axios from "axios";

export default function OrderPage() {
  const { data: orders, error: ordersError, mutate: mutateOrders } = useSWR<Order[]>("/orders");
  const { data: coffees, error: coffeesError } = useSWR<Coffee[]>("/coffees");
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);

  const handleDelete = async (orderId: number) => {
    setDeletingOrderId(orderId);
    try {
      await axios.delete(`/orders/${orderId}`);
      mutateOrders(); // Refresh the orders list after deletion
    } catch (error) {
      console.error("Failed to delete the order", error);
    } finally {
      setDeletingOrderId(null);
    }
  };

  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ออเดอร์</h1>
        <h2>รายการออเดอร์ทั้งหมด</h2>
      </section>

      <section className="container mx-auto py-8">
        <div className="flex justify-between pb-16">
          <h1 className="text-3xl font-semibold">รายการออเดอร์ทั้งหมด</h1>
        </div>

        {!orders && !ordersError && <Loading />}
        {!coffees && !coffeesError && <Loading />}

        {(ordersError || coffeesError) && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {ordersError?.message || coffeesError?.message}
          </Alert>
        )}
        {orders?.length === 0 && coffees?.length === 0 && <p className="text-center">No orders or coffees available</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders?.map((order) => {
            const coffee = coffees?.find(coffee => coffee.id === order.coffee_id);
            return (
              <div key={order.id} className="border border-solid border-neutral-200 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://placehold.co/150x200"
                  alt={`Order ${coffee?.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{coffee?.name}</h2>
                  <p className="text-neutral-500 mb-2">{order.notes}</p>
                  <p className="text-neutral-500 mb-2">Quantity : {order.quantity} </p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">{order.total_price} Baht</div>
                    <Button
                      color="red"
                      loading={deletingOrderId === order.id}
                      onClick={() => handleDelete(order.id)}
                    >
                      <IconTrash style={{ marginRight: 8 }} />
                      ลบออเดอร์
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
