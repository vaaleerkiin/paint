import React, { useState, useContext } from "react";
import { CanvasContext } from "../CanvasProvide";

import {
  Button,
  Drawer,
  ColorPicker,
  Space,
  Slider,
  Modal,
  message,
} from "antd";
import {
  DoubleRightOutlined,
  DeleteOutlined,
  SaveOutlined,
  RedoOutlined,
} from "@ant-design/icons";

export const SideBar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const CanvasValue = useContext(CanvasContext);
  const { confirm } = Modal;

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Saved",
    });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Delete",
      icon: <DeleteOutlined style={{ color: "red" }} />,
      content: "Are you sure to delete this?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        CanvasValue.setClear(true);
      },
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        size="large"
        onClick={showDrawer}
        style={{
          position: "fixed",
          bottom: -14,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <DoubleRightOutlined
          style={{
            transform: "rotate(-90deg) translateX(5px)",
          }}
        />
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}
        mask={false}
        key="Basic Drawer"
        height={88}
      >
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Space>
            {[
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#FFC0CB",
              "#800080",
            ].map((color) => (
              <Button
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => CanvasValue.setColor(color)}
              ></Button>
            ))}
            <ColorPicker
              size="large"
              showText
              value={CanvasValue.color}
              onChange={(_, hex) => CanvasValue.setColor(hex)}
              disabledAlpha
            />
            <Slider
              defaultValue={CanvasValue.radius}
              min={1}
              max={100}
              style={{ minWidth: 160 }}
              onChange={CanvasValue.setRadius}
            />
          </Space>
          <Space>
            <Button onClick={() => CanvasValue.setReplay(true)} size="large">
              <RedoOutlined />
            </Button>
            <Button
              onClick={() => {
                CanvasValue.setSave(true);
                success();
              }}
              style={{ backgroundColor: "#03943b" }}
              type="primary"
              size="large"
            >
              <SaveOutlined />
            </Button>
            <Button onClick={onClose} type="primary" size="large">
              <DoubleRightOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
            </Button>
            <Button
              onClick={showDeleteConfirm}
              type="primary"
              size="large"
              danger
            >
              <DeleteOutlined />
            </Button>
          </Space>
        </Space>
      </Drawer>
    </>
  );
};
