import React, { useRef, useState } from "react";
import dayjs from "dayjs";

import useCreateShorten from "../hooks/mutate/useCreateShorten";
import useCreateBulkShorten from "../hooks/mutate/useCreateBulkShorten";
import useUpdateShorten from "../hooks/mutate/useUpdateShorten";
import useDeleteShorten from "../hooks/mutate/useDeleteShorten";
import useDeleteBulkShorten from "../hooks/mutate/useDeleteBulkShorten";
import useGetShorten from "../hooks/query/useGetShorten";
import ShortenFormCreate from "../components/Form";

import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import usePagination from "@hooks/usePagination";
import useSearchQuery from "@hooks/useSearchQuery";
import { useParams } from "react-router";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  DatePicker,
} from "antd";
import CustomModal from "@components/CustomModal";
import ImportFileModal from "@components/ImportFileModal";

const ShortenHomePage = () => {
  const {} = useParams();
  const [formSearch] = Form.useForm();
  const { initSearchValues, search, setSearch } = useSearchQuery();

  const [selectedRecord, setSelected] = useState();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const refForm = useRef();
  const pagination = usePagination({ reset: Object.values(search) });
  const query = {
    ...search,
    page: pagination.current,
    perPage: pagination.pageSize,

    startTime: search?.range?.[0]?.valueOf(),
    endTime: search?.range?.[1]?.valueOf(),
    range: undefined,
    ...pagination?.sort,
  };

  const { mutate: createShortenFn, isLoading: isLoadingCreate } =
    useCreateShorten();
  const { data: shortens, isLoading: loadingFetch } = useGetShorten(query);
  const { mutate: updateShortenFn, isLoading: isLoadingUpdate } =
    useUpdateShorten();
  const { mutateAsync: deleteShortenFn, isLoading: isLoadingDelete } =
    useDeleteShorten();
  const { mutateAsync: deleteBulkShortenFn, isLoading: isLoadingBulkDelete } =
    useDeleteBulkShorten();
  const { mutate: createBulkShortenFn, isLoading: isLoadingCreateBulk } =
    useCreateBulkShorten();

  const onDelete = (id) => {
    return deleteShortenFn(id);
  };
  const onUpdate = (values) => {
    updateShortenFn(
      { _id: selectedRecord?._id, formData: values },
      {
        onSuccess: () => {
          refForm?.current?.close();
        },
      }
    );
  };
  const onCreate = (value, c) => {
    createShortenFn(value, {
      onSuccess: c,
    });
  };

  const onCreateBulk = (data, c) => {
    const raw = data?.map((e) => ({
      name: e?.[0]?.trim(),
    }));
    // console.log({ raw });
    createBulkShortenFn(raw, {
      onSuccess: c,
    });
  };
  const onDeleteBulk = () => {
    return deleteBulkShortenFn(selectedRowKeys, {
      onSuccess: () => {
        setSelectedRowKeys([]);
      },
    });
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      sortOrder: pagination?.tableSortOrder?.createdAt?.order,
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY H:m:s"),
      sorter: {
        multiple: 1,
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (txt, record) => (
        <div className="flex gap-x-1">
          <Popconfirm
            placement="topLeft"
            title={
              "Bạn có chắc muốn xóa record này, điều này không thể hoàn tác?"
            }
            onConfirm={async () => {
              await onDelete(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelected(record);
              refForm?.current?.open();
            }}
            type="primary"
          >
            Chỉnh sửa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h3>Shorten</h3>
      <div className="flex justify-end">
        <div className="mb-2 flex space-x-2">
          {hasSelected && (
            <Popconfirm
              title="Xóa các record này, sẽ không thể hoàn tác được!"
              onConfirm={onDeleteBulk}
            >
              <Button type="primary" danger icon={<DeleteOutlined />}>
                Xóa nhiều
              </Button>
            </Popconfirm>
          )}
          <ImportFileModal
            loading={isLoadingCreateBulk}
            title={`Tạo nhiều shorten`}
            onSubmit={onCreateBulk}
          />
          <CustomModal
            footer={false}
            button={({ open }) => (
              <Button onClick={open} icon={<PlusOutlined />} type="primary">
                Tạo mới
              </Button>
            )}
            title={"Tạo shorten"}
          >
            {({ close }) => (
              <ShortenFormCreate
                okText={"Tạo"}
                onFinish={(v) => onCreate(v, close)}
                loading={isLoadingCreate}
              />
            )}
          </CustomModal>
        </div>
      </div>
      <div className="flex justify-end">
        <Form
          onFinish={setSearch}
          form={formSearch}
          layout="inline"
          initialValues={initSearchValues}
          autoComplete="off"
        >
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 [&>*]:!m-0 !space-x-reverse form-no-margin">
            <Form.Item name="name">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="status">
              <Select allowClear placeholder="Status">
                {[].map((e) => {
                  return (
                    <Select.Option value={e?.value}>{e?.label}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item name="range">
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={loadingFetch}
                icon={<SearchOutlined />}
                type="primary"
                htmlType="submit"
              >
                Tìm
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <Table
        rowSelection={rowSelection}
        rowKey={"_id"}
        onChange={pagination.onChangeTable}
        pagination={{ ...pagination, total: shortens?.paginate?.count }}
        loading={loadingFetch}
        columns={columns}
        dataSource={shortens || []}
      ></Table>

      <CustomModal
        footer={false}
        ref={refForm}
        noButton={true}
        title={"Sửa shorten"}
      >
        {() => (
          <ShortenFormCreate
            okText="Lưu thay đổi"
            initialValues={selectedRecord}
            onFinish={onUpdate}
            loading={isLoadingUpdate}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default ShortenHomePage;
