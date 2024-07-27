import { useParams } from "react-router-dom";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import Layout from "../components/layout";
import { Container, Alert, Divider,Button } from "@mantine/core";
import { Order } from "../lib/models";
import { Link } from "react-router-dom";

export default function OrderByIdPage() {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useSWR<Order>(`/orders/${orderId}`);

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

        {!!order && (
          <>
            <h1>Order Details</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="col-span-2 px-4 space-y-2 py-4">
                <h3>Order Information</h3>
                <p><strong>Coffee ID:</strong> {order.coffee_id}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total Price:</strong> {order.total_price} บาท</p>
                <p><strong>Notes:</strong> {order.notes}</p>
              </div>
            </div>
            <Divider className="mt-4" />
            <Button
              component={Link}
              to="/menu"
              size="xs"
              variant="primary"
              className="flex items-center space-x-2 bg-red-600"
            >
              Back
            </Button>
          </>
        )}
      </Container>
    </Layout>
  );
}
