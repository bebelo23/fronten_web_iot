import { useParams, Link } from "react-router-dom";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import Layout from "../components/layout";
import { Container, Divider, Alert, Button } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

import { Coffee } from "../lib/models";
import { useEffect } from "react";

export default function MenuDescription() {
  const { coffeeId } = useParams();
  const {
    data: coffee,
    isLoading,
    error,
  } = useSWR<Coffee>(`/coffees/${coffeeId}`);

  const orderCreateForm = useForm({
    initialValues: {
      coffee_id: coffeeId || "",
      total_price: 0,
      quantity: 1,
      notes: "",
    },

    validate: {
      coffee_id: isNotEmpty("กรุณาระบุชื่อเครื่องดื่ม"),
      total_price: isNotEmpty("กรุณาระบุราคารวม"),
      quantity: isNotEmpty("กรุณาระบุจำนวน"),
    },
  });

  useEffect(() => {
    if (coffee) {
      const quantity = orderCreateForm.values.quantity;
      orderCreateForm.setFieldValue("total_price", quantity * coffee.price);
    }
  }, [orderCreateForm.values.quantity, coffee]);

  return (
    <Layout>
      <Container className="mt-4">
        {isLoading && !error && <Loading />}
        {error && (
          <Alert
            color="red"
            title="เกิดข้อผิดพลาดในการอ่านข้อมูล"
            icon={<IconAlertTriangleFilled />}
          >
            {error.message}
          </Alert>
        )}

        {!!coffee && (
          <>
            <h1 className="text-2xl font-bold mb-2">{coffee.name}</h1>
            <p className="italic text-neutral-500 mb-4">
              ราคา: {coffee.price} บาท
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <img
                src="https://placehold.co/150x200"
                alt={coffee.name}
                className="w-full object-cover aspect-[3/4] rounded-lg shadow-lg"
              />
              <div className="col-span-2 px-4 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">รายละเอียด</h3>
                  <p>{coffee.description}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">อร่อยแน่ๆ</h3>

                </div>
                <Button
                  component={Link}
                  to="/menu"
                  size="sm"
                  variant="primary"
                  className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  กลับ
                </Button>
              </div>
            </div>
            <Divider className="mt-6" />
          </>
        )}
      </Container>
    </Layout>
  );
}
