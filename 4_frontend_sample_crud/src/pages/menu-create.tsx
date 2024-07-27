import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { Button, Container, Divider, NumberInput, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { Coffee } from "../lib/models";

export default function MenuCreatePage() {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const coffeeCreateForm = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
    },

    validate: {
      name: isNotEmpty("กรุณาระบุชื่อเครื่องดื่ม"),
      description: isNotEmpty("กรุณาระบุชื่อรายละเอียด"),
      price: isNotEmpty("กรุณาระบุรายละเอียดเครื่องดื่ม"),
    },
  });

  const handleSubmit = async (values: typeof coffeeCreateForm.values) => {
    try {
      setIsProcessing(true);
      const response = await axios.post<Coffee>(`/coffees`, values);
      notifications.show({
        title: "เพิ่มข้อมูลเครื่องดื่มสำเร็จ",
        message: "ข้อมูลเครื่องดื่มได้รับการเพิ่มเรียบร้อยแล้ว",
        color: "teal",
      });
      navigate(`/menu/${response.data.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          notifications.show({
            title: "ข้อมูลไม่ถูกต้อง",
            message: "กรุณาตรวจสอบข้อมูลที่กรอกใหม่อีกครั้ง",
            color: "red",
          });
        } else if (error.response?.status || 500 >= 500) {
          notifications.show({
            title: "เกิดข้อผิดพลาดบางอย่าง",
            message: "กรุณาลองใหม่อีกครั้ง",
            color: "red",
          });
        }
      } else {
        notifications.show({
          title: "เกิดข้อผิดพลาดบางอย่าง",
          message: "กรุณาลองใหม่อีกครั้ง หรือดูที่ Console สำหรับข้อมูลเพิ่มเติม",
          color: "red",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

return (
    <>
        <Layout>
            <Container className="mt-8">
                <h1 className="text-xl">เพิ่มกาแฟในระบบ</h1>

                <form onSubmit={coffeeCreateForm.onSubmit(handleSubmit)} className="space-y-8">
                    <TextInput
                        label="ชื่อกาแฟ"
                        placeholder="ชื่อกาแฟ"
                        {...coffeeCreateForm.getInputProps("name")}
                    />

                    <TextInput
                        label="คำอธิบาย"
                        placeholder="คำอธิบาย"
                        {...coffeeCreateForm.getInputProps("description")}
                    />

                    <NumberInput
                        label="ราคา"
                        placeholder="ราคา"
                        min={0}
                        {...coffeeCreateForm.getInputProps("price")}
                    />

                    <Divider />

                    <Button type="submit" loading={isProcessing}>
                        บันทึกข้อมูล
                    </Button>
                </form>
            </Container>
        </Layout>
    </>
);
}
