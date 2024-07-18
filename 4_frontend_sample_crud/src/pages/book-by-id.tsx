import { Alert, Badge, Button, Container, Divider } from "@mantine/core";
import Layout from "../components/layout";
import { Link, useParams } from "react-router-dom";
import { Book } from "../lib/models";
import useSWR from "swr";
import Loading from "../components/loading";
import { IconAlertTriangleFilled, IconEdit } from "@tabler/icons-react";

export default function BookByIdPage() {
  const { bookId } = useParams();

  const { data: book, isLoading, error } = useSWR<Book>(`/books/${bookId}`);

  return (
    <>
      <Layout>
        <Container className="mt-4">
          {/* You can use isLoading instead of !book */}
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

          {!!book && (
            <>
              <h1>{book.title}</h1>
              <p className="italic text-neutral-500 mb-4">โดย {book.author}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <img
                  src="https://placehold.co/150x200"
                  alt={book.title}
                  className="w-full object-cover aspect-[3/4]"
                />
                <div className="col-span-2 px-4 space-y-2 py-4">
                  <h3>รายละเอียดหนังสือ</h3>
                  <p className="indent-4">
                    {/* TODO: เพิ่มรายละเอียดหนังสือ */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, neque.
                    Necessitatibus nihil quibusdam molestiae, asperiores nesciunt quod aliquid
                    accusamus iusto sint amet optio laudantium eius, facilis iure ipsa assumenda
                    alias pariatur! Quis ad ratione amet fugiat, et culpa cupiditate, veritatis
                    beatae sed voluptatum a reprehenderit id odit quas? Enim, earum?
                  </p>

                  <h3>เรื่องย่อ</h3>
                  <p className="indent-4">
                    {/* TODO: เพิ่มเรื่องย่อ */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia officiis amet nemo
                    ut placeat aliquam neque id voluptates quod nihil.
                  </p>

                  <h3>หมวดหมู่</h3>
                  {/* TODO: เพิ่มหมวดหมู่(s) */}
                  <div className="flex flex-wrap gap-2">
                    <Badge color="teal">#หมวดหมู่ 1</Badge>
                    <Badge color="teal">#หมวดหมู่ 2</Badge>
                    <Badge color="teal">#หมวดหมู่ 3</Badge>
                    <Badge color="teal">#หมวดหมู่ 4</Badge>
                  </div>
                </div>
              </div>

              <Divider className="mt-4" />

              <Button
                color="blue"
                size="xs"
                component={Link}
                to={`/books/${book.id}/edit`}
                className="mt-4"
                leftSection={<IconEdit />}
              >
                แก้ไขข้อมูลหนังสือ
              </Button>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
